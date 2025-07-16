/**
 * @file applicationSystem.js
 * @module applicationSystem
 * @description Contains all client application system commands for execution of the client application with basic application system operations.
 * @requires module:application.constants
 * @requires module:application.message.constants
 * @requires {@link https://www.npmjs.com/package/@haystacks/async|@haystacks/async}
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/06/23
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as apc from '../../constants/application.constants.js';
import * as app_msg from '../../constants/application.message.constants.js';
// External imports
import haystacksGui from '../../../../../src/main.js';
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, cmd, msg, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// application.testHarness.commands.clientCommands.applicationSystem.
const namespacePrefix = wrd.capplication + bas.cDot + apc.cApplicationName + bas.cDot + wrd.ccommands + bas.cDot + wrd.cclient + wrd.cCommands + bas.cDot + baseFileName + bas.cDot;

/**
 * @function instructions
 * @description Provides instructions to the end user on what steps they need to perform to get up and running and interface with the system.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string>} An array with a boolean True or False value to indicate if the application should exit or not exit, followed by an empty string.
 * @author Seth Hollingsead
 * @date 2025/07/09
 */
async function instructions(inputData, inputMetaData) {
  const functionName = instructions.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];

  // Instructions to end user:
  await haystacksGui.consoleLog(wrd.cInfo, '', app_msg.cinstructionsMessage00);
  // ....More instructions ADD HERE!
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function applicationHelp
 * @description A command to list the application commands and plugin commands.
 * If no plugins are loaded by the application then no plugin commands will be listed.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an empty string.
 * @author Seth Hollingsead
 * @date 2025/06/23
 */
async function applicationHelp(inputData, inputMetaData) {
  const functionName = applicationHelp.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  await haystacksGui.enqueueCommand(wrd.chelp + bas.cSpace + wrd.cApplication + bas.cComa + wrd.cPlugins);
  await haystacksGui.consoleLog(namespacePrefix, functionName, JSON.stringify(returnData));
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function applicationWorkflowHelp
 * @description A command to list the application workflows and plugin workflows.
 * If no plugins are loaded by the application then no plugin workflows will be listed.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, follows by an empty string.
 * @author Seth Hollingsead
 * @date 2025/06/23
 */
async function applicationWorkflowHelp(inputData, inputMetaData) {
  const functionName = applicationWorkflowHelp.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  await haystacksGui.enqueueCommand(cmd.cworkflowHelp + bas.cSpace + wrd.cApplication + bas.cComa + wrd.cPlugins);
  await haystacksGui.consoleLog(namespacePrefix, functionName, JSON.stringify(returnData));
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

export default {
  instructions,
  applicationHelp,
  applicationWorkflowHelp
}