/**
 * @file threader.js
 * @module threader
 * @description Contains all of the low-level functions needed to support the
 * threading and parallel processing concurrency sub-system.
 * This is the NodeJS Worker Threads.
 *  - Executes assigned jobs
 *  - Sends log/events/results/errors back to threadBroker.
 * @requires module:ruleBroker
 * @requires module:configurator
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/worker_threads.html|worker_threads}
 * @requires {@link https://www.npmjs.com/package/url|url}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/11
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import configurator from './configurator.js';
import loggers from './loggers.js';
import D from '../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import { parentPort, workerData } from 'worker_threads';
import { pathToFileURL } from 'url';
import path from 'path';

const {bas, biz, clr, cfg, gen, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.executrix.threader.
// eslint-disable-next-line no-unused-vars
const namespacePrefix =  wrd.cframework + bas.cDot + wrd.cexecutrix + bas.cDot + baseFileName + bas.cDot;

// You may want to dynamically import specific rules/commands here based on workerData.jobType, etc.
(async () => {
  try {
    // Step 1: Unpack all workerData
    const {
      jobType, // 'businessRule' or 'command'
      name, // ruleName or commandName
      inputData,
      inputMetaData,
      metaData, // meta-data for this rule/command (with dependencies info)
      getMetaDataByNameString, // stringified code or info to get meta-data for deps, see below)
      dStruct, // D-Data Structure
    } = workerData;

    // Step 2: Build local D-data structure for this worker
    let D = {
      businessRules: {},
      commands: {},
      configuration: dStruct[wrd.cconfiguration]
    };

    // Step 3: Prepare meta-data lookup
    // This can be a mapping or utility function; for this draft, assume a map is sent in workerData
    let allMetaData = workerData.allMetaData || {}; // {ruleName: metaDataObj, ... }
    function getMetaDataByName(name) {
      // Check allMetaData for both rules and commands
      return allMetaData[name] || null;
    }

    // Step 4: Recursively load the rule/command and all dependencies
    const section = jobType === wrd.ccommand ? wrd.ccommands : sys.cbusinessRules;
    const rootMeta = metaData; // meta-data for the root
    const loadedNames = new Set();
    await loadWithDependencies(rootMeta, getMetaDataByName, D, loadedNames, section);

    // Step 5: Optionally wire up debug logging to parent (console.log, etc)
    if (D[wrd.cconfiguration][cfg.csendConsoleLogsToParent]) {
      // Patch console.log to relay logs
      await loggers.setInjectedLogTransport((...args) => {
        parentPort.postMessage({ type: wrd.clog, log: args.map(string).join(' ') });
      });
    }

    // Step 6: Execute the rule/command
    const fn = D[section][name];
    if (typeof fn !== wrd.cfunction) throw new Error(`${jobType} ${name} is not a function`);
    const result = await fn(inputData, inputMetaData);

    // Step 7: Return result
    parentPort.postMessage({ type: wrd.cresult, result });

  } catch (err) {
    parentPort.postMessage({ error: err.message, stack: err.stack });
  }
})();