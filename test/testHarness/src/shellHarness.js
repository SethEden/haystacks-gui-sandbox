/**
 * @file shellHarness.js
 * @module shellHarness
 * @description This is the main init for the shell application interface.
 * It will work with Bash/Dos/Shell, Mac, Linux and Windows.
 * All messages are pipes back to the main process using an inter-process communication channel - IPC.
 * This code is designed to be executed from a secondary spawned child process.
 * This is a DUMB TERMINAL ONLY!!
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/net.html|net}
 * @requires {@link https://nodejs.org/api/readline.html|readline}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/01
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import net from 'net';
import readline from 'readline';
import path from 'path';

const {bas, msg, sys, wrd} = hayConst;

const SOCKET_HOST = '127.0.0.1';
const SOCKET_PORT = 3000;
const MESSAGE_DELIMITER = '##END##';

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
    console.log('[shellHarness] Connected to Haystacks GUI server. Type commands below:');
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
        } else {
          // WARNING: We have no idea what kind of object we are dealing with!
          console.log('WARNING: We have no idea what kind of object we are dealing with!');
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
    console.log('[shellHarness] Disconnected from server.');
    process.exit(0);
  });
  socket.on(wrd.cerror, (err) => {
    console.error('[shellHarness] Socket error: ', err.message);
    process.exit(1);
  });

  // Clean exit on ctrl-c
  r1.on(wrd.cclose, () => {
    socket.end();
    process.exit(0);
  });
}

createSocketClient();