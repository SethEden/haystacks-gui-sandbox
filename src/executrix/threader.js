/**
 * @file threader.js
 * @module threader
 * @description Contains all of the low-level functions needed to support the
 * threading and parallel processing concurrency sub-system.
 * This is a wrapper for the NodeJS Worker Threads.
 *  - Executes assigned jobs
 *  - Sends log/events/results/errors back to threadBroker.
 *  - Clean startup/shutdown, can be imported for specialized tasks if needed.
 * @requires module:ruleBroker
 * @requires module:configurator
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
import ruleBroker from '../brokers/ruleBroker.js';
import configurator from './configurator.js';
import loggers from './loggers.js';
import D from '../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import { Worker, isMainThread, parentPort } from 'worker_threads';
import path from 'path';

const {bas, biz, clr, cfg, gen, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.executrix.threader.
// eslint-disable-next-line no-unused-vars
const namespacePrefix =  wrd.cframework + bas.cDot + wrd.cexecutrix + bas.cDot + baseFileName + bas.cDot;

/**
 * @function startThread
 * @description Actual thread/worker logic (thin wrapper around NodeJS Worker Threads)
 * @param {object} jobData A function or data block to feed a thread job for execution.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2025/07/11
 */
async function startThread(jobData) {
  const functionName = startThread.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  // jobData is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cjobDataIs + JSON.stringify(jobData));
  let returnData = false;
  returnData = new Promise((resolve, reject) => {
    // Pass jobData to the worker. For test: worker does "return jobData + 1"
    const worker = new Worker(new URL('./threadWorker.js', import.meta.url), {
      workerData: jobData,
    });
    worker.on(wrd.cmessage, result => {
      resolve(result);
    });
    worker.on(wrd.cerror, reject);
    worker.on(wrd.cexit, code => {
      if (code !== 0) reject(new Error('Worker stopped with exit code: ' + code));
    })
  });
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  startThread
}