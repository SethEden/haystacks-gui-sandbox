/**
 * @file applicationTests.js
 * @module applicationTests
 * @description Contains all client defined application specific integration test commands specific to
 * executing integration tests on application data and plugin data for plugins loaded by the application.
 * @requires module:application.command.constants
 * @requires module:application.constants
 * @requires {@link https://www.npmjs.com/package/@haystacks/async|@haystacks/async}
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/06/23
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as apc from '../../constants/application.constants.js';
// External imports
import haystacksGui from '../../../../../src/main.js';
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, cmd, msg, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// application.testHarness.commands.clientCommands.applicationTests.
const namespacePrefix = wrd.capplication + bas.cDot + apc.cApplicationName + bas.cDot + wrd.ccommands + bas.cDot + wrd.cclient + wrd.cCommands + bas.cDot + baseFileName + bas.cDot;

/**
 * @function validateApplicationConstants
 * @description A command to validate all application specific constants and all plugin specific constants for plugins loaded by the application.
 * If the application doesn't load any plugins, then no plugin constants validation will be executed.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an empty string.
 * @author Seth Hollingsead
 * @date 2025/06/23
 */
async function validateApplicationConstants(inputData, inputMetaData) {
  const functionName = validateApplicationConstants.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  await haystacksGui.enqueueCommand(cmd.cvalidateConstants + bas.cSpace + wrd.cApplication + bas.cComa + wrd.cPlugins);
  await haystacksGui.consoleLog(namespacePrefix, functionName, JSON.stringify(returnData));
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function validateApplicationCommandAliases
 * @description A command to validate all application specific command aliases and all plugin specific command aliases for plugins loaded by the application.
 * If the application doesn't load any plugins, then no plugin command alias validation will be executed.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an empty string.
 * @author Seth Hollingsead
 * @date 2025/06/23
 */
async function validateApplicationCommandAliases(inputData, inputMetaData) {
  const functionName = validateApplicationCommandAliases.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  await haystacksGui.enqueueCommand(cmd.cvalidateCommandAliases + bas.cSpace + wrd.cApplication + bas.cComa + wrd.cPlugins);
  await haystacksGui.consoleLog(namespacePrefix, functionName, JSON.stringify(returnData));
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function validateApplicationWorkflows
 * @description A command to validate all application specific workflows and all plugin specific workflows for plugins loaded by the application.
 * If the application doesn't load any plugins, then no plugin workflow validation will be executed.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an empty string.
 * @author Seth Hollingsead
 * @date 2025/06/23
 */
async function validateApplicationWorkflows(inputData, inputMetaData) {
  const functionName = validateApplicationWorkflows.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  await haystacksGui.enqueueCommand(cmd.cvalidateWorkflows + bas.cSpace + wrd.cApplication + bas.cComa + wrd.cPlugins);
  await haystacksGui.consoleLog(namespacePrefix, functionName, JSON.stringify(returnData));
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function allApplicationValidations
 * @description A command to execute all application validations.
 * This is better to have here so we can define short name command aliases for this command, rather than having a long workflow name.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an empty string.
 * @author Seth Hollingsead
 * @date 2025/06/23
 */
async function allApplicationValidations(inputData, inputMetaData) {
  const functionName = allApplicationValidations.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  await haystacksGui.enqueueCommand(cmd.crunAllValidations + bas.cSpace + wrd.cApplication + bas.cComa + wrd.cPlugins);
  await haystacksGui.consoleLog(namespacePrefix, functionName, JSON.stringify(returnData));
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

export default {
  validateApplicationConstants,
  validateApplicationCommandAliases,
  validateApplicationWorkflows,
  allApplicationValidations
}