/**
 * @file characterGeneration.js
 * @module characterGeneration
 * @description Contains all business rules for randomly generating characters of all kinds.
 * @requires module:ruleParsing
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/01/25
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import ruleParsing from './ruleParsing.js';
import loggers from '../../executrix/loggers.js';
import D from '../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {abt, bas, biz, gen, msg, num, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = path.resolve(import.meta.url.replace(sys.cfileColonDoubleForwardSlash, ''));
// framework.businessRules.rules.characterGeneration.
const namespacePrefix = wrd.cframework + bas.cDot + sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + baseFileName + bas.cDot;

const rulesMetaData = [
  {[wrd.cName]: biz.crandomlyGenerateMixedCaseLetterOrSpecialCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateUpperCaseLetterOrSpecialCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateLowerCaseLetterOrSpecialCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateEitherMixedCaseLetterOrNumberOrSpecialCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateEitherUpperCaseLetterOrNumberOrSpecialCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateEitherLowerCaseLetterOrNumberOrSpecialCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateMixedCaseAlphaNumericCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateUpperCaseAlphaNumericCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateLowerCaseAlphaNumericCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateNumericCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.crandomlyGenerateSpecialCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.crandomlyGenerateNumberInRange, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.cstringToBoolean]},
  {[wrd.cName]: biz.crandomlyGenerateBooleanValue, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.crandomlyGenerateMixedCaseAlphabeticCharacter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateLowerCaseLetter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.crandomlyGenerateUpperCaseLetter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.cconvertNumberToUpperCaseLetter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]},
  {[wrd.cName]: biz.cconvertNumberToLowerCaseLetter, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.clanguageToAlphabet]}
];

/**
 * @function initCharacterGeneration
 * @description Adds the characterGeneration business rules meta-data  to the
 * D-data structure businessRulesMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given business rule can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/15
 */
async function initCharacterGeneration() {
  const functionName = initCharacterGeneration.name;
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
 * @function randomlyGenerateMixedCaseLetterOrSpecialCharacter
 * @description Randomly generates an english alphabetic letter from A-Z, a-z or
 * a random special character from the input list of special characters.
 * @param {string} inputData The list of allowable special characters that should be used to randomly select from.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Randomly returns a random mixed case letter of the english alphabet,
 * or a random special character from the list of allowable special characters.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateMixedCaseLetterOrSpecialCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateMixedCaseLetterOrSpecialCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, ''], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(inputData + alphabet);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateUpperCaseLetterOrSpecialCharacter
 * @description Randomly generates an english alphabetic letter from A-Z or
 * a random special character from the input list of special characters.
 * @param {string} inputData The list of allowable special characters that should be used to randomly select from.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Randomly returns a random upper case letter of the english alphabet,
 * or a random special character from the ist of allowable special characters.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateUpperCaseLetterOrSpecialCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateUpperCaseLetterOrSpecialCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cUpperCase], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(inputData + alphabet);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateLowerCaseLetterOrSpecialCharacter
 * @description Randomly generates an english alphabetic letter from a-z or
 * a random special character from the input list of special characters.
 * @param {string} inputData The list of allowable special characters that should be used to randomly select from.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Randomly returns a random lower case letter of the english alphabet,
 * or a random special character from the list of allowable special characters.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateLowerCaseLetterOrSpecialCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateLowerCaseLetterOrSpecialCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cLowerCase], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(inputData + alphabet);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateEitherMixedCaseLetterOrNumberOrSpecialCharacter
 * @description Randomly generates an alphabetic letter from A-Z, a-z or a number 0-9 or
 * a random special character from the input ist of special characters.
 * @param {string} inputData The list of allowable special characters that should be used to randomly select from.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Randomly returns a random number, a random mixed case letter of the english alphabet,
 * or a random special character from the ist of allowable special characters.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateEitherMixedCaseLetterOrNumberOrSpecialCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateEitherMixedCaseLetterOrNumberOrSpecialCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, ''], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(inputData + alphabet + abt.cAllNumbers);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateEitherUpperCaseLetterOrNumberOrSpecialCharacter
 * @description Randomly generates an english alphabetic letter from A-Z or a number 0-9 or
 * a random special character from the input ist of special characters.
 * @param {string} inputData The list of allowable special characters that should be used to randomly select from.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Randomly returns a random number, a random upper case letter of the english alphabet,
 * or a random special character from the list of allowable special characters.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateEitherUpperCaseLetterOrNumberOrSpecialCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateEitherUpperCaseLetterOrNumberOrSpecialCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cUpperCase], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(inputData + alphabet + abt.cAllNumbers);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateEitherLowerCaseLetterOrNumberOrSpecialCharacter
 * @description Randomly generates an english alphabetic letter from a-z or a number 0-9 or
 * a random special character from the input list of special characters.
 * @param {string} inputData The list of allowable special characters that should be used to randomly select from.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Randomly returns a random number, a random lower case letter of the english alphabet,
 * or a random special character from the list of allowable special characters.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateEitherLowerCaseLetterOrNumberOrSpecialCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateEitherLowerCaseLetterOrNumberOrSpecialCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cLowerCase], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(inputData + alphabet + abt.cAllNumbers);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateMixedCaseAlphaNumericCharacter
 * @description Randomly generates an alpha-numeric code from a-z or A-Z or 0-9.
 * @param {string} inputData Not used for this business rule.
 * @param  {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Either a random letter (could be upper case or lower case, which is also random) or a random number.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateMixedCaseAlphaNumericCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateMixedCaseAlphaNumericCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, ''], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(alphabet + abt.cAllNumbers);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateUpperCaseAlphaNumericCharacter
 * @description Randomly generates an alpha-numeric code from A-Z or 0-9.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Either a random upper case letter or a random number.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateUpperCaseAlphaNumericCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateUpperCaseAlphaNumericCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cUpperCase], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(alphabet + abt.cAllNumbers);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateLowerCaseAlphaNumericCharacter
 * @description Randomly generates an alpha-numeric code from a-z or 0-9.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} Either a random lower case letter or a random number.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateLowerCaseAlphaNumericCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateLowerCaseAlphaNumericCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cLowerCase], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(alphabet + abt.cAllNumbers);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateNumericCharacter
 * @description Randomly generates a string character in the range of 0-9.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} A single randomly generated string character in the range of 0-9.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateNumericCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateNumericCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  returnData = await randomlyGenerateSpecialCharacter(abt.cAllNumbers);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateSpecialCharacter
 * @description Randomly select a special character from a list of allowable special characters.
 * @param {string} inputData The list of allowable special characters that should be used to randomly select from.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} A character randomly selected from the input list of allowable characters.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateSpecialCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateSpecialCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // NOTE Cannot have a "." as part of a variable name in a {set}
  if (inputData) {
    let inputDataLength = inputData.length.toString();
    let number = await randomlyGenerateNumberInRange(num.c1, [inputDataLength, gen.cTrue, gen.cTrue]);
    // NOTE: The String.length() above is a 1-base count, the String.substring is zero-based.
    returnData = inputData.substring(number - 1, number);
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateNumberInRange
 * @description Randomly generates a number between the start-range and end-range.
 * @param {string} inputData A string that contains the number with the minimum value.
 * @param {array<string|integer,boolean,boolean>} inputMetaData An array with multiple input parameters:
 * inputMetaData[0] = maximumValue - A string or integer that contains the number with the maximum value.
 * inputMetaData[1] = includeMaximum - A True or False value that indicates if the maximum should be included or
 * excluded from the range of allowable range of values to return from.
 * inputMetaData[2] = addMinimum - A True or False value that indicates if the minimum should be added to the value or not.
 * @returns {string} The new random number that was generated according to the input parameters.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateNumberInRange(inputData, inputMetaData) {
  const functionName = randomlyGenerateNumberInRange.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  if (inputData && inputMetaData) {
    let minimum = parseInt(inputData);
    let maximum = parseInt(inputMetaData[0]);
    let addOne = await ruleParsing.processRulesInternal([inputMetaData[1], ''], [biz.cstringToBoolean]);
    let addMinimum = await ruleParsing.processRulesInternal([inputMetaData[2], ''], [biz.cstringToBoolean]);
    if (addOne === true) {
      if (addMinimum === true) {
        returnData = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      } else {
        returnData = Math.floor(Math.random() * (maximum - minimum + 1));
      }
    } else {
      if (addMinimum === true) {
        returnData = Math.floor(Math.random() * (maximum - minimum)) + minimum;
      } else {
        returnData = Math.floor(Math.random() * (maximum - minimum));
      }
    }
  } // End-if (inputData && inputMetaData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData.toString();
}

/**
 * @function randomlyGenerateBooleanValue
 * @description Randomly generates a boolean value {@code TRUE} or {@code FALSE}.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {boolean} A boolean value that is
 * either {@code TRUE} or {@code FALSE} as a random 50-50 chance of one or the other.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateBooleanValue(inputData, inputMetaData) {
  const functionName = randomlyGenerateBooleanValue.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  returnData = Math.random() >= 0.5;
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateMixedCaseAlphabeticCharacter
 * @description Randomly generates either an upper case or
 * lower case random english alphabetic letter from a-z or A-Z.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} A randomly generated english alphabetic letter from a-z or A-Z.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateMixedCaseAlphabeticCharacter(inputData, inputMetaData) {
  const functionName = randomlyGenerateMixedCaseAlphabeticCharacter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, ''], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(alphabet);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateLowerCaseLetter
 * @description Randomly generates a lower case english alphabetic letter from a-z.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} A randomly generated english alphabetic letter from a-z.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateLowerCaseLetter(inputData, inputMetaData) {
  const functionName = randomlyGenerateLowerCaseLetter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cLowerCase], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(alphabet);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function randomlyGenerateUpperCaseLetter
 * @description Randomly generates an upper case alphabetic letter from A-Z.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} A randomly generated alphabetic letter from A-Z.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function randomlyGenerateUpperCaseLetter(inputData, inputMetaData) {
  const functionName = randomlyGenerateUpperCaseLetter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  // Pass an empty string to get the mixed case.
  let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cUpperCase], [biz.clanguageToAlphabet]);
  returnData = await randomlyGenerateSpecialCharacter(alphabet);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function convertNumberToUpperCaseLetter
 * @description Converts a number from 1-26 into an upper case letter of the english alphabet A-Z.
 * @param {string} inputData A string that contains a number in the range of 1-26 that
 * should be converted to an upper case letter of the english alphabet.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} A letter of the alphabet where 1-26 is converted in a letter A-Z.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function convertNumberToUpperCaseLetter(inputData, inputMetaData) {
  const functionName = convertNumberToUpperCaseLetter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  if (inputData) {
    let number = parseInt(inputData);
    number--;
    // number is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cnumberIs + number);
    // Pass an empty string to get the mixed case.
    let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cUpperCase], [biz.clanguageToAlphabet]);
    returnData = alphabet.substring(number, number + 1);
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function convertNumberToLowerCaseLetter
 * @description Converts a number from 1-26 into a lower case letter of the english alphabet a-z.
 * @param {string} inputData A string that contains a number in the range of 1-26 that
 * should be converted in a lower case letter of the english alphabet.
 * @param {string} inputMetaData The name of the language who's alphabet should be used for international characters.
 * @returns {string} A letter of the alphabet where 1-26 is converted to a letter a-z.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function convertNumberToLowerCaseLetter(inputData, inputMetaData) {
  const functionName = convertNumberToLowerCaseLetter.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  if (inputData) {
    let number = parseInt(inputData);
    number--;
    // number is:
    loggers.consoleLog(namespacePrefix + functionName, msg.cnumberIs + number);
    // Pass an empty string to get the mixed case.
    let alphabet = await ruleParsing.processRulesInternal([inputMetaData, sys.cLowerCase], [biz.clanguageToAlphabet]);
    returnData = alphabet.substring(number, number + 1).toLowerCase();
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  initCharacterGeneration,
  randomlyGenerateMixedCaseLetterOrSpecialCharacter,
  randomlyGenerateUpperCaseLetterOrSpecialCharacter,
  randomlyGenerateLowerCaseLetterOrSpecialCharacter,
  randomlyGenerateEitherMixedCaseLetterOrNumberOrSpecialCharacter,
  randomlyGenerateEitherUpperCaseLetterOrNumberOrSpecialCharacter,
  randomlyGenerateEitherLowerCaseLetterOrNumberOrSpecialCharacter,
  randomlyGenerateMixedCaseAlphaNumericCharacter,
  randomlyGenerateUpperCaseAlphaNumericCharacter,
  randomlyGenerateLowerCaseAlphaNumericCharacter,
  randomlyGenerateNumericCharacter,
  randomlyGenerateSpecialCharacter,
  randomlyGenerateNumberInRange,
  randomlyGenerateBooleanValue,
  randomlyGenerateMixedCaseAlphabeticCharacter,
  randomlyGenerateLowerCaseLetter,
  randomlyGenerateUpperCaseLetter,
  convertNumberToUpperCaseLetter,
  convertNumberToLowerCaseLetter
};
