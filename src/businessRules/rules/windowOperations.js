/**
 * @file windowOperations.js
 * @module windowOperations
 * @description Contains all of the business rule functions for doing window operations, data parsing/processing, etc.
 * @requires module:dataBroker
 * @requires module:ruleParsing
 * @requires module:configurator
 * @requires module:loggers
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/electron|electron}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/06/25
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import dataBroker from '../../brokers/dataBroker.js';
import ruleParsing from './ruleParsing.js';
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
 * @function parseWindowsConfigurationPath
 * @description Takes the system configuration setting for the application configuration reference path and
 * finds the path and file name for the windows configuration JSON file.
 * @param {string} inputData Not used for this business rule.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} A True or False value to indicate if the windows configuration path and file name was found and set correctly or not.
 * @author Seth Hollingsead
 * @date 2025/06/26
 */
async function parseWindowsConfigurationPath(inputData, inputMetaData) {
  const functionName = parseWindowsConfigurationPath.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log('inputData is: ' + inputData);
  console.log('inputMetaData is: ' + JSON.stringify(inputMetaData));
  let returnData = false;

  let windowsConfigurationFileName = await configurator.getConfigurationSetting(wrd.csystem, sys.cwindowsConfigurationFileName);
  // windowsConfigurationFileName is:
  console.log('windowsConfigurationFileName is: ' + windowsConfigurationFileName);
  let applicationConfigDataPath = await configurator.getConfigurationSetting(wrd.csystem, sys.cappConfigPath);
  // applicationConfigDataPath is:
  console.log('applicationConfigDataPath is: ' + applicationConfigDataPath);
  let applicationConfigFiles = await dataBroker.scanDataPath(applicationConfigDataPath);
  // applicationConfigFiles is:
  console.log('applicationConfigFiles is: ' + applicationConfigFiles);
  // filesToLoad = await configurator.getConfigurationSetting(wrd.csystem, cfg.cappConfigFiles);
  if (applicationConfigFiles && Array.isArray(applicationConfigFiles) && applicationConfigFiles.length > 0) {
    let windowsConfigFullPath = '';
    for (let idx = 0; idx < applicationConfigFiles.length; idx++) {
      // idx is:
      console.log('idx is: ' + idx);
      const filePath = applicationConfigFiles[idx];
      // filePath is:
      console.log('filePath is: ' + filePath);
      // Compare the base filename (handle nested folders)
      if (filePath.includes(windowsConfigurationFileName)) {
        windowsConfigFullPath = filePath;
        console.log(`MATCH FOUND: ${filePath}`);
        // If you want the first match only, break here.
        break;
      }
    }
    if (windowsConfigFullPath) {
      // Store the resolved path in the configuration D-hive for future use
      await configurator.setConfigurationSetting(wrd.csystem, sys.cwindowsConfigurationFileNameAndPath, windowsConfigFullPath);
      returnData = true;
      console.log('windowsConfigFullPath saved: ' + windowsConfigFullPath);
    } else {
      // ERROR: No matching windows configuration file found in applicationConfigFiles:
      console.log('No matching windows configuration file found in applicationConfigFiles: ' + JSON.stringify(applicationConfigFiles));
    }
  } else {
    // ERROR: No application configuration files found: 
    console.log('ERROR: No application configuration files found: ' + JSON.stringify(applicationConfigFiles));
  }
  console.log('return data is: ' + returnData);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
}

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
    await parseWindowsConfigurationPath('', '');
  } // End-if (inputData && inputMetaData && inputData !== '')

  // TODO: Can also consider a default application defined window configuration.
  // TODO: Another backup is to consider default framework defined window configuration.

  // The above TODO tasks are going to be essential survivability strategies for this application framework!
  // They are also important for graphical debugging and root-cause analysis.

  if (failed === false) {
    // Only continue to initialize the windowsOps D-data structure if the windows configuration was loaded.
    failed = await initWindowsOperations();
  }
  returnData = failed;
  // console.log('return data is: ' + returnData);
  // console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
}

/**
 * @function initWindowsOperations
 * @description Initializes the window operations D-data structure, this will be used to store window instance objects.
 * Window instance objects are helpful for window management and IPC - Inter-Process Communications between windows.
 * @param {string} inputData Not used for this business rule.
 * @param {object} inputMetaData Not used for this business rule.
 * @return {boolean} A True or False value to indicate if the WindowsOps data structure is created successfully or not.
 * @author Seth Hollingsead
 * @date 2025/06/26
 */
async function initWindowsOperations(inputData, inputMetaData) {
  const functionName = initWindowsOperations.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  D[sys.cwindowsOps] = [];
  returnData = true;
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function addWindowToWindowsOps
 * @description Adds a window to the WindowsOps D-Data structure by using an array.push call. The D[windowsOps] will be defined as an array.
 * Each of the objects pushed onto the D[windowsOps] will be a JSON object that contains the window object itself,
 * and any additional meta-data such as: windowId, window schema name, etc.
 * @param {string} inputData The window schema name.
 * @param {object} inputMetaData The Electron Window object.
 * @return {boolean} A True or False value to indicate if the window object was successfully added to the D[windowsOps] data array.
 * @author Seth Hollingsead
 * @date 2025/06/26
 */
async function addWindowToWindowsOps(inputData, inputMetaData) {
  const functionName = addWindowToWindowsOps.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaData + inputMetaData);
  let returnData = false;
  if (inputData && inputMetaData && inputData !== '') {
    let windowObject = {[wrd.cName]: inputData, [wrd.cObject]: inputMetaData}
    // windowObject is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cwindowObjectIs + JSON.stringify(windowObject));
    D[sys.cwindowsOps].push(windowObject);
    returnData = true;
  } else {
    // ERROR: Unable to store window object to windowsOps:
    console.log(msg.cErrorUnableToStoreWindowObjectWindowsOps + inputData);
    await loggers.consoleLog(namespacePrefix + functionName, msg.cErrorUnableToStoreWindowObjectWindowsOps + inputData);
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function removeWindowFromWindowsOps
 * @description Removes a window instance from D[windowsOps] when the window is closed.
 * @param {string} inputData The window schema name.
 * @param {object} inputMetaData The Electron application window object (optional, for extra safety).
 * @return {boolean} A True or False to indicate if the window object was successfully removed from the D[windowsOps] data array.
 * @author Seth Hollingsead
 * @date 2025/06/26
 */
async function removeWindowFromWindowsOps(inputData, inputMetaData) {
  const functionName = removeWindowFromWindowsOps.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaData + inputMetaData);
  let returnData = false;
  let removedCount = 0;
  if (inputData && inputData !== '' && D[sys.cwindowsOps]) {
    const oldLength = D[sys.cwindowsOps].length;
    const newWindowsOps = [];

    // Remove by window name, or by object reference if needed.
    let ops = D[sys.cwindowsOps];
    for (let idx = 0; idx < ops.length; idx++) {
      const winObj = ops[idx];
      // winObj is:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cwinObjIs + JSON.stringify(winObj));
      const byName = winObj[wrd.cName] === inputData;
      const byObject = inputMetaData && winObj[wrd.cObject] === inputMetaData;
      const shouldRemove = byName || byObject;

      // In-line log for each element examined:
      await loggers.consoleLog(
        namespacePrefix + functionName,
        `Examining [${idx}]: name="${winObj[wrd.cName]}", byName=${byName}, byObject=${byObject}, shouldRemove=${shouldRemove}`
      );

      // Count how many are being removed
      if (shouldRemove) {
        removedCount++;
      } else {
        newWindowsOps.push(winObj);
      }
    }
    D[sys.cwindowsOps] = newWindowsOps;
    let afterCount = D[sys.cwindowsOps]?.length || 0;

    // afterCount is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cafterCountIs + afterCount);
    // removedCount is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cremovedCountIs + removedCount);
    returnData = removedCount > 0;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
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
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData && inputMetaData && inputMetaData !== '') {
      const win = new BrowserWindow({
        x: Number(inputData[bas.cx]),
        y: Number(inputData[bas.cy]),
        width: Number(inputData[wrd.cwidth]),
        height: Number(inputData[wrd.cheight]),
        show: inputData[wrd.cvisible],
        title: inputData[wrd.ctitle],
        // More options as needed:
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
      });
      // Optionally handle state (minimized, maximized, etc.)
      switch (inputData[wrd.cstate].toLowerCase()) {
        case wrd.cmaximized: case wrd.cmaximize:
          win.maximize();
          break;
        case wrd.cminimized: case wrd.cminimize:
          win.minimize();
          break;
        case wrd.cnormal: case wrd.cnormalize:
        default:
          // Already in normal state
          // Force the bounds *again* for extra reliability
          win.setBounds({
            x: Number(inputData[bas.cx]),
            y: Number(inputData[bas.cy]),
            width: Number(inputData[wrd.cwidth]),
            height: Number(inputData[wrd.cheight])
          });
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
      if (inputData[sys.cdevTools] === true) {
        win.webContents.openDevTools();
      }
      if (win) {
        await addWindowToWindowsOps(inputMetaData, win);
        await attachWindowEventListeners(inputMetaData, win);
      } else {
        // ERROR: Cannot store the window object for operations:
        console.log(msg.cErrorCannotStoreWindowObjectOperations + inputMetaData);
        await loggers.consoleLog(namespacePrefix + functionName, msg.cErrorCannotStoreWindowObjectOperations + inputMetaData);
      }
  } // End-if (inputData && inputMetaData)
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function attachWindowEventListeners
 * @description Attaches listeners to an Electron Browser Window (application window) for: (move, resize, minimize, maximize, restore/normalize, close) 
 * Each event updates the in-memory configuration for that window and logs the event.
 * @param {string} inputData The window schema name.
 * @param {object} inputMetaData The Electron browserWindow (application window) instance.
 * @return {boolean} A True or False value to indicate if the events are setup successfully or not.
 * @author Seth Hollingsead
 * @date 2025/06/26
 */
async function attachWindowEventListeners(inputData, inputMetaData) {
  const functionName = attachWindowEventListeners.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaData + inputMetaData);
  let returnData = false;
  if (inputData && inputMetaData && inputData !== '') {
    const windowConfigNamespace = sys.cwindowsDot + inputData;
    // windowConfigNamespace is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cwindowConfigNamespaceIs + windowConfigNamespace);

    // ----- MOVE EVENT -----
    inputMetaData.on(wrd.cmove, async () => {
      const [x, y] = inputMetaData.getPosition();
      D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][bas.cx] = x;
      D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][bas.cy] = y;
      // Window Moved:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cWindowMoved + `${inputData} (${x},${y})`);
    });

    // ----- RESIZE EVENT -----
    inputMetaData.on(wrd.cresize, async () => {
      const [width, height] = inputMetaData.getSize();
      D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][wrd.cwidth] = width;
      D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][wrd.cheight] = height;
      // Window Resized:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cWindowResized + `${inputData} (${width},${height})`);
    });

    // ----- MINIMIZE EVENT -----
    inputMetaData.on(wrd.cminimize, async () => {
      D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][wrd.cstate] = wrd.cminimized;
      // Window Minimized:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cWindowMinimized + inputData);
    });

    // ----- MAXIMIZE EVENT -----
    inputMetaData.on(wrd.cmaximize, async () => {
      D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][wrd.cstate] = wrd.cmaximized;
      // Window Maximized:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cWindowMaximized + inputData);
    });

    // ----- (NORMALIZE) EVENT -----
    inputMetaData.on(wrd.cunmaximize, async () => {
      // Electron fires 'unmaximize' when a window is restored to normal
      D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][wrd.cstate] = wrd.cnormal;
      // Window Normalized:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cWindowNormalized + inputData);
    });

    // ----- RESTORE EVENT -----
    inputMetaData.on(wrd.crestore, async () => {
      // Electron fires 'restore' when a minimized window is restored
      D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][wrd.cstate] = wrd.cnormal;
      // Window Restored:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cWindowRestored + inputData);
    });

    // ----- CLOSE EVENT -----
    inputMetaData.on(wrd.cclose, async (e) => {
      const isMain = inputData === wrd.cmain;
      if (!isMain) {
        D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][wrd.cvisible] = false;
        D[wrd.cconfiguration][wrd.cwindows][windowConfigNamespace][wrd.cstate] = wrd.cclosed;
      }
      // Window Closed:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cWindowClosed + inputData);
      // Optional: remove from windowsOps array or flag as closed in operational metadata.
      await removeWindowFromWindowsOps(inputData, inputMetaData);
      // If you want to actually prevent close (for prompt), use: e.preventDefault();
      await saveWindowsConfigurationToDisk('', '');
    });
    returnData = true;
  } // End-if (inputData && inputMetaData && inputData !== '')
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

/**
 * @function saveWindowsConfigurationToDisk
 * @description Extracts the current window configuration, removes the 'windows.' namespace from keys,
 * and saves it to the windowConfiguration.json. Honors a config flag if user-controlled overwrite is required.
 * @param {string} inputData Path to output file (or use default if blank)
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} A True or False value to indicate if the save was successful or not successful.
 * @author Seth Hollingsead
 * @date 2025/06/26
 */
async function saveWindowsConfigurationToDisk(inputData, inputMetaData) {
  const functionName = saveWindowsConfigurationToDisk.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaData + inputMetaData);
  let returnData = false;

  // TODO: Do NOT forget to wrap this business rule in a configuration flag so the user might disable over-writing the windows layout configuration.
  // 1. Pull config flag if required (optional):
  // const userControlled = await configurator.getConfigurationSetting(wrd.cwindows, wrd.cuserControlledOverwriteFlag);
  // if (userControlled === false) {
  //   await loggers.consoleLog(namespacePrefix + functionName, "User-controlled overwrite disabled.");
  //   return false;
  // }

  // 2. Get in-memory config:
  const inMemoryWindowsConfig = D[wrd.cconfiguration][wrd.cwindows];
  // inMemoryWindowsConfig is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinMemoryWindowsConfigIs + JSON.stringify(inMemoryWindowsConfig));

  // 3. "Unwind" keys:
  const outputWindowsConfig = {};
  for (const key in inMemoryWindowsConfig) {
    // key is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.ckeyIs + key);
    // Strip prefix:
    if (key.startsWith(sys.cwindowsDot)) {
      const windowName = key.slice((sys.cwindowsDot).length);
      // windowName is:
      await loggers.consoleLog(namespacePrefix + functionName, msg.cwindowNameIs + windowName);
      outputWindowsConfig[windowName] = inMemoryWindowsConfig[key];
    }
    // outputWindowsConfig is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.coutputWindowsConfigIs + JSON.stringify(outputWindowsConfig));
  }
  const jsonWindowsConfigToWrite = { windows: outputWindowsConfig };
  // jsonWindowsConfigToWrite is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cjsonWindowsConfigToWriteIs + JSON.stringify(jsonWindowsConfigToWrite));

  // 4. Determine output path:
  const outputPath = await configurator.getConfigurationSetting(wrd.csystem, sys.cwindowsConfigurationFileNameAndPath);
  // outputPath is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.coutputPathIs + outputPath);

  await ruleParsing.processRulesInternal([outputPath, jsonWindowsConfigToWrite], [biz.cwriteJsonData]);

  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  parseWindowsConfigurationPath,
  parseLoadedWindowConfiguration,
  initWindowsOperations,
  addWindowToWindowsOps,
  removeWindowFromWindowsOps,
  getAllWindowConfigurations,
  createWindowRule,
  attachWindowEventListeners,
  resolveWindowSchemaHtmlPath,
  saveWindowsConfigurationToDisk
}