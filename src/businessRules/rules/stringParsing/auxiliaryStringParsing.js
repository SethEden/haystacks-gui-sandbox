/**
 * @file auxiliaryStringParsing.js
 * @module auxiliaryStringParsing
 * @description Contains all system defined business rules for parsing strings
 * focused on misc auxiliary capabilities.
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
import D from '../../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import { fileURLToPath } from 'url';
import path from 'path';

const {bas, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = fileURLToPath(import.meta.url);
// framework.businessRules.rules.stringParsing.auxiliaryStringParsing.
// eslint-disable-next-line no-unused-vars
const namespacePrefix = wrd.cframework + bas.cDot + sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + wrd.cstring + wrd.cParsing + bas.cDot + baseFileName + bas.cDot;

const rulesMetaData = [];

/**
 * @function initAuxiliaryStringParsing
 * @description Adds the auxiliaryStringParsing business rules meta-data to the
 * D-data structure businessRulesMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given business rule can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/15
 */
async function initAuxiliaryStringParsing() {
  const functionName = initAuxiliaryStringParsing.name;
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

export default {
  initAuxiliaryStringParsing
};
