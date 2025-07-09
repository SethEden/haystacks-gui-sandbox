/**
 * @file socketsServer.js
 * @module socketsServer
 * @description Creates a socket server through which clients can communicate.
 * @requires module:application.constants
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @requires {@link https://nodejs.dev/learn/the-nodejs-process-module|process}
 * @requires {@link https://nodejs.org/api/net|net}
 * @author Seth Hollingsead
 * @date 2025/07/03
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as apc from '../constants/application.constants.js';
// External imports
import hayConst from '@haystacks/constants';
import net from 'net';
import path from 'path';

const {bas, msg, wrd} = hayConst;

const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// application.testHarness.childProcess.socketsServer.
// eslint-disable-next-line no-unused-vars
const namespacePrefix =  wrd.capplication + bas.cDot + apc.cApplicationName + bas.cDot + wrd.cchild + wrd.cProcess + bas.cDot + baseFileName + bas.cDot;

const HOST = '127.0.0.1';
const PORT = 3000;
const MESSAGE_DELIMITER = '##END##';

let clientCounter = 0;
let shellCommandHandler = null;
const clients = new Map(); // id => socket

/**
 * @function sendToClient
 * @description Sends a payload of data or message to the client for display/logging.
 * @param {*} socket 
 * @param {*} payload 
 * @return {*}
 * @author Seth Hollingsead
 * @date 2025/07/03
 */
function sendToClient(socket, payload) {
  const functionName = sendToClient.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log('socket is: ', socket);
  // console.log('payload is: ', payload);
  // socket.write(JSON.stringify(payload) + MESSAGE_DELIMITER);
  const maxMessageLength = 840;
  let jsonString = typeof payload === wrd.cstring ? payload : JSON.stringify(payload);
  jsonString += MESSAGE_DELIMITER; // Always append delimiter!
  // console.log('jsonString is: ' + jsonString);

  // Chunk the message if needed
  for (let i = 0; i < jsonString.length; i += maxMessageLength) {
    const chunk = jsonString.slice(i, i + maxMessageLength);
    // console.log('chunk to send is: ' + chunk);
    socket.write(chunk);
  }
  // console.log(`END ${namespacePrefix}${functionName} function`);
}

/**
 * @function broadcast
 * @description Broadcast a message to all clients (optional future use).
 * @param {*} payload 
 * @return {*}
 * @author Seth Hollingsead
 * @date 2025/07/03
 */
function broadcast(payload) {
  const functionName = broadcast.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log('payload is: ', payload);
  const eventMsg = JSON.stringify(payload) + MESSAGE_DELIMITER;
  // console.log('eventMsg is: ' + eventMsg);
  for (const sock of clients.values()) {
    sock.write(eventMsg);
  }
  // console.log(`END ${namespacePrefix}${functionName} function`);
}

function setShellCommandHandler(callback) {
  shellCommandHandler = callback;
}

const server = net.createServer((socket) => {
  // Assign an ID to each client for routing (optional)
  const clientId = `client-${++clientCounter}`;
  clients.set(clientId, socket);
  let leftover = '';

  console.log(`[socketsServer] New connection (${clientId}) from ${socket.remoteAddress}:${socket.remotePort}`);

  // Data event = incoming messages from this shell client
  socket.on(wrd.cdata, (chunk) => {
    leftover += chunk.toString();
    let parts = leftover.split(MESSAGE_DELIMITER);
    // console.log('parts is: ' + parts);
    leftover = parts.pop();
    // console.log('leftover is: ' + leftover);
    for (const part of parts) {
      // console.log('part is: ' + part);
      if (!part.trim()) continue;
      try {
        const eventMsg = JSON.parse(part);
        // ROUTE: incoming {command: "..."}
        if (eventMsg.command) {
          if (typeof shellCommandHandler === wrd.cfunction) {
            try {
              shellCommandHandler(eventMsg.command, clientId);
            } catch (shellError) {
              sendToClient(socket, `ERROR: Handler threw: ${shellError.message}`);
            }
          } else {
            sendToClient(socket, `WARNING: No shell command handler registered.`);
          }
        }
        // Other client→server messages, payload types can be handled here as needed
      } catch (err) {
        sendToClient(socket, `ERROR: Malformed message: ${err.message}`);
      }
    } // End-for (const part of parts)
  });

  // Clean up on client disconnect
  socket.on(wrd.cclose, () => {
    console.log(`[socketsServer] Client disconnected: ${clientId}`);
    clients.delete(clientId);
  });

  socket.on(wrd.cerror, (err) => {
    console.log(`[socketsServer] Socket error (${clientId}):`, err.message);
    clients.delete(clientId);
  });

  // Send greeting/banner
  sendToClient(socket, `Connected to Haystacks Electron CLI Server! [${clientId}]`);
});

// Optional: Expose a function to send output to any/all clients (e.g., from main Electron logic)
function sendShellOutput(clientId, output) {
  if (clients.has(clientId)) {
    sendToClient(clients.get(clientId), { output });
  }
}

function broadcastShellOutput(output) {
  const functionName = broadcastShellOutput.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log('output is: ', output);
  broadcast({ output });
  // console.log(`END ${namespacePrefix}${functionName} function`);
}

server.listen(PORT, HOST, () => {
  console.log(`[socketsServer] Listening on ${HOST}:${PORT}`);
});

export { setShellCommandHandler, sendShellOutput, broadcastShellOutput, server };