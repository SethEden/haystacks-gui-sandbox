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

const {bas, msg, sys, wrd} = hayConst;

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
 * @description Sends a payload of data or message to a single connected shell client via the provided socket.
 * The payload may be a string or a serializable JavaScript object. If an object is provided,
 * it will be JSON-stringified before transmission. To ensure message integrity across TCP boundaries
 * (and support arbitrarily large messages), the output is delimited using the configured MESSAGE_DELIMITER
 * and split into safe-size chunks (default: 840 characters) to avoid socket buffer overflows and
 * comply with cross-platform limitations.
 * This function is intended for one-to-one communication from the server to a specific client socket,
 * such as direct command responses, output logs, error messages, or CLI prompts.
 * The client is expected to reconstruct and parse messages using the same delimiter on the receiving end.
 * @param {object} socket The client socket object (as provided by Node's `net` module) representing the target client connection.
 * Must be a valid, writable socket instance.
 * @param {string|object} payload The data to send to the client. If an object, it will be stringified to JSON automatically.
 * Appends the MESSAGE_DELIMITER for safe framing. Handles chunking for long messages.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/03
 * @notes
 * - Do not call this with a closed or destroyed socket; behavior is undefined.
 * - The message delimiter (MESSAGE_DELIMITER) must be unique and not present in payload content.
 * - Chunking prevents message loss and ensures robust delivery for large payloads.
 * - The receiving client is responsible for message reconstruction and parsing.
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
 * @description Sends a message or payload to all currently connected shell clients.
 * The payload can be any serializable JavaScript object or string.
 * The payload is automatically stringified to JSON and delimited with the MESSAGE_DELIMITER
 * to ensure correct framing on the client side. This function is typically used to send
 * broadcast notifications, global system messages, or real-time updates to all clients,
 * such as status changes, system banners, or shutdown signals.
 * All clients currently tracked in the `clients` Map will receive the broadcasted message.
 * Any clients that are disconnected or have closed their sockets will be silently ignored.
 * @param {string|object} payload The message or data object to send to all connected clients.
 * If an object is provided, it will be stringified before transmission.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/03
 * @notes
 * - The function will send the payload to all clients currently registered in the `clients` Map.
 * - Use this function for system-wide messages, CLI banners, or coordinated shutdown.
 * - The client must handle MESSAGE_DELIMITER framing on the receiving end.
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

/**
 * @function setShellCommandHandler
 * @description Registers a callback function to handle incoming shell commands from connected CLI clients.
 * When a message of the form `{command: "..."}` is received from a shell client over the socket,
 * the registered callback will be invoked with the command string and client ID as arguments.
 * This enables the application to process user-entered CLI commands, enqueue tasks, or trigger
 * other command-driven behaviors in a decoupled manner.
 * This function is typically called once during application bootstrapping, but may be safely
 * called again to replace or override the handler as needed for testing or modularization.
 * @param {function} callback The function to invoke for each incoming shell command.
 *   - Signature: `callback(command: string, clientId: string): void`
 *   - `command` is the parsed command string sent from the shell client.
 *   - `clientId` is the unique identifier of the client that sent the command.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/04
 * @notes
 * - If no callback is registered, incoming commands are ignored or a warning is sent to the client.
 * - The callback should handle any asynchronous work or error handling internally.
 */
function setShellCommandHandler(callback) {
  shellCommandHandler = callback;
}

/**
 * @function CreateServer
 * @description Handles each new client connection to the sockets server.
 * This function is invoked for every incoming TCP socket connection and manages:
 *  - Assigning a unique client ID
 *  - Maintaining a persistent buffer for partial message reassembly (using the MESSAGE_DELIMITER)
 *  - Parsing and routing incoming JSON-encoded command payloads
 *  - Handling malformed or invalid messages gracefully
 *  - Registering data, close, and error event listeners for robust lifecycle management
 *  - Sending a greeting/banner to each new client
 *  - Removing client sessions from the active clients map on disconnect/error
 * The handler supports multiple concurrent CLI or shell clients, allowing for
 * interactive bidirectional messaging between the main Electron process and all shells.
 * @param {object} socket The net.Socket instance representing the connected client.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/03
 * @notes
 * - Uses a custom MESSAGE_DELIMITER to safely delimit and reconstruct messages that may span multiple TCP packets.
 * - Handles message chunking and ensures clean disconnects and resource cleanup.
 * - This handler is provided as the argument to `net.createServer()`, and is not intended to be called directly.
 */
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

/**
 * @function sendShellOutput
 * @description Sends a single output payload to a specific connected shell client, identified by client ID.
 * This function looks up the client socket in the active clients map, and if present,
 * transmits the given output (as a JSON object with an `output` property) using the custom
 * message protocol and chunking logic. This enables the Electron main process or other server-side
 * logic to send targeted responses or log output to individual shell clients in real time.
 * If the clientId is not found in the active session map, the function safely performs no action.
 * Typical use cases include:
 *  - Delivering command results to the requesting CLI session
 *  - Displaying targeted log output or error messages
 *  - Synchronous responses for user-initiated shell actions
 * @param {string} clientId The unique identifier for the connected shell client (e.g., 'client-1').
 * @param {string|object} output The message or payload to send to the client. If not a string, it will be stringified.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/04
 * @notes
 * - The function does nothing if the clientId is not present in the clients map.
 * - Output is sent using the same protocol and chunking as all other server-to-shell traffic.
 */
function sendShellOutput(clientId, output) {
  if (clients.has(clientId)) {
    sendToClient(clients.get(clientId), { output });
  }
}

/**
 * @function broadcastShellOutput
 * @description Broadcasts a message or output payload to all connected shell clients via the socket server.
 * Packages the provided output as an object and sends it to every active client session.
 * This function is typically used to transmit log output, status updates, or broadcast-style messages
 * from the main Electron process or business logic to all CLI shell windows simultaneously.
 * Ensures all clients receive a synchronized copy of the output for display or logging.
 * @param {string|object} output The message, string, or payload object to broadcast to all connected shell clients.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/04
 * @notes
 * - The payload is wrapped in an object `{ output }` before being broadcasted.
 * - Relies on the internal `broadcast()` utility, which handles chunking and message delimiters as needed.
 * - No return value; the function transmits data to all currently connected clients.
 */
function broadcastShellOutput(output) {
  const functionName = broadcastShellOutput.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log('output is: ', output);
  broadcast({ output });
  // console.log(`END ${namespacePrefix}${functionName} function`);
}

/**
 * @function shutdownSocketServer
 * @description Closes all active socket connections to shell clients, sends each client a shutdown event payload,
 * cleans up resources, and closes the socket server listener. Ensures a clean and orderly shutdown of
 * the socket server and all connected clients, preventing orphaned processes or dangling sockets.
 * Typically invoked as part of the full application shutdown process to guarantee all inter-process
 * communication channels are gracefully terminated.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/09
 * @notes
 * - Each connected client receives a message of the form: `{ type: 'shutdown' }` followed by the configured message delimiter.
 * - After notifying clients, all sockets are destroyed and removed from the internal registry.
 * - The server is then closed and a completion message is logged to the console.
 */
function shutdownSocketServer() {
  const functionName = shutdownSocketServer.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  for (const sock of clients.values()) {
    sock.end(JSON.stringify({ type: sys.cshutdown }) + MESSAGE_DELIMITER);
    sock.destroy();
  }
  clients.clear();
  server.close(() => {
    console.log('[socketsServer] Server closed.');
  });
  // console.log(`END ${namespacePrefix}${functionName} function`);
}

server.listen(PORT, HOST, () => {
  console.log(`[socketsServer] Listening on ${HOST}:${PORT}`);
});

export default {
  setShellCommandHandler,
  sendShellOutput,
  broadcastShellOutput,
  shutdownSocketServer,
  server
}