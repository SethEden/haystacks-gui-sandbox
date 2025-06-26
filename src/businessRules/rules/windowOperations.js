/**
 * @file windowOperations.js
 * @module windowOperations
 * @description Contains all of the business rule functions for doing window operations, data parsing/processing, etc.
 * @requires module:dataBroker
 * @requires module:configurator
 * @requires module:loggers
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/06/25
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import dataBroker from '../../brokers/dataBroker.js';
import configurator from '../../executrix/configurator.js';
import loggers from '../../executrix/loggers.js';
import D from '../../structures/data.js';
// External imports
import hayConst from '@haystacks/constants';
import { BrowserWindow } from 'electron';
import path from 'path';

const {bas, biz, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.businessRules.rules.windowOperations.
const namespacePrefix = wrd.cframework + bas.cDot + sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + baseFileName + bas.cDot;

/**
 * @function parseLoadedWindowConfiguration
 * @description Parses out each of the window configuration settings and loads them then stores them in the configuration system.
 * @param {string} inputData The namespace that will be used for the windows configurations.
 * @param {object} inputMetaData The window configuration loaded from the windowConfiguration.json file.
 * @return {boolean} True or False to indicate if the window configuration was loaded successfully or not.
 * @author Seth Hollingsead
 * @date 2025/06/25
 */
async function parseLoadedWindowConfiguration(inputData, inputMetaData) {
  // const functionName = parseLoadedWindowConfiguration.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log('inputData is: ' + inputData);
  // console.log('inputMetaData is: ' + JSON.stringify(inputMetaData));
  let returnData = false;
  let failed = false;
  if (inputData && inputMetaData && inputData !== '') {
    for (const windowId in inputMetaData) {
      // windowId is:
      // console.log('windowId is: ' + windowId);
      if (inputMetaData.hasOwnProperty(windowId)) {
        const windowIdValue = inputMetaData[windowId];
        // windowIdValue is:
        // console.log('windowIdValue is: ' + JSON.stringify(windowIdValue));
        // Assign each window under windows.windowId namespace
        await configurator.setConfigurationSetting(inputData, windowId, windowIdValue);
      } else {
        failed = true;
      }
    } // End-for (const windowId in inputMetaData)
  } // End-if (inputData && inputMetaData && inputData !== '')
  returnData = failed;
  // console.log('return data is: ' + returnData);
  // console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
}

/**
 * @function getAllWindowConfigurations
 * @description Returns a JSON that contains all of the windows configurations as they are loaded in the D-data structure.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {object} A JSON object that contains all of the configuration objects for all of the windows.
 * @author Seth Hollingsead
 * @date 2025/06/25
 */
async function getAllWindowConfigurations(inputData, inputMetaData) {
  const functionName = getAllWindowConfigurations.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaData + inputMetaData);
  let returnData = false;
  returnData = D[wrd.cconfiguration][wrd.cwindows];
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function createWindowRule
 * @description This is a business rule that does all the work to create a new application window.
 * Extra care must be made to specify the type of window that is to be created,
 * as there will be a schema provided by the framework, and a schema provided by the application.
 * This way the framework can define a set of default framework defined application windows,
 * such as Shell, Configuration, Event monitor, message monitor.
 * Where-as the application will define it's own application specific types of windows such as:
 * Toolbars, Media Library, Spectrum Visualizer, Editor, Timeline, Instrumentation, etc.
 * @param {object} inputData The JSON object that contains all of the meta-data to be used for creating the window.
 * @param {string} inputMetaData The schema name of the window which will define where to get the HTML for the window.
 * @return {boolean} A True or False value to indicate if the window was successfully created or not.
 * @author Seth Hollingsead
 * @date 2025/06/25
 */
async function createWindowRule(inputData, inputMetaData) {
  const functionName = createWindowRule.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaData + inputMetaData);
  let returnData = false;
  if (inputData && inputMetaData && inputMetaData !== '') {
    // Call a window namespace mapping schema.
    const windowMetaData = inputData[wrd.cwindows + bas.cDot + inputMetaData];
    if (windowMetaData) {
      const win = new BrowserWindow({
        x: windowMetaData[bas.cx],
        y: windowMetaData[bas.cy],
        width: windowMetaData[wrd.cwidth],
        height: windowMetaData[wrd.cheight],
        show: windowMetaData[wrd.cvisible],
        title: windowMetaData[wrd.ctitle],
        // More options as needed:
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
      });
      // Optionally handle state (minimized, maximized, etc.)
      switch (windowMetaData[wrd.cstate].toLowerCase()) {
        case wrd.cmaximized: case wrd.cmaximize:
          win.maximize();
          break;
        case wrd.cminimized: case wrd.cminimize:
          win.minimize();
          break;
        case wrd.cnormal: case wrd.cnormalize:
        default:
          // Already in normal state
          break;
      }
      // Load the HTML URL path by looking it up in the schema.
      const htmlFilePath = await resolveWindowSchemaHtmlPath(inputMetaData, '');
      // htmlFilePath is: 
      await loggers.consoleLog(namespacePrefix + functionName, msg.chtmlFilePathIs + htmlFilePath);
      const resolvedHtmlPath = path.resolve(htmlFilePath);
      // resolvedHtmlPath is:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cresolvedHtmlPathIs + resolvedHtmlPath);
      await win.loadFile(htmlFilePath);
      // Optionally open dev tools
      win.webContents.openDevTools();
    } else {
      // ERROR: Failure to load window without metaData: 
      console.log(msg.cErrorFailureToLoadWindowWithoutMetaData + JSON.stringify(windowMetaData));
    }
  } // End-if (inputData && inputMetaData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function resolveWindowSchemaHtmlPath
 * @description Looks up the HTML URL path in the window schema given the window name.
 * @param {string} inputData The name of the window, should either be a framework window name, like:
 * main, console, configuration, or an application window name, like: equalizer, editor, timeline, etc.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {string} The URL path to the HTML file to be loaded.
 * @author Seth Hollingsead
 * @date 2025/06/25
 */
async function resolveWindowSchemaHtmlPath(inputData, inputMetaData) {
  const functionName = resolveWindowSchemaHtmlPath.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log('inputData is: ' + inputData);
  // console.log('inputMetaData is: ' + JSON.stringify(inputMetaData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaData + inputMetaData);
  let returnData = false;

  let frameworkWindowsSchema = await dataBroker.getSchema(sys.cframeworkWindowsSchema);
  let applicationWindowsSchema = await dataBroker.getSchema(sys.capplicationWindowsSchema);
  // frameworkWindowsSchema is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cframeworkWindowsSchemaIs + JSON.stringify(frameworkWindowsSchema));
  // applicationWindowsSchema is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.capplicationWindowsSchemaIs + JSON.stringify(applicationWindowsSchema));
  
  // Check application schema first (overrides framework)
  if (applicationWindowsSchema && applicationWindowsSchema.hasOwnProperty(inputData)) {
    returnData = applicationWindowsSchema[inputData][sys.chtmlPath];
  } else if (frameworkWindowsSchema && frameworkWindowsSchema.hasOwnProperty(inputData)) {
    returnData = frameworkWindowsSchema[inputData][sys.chtmlPath];
  }

  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  parseLoadedWindowConfiguration,
  getAllWindowConfigurations,
  createWindowRule,
  resolveWindowSchemaHtmlPath
}