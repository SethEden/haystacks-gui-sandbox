/**
 * @file socketsServerLogTransmit
 * @module socketsServerLogTransmit
 * @description This file is needed here to provide a methodology
 * and process for forward transmission of logs to a sockets client.
 * The Sockets Client is used for reverse log transmission from a client back to a server.
 * The different log transmission strategies are controlled by a logging schema.
 * Here the server transmission of logs is provided following with a dependency injection pattern.
 * We use the dependency injection pattern because it is likely that the application, not the framework,
 * has defined it's own sockets server, so we should hook that server to send the log messages via.
 * This is important because we don't want the framework to create another server,
 * that would conflict with a sockets server created by the application.
 * @requires @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/07
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, biz, gen, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.executrix.socketsServerLogTransmit.
// eslint-disable-next-line no-unused-vars
const namespacePrefix =  wrd.cframework + bas.cDot + wrd.cexecutrix + bas.cDot + baseFileName + bas.cDot;

// Internal: Storage for the injected broadcast function
let broadcastFunction = null;

/**
 * @function initLogTransmission
 * @description Initializes log transmission by dependency-injecting the server's broadcast function.
 * @param {function} inputData The function to use for broadcasting log messages (e.g., socketsServer.broadcastShellOutput).
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/07
 * @NOTE CANNOT USE haystacks.consoleLog here, because of a circular dependency with loggers.
 */
function initLogTransmission(inputData) {
  const functionName = initLogTransmission.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log('inputData is: ', inputData);
  broadcastFunction = inputData;
  // console.log(`END ${namespacePrefix}${functionName} function`);
}

/**
 * @function transmitLog
 * @description Forwards a log message to all connected socket clients.
 * This function should be called by the logger if "server" log transmission mode is active.
 * @param {string|object} message The log message to send (string, or JSON-serializable).
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/07
 * @NOTE CANNOT USE haystacks.consoleLog here, because of a circular dependency with loggers.
 */
function transmitLog(message) {
  const functionName = transmitLog.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log('message is: ', message);
  if (typeof broadcastFunction === wrd.cfunction) {
    // Optionally stringify if needed:
    let payload = typeof message === wrd.cstring ? message : JSON.stringify(message);
    // payload is:
    console.log('payload is: ' + payload);
    try {
      broadcastFunction(payload);
    } catch (err) {
      // ERROR: transmitting log:
      console.error(msg.cErrorTransmittingLog, err);
    }
  } else {
    // Optionally log a warning only in dev mode to avoid spam in prod
    if (process.env.NODE_ENV !== wrd.cproduction) {
      // ERROR: No broadcast function injected. Log not transmitted.
      // console.warn('ERROR: No broadcast function injected. Log not transmitted.);
    }
  }
  // console.log(`END ${namespacePrefix}${functionName} function`);
}

// Export the DI setup and the transmit function
export default {
  initLogTransmission,
  transmitLog
}