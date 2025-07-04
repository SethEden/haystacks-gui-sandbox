/**
 * @file socketsServer.js
 * @module socketsServer
 * @description Creates a socket server through which clients can communicate.
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @requires {@link https://nodejs.dev/learn/the-nodejs-process-module|process}
 * @requires {@link https://nodejs.org/api/net|net}
 * @author Seth Hollingsead
 * @date 2025/07/03
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import net from 'net';
import path from 'path';

const {bas, msg, wrd} = hayConst;

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
  socket.write(JSON.stringify(payload) + MESSAGE_DELIMITER);
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
  const eventMsg = JSON.stringify(payload) + MESSAGE_DELIMITER;
  for (const sock of clients.values()) {
    sock.write(eventMsg);
  }
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
    leftover = parts.pop();
    for (const part of parts) {
      if (!part.trim()) continue;
      try {
        const eventMsg = JSON.parse(part);
        // ROUTE: incoming {command: "..."}
        if (eventMsg.command) {
          if (typeof shellCommandHandler === wrd.cfunction) {
            try {
              shellCommandHandler(eventMsg.command, clientId);
            } catch (shellError) {
              sendToClient(socket, { error: `[ERR] Handler threw: ${shellError.message}`});
            }
          } else {
            sendToClient(socket, { output: `[WARN] No shell command handler registered.` });
          }
        }
        // Other client→server messages can be handled here as needed
      } catch (err) {
        sendToClient(socket, { error: `Malformed message: ${err.message}` });
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
  sendToClient(socket, { output: `Connected to Haystacks Electron CLI Server! [${clientId}]` });
});

// Optional: Expose a function to send output to any/all clients (e.g., from main Electron logic)
function sendShellOutput(clientId, output) {
  if (clients.has(clientId)) {
    sendToClient(clients.get(clientId), { output });
  }
}

function broadcastShellOutput(output) {
  broadcast({ output });
}

server.listen(PORT, HOST, () => {
  console.log(`[socketsServer] Listening on ${HOST}:${PORT}`);
});

export { setShellCommandHandler, sendShellOutput, broadcastShellOutput, server };