/**
 * @file threads.js
 * @module threads
 * @description Holds a few test commands to test out features and functions of the new thread management system.
 * @requires module:chiefThreader
 * @requires module:configurator
 * @requires module:loggers
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/14
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import chiefThreader from '../../controllers/chiefThreader.js';
import configurator from '../../executrix/configurator.js';
import loggers from '../../executrix/loggers.js';
// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, cfg, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.commandsBlob.commands.threads.
const namespacePrefix = wrd.cframework + bas.cDot + sys.ccommandsBlob + bas.cDot + wrd.ccommands + bas.cDot + baseFileName + bas.cDot;

/**
 * @function threadTest
 * @description Executes a simple hello world style thread test, for now, can adapt for more complex test scenarios or use cases.
 * @param {array<boolean|string|integer>} inputData Not used for this command.
 * <inputData[0] = 'threadTest'
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean False value to
 * indicate if the application exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2025/07/14
 */
async function threadTest(inputData, inputMetaData) {
  const functionName = threadTest.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  await loggers.consoleLog(wrd.cInfo, '%%%%%%%%%%%%%%%%%% BEGIN THREADING TEST!!!!');
  const result = await chiefThreader.submitJob({ value: 41 });
  await loggers.consoleLog(wrd.cInfo, 'result is: ' + JSON.stringify(result));
  await loggers.consoleLog(wrd.cInfo, '%%%%%%%%%%%%%%%%%% END THREADING TEST!!!!');
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  threadTest
}