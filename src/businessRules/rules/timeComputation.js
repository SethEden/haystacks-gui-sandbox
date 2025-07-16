/**
 * @file timeComputation.js
 * @module timeComputation
 * @description Contains all of the business rules needed for generating time stamps,
 * reformatting time stamps and computing time durations.
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/moment|moment}
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
import moment from 'moment';
import 'moment-duration-format';
import path from 'path';

const {bas, gen, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = path.resolve(import.meta.url.replace(sys.cfileColonDoubleForwardSlash, ''));
// framework.businessRules.rules.timeComputation.
const namespacePrefix = wrd.cframework + bas.cDot + sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + baseFileName + bas.cDot;

/**
 * @function getNowMoment
 * @description Returns a time stamp string formatted according to the input formatting string.
 * @param {string} inputData The formatting string, that tells moment in what format to
 * return the value for the day, month, year, hour, minute, second and millisecond.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} A time stamp string that has been formatted according to the input format.
 * @author Seth Hollingsead
 * @date 2022/05/04 - May the Forth be with you!! ;-)
 * @NOTE Cannot use the loggers here, because of a circular dependency.
 */
// eslint-disable-next-line no-unused-vars
async function getNowMoment(inputData, inputMetaData) {
  // const functionName = getNowMoment.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log(`inputData is: ${inputData}`);
  // console.log(`inputMetaData is: ${inputMetaData}`);
  let returnData = '';
  returnData = moment().format(inputData);
  // console.log(`returnData is: ${returnData}`);
  // console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
}

/**
 * @function computeDeltaTime
 * @description Computes the time difference between two different date-time stamps in milliseconds.
 * @param {string} inputData The start of the time period that should be computed.
 * @param {string} inputMetaData The end of the time period that should be computed.
 * @returns {integer} The difference between the beginning time and ending time in milliseconds.
 * @author Seth Hollingsead
 * @date 2022/05/04 - May the Forth be with you!! ;-)
 */
async function computeDeltaTime(inputData, inputMetaData) {
  const functionName = computeDeltaTime.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = 0;
  let startTime = moment(inputData, gen.cYYYYMMDD_HHmmss_SSS);
  let endTime = moment(inputMetaData, gen.cYYYYMMDD_HHmmss_SSS);
  returnData = endTime.diff(startTime); // Should work in milliseconds out of the box!
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function reformatDeltaTime
 * @description Converts a time interval into a different kind of format.
 * @param {integer} inputData A time interval measured in milliseconds.
 * @param {string} inputMetaData The formatting template that should be used to format the time interval.
 * @returns {string} A time interval formatted according to the input format template string.
 * @author Seth Hollingsead
 * @date 2022/05/04 - May the Forth be with you!! ;-)
 */
async function reformatDeltaTime(inputData, inputMetaData) {
  const functionName = reformatDeltaTime.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  try {
    // Ensure `inputMetaData` has a valid format or provide a default
    const defaultFormat = gen.chhmmss; // Default format: hours:minutes:seconds
    returnData = moment.duration(inputData).format(inputMetaData || defaultFormat);
  } catch (error) {
    await loggers.consoleLog(namespacePrefix + functionName, msg.cERROR_Colon + error.message);
    throw error; // Re-throw the error for higher-level handling
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function sleep
 * @description Causes the JavaScript code to wait for a period of time defined by the input.
 * @param {integer} inputData The number of milliseconds that the system should sleep for.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2022/05/04 - May the Forth be with you!! ;-)
 * @reference {@link https://www.sitepoint.com/delay-sleep-pause-wait/}
 * @NOTE This is a blocking sleep function to introduce a delay in execution.
 * This function uses essentially a busy-waite loop to block execution for the specified
 * number of milliseconds. While this ensures stabilization for certain execution scenarios or use cases.
 * It is highly discouraged to use this function frequently due to:
 *  - High CPU usage during the delay.
 *  - Blocking the event loop, which prevents other asynchronous tasks from running.
 * Use this function ONLY when absolutely necessary and where non-blocking alternatives are not feasible.
 */
async function sleep(inputData, inputMetaData) {
  const functionName = sleep.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  const date = moment();
  let currentDate = null;
  do {
    currentDate = moment();
  } while (currentDate - date < inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
}

export default {
  getNowMoment,
  computeDeltaTime,
  reformatDeltaTime,
  sleep
};
