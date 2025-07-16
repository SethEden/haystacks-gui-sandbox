/**
 * @file chiefThreader.js
 * @module chiefThreader
 * @description Holds all of the functions that manage the master control of all threading activities.
 *  - System-level lifecycle management for all thread workers.
 *  - Receives high-level threading requests from the framework or client applications or plugins.
 *  - Decides if a job should be run in parallel, queued, or handled directly.
 *  - Handles startup, shutdown, and worker pool health/status monitoring, race condition checkers.
 *  - Aggregates logging/errors from all workers.
 * @requires module:threadBroker
 * @requires module:chiefData
 * @requires module:configurator
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/11
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import threadBroker from '../brokers/threadBroker.js';
import chiefData from './chiefData.js';
import configurator from '../executrix/configurator.js';
import loggers from '../executrix/loggers.js';
import D from '../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, cfg, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.controllers.chiefThreader.
const namespacePrefix = wrd.cframework + bas.cDot + wrd.ccontrollers + bas.cDot + baseFileName + bas.cDot;

/**
 * @function initChiefThreader
 * @description Initializes the chief threader interface and related required data structures.
 * @param {object} configuration A JSON object that contains all threader configuration settings.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2025/07/11
 */
async function initChiefThreader(configuration) {
  const functionName = initChiefThreader.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cconfigurationIs + JSON.stringify(configuration));
  let returnData = false;

  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function submitJob
 * @description Adds a given job to a thread pool for execution.
 * @param {object} jobData A JSON object that contains all the job data.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2025/07/11
 */
async function submitJob(jobData) {
  const functionName = submitJob.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  // jobData is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cjobDataIs + JSON.stringify(jobData));
  let returnData = false;
  returnData = await threadBroker.startJob(jobData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

// At bottom, for smoke test only
if (process.argv[1] === import.meta.url) {
  (async () => {
    const result = await submitJob({ value: 41 });
    console.log('Thread result:', result);
  })();
}

export default {
  initChiefThreader,
  submitJob
}