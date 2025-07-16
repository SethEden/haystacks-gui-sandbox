/**
 * @file threadRuleWorker.js
 * @module threadRuleWorker
 * @description Does the actual work of calling a business rule in a separate thread for
 * better performance and parallel processing, and rule work tasks.
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/worker_threads.html|worker_threads}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/14
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import { parentPort, workerData } from 'worker_threads';
import path from 'path';


async function runRuleByName(ruleName, inputData, inputMetaData, dependencyData) {
  // Try D[sys.cbusinessRules] if you want to, or use direct import
  if (typeof rules[ruleName] !== 'function') {
    throw new Error(`Rule '${ruleName}' not found in rules library`);
  }
  // Call the rule (could be async or sync)
  return await rules[ruleName](inputData, inputMetaData);
}

(async () => {
  try {
    const { ruleName, inputData, inputMetaData } = workerData;
    const result = await runRuleByName(ruleName, inputData, inputMetaData);
    parentPort.postMessage(result);
  } catch (err) {
    parentPort.postMessage({ error: err.message, stack: err.stack });
  }
})();
