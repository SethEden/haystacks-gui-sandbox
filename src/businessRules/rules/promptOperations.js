/* eslint-disable no-undef */
/**
 * @file promptOperations.js
 * @module promptOperations
 * @description A simple prompt module to get input from the user using process.stdin.
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.dev/learn/the-nodejs-fs-module|fs}
 * @requires {@link https://nodejs.org/api/url.html|url}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/05/04 - May the Forth be with you!! ;-)
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import loggers from '../../executrix/loggers.js';
import D from '../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
// import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const {bas, biz, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = fileURLToPath(import.meta.url);
// framework.businessRules.rules.promptOperations.
const namespacePrefix = wrd.cframework + bas.cDot + sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + baseFileName + bas.cDot;
// const term = 13; // carriage return

const rulesMetaData = [
  {[wrd.cName]: biz.cprompt, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cpromptRaw, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cpromptNonBlocking, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []}
];

/**
 * @function initPromptOperations
 * @description Adds the promptOperations business rules meta-data to the
 * D-data structure businessRulesMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given business rule can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/16
 */
async function initPromptOperations() {
  const functionName = initPromptOperations.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  let returnData = false;
  // Add all of the rules meta-data to the D-data structure!
  if (D[sys.cbusinessRulesMetaData] && D[sys.cbusinessRulesMetaData][wrd.cframework]) {
    D[sys.cbusinessRulesMetaData][wrd.cframework].push(...rulesMetaData);
    returnData = true;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function prompt
 * @description Prompts the user for some input and returns the input.
 * @param {string} inputData What the prompt should display when asking the user for input.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} A string of whatever input the user gave.
 * @author Seth Hollingsead
 * @date 2022/05/04 - May the Forth be with you!! ;-)
 * @NOTE This function was written with extensive help from ChatGPT,
 * special effort was made to make it work in a cross-platform environment.
 */
async function prompt(inputData, inputMetaData) {
  const functionName = prompt.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.caskIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = '';
  if (inputData) {
    returnData = new Promise((resolve) => {
      process.stdout.write(inputData);

      process.stdin.once(wrd.cdata, (data) => {
        resolve(data.toString().trim());
      });
    });
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function promptRaw
 * @description Allows for single keystroke character input from the keyboard, without pressing the enter key to confirm input.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} The character entered by the user.
 * @author Seth Hollingsead
 * @date 2023/03/01
 */
async function promptRaw(inputData, inputMetaData) {
  const functionName = promptRaw.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = '';
  process.stdin.setRawMode(true); // Allows reading of single key presses
  process.stdin.resume(); // Resume reading from stdin

  returnData = new Promise((resolve) => {
    process.stdin.once(wrd.cdata, (data) => {
      const key = data.toString();
      if (key === '\u0003') { // gen.cCTRLC) { // CTRL+C
        console.log(wrd.cExiting + bas.cSpace + wrd.cApplication);
        process.exit(0);
      } else if (key.name === wrd.cSpace || key.keyCode === 32 || key === bas.cSpace) {
        process.stdin.setRawMode(false);
        resolve(' ');
      } else if (key === '\u001b') { // gen.cESC_Key) {
        process.stdin.setRawMode(false); // disable raw mode
        resolve(false); // Return false, so the caller can exit the interactive raw process loop.
      } else {
        process.stdin.setRawMode(false); // disable raw mode
        resolve(key);
      }
    });
  });
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function promptNonBlocking
 * @description In a non-blocking way, prompts the user for input. When input arrives,
 * a callback is invoked.
 * @param {string} inputData The prompt string to display.
 * @param {function} inputMetaData Callback function to receive input when available.
 * @returns {boolean} A True or False value to indicate if the prompt finished successfully or not.
 * @author Seth Hollingsead
 * @date 2025/07/01
 */
async function promptNonBlocking(inputData, inputMetaData) {
  const functionName = promptNonBlocking.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = '';
  if (inputData && typeof inputMetaData === wrd.cfunction) {
    process.stdout.write(inputData);

    process.stdin.resume();
    process.stdin.once(wrd.cdata, (data) => {
      const userInput = data.toString().trim();
      // In case you want to stop reading after first input.
      process.stdin.pause();
      inputMetaData(userInput); // Call the callback with the user input.
    });
  } else {
    // ERROR: No prompt or input callback provided.
    await loggers.consoleLog(wrd.cError, msg.cErrorPromptNonBlockingMessage01);
    await loggers.consoleLog(namespacePrefix + functionName, msg.cErrorPromptNonBlockingMessage01);
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  initPromptOperations,
  prompt,
  promptRaw,
  promptNonBlocking
};