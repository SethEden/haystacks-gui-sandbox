/**
 * @file auxiliaryArrayParsing.js
 * @module auxiliaryArrayParsing
 * @description Contains all system defined business rules for parsing arrays specific to auxiliary capabilities.
 * @requires module:colorizer
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://mathjs.org/index.html|math}
 * @requires {@link https://nodejs.org/api/url.html|url}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/04/26
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import colorizer from '../../../executrix/colorizer.js';
import loggers from '../../../executrix/loggers.js';
import D from '../../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import * as math from 'mathjs';
import { fileURLToPath } from 'url';
import path from 'path';

const {bas, biz, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = fileURLToPath(import.meta.url);
// framework.businessRules.rules.arrayParsing.auxiliaryArrayParsing.
const namespacePrefix = wrd.cframework + bas.cDot + sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + wrd.carray + wrd.cParsing + bas.cDot + baseFileName + bas.cDot;

const rulesMetaData = [
  {[wrd.cName]: biz.cparseColorRangeInputs, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cgetNamedColorDataArray, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cdoesArrayContainValue, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []}
];

/**
 * @function initAuxiliaryArrayParsing
 * @description Adds the auxiliaryArrayParsing business rules meta-data to the
 * D-data structure businessRulesMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given business rule can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/15
 */
async function initAuxiliaryArrayParsing() {
  const functionName = initAuxiliaryArrayParsing.name;
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
  * @function parseColorRangeInputs
  * @description Parses minimum and maximum range integer values to ensure they are in the range of 0 - 255.
  * @param {string|integer} inputData The number in either numeric or string format that
  * represents the minimum range that should be used to generate the random color.
  * @param {string|integer} inputMetaData The number in either numeric or string format that
  * represents the maximum range that should be used to generate the random color.
  * @returns {array<integer>} The minimum and maximum values returned in an array.
  * returnData[0] = minimum value.
  * returnData[1] = maximum value.
  * @author Seth Hollingsead
  * @date 2022/01/21
  */
async function parseColorRangeInputs(inputData, inputMetaData) {
  const functionName = parseColorRangeInputs.name;
  loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [0,0,0];
  let minimumColorRange = 0;
  let tempMinimumColorRange = 0;
  let maximumColorRange = 0;
  let tempMaximumColorRange = 0;
  if (inputData && inputMetaData && inputData !== '' && inputMetaData !== '') {
    // Try to parse them as numbers for the range.
    if (typeof(inputData) === 'string') {
      tempMinimumColorRange = parseInt(inputData);
    } else if (typeof(inputData) === 'number') {
      tempMinimumColorRange = inputData;
    }
    if (typeof(inputMetaData) === 'string') {
      tempMaximumColorRange = parseInt(inputMetaData);
    } else if (typeof(inputMetaData) === 'number') {
      tempMaximumColorRange = inputMetaData;
    }
    if (tempMinimumColorRange < tempMaximumColorRange) {
      minimumColorRange = tempMinimumColorRange;
      maximumColorRange = tempMaximumColorRange;
    } else if (tempMinimumColorRange > tempMaximumColorRange) {
      minimumColorRange = tempMaximumColorRange;
      maximumColorRange = tempMinimumColorRange;
    }
  } // End-if (inputData && inputMetaData && inputData !== '' && inputMetaData !== '')
  if (minimumColorRange < 0) {
    minimumColorRange = math.abs(minimumColorRange);
  } else if (minimumColorRange > 255) {
    minimumColorRange = 255;
  }
  if (maximumColorRange < 0) {
    maximumColorRange = math.abs(maximumColorRange);
  } else if (maximumColorRange > 255) {
    maximumColorRange = 255;
  }
  returnData = [minimumColorRange, maximumColorRange];
  loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function getNamedColorDataArray
 * @description This is a business rule wrapper function for calling the colorizer to get named color array data.
 * Looks up the named color data as loaded in the Haystacks engine.
 * @param {string} inputData The name of the color that should be looked up.
 * @param {array<integer>} inputMetaData A default array, if the color isn't found.
 * @returns {array<integer>} An array of integers that represent RGB values.
 * @author Seth Hollingsead
 * @date 2023/03/02
 */
async function getNamedColorDataArray(inputData, inputMetaData) {
  const functionName = getNamedColorDataArray.name;
  loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [0,0,0];
  returnData = await colorizer.getNamedColorData(inputData, inputMetaData);
  loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function doesArrayContainValue
 * @description Checks if an array contains a value, checking equality by function(val, arr[i]).
 * @NOTE Do not call this function from the rulesLibrary as it doesn't follow the business rule pattern.
 * This function is strictly a supporting function to aid the business rules, for use internal to the business rules only.
 * @param {array<array<string|integer|boolean|float|object>,string|integer|boolean|float|object>} inputData
 * An array that contains the array that should be searched and the value that should be searched for in the array.
 * inputData[0] = Array to be searched.
 * inputData[1] = Value to be searched for in the array.
 * the input array that should be searched for the given input value.
 * @param {function} inputMetaData The function that should be used to do the search.
 * @returns {boolean} A True or False to indicate if the value was found in the array or not found.
 * @author Seth Hollingsead
 * @date 2022/01/21
 */
async function doesArrayContainValue(inputData, inputMetaData) {
  const functionName = doesArrayContainValue.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  // Not sure how this will output, would be good to also put some type checking on this input variable.
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData !== undefined) {
    let array = inputData[0];
    let value = inputData[1];
    await loggers.consoleLog(namespacePrefix + functionName, msg.carrayIs + array.toString());
    await loggers.consoleLog(namespacePrefix + functionName, msg.cvalueIs + value.toString());
    if (Array.isArray(array) === false) {
      // array input object is not an array.
      await loggers.consoleLog(namespacePrefix + functionName, msg.carrayInputObjectIsNotAnArray);
    } else {
      // eslint-disable-next-line no-extra-boolean-cast
      // if (!!array.find(await (async (i) => {return (await inputMetaData(i, value));}))) {
      if (await array.find(x => x === value) !== undefined) {
        // The value was found in the array.
        await loggers.consoleLog(namespacePrefix + functionName, msg.cTheValueWasFoundInTheArray);
        returnData = true;
      } else {
        // The value was NOT found in the array.
        await loggers.consoleLog(namespacePrefix + functionName, msg.cTheValueWasNotFoundInTheArray);
      }
    }
  } // End-if (inputData && inputMetaData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

 export default {
  initAuxiliaryArrayParsing,
   parseColorRangeInputs,
   getNamedColorDataArray,
   doesArrayContainValue
 };
