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
import path from 'path';

const {bas, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.brokers.threadBroker.
const namespacePrefix = wrd.cframework + bas.cDot + wrd.cbrokers + bas.cDot + baseFileName + bas.cDot;

/**
 * @function initThreadBroker
 * @description Initializes a threader broker object with a given thread-pool size.
 * @param {integer} poolSize The size of the thread pool for the current thread broker.
 * @return {void}
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
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/11
 */
async function startJob(jobData) {
  const functionName = startJob.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  // jobData is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cjobDataIs + JSON.stringify(jobData));
  let returnData = false;

  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  initTheadBroker,
  startJob
}