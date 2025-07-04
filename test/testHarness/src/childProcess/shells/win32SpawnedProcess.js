/**
 * @file win32SpawnedProcess.js
 * @module win32SpawnedProcess
 * @description Creates the shell to execute the interactive command line interface for accepting commands and console logging.
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/net.html|net}
 * @requires {@link https://nodejs.dev/learn/the-nodejs-child_process-module|child_process}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/03
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import net from 'net';
import { spawn } from 'child_process';
import path from 'path';

const {bas, msg, wrd} = hayConst;

const SOCKET_HOST = '127.0.0.1';
const SOCKET_PORT = 3000;
const MESSAGE_DELIMITER = '##END##';

// Choose your shell here (you can make this configurable):
const shellExe = 'cmd.exe'; // or 'powershell.exe' or any custom shell
const shellArgs = []; // E.g., ['/k'] for cmd.exe to keep it running

// 1. Connect to the Haystacks sockets server
const socket = net.createConnection({ host: SOCKET_HOST, port: SOCKET_PORT });

socket.on(wrd.cconnect, () => {
  // 2. Spawn the shell process
  const shell = spawn(shellExe, shellArgs, {
    stdio: [wrd.cpipe, wrd.cpipe, wrd.cpipe],
    windowsHide: false
  });

  // 3. Pipe shell output to socket as {output: ...}
  function sendShellOutput(data) {
    const payload = JSON.stringify({ output: data.toString() }) + MESSAGE_DELIMITER;
    socket.write(payload);
  }

  shell.stdout.on(wrd.cdata, sendShellOutput);
  shell.stderr.on(wrd.cdata, sendShellOutput);

  // 4. Pipe socket commands into the shell as stdin
  let leftover = '';
  socket.on(wrd.cdata, (data) => {
    leftover += data.toString();
    let parts = leftover.split(MESSAGE_DELIMITER);
    leftover = parts.pop();
    for (const part of parts) {
      if (!part.trim()) continue;
      try {
        const eventMsg = JSON.parse(part);
        if (eventMsg[wrd.ccommand]) {
          shell.stdin.write(eventMsg[wrd.ccommand] + bas.cCarRetNewLin);
        }
      } catch (err) {
        // Malformed input from socket
        shell.stdin.write(bas.cCarRetNewLin);
      }
    } // End-for (const part of parts)
  });

  // 5. Handle process exit
  shell.on(wrd.cexit, (code) => {
    socket.write(JSON.stringify({ output: `[Shell exited with code ${code}]` }) + MESSAGE_DELIMITER);
    socket.end();
  });

  // Clean up on socket end/error
  socket.on(wrd.cclose, () => shell.kill());
  socket.on(wrd.cerror, () => shell.kill());
});

// Optional: Handle socket errors
socket.on(wrd.cerror, (err) => {
  console.error('[win32SpawnedProcess] Socket error:', err.message);
  process.exit(1);
});