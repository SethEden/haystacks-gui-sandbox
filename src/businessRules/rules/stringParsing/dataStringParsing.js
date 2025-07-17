/**
 * @file dataStringParsing.js
 * @module dataStringParsing
 * @description Contains all system defined business rules for parsing strings as related to data.
 * @requires module:ruleParsing
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/crypto.html|crypto}
 * @requires {@link https://nodejs.org/api/buffer.html|buffer}
 * @requires {@link https://nodejs.org/api/url.html|url}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/04/25
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import ruleParsing from '../ruleParsing.js';
import loggers from '../../../executrix/loggers.js';
import D from '../../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import crypto from 'crypto';
import { Buffer } from 'buffer';
import { fileURLToPath } from 'url';
import path from 'path';

const {bas, biz, gen, msg, num, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = fileURLToPath(import.meta.url);
// framework.businessRules.rules.stringParsing.dataStringParsing.
const namespacePrefix = wrd.cframework + bas.cDot + sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + wrd.cstring + wrd.cParsing + bas.cDot + baseFileName + bas.cDot;

const rulesMetaData = [
  {[wrd.cName]: biz.cgetAttributeName, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.creplaceCharacterWithCharacter]},
  {[wrd.cName]: biz.cgetAttributeValue, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.creplaceCharacterWithCharacter]},
  {[wrd.cName]: biz.cgetValueFromAssignmentOperationString, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cgetDataCategoryFromDataContextName, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cgetDataCategoryDetailNameFromDataContextName, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cgetKeywordNameFromDataContextName, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cloadDataFile, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.cgetXmlData, biz.cgetCsvData, biz.cgetJsonData, biz.csupportedFileFormatsAre, biz.cstoreData]},
  {[wrd.cName]: biz.csaveDataFile, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: [biz.csupportedFileFormatsAre, biz.cwriteJsonData]},
  {[wrd.cName]: biz.cgetUserNameFromEmail, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cencryptStringAes256, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cdecryptStringAes256, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: biz.cobfuscateString, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.cbusinessRulesDependencies]: []}
];

/**
 * @function initDataStringParsing
 * @description Adds the dataStringParsing business rules meta-data to the
 * D-data structure businessRulesMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given business rule can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/15
 */
async function initDataStringParsing() {
  const functionName = initDataStringParsing.name;
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
 * @function getAttributeName
 * @description Takes a string representation of a JSON attribute and gets the name (left hand assignment key).
 * @param {string} inputData The string representation of the JSON attribute that should be parsed.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} The name of the attribute.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function getAttributeName(inputData, inputMetaData) {
  const functionName = getAttributeName.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData) {
    let attributeArray = inputData.split(bas.cColon);
    // attributeArray is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cattributeArrayIs + JSON.stringify(attributeArray));
    // attributeArray[0] is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cattributeArray0Is + attributeArray[0]);
    returnData = await ruleParsing.processRulesInternal([attributeArray[0], [/"/g, '']], [biz.creplaceCharacterWithCharacter]);
    returnData = returnData.trim();
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function getAttributeValue
 * @description Takes a string representation of a JSON attribute and gets the value (Right hand assignment value).
 * @param {string} inputData The string representation of the JSON attribute that should be parsed.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} The value of the attribute.
 * @author Seth Hollingsead
 * @date 2022/01/10
 */
async function getAttributeValue(inputData, inputMetaData) {
  const functionName = getAttributeValue.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData) {
    let attributeArray = inputData.split(bas.cColon);
    // attributeArray is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cattributeArrayIs + attributeArray);
    // attributeArray[0] is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cattributeArray1Is + attributeArray[1]);
    returnData = await ruleParsing.processRulesInternal([attributeArray[1], [/"/g, '']], [biz.creplaceCharacterWithCharacter]);
    returnData = returnData.trim();
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function getValueFromAssignmentOperationString
 * @description Parses the input string and finds the value on the right side of the '=' sign.
 * @param {string} inputData The string that should be parsed for the value on the right side of the assignment operator.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} The string value of whatever is on the right side of the assignment operator.
 * @author Seth Hollingsead
 * @date 2022/01/23
 */
async function getValueFromAssignmentOperationString(inputData, inputMetaData) {
  const functionName = getValueFromAssignmentOperationString.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData) {
    let parsedString = inputData.split(bas.cEqual);
    await loggers.consoleLog(namespacePrefix + functionName, msg.cparsedStringSpaceTerm + bas.cSpace + num.c1 + msg.cSpaceIsColonSpace + parsedString[0]);
    await loggers.consoleLog(namespacePrefix + functionName, msg.cparsedStringSpaceTerm + bas.cSpace + num.c2 + msg.cSpaceIsColonSpace + parsedString[1]);
    returnData = parsedString[1].replace(/['"]+/g, '');
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function getDataCategoryFromDataContextName
 * @description Gets the data category from the context name, E.g. Input: Page_ProjectList, data category is 'Page'.
 * @param {string} inputData The data context name, which should also contain the data category separated by underscore.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} The data category, such as Page or Test.
 * @author Seth Hollingsead
 * @date 2022/01/24
 */
async function getDataCategoryFromDataContextName(inputData, inputMetaData) {
  const functionName = getDataCategoryFromDataContextName.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  if (inputData) {
    let dataCategory = inputData.split(bas.cUnderscore);
    returnData = dataCategory[0];
    // Data Category should be:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cDataCategoryShouldBe + dataCategory[0]);
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function getDataCategoryDetailNameFromDataContextName
 * @description Gets the data category detail name from the context name, E.G. Input: Page_ProjectList, data category is 'ProjectList'.
 * @param {string} inputData The data context name, which should also contain the
 * data category and data category detail name separated by an underscore.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} The data category detail name, such as ProjectDetails or ProjectList.
 * @author Seth Hollingsead
 * @date 2022/01/24
 */
async function getDataCategoryDetailNameFromDataContextName(inputData, inputMetaData) {
  const functionName = getDataCategoryDetailNameFromDataContextName.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  if (inputData) {
    let dataCategoryDetailName = inputData.split(bas.cUnderscore);
    returnData = dataCategoryDetailName[1];
    // Data Category Detail Name should be:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cDataCategoryDetailNameShouldBe + dataCategoryDetailName[1]);
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function getKeywordNameFromDataContextName
 * @description Gets the keyword name from the context name, E.g. Input: Keywords_ProjectDetails_DeleteEntireProject, keyword is: 'DeleteEntireProject'.
 * @param {string} inputData The data context name, which should also contain the
 * data category and data category detail name and keyword name separated by an underscore.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} The keyword name, such as DeleteEntireProject or EditProjectInfoClick.
 * @author Seth Hollingsead
 * @date 2022/01/24
 */
async function getKeywordNameFromDataContextName(inputData, inputMetaData) {
  const functionName = getKeywordNameFromDataContextName.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = '';
  if (inputData) {
    let dataCategoryKeywordName = inputData.split(bas.cUnderscore);
    returnData = dataCategoryKeywordName[2];
    // Keyword Name should be:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cKeywordNameShouldBe + dataCategoryKeywordName[2]);
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function loadDataFile
 * @description Loads data from a specified file and stores it in the specified data hive path.
 * @param {string} inputData The full path and file name for the file that should be loaded into memory.
 * @param {string} inputMetaData The data hive path where the data should be stored once it is loaded.
 * @returns {boolean} The data that was loaded, because sometimes a client command might need to use this to load data.
 * @author Seth Hollingsead
 * @date 2022/01/25
 */
async function loadDataFile(inputData, inputMetaData) {
  const functionName = loadDataFile.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (!inputData) {
    // WARNING: No data to load, please specify a valid path & filename!
    await loggers.consoleLog(namespacePrefix + functionName, msg.cLoadDataFileMessage1 + msg.cloadDataFileMessage2);
  } else { // Else-clause if (!inputData)
    let loadedData = {};
    if (inputData.includes(gen.cDotxml) || inputData.includes(gen.cDotXml) || inputData.includes(gen.cDotXML)) {
      // Attempting to load XML data!
      await loggers.consoleLog(namespacePrefix + functionName, msg.cAttemptingToLoadXmlData);
      loadedData = await ruleParsing.processRulesInternal([inputData, ''], [biz.cgetXmlData]);
    } else if (inputData.includes(gen.cDotcsv) || inputData.includes(gen.cDotCsv) || inputData.includes(gen.cDotCSV)) {
      // Attempting to load CSV data!
      await loggers.consoleLog(namespacePrefix + functionName, msg.cAttemptingToLoadCsvData);
      loadedData = await ruleParsing.processRulesInternal([inputData, ''], [biz.cgetCsvData]);
    } else if (inputData.includes(gen.cDotjson) || inputData.includes(gen.cDotJson) || inputData.includes(gen.cDotJSON)) {
      // Attempting to load JSON data!
      await loggers.consoleLog(namespacePrefix + functionName, msg.cAttemptingToLoadJsonData);
      loadedData = await ruleParsing.processRulesInternal([inputData, ''], [biz.cgetJsonData]);
    } else {
      // WARNING: Invalid file format, file formats supported are:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cloadDataFileMessage3 + await ruleParsing.processRulesInternal(['', ''], [biz.csupportedFileFormatsAre]));
    }
    // Loaded data is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cLoadedDataIs + JSON.stringify(loadedData));
    returnData = loadedData;
    if (loadedData !== null && loadedData && inputMetaData) {
      await ruleParsing.processRulesInternal([inputMetaData, loadedData], [biz.cstoreData]);
    }
  } // End-else-clause if (!inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function saveDataFile
 * @description Saves data from a specified data to a specified path and file name.
 * @param {string} inputData The full path and file name were the data should be saved.
 * @param {object} inputMetaData The data that should be saved out to the specified file.
 * @returns {boolean} True or False value to indicate if the file was saved successfully or not.
 * @author Seth Hollingsead
 * @date 2022/03/17
 */
async function saveDataFile(inputData, inputMetaData) {
  const functionName = saveDataFile.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (!inputData) {
    // WARNING: No data to save, please specify a valid path & filename!
    await loggers.consoleLog(namespacePrefix + functionName, msg.csaveDataFileMessage1 + msg.cloadDataFileMessage2);
  } else {
    let supportedFileFormats = await ruleParsing.processRulesInternal(['', ''], [biz.csupportedFileFormatsAre]);
    if (inputData.includes(gen.cDotxml) || inputData.includes(gen.cDotXml) || inputData.includes(gen.cDotXML)) {
      // WARNING: Invalid file format, file formats supported are:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cloadedDataFileMessage3 + supportedFileFormats);
    } else if (inputData.includes(gen.cDotcsv) || inputData.includes(gen.cDotCsv) || inputData.includes(gen.cDotCSV)) {
      // WARNING: Invalid file format, file formats supported are:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cloadedDataFileMessage3 + supportedFileFormats);
    } else if (inputData.includes(gen.cDotjson) || inputData.includes(gen.cDotJson) || inputData.includes(gen.cDotJSON)) {
      returnData = await ruleParsing.processRulesInternal([inputData, inputMetaData], [biz.cwriteJsonData]); // Should return true if the write is successful.
    } else {
      // WARNING: Invalid file format, file formats supported are:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cloadedDataFileMessage3 + supportedFileFormats);
    }
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function getUserNameFromEmail
 * @description Converts an email input into a username.
 * @param {string} inputData A string that contains an email address value.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} A string value of the sub-string from before the '@' symbol.
 * @author Seth Hollingsead
 * @date 2022/01/21
 */
async function getUserNameFromEmail(inputData, inputMetaData) {
  const functionName = getUserNameFromEmail.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData) {
    await loggers.consoleLog(namespacePrefix + functionName, msg.cIndexOfTheSpace + bas.cAt +
      sys.cSpaceIsColonSpace + inputData.indexOf(bas.cAt));
    returnData = inputData.substring(0, inputData.indexOf(bas.cAt));
  } // End-if (inputData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function encryptStringAes256
 * @description Takes a string and runs it through an encryption algorithm, returning an encrypted version of the string.
 * The algorithm used for the encryption is AES-256, I've included it as part of the function/rule name because
 * we want to be able to distinguish it from other algorithms that might implement other encryption algorithms, such as RSA.
 * @param {string} inputData The string to be encrypted.
 * @param {string} inputMetaData Another string that will be used as the encryption seed.
 * Can be formatted with and "_", with a prefix and post-fix for public/private keys.
 * @returns {string} The encrypted string.
 * @author Seth Hollingsead
 * @date 2024/09/23
 */
async function encryptStringAes256(inputData, inputMetaData) {
  const functionName = encryptStringAes256.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData && inputMetaData && inputData !== '' && inputMetaData !== '') {
    try {
      // Treat the entire inputMetaData (public + private keys combined) as the encryption key
      const encryptionKey = crypto.createHash(gen.csha256).update(inputMetaData).digest(); // Create a 256-bit key
      const iv = crypto.randomBytes(16); // Generate a random IV

      // Create the cipher using AES-256-CTR
      const cipher = crypto.createCipheriv(gen.caes_256_ctr, encryptionKey, iv);

      // Encrypt the inputData
      const encrypted = Buffer.concat([cipher.update(inputData, gen.cUTF8), cipher.final()]);

      // Combine the IV and the encrypted data, encode them in hex format for storage
      returnData = iv.toString(gen.chex) + bas.cColon + encrypted.toString(gen.chex);
      // Encryption successful
      await loggers.consoleLog(namespacePrefix + functionName, msg.cEncryptionSuccessful);
    } catch (error) {
      // ERROR: Encryption failed:
      await loggers.consoleLog(wrd.cError, msg.cErrorEncryptionFailed + error.message);
      await loggers.consoleLog(namespacePrefix + functionName, msg.cErrorEncryptionFailed + error.message);
    }
  } else {
    // ERROR: Invalid input strings.
    await loggers.consoleLog(wrd.cError, msg.cErrorInvalidInputStrings);
    await loggers.consoleLog(namespacePrefix + functionName, msg.cErrorInvalidInputStrings);
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function decryptStringAes256
 * @description Takes an encrypted string and decrypts it using the AES-256 algorithm, returning the original string.
 * @param {string} inputData The encrypted string to decrypt.
 * @param {string} inputMetaData The string used as the decryption seed (same key used for encryption).
 * @returns {string} The decrypted string.
 * @author Seth Hollingsead
 * @date 2024/09/23
 */
export async function decryptStringAes256(inputData, inputMetaData) {
  const functionName = decryptStringAes256.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;

  if (inputData && inputMetaData && inputData !== '' && inputMetaData !== '') {
    try {
      // Split the encrypted data into the IV and the encrypted string
      const [ivHex, encryptedHex] = inputData.split(bas.cColon);
      const iv = Buffer.from(ivHex, gen.chex);
      const encryptedText = Buffer.from(encryptedHex, gen.chex);

      // Derive the encryption key
      const encryptionKey = crypto.createHash(gen.csha256).update(inputMetaData).digest();

      // Create decipher using AES-256-CTR
      const decipher = crypto.createDecipheriv(gen.caes_256_ctr, encryptionKey, iv);

      // Decrypt the encrypted text
      const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

      returnData = decrypted.toString(gen.cUTF8);
      // Decryption successful
      await loggers.consoleLog(namespacePrefix + functionName, msg.cDecryptionSuccessful);
    } catch (error) {
      // ERROR: Decryption failed:
      await loggers.consoleLog(wrd.cError, msg.cErrorEncryptionFailed + error.message);
      await loggers.consoleLog(namespacePrefix + functionName, msg.cErrorEncryptionFailed + error.message);
    }
  } else {
    // ERROR: Invalid input strings.
    await loggers.consoleLog(wrd.cError, msg.cErrorInvalidInputStrings);
    await loggers.consoleLog(namespacePrefix + functionName, msg.cErrorInvalidInputStrings);
  }

  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function obfuscateString
 * @description Takes a string and converts it to an obfuscated version of the same string.
 * This means converting the string into something that is unintelligible or unreadable from the original string.
 * In our case we will convert the string into all stars '*', just like as if the string was a password.
 * @param {string} inputData The string to be obfuscated, or converted into all stars of the same length.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {string} A string of '*' characters of the same length as the input string.
 * @author Seth Hollingsead
 * @date 2024/09/23
 */
export async function obfuscateString(inputData, inputMetaData) {
  const functionName = obfuscateString.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData && inputData !== '') {
    // Convert the input string to a string of '*' characters of the same length
    returnData = bas.cStar.repeat(inputData.length);
    // Obfuscation successful
    await loggers.consoleLog(namespacePrefix + functionName, msg.cObfuscationSuccessful);
  } else {
    // ERROR: Invalid input string.
    await loggers.consoleLog(wrd.cError, msg.cErrorInvalidInputString);
    await loggers.consoleLog(namespacePrefix + functionName, msg.cErrorInvalidInputString);
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + returnData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  initDataStringParsing,
  getAttributeName,
  getAttributeValue,
  getValueFromAssignmentOperationString,
  getDataCategoryFromDataContextName,
  getDataCategoryDetailNameFromDataContextName,
  getKeywordNameFromDataContextName,
  loadDataFile,
  saveDataFile,
  getUserNameFromEmail,
  encryptStringAes256,
  decryptStringAes256,
  obfuscateString
};
