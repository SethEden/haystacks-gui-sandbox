/**
 * @file configuration.js
 * @module configuration
 * @description Contains all of the configuration system commands.
 * @requires module:dataBroker
 * @requires module:ruleBroker
 * @requires module:themeBroker
 * @requires module:configurator
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/02/04
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import dataBroker from '../../brokers/dataBroker.js';
import ruleBroker from '../../brokers/ruleBroker.js';
import themeBroker from '../../brokers/themeBroker.js';
import configurator from '../../executrix/configurator.js';
import loggers from '../../executrix/loggers.js';
import D from '../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, biz, cmd, cfg, gen, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = path.resolve(import.meta.url.replace(sys.cfileColonDoubleForwardSlash, ''));
// framework.commandsBlob.commands.configuration.
const namespacePrefix = wrd.cframework + bas.cDot + sys.ccommandsBlob + bas.cDot + wrd.ccommands + bas.cDot + baseFileName + bas.cDot;

const commandsMetaData = [
  {[wrd.cName]: cmd.csaveConfiguration, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [], [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: cmd.cchangeConfigurationSetting, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [], [sys.cbusinessRulesDependencies]: [biz.cgetWordsArrayFromString, biz.cstringToDataType]},
  {[wrd.cName]: cmd.clistConfigurationThemes, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [], [sys.cbusinessRulesDependencies]: []},
  {[wrd.cName]: cmd.cchangeDebugConfigurationTheme, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [], [sys.cbusinessRulesDependencies]: []}
];

/**
 * @function initConfiguration
 * @description Adds the configuration commands meta-data to the D-data structure commandsMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given command can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/16
 */
async function initConfiguration() {
  const functionName = initConfiguration.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  let returnData = false;
  // Add all of the commands meta-data to the D-data structure!
  if (D[sys.ccommandsMetaData] && D[sys.ccommandsMetaData][wrd.cframework]) {
    D[sys.ccommandsMetaData][wrd.cframework].push(...commandsMetaData);
    returnData = true;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function saveConfiguration
 * @description Saves out all of the configuration data to a JSON file so custom user settings can be persisted between sessions.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/03/11
 */
async function saveConfiguration(inputData, inputMetaData) {
  const functionName = saveConfiguration.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, {}];
  returnData[1] = await dataBroker.writeJsonDataToFile(await configurator.getConfigurationSetting(wrd.csystem, cfg.cappConfigPath) + wrd.cconfig + gen.cDotjson, JSON.stringify(D));
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function changeConfigurationSetting
 * @description Persists a change to a user specified configuration setting.
 * This enables the user to enable or disable console log flags to use for run-time debugging.
 * This is useful also for automating changes to how and what is logged during execution.
 * Further it is useful for when a test fails, it can be automatically re-run with a more detailed log.
 * @param {array<string>} inputData An array that contains
 * the fully qualified path to the configuration setting that should be changed and
 * the data that should be assigned to it.
 * inputData[0] = changeConfigurationSetting
 * inputData[1] = fully.Qualified.Configuration.Path
 * inputData[2] = value to assign to the configuration setting property
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/05/11
 * @NOTE Test String 1: changeConfigurationSetting configuration.debugSetting.commandsBlob.commands.system true
 * Test String 2: changeConfigurationSetting debugSetting.commandsBlob.commands.system true
 */
async function changeConfigurationSetting(inputData, inputMetaData) {
  const functionName = changeConfigurationSetting.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, {}];
  let errorMessage = '';
  if (inputData && inputData.length === 3) {
    let dataPath = inputData[1];
    dataPath = await ruleBroker.processRules([dataPath, ''], [biz.cgetWordsArrayFromString]);
    // dataPath is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cdataPathIs + JSON.stringify(dataPath));
    let newValue = inputData[2];
    // newValue is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cnewValueIs + JSON.stringify(newValue));
    if (dataPath[0] === wrd.cconfiguration) {
      dataPath.shift(wrd.cconfiguration);
    }
    let configurationName = dataPath.pop();
    // dataPath is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cdataPathIs + JSON.stringify(dataPath));
    dataPath = dataPath.join(bas.cDot);
    newValue = await ruleBroker.processRules([newValue, ''], [biz.cstringToDataType]);
    await configurator.setConfigurationSetting(dataPath, configurationName, newValue);
    returnData[1] = true;
  } else {
    // ERROR: Invalid entry, please enter a valid configuration namespace to change,
    // and a value to assign to the configuration setting.
    errorMessage = msg.cchangeConfigurationSettingMessage01 + msg.cchangeConfigurationSettingMessage02;
    await loggers.consoleLog(wrd.cError, errorMessage);
    returnData[1] = errorMessage;
    // EXAMPLE: changeConfigurationSetting debugSetting.businessRules.rules.arrayParsing.commandArrayParsing.solveLehmerCode true
    await loggers.consoleLog(wrd.cError, msg.cchangeConfigurationSettingMessage03);
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function listConfigurationThemes
 * @description Lists all of the debug configuration themes currently installed in the resources/themes folder.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/06/10
 */
async function listConfigurationThemes(inputData, inputMetaData) {
  const functionName = listConfigurationThemes.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, {}];
  let frameworkThemesPath = await configurator.getConfigurationSetting(wrd.csystem, cfg.cframeworkThemesPath);
  frameworkThemesPath = path.resolve(frameworkThemesPath);
  // frameworkThemesPath is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cframeworkThemesPathIs + frameworkThemesPath);
  let themesList = await themeBroker.getNamedThemesFromRootPath(frameworkThemesPath);
  // themesList is:
  await loggers.consoleLog(wrd.cInfo, msg.cthemesListIs + JSON.stringify(themesList));
  returnData[1] = themesList;
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function changeDebugConfigurationTheme
 * @description Swaps out all of the debug settings with a different theme.
 * @param {string} inputData An array that contains the name of the theme the user would like to switch to.
 * inputData[0] = changeDebugConfigurationTheme
 * inputData[1] = The name of the theme that the user would like to switch to.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/06/13
 */
async function changeDebugConfigurationTheme(inputData, inputMetaData) {
  const functionName = changeDebugConfigurationTheme.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, {}];
  let errorMessage = '';
  if (inputData && inputData.length === 2) {
    let desiredThemeName = inputData[1];
    // desiredThemeName is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cdesiredThemeNameIs + desiredThemeName);
    let frameworkThemesPath = await configurator.getConfigurationSetting(wrd.csystem, cfg.cframeworkThemesPath);
    frameworkThemesPath = path.resolve(frameworkThemesPath);
    // frameworkThemesPath is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cframeworkThemesPathIs + frameworkThemesPath);
    let namedThemePath = await themeBroker.getNamedThemePathFromRootPath(desiredThemeName, frameworkThemesPath);
    if (namedThemePath !== false) {
      // namedThemePath is verified:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cnamedThemePathIsVerified + namedThemePath);
      await configurator.setConfigurationSetting(wrd.csystem, sys.cthemeConfigPath, namedThemePath);
      let loadedThemeData = await themeBroker.loadTheme(namedThemePath);
      // loadedThemeData is:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cloadedThemeDataIs + JSON.stringify(loadedThemeData));
      let themeLoadedSuccessfully = await themeBroker.applyTheme(loadedThemeData);
      returnData[1] = themeLoadedSuccessfully;
      if (themeLoadedSuccessfully === false) {
        // ERROR: There was an error applying the selected theme to the active debug settings configuration.
        errorMessage = msg.cchangeDebugConfigurationThemeMessage01;
        await loggers.consoleLog(wrd.cError, errorMessage);
        returnData[1] = errorMessage;
      } // End-if (themeLoadedSuccessfully === false)
    } else {
      // ERROR: The specified theme name was not found in the current list of supported themes.
      errorMessage = msg.cchangeDebugConfigurationThemeMessage02;
      await loggers.consoleLog(wrd.cError, errorMessage);
      returnData[1] = errorMessage;
      // You can find the available themes at the following path location:
      await loggers.consoleLog(wrd.cError, msg.cchangeDebugConfigurationThemeMessage03 +
        await configurator.getConfigurationSetting(wrd.csystem, cfg.cframeworkThemesPath));
    }
  } else {
    // ERROR: Invalid entry, please enter a theme name you would like the debug settings to switch to when logging debug statements.
    errorMessage = msg.cchangeDebugConfigurationThemeMessage04
    await loggers.consoleLog(wrd.cError, errorMessage);
    returnData[1] = errorMessage;
    // EXAMPLE: changeDebugConfigurationTheme Skywalker
    await loggers.consoleLog(wrd.cError, msg.cchangeDebugConfigurationThemeMessage05);
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  initConfiguration,
  saveConfiguration,
  changeConfigurationSetting,
  listConfigurationThemes,
  changeDebugConfigurationTheme
};
