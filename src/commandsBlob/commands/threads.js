/**
 * @file threads.js
 * @module threads
 * @description Holds a few test commands to test out features and functions of the new thread management system.
 * @requires module:chiefThreader
 * @requires module:configurator
 * @requires module:loggers
 * @requires module:data
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
import D from '../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, cmd, cfg, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = path.resolve(import.meta.url.replace(sys.cfileColonDoubleForwardSlash, ''));
// framework.commandsBlob.commands.threads.
const namespacePrefix = wrd.cframework + bas.cDot + sys.ccommandsBlob + bas.cDot + wrd.ccommands + bas.cDot + baseFileName + bas.cDot;

const commandsMetaData = [
  {[wrd.cName]: cmd.cthreadTest, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [], [sys.cbusinessRulesDependencies]: []}
];

/**
 * @function initThreads
 * @description Adds the threads commands meta-data to the D-data structure commandsMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given command can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/17
 */
async function initThreads() {
  const functionName = initThreads.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  let returnData = false;
  // Add all of the commands meta-data to the D-data structure!
  if (D[sys.ccommandsMetaData] && D[sys.ccommandsMetaData][wrd.cframework]) {
    D[sys.ccommandsMetaData][wrd.cframework].push(...commandsMetaData);
    returnData = true;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function threadTest
 * @description Executes a simple hello world style thread test, for now, can adapt for more complex test scenarios or use cases.
 * @param {array<boolean|string|integer>} inputData Not used for this command.
 * <inputData[0] = 'threadTest'
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean False value to
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
  initThreads,
  threadTest
}