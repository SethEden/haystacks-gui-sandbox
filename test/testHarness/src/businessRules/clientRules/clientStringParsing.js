/**
 * @file clientStringParsing.js
 * @module clientStringParsing
 * @description Contains all client defined business rules for parsing strings, values, arrays,
 * values of all kinds, with various operations.
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

const {bas, msg, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// application.testHarness.businessRules.clientRules.clientStringParsing.
const namespacePrefix = wrd.capplication + bas.cDot + apc.cApplicationName + bas.cDot + wrd.cbusiness + wrd.cRules + bas.cDot + wrd.cclient + wrd.cRules + bas.cDot + baseFileName + bas.cDot;

/**
 * @function customEcho
 * @description A quick business rule to validate that the new dynamic data storage technique for business rules.
 * @param {string} inputData The string input data.
 * @param {string} inputMetaData The string of input meta-data.
 * @returns {string} An echo of the inputData with some hard-coded modifier.
 * @author Seth Hollingsead
 * @date 2025/06/23
 */
async function customEcho(inputData, inputMetaData) {
  const functionName = customEcho.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData;
  // clientStringParsing.customEcho
  returnData = inputData + bas.cSpace + app_msg.cclientStringParsingDotCustomEcho;
  await haystacksGui.consoleLog(wrd.cInfo, '', returnData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + returnData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function mostPopularNumber
 * @description Parses through an array of integers and determine which value is the most popular.
 * @param {array<integer>} inputData The array that should be evaluated for most popular value.
 * @param {integer} inputMetaData The length of the array that was passed in.
 * @returns {integer} The most popular value in the array.
 * @author Seth Hollingsead
 * @date 2025/06/23
 * @NOTE: Test command: businessRule mostPopularNumber 1 2 2 3 4 5 2
 */
async function mostPopularNumber(inputData, inputMetaData) {
  const functionName = mostPopularNumber.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData;
  let i, j, instanceCounter = 0;
  let tempArray1 = [];
  let tempArray2 = [];
  if (inputData && inputMetaData && inputMetaData.length > 1) {
    inputMetaData.unshift(inputData);
    // BEGIN first for-loop
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage01);
    for (i = 0; i <= inputMetaData.length; i++) {
      // BEGIN nested for-loop i =
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage02 + i);
      for (j = 0; j <= inputMetaData.length; j++) {
        // BEGIN nested for-loop j =
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage03 + j);
        if (inputMetaData[i] === inputMetaData[j] && i !== j && i !== undefined && i !== null) {
          // FOUND a MATCH!!
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage04);
          // inputMetaData[i] is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage05 + inputMetaData[i]);
          // inputMetaData[j] is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage06 + inputMetaData[j]);
          tempArray1[i] = inputMetaData[i];
          // contents of tempArray1 are:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage07 + JSON.stringify(tempArray1));
        } // End-if (inputData[i] === inputData[j] && i !== j && i !== undefined && i !== null)
        // END nested for-loop j =
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage08 + j);
      } // End-for (j = 0; j <= inputMetaData; j++)
      // END nested for-loop i =
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage09 + i);
    } // End-for (i = 0; i <= inputMetaData; i++)
    // END first for-loop
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage10);

    // BEGIN second for-loop
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage11);
    for (i = 0; i <= tempArray1.length; i++) {
      tempArray2[i] = 0; // Initialize it to zero before we begin!
      // BEGIN nested for-loop i =
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage02 + i);
      for (j = 0; j <= tempArray1.length; j++) {
        // BEGIN iteration j =
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage12 + j);
        if (tempArray1[i] === inputMetaData[j] && tempArray1[i] !== undefined && tempArray1[i] !== null && i !== j) {
          // FOUND a MATCH!!
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage04);
          // tempArray1[i] is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage13 + tempArray1[i]);
          // inputMetaData[j] is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage06 + inputMetaData[j]);
          // instanceCounter before increment is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage14 + instanceCounter);
          tempArray2[i] = ++instanceCounter;
          // instanceCounter after increment is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage15 + instanceCounter);
          // contents of tempArray2 are:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage16 + JSON.stringify(tempArray2));
        } // End-if (tempArray1[i] === inputData[j] && tempArray1[i] !== undefined && tempArray1[i] !== null && i !== j)
        // END iteration j =
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage17 + j);
      } // End-for (j = 0; j <= tempArray1.length; j++)
      // contents of tempArray2 are:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage16 + JSON.stringify(tempArray2));
      instanceCounter = 0; // Reset it for the next array index.
      // END nested for-loop i =
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage18 + i);
    } // End-for (i = 0; i <= tempArray1.length; i++)
    // END second for-loop
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage19);

    // BEGIN third for-loop
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage20);
    // tempArray2.length is:
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage21 + tempArray2.length);
    for (i = 0; i <= tempArray2.length; i++) {
      // BEGIN iteration i =
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage22 + i);
      if (tempArray2[i] !== 0 && i === 0) {
        // if-condition i = 0 has been met! i =
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage23 + i);
        returnData = inputData[i];
      } else {
        // if-condition-else i <> 0 has been met! i =
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage24 + i);
        // tempArray2[i] is:
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage26 + tempArray2[i]);
        // tempArray2[i - 1] is:
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage27 + tempArray2[i - 1]);
        if (tempArray2[i] > tempArray2[i - 1]) {
          // found one greater
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage25);
          // tempArray2[i] is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage26 + tempArray2[i]);
          // tempArray2[i - 1] is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage27 + tempArray2[i - 1]);
          returnData = inputMetaData[i];
          // returnData is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + returnData);
        } // End-if (tempArray2[i] > returnData)
      }
      // i += 1;
      // END iteration i =
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage28 + i);
    } // End-for (i = 0; i <= tempArray2.length; i++)
    // END third for-loop
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmostPopularNumberMessage29);
  } else {
    // INVALID ENTRY: Please enter some valid numbers.
    await haystacksGui.consoleLog(wrd.cError, '', app_msg.cmostPopularNumberMessage30);
  }
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + returnData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function isAlmostPalindrome
 * @description Determines if the input string is almost a Palindrome string or not.
 * @param {string} inputData The string that should be evaluated to determine if it is a Palindrome string or not.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {boolean} True or False to indicate if the input string is a Palindrome or almost palindrome string or not.
 * @author Seth Hollingsead
 * @date 2025/06/23
 * @NOTE Test command: businessRule isAlmostPalindrome annae
 */
async function isAlmostPalindrome(inputData, inputMetaData) {
  const functionName = isAlmostPalindrome.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData;
  let misCompareCount = 0;
  let startingPoint, endingPoint;
  // TODO: We need to enable additional types of comparisons. The below algorithm works for if the mis-compare is in the center of the string.
  // But if the mis-compare is at the beginning or the end of the string then it can throw off all the other comparisons resulting in a false positive result.
  // We actually need to check starting with the first character but also the first + 1 character and also,
  // we need to check ending with the last - 1 character.
  // using a similar algorithm as below.
  if (inputData) {
    for (let i = 0; i < 3; i++) {
      // Setup the different start point & end points to do the comparison.
      // comparison iteration is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.ccomparisonIterationIs + i);
      if (i === 0) {
        startingPoint = 0;
        endingPoint = -1;
      } else if (i === 1) {
        startingPoint = 1;
        endingPoint = 0;
      } else if (i === 2) {
        startingPoint = 0;
        endingPoint = -2;
      } else { // We shouldn't get to this point, given the for-loop parameters defined above.
        returnData = false;
        break;
      }
      // startingPoint is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cstartingPointIs + startingPoint);
      // endingPoint is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cendingPointIs + endingPoint);
loop2:
      for (let j = startingPoint; j < inputData.length; j++) {
        // j value is:
        await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cjValueIs + j);
        // inputData.charAt(j) is:
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cinputDataDotCharAtJIs + inputData.charAt(j));
        // inputData.charAt(inputData.length -
        // ) is:
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cinputDataDotCharAtInputDataDotLengthDash + j + ' + ' + endingPoint + app_msg.cCloseParenthesisIs +
          inputData.charAt(inputData.length - j + endingPoint));
        if (inputData.charAt(j) !== inputData.charAt(inputData.length - j + endingPoint)) {
          // We got a mismatch!
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cWeGotMismatch);
          // misCompareCount before increment is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmisCompareCountBeforeIncrementIs + misCompareCount);
          misCompareCount += 1;
          // misCompareCount post increment is:
          await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmisCompareCountPostIncrementIs + misCompareCount);
          if (misCompareCount >= 2) {
            break loop2;
          }
        } // End-if (inputData.charAt(j) !== inputData.charAt(inputData.length - j + endingPoint))
      } // End-for (let j = startingPoint; j < inputData.length; j++)
      // misCompareCount after the for-loop is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmisCompareCountAfterForLoopIs + misCompareCount);
      if (i === 0 || i > 0) {
        if (misCompareCount <= 1) {
          returnData = true;
        }
      } // End-if (i === 0 || i > 0)
      await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + returnData);
      // If we got a positive result then we can break out of the function and return our positive result.
      if (returnData === true) {
        break;
      } else { // Otherwise proceed with the next comparison iteration and check if one of the other scenarios will yield a positive result.
        misCompareCount = 0; // Reset it for the next comparison iteration.
      }
    } // End-for (let i = 0; i < 3; i++)
  } else {
    console.log(app_msg.cisAlmostPalindromeInvalidEntry);
  }
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + returnData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function threePointAverage
 * @description Calculates the average of 3 coordinates in a 2-Dimensional plane.
 * @param {array<array<integer|float|double>>} inputData array of coordinates for the 3 points to compute average for.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {array<integer|float|double>} Returns the XY coordinate of the average point between all points.
 * @author Seth Hollingsead
 * @date 2025/06/23
 * @NOTE Test command: businessRule threePointAverage [1,1] [2,2] [3,3]
 */
async function threePointAverage(inputData, inputMetaData) {
  const functionName = threePointAverage.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [0,0];
  if (inputData && inputMetaData) {
    let stringInput = inputData + bas.cComa + inputMetaData;
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cstringInputIs + stringInput);
    let stringArray = stringInput.split(bas.cComa);
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cstringArrayIs + JSON.stringify(stringArray));
    let xAverage, x1, x2, x3;
    let yAverage, y1, y2, y3;

    if (
    !isNaN(stringArray[0]) &&
    !isNaN(stringArray[1]) &&
    !isNaN(stringArray[2]) &&
    !isNaN(stringArray[3]) &&
    !isNaN(stringArray[4]) &&
    !isNaN(stringArray[5])) {
      x1 = parseInt(stringArray[0]); // 1
      y1 = parseInt(stringArray[1]); // 1
      x2 = parseInt(stringArray[2]); // 2
      y2 = parseInt(stringArray[3]); // 2
      x3 = parseInt(stringArray[4]); // 3
      y3 = parseInt(stringArray[5]); // 3

      // x1 is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cx1Is + x1);
      // y1 is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cy1Is + y1);
      // x2 is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cx2Is + x2);
      // y2 is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cy2Is + y2);
      // x3 is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cx3Is + x3);
      // y3 is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cy3Is + y3);
      // x1 + x2 + x3 is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cx1x2x3Is + (x1 + x2 + x3));
      // y1 + y2 + y3 is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cy1y2y3Is + (y1 + y2 + y3));
      // Calculate the X-averages:
      xAverage = (x1 + x2 + x3) / 3;
      // Calculate the y-averages:
      yAverage = (y1 + y2 + y3) / 3;
      returnData = [xAverage, yAverage];
    } else {
      await haystacksGui.consoleLog(wrd.cInfo, '', app_msg.cthreePointAverageInvalidInput + app_msg.cthreePointAverageInputFormat);
    }
  } else {
    await haystacksGui.consoleLog(wrd.cInfo, '', app_msg.cthreePointAverageInvalidInput + app_msg.cthreePointAverageInputFormat);
  }
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + returnData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function arrayCounter
 * @description Receives an array and a value, counts the number of occurrences of that value in the array.
 * @param {integer|string|object} inputData The instance that should be counted in the array.
 * @param {array<integer|string|object>} inputMetaData The array which should have it's values counted.
 * @returns {integer} The count of the objects/values that was found to match out of the array.
 * @author Seth Hollingsead
 * @date 2025/06/23
 */
async function arrayCounter(inputData, inputMetaData) {
  const functionName = arrayCounter.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputDataIs + inputData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = 0;
  if (inputData && inputMetaData) {
    for (let i = 0; i <= inputMetaData.length; i++) {
      if (inputMetaData[i] === inputData) {
        returnData += 1;
      }
    } // End-for (let i = 0; i <= inputData.length; i++)
  } // End-if (inputData && inputMetaData)
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + returnData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  return returnData;
}

export default {
  customEcho,
  mostPopularNumber,
  isAlmostPalindrome,
  threePointAverage,
  arrayCounter
}