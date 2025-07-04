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

const {bas, msg, wrd} = hayConst;

const SOCKET_HOST = '127.0.0.1';
const SOCKET_PORT = 3000;
const MESSAGE_DELIMITER = '##END##';

function createSocketClient() {
  const socket = net.createConnection({ host: SOCKET_HOST, port: SOCKET_PORT });

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
  let leftover = '';
  socket.on(wrd.cdata, (data) => {
    // Support messages split across packets or multiple in one chunk
    leftover += data.toString();
    let parts = leftover.split(MESSAGE_DELIMITER);
    leftover = parts.pop(); // Save incomplete part for next time
    for (const part of parts) {
      if (!part.trim()) continue;
      try {
        const inEventMsg = JSON.parse(part);
        if (inEventMsg[wrd.coutput]) process.stdout.write(inEventMsg[wrd.coutput + bas.cCarRetNewLin]);
        if (inEventMsg[wrd.clog]) process.stdout.write(bas.cOpenBracket + wrd.cLOG + bas.cCloseBracket + bas.cSpace + inEventMsg[wrd.clog] + bas.cCarRetNewLin);
      } catch (err) {
        // Not JSON
        process.stdout.write(part + bas.cCarRetNewLin);
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