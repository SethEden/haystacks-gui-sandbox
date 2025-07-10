/**
 * @file shellHarness.js
 * @module shellHarness
 * @description This is the main init for the shell application interface.
 * It will work with Bash/Dos/Shell, Mac, Linux and Windows.
 * All messages are pipes back to the main process using an inter-process communication channel - IPC.
 * This code is designed to be executed from a secondary spawned child process.
 * This is a DUMB TERMINAL ONLY!!
 * @requires module:application.constants
 * @requires module:application.message.constants
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/net.html|net}
 * @requires {@link https://nodejs.org/api/readline.html|readline}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/01
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as apc from '../../testHarness/src/constants/application.constants.js';
import * as app_msg from '../../testHarness/src/constants/application.message.constants.js';
// External imports
import hayConst from '@haystacks/constants';
import net from 'net';
import readline from 'readline';
import path from 'path';

const {bas, msg, sys, wrd} = hayConst;

const SOCKET_HOST = '127.0.0.1';
const SOCKET_PORT = 3000;
const MESSAGE_DELIMITER = '##END##';

/**
 * @function safeJsonParse
 * @description Safely parses a persistent buffer of delimited message strings into discrete JSON objects or plain strings,
 * handling fragmented and/or concatenated messages that may occur due to TCP chunking. This function is designed
 * to robustly reconstruct and extract multiple complete messages from an incoming buffer (split by MESSAGE_DELIMITER),
 * while also handling cases where the 'output' field of a parsed object contains a nested JSON string.
 * Features:
 * - Splits the input buffer into segments using MESSAGE_DELIMITER.
 * - Returns all successfully parsed complete messages (as objects or strings) in the `parsed` array.
 * - Returns any remaining incomplete message fragment in the `incomplete` string (for buffer persistence).
 * - If a message is an object with an 'output' property that itself appears to be JSON, parses it one level deeper.
 * - Silently falls back to plain string for any non-JSON or malformed messages (never throws).
 * Use Cases:
 * - Safely reconstructing application-layer messages in a TCP socket stream that may arrive in incomplete or batched chunks.
 * - Defensive against protocol changes, bad network conditions, or malformed output payloads.
 * @param {string} persistentBuffer - The cumulative input buffer (including both new and leftover data).
 * @returns {object} An object of shape `{ parsed: Array, incomplete: string }` where `parsed` contains fully reconstructed message objects/strings,
 * and `incomplete` holds any partial trailing message to be retained for future input.
 * @date 2025/07/08
 * @author Seth Hollingsead
 * @notes
 * - Always call this function before processing any received TCP data; append new data to the buffer first.
 * - Any message with an 'output' property that itself is JSON will be automatically parsed one extra level.
 * - Tolerant of malformed or partial data—no exceptions will be thrown.
 */
async function safeJsonParse(persistentBuffer) {
  // Break buffer into message-sized chunks by delimiter
  let messages = persistentBuffer.split(MESSAGE_DELIMITER);
  let incomplete = messages.pop();
  let parsed = [];
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i].trim();
    if (message.length > 0) {
      let msgObj = message;
      try {
        msgObj = JSON.parse(message);

        // If it's an object with an 'output' property that looks like JSON, parse it once more
        if (
          typeof msgObj === wrd.cobject &&
          msgObj !== null &&
          typeof msgObj.output === wrd.cstring &&
          msgObj.output.trim().startsWith(bas.cOpenCurlyBrace)
        ) {
          try {
            msgObj = JSON.parse(msgObj.output);
          } catch {
            // Fallback: leave as string if not valid JSON
            msgObj = msgObj.output;
          }
        }
      } catch (err) {
        // Not JSON, just string
      }
      parsed.push(msgObj);
    }
  }
  return { parsed, incomplete };
}

/**
 * @function createSocketClient
 * @description Initializes and manages a socket client connection to the Haystacks Electron CLI server (via TCP).
 * This function establishes a persistent connection using Node’s `net` module, sets up a CLI prompt for interactive user input,
 * and handles the sending/receiving of command and output messages between the shell harness and the server.
 * Features:
 * - Connects to the configured SOCKET_HOST and SOCKET_PORT.
 * - Implements keep-alive to maintain the connection as long as possible.
 * - Uses readline to provide a CLI prompt; each entered line is sent to the server as a JSON command (with delimiter).
 * - Receives server output, supports safe/robust JSON parsing of potentially chunked or combined messages.
 * - Correctly reconstructs and displays incoming logs, table outputs, generic output, or shutdown signals from the server.
 * - Gracefully handles user-triggered exits (`exit` command or Ctrl+C), server disconnects, or socket errors.
 * This is the entrypoint for the interactive shell window/harness process,
 * acting as the glue between user keyboard input and framework server logic.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/03
 * @notes
 * - The function manages its own event loop; do not await or chain after this call.
 * - Message chunking and parsing must match server protocol (`MESSAGE_DELIMITER`).
 * - Exits the process on error, disconnect, or user-initiated exit to avoid zombie clients.
 * - All resource cleanup (readline, socket) is handled internally.
 * - Extensible: new message types can be added in the main socket `data` handler. (Consider refactoring into a schema at some point.)
 */
function createSocketClient() {
  const socket = net.createConnection({ host: SOCKET_HOST, port: SOCKET_PORT });

  // Keep connection live
  socket.setKeepAlive(true);

  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: bas.cGreaterThan + bas.cSpace
  });

  // Prompt when connected
  socket.on(wrd.cconnect, () => {
    // Connected to Haystacks GUI server. Type commands below:
    console.log(apc.cshellHarnessLabel + app_msg.cconnectedToHastacksGuiServerCommandsBelow);
    r1.prompt();
  });

  // Send user input to the server
  r1.on(wrd.cline, (line) => {
    if (line.trim().toLowerCase() === wrd.cexit) {
      r1.close();
      socket.end();
      return;
    }
    // Send as JSON with delimiter
    const eventMsg = JSON.stringify({ command: line.trim() }) + MESSAGE_DELIMITER;
    socket.write(eventMsg);
    r1.prompt();
  });

  // Print any output/log from the server
  let persistentBuffer = '';

  socket.on(wrd.cdata, async (data) => {
    // console.log('data package received is: ' + data);
    // Support messages split across packets or multiple in one chunk
    persistentBuffer += data.toString();
    let { parsed, incomplete } = await safeJsonParse(persistentBuffer);
    // console.log('parsed messages is: ', parsed);
    persistentBuffer = incomplete || '';
    for (const eventMsg of parsed) {
      // console.log('eventMsg is: ', eventMsg);
      if (typeof eventMsg === wrd.cobject && eventMsg !== null) {
        // console.log('eventMsg is an object!');
        // Table log (No extra parsing, just pass straight to console.table)
        if (eventMsg.type === sys.ctableLog) {
          // console.log('eventMsg is a table object!');
          console.table(eventMsg.tableData, eventMsg.columnNames);
        } else if (eventMsg[wrd.coutput]) {
          // console.log('eventMsg is an output message object!');
          process.stdout.write(eventMsg[wrd.coutput] + bas.cCarRetNewLin);
        } else if (eventMsg[wrd.clog]) {
          // console.log('eventMsg is a log message object!');
          process.stdout.write(bas.cOpenBracket + wrd.cLOG + bas.cCloseBracket + bas.cSpace + inEventMsg[wrd.clog] + bas.cCarRetNewLin);
        } else if (eventMsg[wrd.ctype] === sys.cshutdown) {
          // shutting down, goodbye.
          process.stdout.write(app_msg.cshuttingDownGoodbye);
          process.exit(0);
        } else {
          // WARNING: We have no idea what kind of object we are dealing with!
          console.log(app_msg.cWarningUnknownMessageType);
        }
      } else if (typeof eventMsg === wrd.cstring) {
        // console.log('eventMsg is a string.');
        // Raw string, just print it.
        process.stdout.write(eventMsg + bas.cCarRetNewLin);
      }
    }
  });

  // Handle disconnects and errors
  socket.on(wrd.cclose, () => {
    // Disconnected from server.
    console.log(apc.cshellHarnessLabel + app_msg.cdisconnectedFromServer);
    process.exit(0);
  });
  socket.on(wrd.cerror, (err) => {
    // Socket error:
    console.error(apc.cshellHarnessLabel + app_msg.csocketError, err.message);
    process.exit(1);
  });

  // Clean exit on ctrl-c
  r1.on(wrd.cclose, () => {
    socket.end();
    process.exit(0);
  });
}

createSocketClient();