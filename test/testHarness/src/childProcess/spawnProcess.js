/**
 * @file spawnProcess.js
 * @module spawnProcess
 * @description Spawns the platform shell, bridges it with the socket server for bi-directional CLI interaction.
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/process.html|process}
 * @requires {@link https://nodejs.org/api/net.html|net}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/03
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import process from 'process';
import net from 'net';
import path from 'path';

const {bas, msg, wrd} = hayConst;

// 1. Dynamically import the correct platform shell launcher:
const platform = process.platform; // 'win32', 'darwin, 'linux', etc.
const platformScriptPath = `./shells/${platform}SpawnedProcess.js`;
const {launchShell } = await import(platformScriptPath);

// 2. Launch the shell as a child process (returns {childProcess, shellStdin, shellStdout, shellStderr})
const {child, stdin, stdout, stderr } = launchShell(); // You'll define this in win32SpawnedProcess.js, etc.

// 3. Connect to the socket server
const SOCKET_HOST = '127.0.0.1';
const SOCKET_PORT = 3000;
const client = net.createConnection({ host: SOCKET_HOST, port: SOCKET_PORT });

const MESSAGE_DELIMITER = '##END##';

// 4. When you get a command from the socket, write to shell stdin
let leftover = '';
client.on(wrd.cdata, (data) => {
  leftover += data.toString();
  let parts = leftover.split(MESSAGE_DELIMITER);
  leftover = parts.pop();
  for (const part of parts) {
    if (!part.trim()) continue;
    try {
      const eventMsg = JSON.parse(part);
      if (eventMsg[wrd.ccommand]) {
        stdin.write(eventMsg[wrd.ccommand] + bas.cCarRetNewLin);
      }
    } catch (err) {
      // Ignore - No Op
    }
  }
});

// 5. When shell outputs, send back over the socket
function sendOutput(type, content) {
  client.write(JSON.stringify({ [type]: content }) + MESSAGE_DELIMITER);
}
stdout.on(wrd.cdata, (data) => sendOutput(wrd.coutput, data.toString()));
stderr.on(wrd.cdata, (data) => sendOutput(wrd.cerror, data.toString()));

// 6. Handle cleanup
child.on(wrd.cexit, (code) => {
  sendOutput(wrd.clog, 'Shell exited with code: ' + code);
  client.end();
});

client.on(wrd.cclose, () => {
  child.kill();
});

client.on(wrd.cerror, (err) => {
  console.error('[spawnProcess] Socket error: ', err.message);
  child.kill();
  process.exit(1);
});