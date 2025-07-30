/**
 * @file threadBroker.js
 * @module threadBroker
 * @description Holds all of the mid-level management functions that
 * manage the threading parallel processing systems and concurrency systems operations.
 *  - Accepts jobs from chiefThreader
 *  - Allocates jobs to available worker threads/processes (manages a worker pool).
 *  - Tracks job status, collects results, and reports back to chiefThreader.
 *  - Implements strategies driven by schema (round robin, priority queue, batching).
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/worker_threads.html|worker_threads}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/11
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import loggers from '../executrix/loggers.js';
import D from '../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import { Worker } from 'worker_threads';
import path from 'path';

const {bas, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.brokers.threadBroker.
const namespacePrefix = wrd.cframework + bas.cDot + wrd.cbrokers + bas.cDot + baseFileName + bas.cDot;

/**
 * @function initThreadBroker
 * @description Initializes a threader broker object with a given thread-pool size.
 * @param {integer} poolSize The size of the thread pool for the current thread broker.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2025/07/11
 */
async function initTheadBroker(poolSize) {
  const functionName = initTheadBroker.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cpoolSizeIs + poolSize);
  let returnData = false;

  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function startJob
 * @description A wrapper for the threader.startThread function.
 * @param {object} jobData A function or data block to feed a thread job for execution.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2025/07/11
 */
async function startJob(jobData) {
  const functionName = startJob.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  // jobData is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cjobDataIs + JSON.stringify(jobData));
  let returnData = false;
  const workerPath = new URL('../executrix/threader.js', import.meta.url);

  returnData = await new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { workerData: jobData });
    worker.on(wrd.cmessage, async (message) => {
      // Route message based on its type
      if (message && typeof message === wrd.cobject && message.type) {
        switch (message.type) {
          case sys.cconsoleLog: // e.g., "consoleLog"
            // You might want to use a dedicated threadLog flag for fine-grained control
            await loggers.consoleLog(sys.cthreadLog, message.message);
            break;
          case sys.cconsoleTableLog: // e.g., "consoleTableLog"
            await loggers.consoleTableLog(sys.cthreadLog, message.tableData, message.columnNames);
            break;
          case sys.cconstantsValidationSummaryLog:
            await loggers.constantsValidationSummaryLog(message.message, message.passFail);
            break;
          case wrd.cresult: // "result"
            resolve(message);
            break;
          case wrd.cerror: // "error"
            reject(new Error(message.error || 'Unknown thread error'));
            break;
          default:
            // Fallback: Treat as a normal log
            await loggers.consoleLog(sys.cthreadLog, JSON.stringify(message));
        }
      } else {
        // Fallback: Treat as a normal log
        await loggers.consoleLog(sys.cthreadLog, JSON.stringify(message));
      }
    });
    worker.on(wrd.cerror, reject);
    worker.on(wrd.cexit, code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code: ${code}`));
    });
  });
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  initTheadBroker,
  startJob
}