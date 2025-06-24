/**
 * @file testHarness.js
 * @module testHarness
 * @description This is the main init for the testHarness application.
 * It contains just enough for the main program loop and/or basic argument parsing to
 * effectively test the framework.
 * @requires module:clientRules
 * @requires module:clientCommands
 * @requires module:application.command.constants
 * @requires module:application.configuration.constants
 * @requires module:application.constants
 * @requires module:application.message.constants
 * @requires module:allApplicationConstantsValidationMetadata
 * @requires module:main
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/electron|electron}
 * @requires {@link https://www.npmjs.com/package/url|url}
 * @requires {@link https://www.npmjs.com/package/dotenv|dotenv}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/06/19
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import clientRules from './businessRules/clientRulesLibrary.js';
import clientCommands from './commands/clientCommandsLibrary.js';
import * as app_cfg from './constants/application.configuration.constants.js';
import * as apc from './constants/application.constants.js';
import * as app_msg from './constants/application.message.constants.js';
import allAppCV from './resources/constantsValidation/allApplicationConstantsValidationMetadata.js';
// External imports
import haystacksGui from '../../../src/main.js';
import hayConst from '@haystacks/constants';
import { app, BrowserWindow, screen } from 'electron';
import url from 'url';
import dotenv from 'dotenv';
import path from 'path';

const {bas, biz, cmd, msg, sys, wrd} = hayConst;
let rootPath = '';
let baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// application.testHarness.
let namespacePrefix = wrd.capplication + bas.cDot + baseFileName + bas.cDot;
// eslint-disable-next-line no-undef
global.appRoot = path.resolve(process.cwd());
dotenv.config();
// eslint-disable-next-line no-undef
const {NODE_ENV} = process.env;
let exitConditionArrayIndex = 0;

/**
 * @function bootstrapApplication
 * @description Setup all the testHarness application data and configuration settings.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/06/19
 */
async function bootstrapApplication() {
  const functionName = bootstrapApplication.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  rootPath = url.fileURLToPath(path.dirname(import.meta.url));
  let rootPathArray = [];
  let pathSeparator = '';
  if (rootPath.includes(bas.cBackSlash) === true) {
    pathSeparator = bas.cBackSlash;
  } else if (rootPath.includes(bas.cForwardSlash) === true) {
    pathSeparator = bas.cForwardSlash;
  }
  rootPathArray = rootPath.split(pathSeparator);
  rootPathArray.pop(); // remove any bin or src folder from the path.
  rootPath = rootPathArray.join(pathSeparator);
  let appConfig = {};
  if (NODE_ENV === wrd.cdevelopment) {
    appConfig = {
      FrameworkName: apc.cExpectedActualFrameworkDevName,
      clientRootPath: rootPath,
      appConfigResourcesPath: rootPath + apc.cFullDevResourcesPath,
      appConfigReferencePath: rootPath + apc.cFullDevConfigurationPath,
      clientMetaDataPath: apc.cmetaDataDevPath,
      clientCommandAliasesPath: rootPath + apc.cFullDevCommandsPath,
      clientConstantsPath: rootPath + apc.cFullDevConstantsPath,
      clientRegisteredPlugins: rootPath + apc.cFullDevPluginsRegistryPath,
      clientWorkflowsPath: rootPath + apc.cFullDevWorkflowsPath,
      clientThemesPath: rootPath + apc.cFullDevThemesPath,
      applicationConstantsValidationData: allAppCV.initializeAllClientConstantsValidationData,
      clientBusinessRules: {},
      clientCommands: {}
    };
  } else if (NODE_ENV === wrd.cproduction) {
    appConfig = {
      FrameworkName: apc.cExpectedActualFrameworkProdName,
      clientRootPath: rootPath,
      appConfigResourcesPath: rootPath + apc.cFullProdResourcesPath,
      appConfigReferencePath: rootPath + apc.cFullProdConfigurationPath,
      clientMetaDataPath: apc.cmetaDataProdPath,
      clientCommandAliasesPath: rootPath + apc.cFullProdCommandsPath,
      clientConstantsPath: rootPath + apc.cFullProdConstantsPath,
      clientRegisteredPlugins: rootPath + apc.cFullProdPluginsRegistryPath,
      clientWorkflowsPath: rootPath + apc.cFullProdWorkflowsPath,
      clientThemesPath: rootPath + apc.cFullProdThemesPath,
      applicationConstantsValidationData: allAppCV.initializeAllClientConstantsValidationData,
      clientBusinessRules: {},
      clientCommands: {}
    };
  } else {
    // WARNING: No .env file found! Going to default to the DEVELOPMENT ENVIRONMENT!
    console.log(msg.cApplicationWarningMessage1a + msg.cApplicationWarningMessage1b);
    appConfig = {
      FrameworkName: apc.cExpectedActualFrameworkDevName,
      clientRootPath: rootPath,
      appConfigResourcesPath: rootPath + apc.cFullDevResourcesPath,
      appConfigReferencePath: rootPath + apc.cFullDevConfigurationPath,
      clientMetaDataPath: apc.cmetaDataDevPath,
      clientCommandAliasesPath: rootPath + apc.cFullDevCommandsPath,
      clientConstantsPath: rootPath + apc.cFullDevConstantsPath,
      clientRegisteredPlugins: rootPath + apc.cFullDevPluginsRegistryPath,
      clientWorkflowsPath: rootPath + apc.cFullDevWorkflowsPath,
      clientThemesPath: rootPath + apc.cFullDevThemesPath,
      applicationConstantsValidationData: allAppCV.initializeAllClientConstantsValidationData,
      clientBusinessRules: {},
      clientCommands: {}
    };
  }
  appConfig[sys.cclientBusinessRules] = await clientRules.initClientRulesLibrary();
  appConfig[sys.cclientCommands] = await clientCommands.initClientCommandsLibrary();
  console.log('appConfig is: ', appConfig);
  await haystacksGui.initFramework(appConfig);
  console.log(`END ${namespacePrefix}${functionName} function`);
}

/**
 * @function applicationInit
 * @description This is the application startup orchestration function.
 * Manages the bootstrapping of the haystacks command environment, and calls the function to create the main application window.
 * Calls any additional processing as part of the startup process.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/06/22
 */
async function applicationInit() {
  const functionName = applicationInit.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  try {
    // 1. Wait for all bootstrapping to complete
    await bootstrapApplication();

    // 2. Only now create the main application window
    await createWindow();
  } catch (error) {
    // ERROR: Fatal error during bootstrap: 
    console.log(app_msg.cErrorFatalBootstrap, error);
  }
  console.log(`END ${namespacePrefix}${functionName} function`);
}

/**
 * @function createWindow
 * @description This creates the main application window.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/06/22
 */
async function createWindow() {
  let functionName = createWindow.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);

  bootstrapApplication();

  const displays = screen.getAllDisplays();
  let displayAsOneWindow = false;
  let displayAsTwoWindows = false;
  let displayAsMultiWindows = false;
  // Display 1
  let display01_minX = 0;
  let display01_minY = 0;
  let display01_maxX = 0;
  let display01_maxY = 0;

  // Display 2
  let display02_minX = 0;
  let display02_minY = 0;
  let display02_maxX = 0;
  let display02_maxY = 0;

  let width01 = 0;
  let height01 = 0;

  let width02 = 0;
  let height02 = 0;

  let force2Screens = true

  if (displays.length === 1) {
    displayAsOneWindow = true;
    display01_minX = displays[0].bounds.x;
    display01_minY = displays[0].bounds.y;
    display01_maxX = displays[0].bounds.x + displays[0].bounds.width;
    display01_maxY = displays[0].bounds.y + displays[0].bounds.height;

    width01 = display01_maxX - display01_minX;
    height01 = display01_maxY - display01_minY;
  } else if (displays.length === 2 || force2Screens === true) {
    displayAsTwoWindows = true;

    display01_minX = displays[0].bounds.x;
    display01_minY = displays[0].bounds.y;
    display01_maxX = displays[0].bounds.x + displays[0].bounds.width;
    display01_maxY = displays[0].bounds.y + displays[0].bounds.height;

    display02_minX = displays[1].bounds.x;
    display02_minY = displays[1].bounds.y;
    display02_maxX = displays[1].bounds.x + displays[1].bounds.width;
    display02_maxY = displays[1].bounds.y + displays[1].bounds.height;

    width01 = display01_maxX - display01_minX;
    height01 = display01_maxY - display01_minY;
    width02 = display02_maxX - display02_minX;
    height02 = display02_maxY - display02_minY;

    console.log({ display01_minX, display01_minY, width01, height01 });
    console.log({ display02_minX, display02_minY, width02, height02 });

    const window1 = new BrowserWindow({
      x: display01_minX,
      y: display01_minY,
      width01,
      height01,
      fullscreenEnable: true, // Prevents fullscreen mode
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false // Simplified setup; consider security adjustments later
      }
    });
  
    // Explicitly set the bounds after creation to span all monitors
    window1.setBounds({ x: display01_minX, y: display01_minY, width01, height01 });
  
    window1.loadFile('test/testHarness/src/index.html');
    window1.webContents.openDevTools(); // Add this line

    const window2 = new BrowserWindow({
      x: display02_minX,
      y: display02_minY,
      width02,
      height02,
      fullscreenEnable: false, // Prevents fullscreen mode
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false // Simplified setup; consider security adjustments later
      }
    });
  
    // Explicitly set the bounds after creation to span all monitors
    window2.setBounds({ x: display02_minX, y: display02_minY, width02, height02 });
  
    window2.loadFile('test/testHarness/src/index.html');
    window2.webContents.openDevTools(); // Add this line
  } else if (displays.length > 2) {
    displayAsMultiWindows = true;
  } else {

  }

  console.log(`END ${namespacePrefix}${functionName} function`);
};

app.whenReady().then(applicationInit);