/**
 * @file characterArrayParsing.js
 * @module characterArrayParsing
 * @description Contains all system defined business rules for array parsing with a focus on characters.
 * @requires module:stringParsingUtilities
 * @requires module:ruleParsing
 * @requires module:configurator
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/url.html|url}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/04/25
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import stringParsingUtilities from '../stringParsingUtilities.js';
import ruleParsing from '../ruleParsing.js';
import configurator from '../../../executrix/configurator.js';
import loggers from '../../../executrix/loggers.js';
import D from '../../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import { fileURLToPath } from 'url';
import path from 'path';

const {bas, biz, cfg, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = fileURLToPath(import.meta.url);
// framework.businessRules.rules.arrayParsing.characterArrayParsing.
const namespacePrefix = wrd.cframework + bas.cDot + sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + wrd.carray + wrd.cParsing + bas.cDot + baseFileName + bas.cDot;

const rulesMetaData = [
  {[wrd.cName]: biz.creplaceCharacterWithCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.cutilitiesReplaceCharacterWithCharacter]},
  {[wrd.cName]: biz.cdoesArrayContainCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cremoveCharacterFromArray, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.creplaceCharacterWithCharacter]},
  {[wrd.cName]: biz.creplaceCharacterAtIndex, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []}
];

/**
 * @function initCharacterArrayParsing
 * @description Adds the initCharacterArrayParsing business rules meta-data to the
 * D-data structure businessRulesMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given business rule can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/15
 */
async function initCharacterArrayParsing() {
  const functionName = initCharacterArrayParsing.name;
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
 * @function replaceCharacterWithCharacter
 * @description Replaces all of the specified character in the inputData with another specified character.
 * @param {string} inputData A string that may or may not contain the specified
 * characters that should be converted to another specified character.
 * @param {array<string,string>} inputMetaData An array of data that contains 2 additional string parameters:
 * inputMetaData[0] === character2Find - The character to be searched and replaced from the input string.
 * inputMetaData[1] === character2Replace - The character that should be used to replace
 * the character specified for replacement from the input data.
 * @returns {string} The same as the input string but with specified characters converted to the other specified character.
 * @author Seth Hollingsead
 * @date 2021/10/28
 */
async function replaceCharacterWithCharacter(inputData, inputMetaData) {
  const functionName = replaceCharacterWithCharacter.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log(`inputData is: ${inputData}`);
  // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData;
  if (!inputData && !inputMetaData) {
    returnData = false;
  } else {
    if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cconfigurationInitialized) === true) {
      returnData = await ruleParsing.processRulesInternal([inputData, inputMetaData], [biz.cutilitiesReplaceCharacterWithCharacter]);
    } else {
      returnData = await stringParsingUtilities.utilitiesReplaceCharacterWithCharacter(inputData, inputMetaData);
    }
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  // console.log(`returnData is: ${JSON.stringify(returnData)}`);
  // console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
}

/**
 * @function doesArrayContainCharacter
 * @description Parses through all the elements of an array and determines if any one of them contains the input character.
 * @param {string|boolean|integer|object} inputData The character that should be searched for in the array of elements.
 * @param {array<string|boolean|integer|object>} inputMetaData The array that should be searched for the specified character/value/etc...
 * @returns {boolean} True or False to indicate if the value was found or not found.
 * @author Seth Hollingsead
 * @date 2022/01/19
 */
async function doesArrayContainCharacter(inputData, inputMetaData) {
  const functionName = doesArrayContainCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = false;
  if (inputData && inputMetaData) {
    for (const element of inputMetaData) {
      let arrayElement = element;
      if (arrayElement.includes(inputData) === true) {
        returnData = true;
        break;
      }
    } // end-for (const element of inputMetaData)
  } // end-if (inputData && inputMetaData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function removeCharacterFromArray
 * @description Removes all instances of a character or value from all array elements.
 * @param {string|integer|boolean|float|object} inputData The character, integer, boolean, float or object
 * that should be removed from all instances of the input array.
 * @param {array<string|boolean|integer|object>} inputMetaData The array from which all instances of the input character, integer, etc...should be removed.
 * @returns {array<string|boolean|integer|object>} The array after having the specified character removed from all elements of the input array.
 * @author Seth Hollingsead
 * @date 2022/01/19
 */
async function removeCharacterFromArray(inputData, inputMetaData) {
  const functionName = removeCharacterFromArray.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  // console.log(msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  // console.log(msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = false;
  if (inputData && inputMetaData) {
    for (let i = 0; i < inputMetaData.length; i++) {
      let arrayElement = inputMetaData[i];
      if (arrayElement.includes(inputData) === true) {
        inputMetaData[i] = await replaceCharacterWithCharacter(arrayElement, [RegExp('\\' + inputData, bas.cg), '']);
      }
    } // end-for (let i = 0; i < inputMetaData.length; i++)
    returnData = inputMetaData;
  } // end-if (inputData && inputMetaData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  // console.log(msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  // console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
}

/**
 * @function replaceCharacterAtIndex
 * @description Replaces a character at the specified index with another character.
 * @param {string} inputData The string which should have the specified character changed, then returned.
 * @param {array<integer,string>} inputMetaData An array with an integer of what index the character should be replaced,
 * and a string with the character or characters that should be inserted at the specified index.
 * @returns {string} The modified string.
 * @author Seth Hollingsead
 * @date 2022/01/21
 * @reference: {@link https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript}
 */
async function replaceCharacterAtIndex(inputData, inputMetaData) {
  const functionName = replaceCharacterAtIndex.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = inputData;
  if (inputData && inputMetaData) {
    let indexOfReplacement;
    let stringToReplaceWith;
    if (inputMetaData.length === 2) {
      indexOfReplacement = inputMetaData[0];
      stringToReplaceWith = inputMetaData[1];
      let stringArray = inputData.split('');
      stringArray.splice(indexOfReplacement, 1, stringToReplaceWith);
      returnData = stringArray.join('');
    } // End-if (inputMetaData.length === 2)
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  initCharacterArrayParsing,
  replaceCharacterWithCharacter,
  doesArrayContainCharacter,
  removeCharacterFromArray,
  replaceCharacterAtIndex
};
