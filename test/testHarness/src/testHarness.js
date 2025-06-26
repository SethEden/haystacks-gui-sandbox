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
      applicationSchemasPath: rootPath + apc.cFullDevSchemasPath,
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
      applicationSchemasPath: rootPath + apc.cFullProdSchemasPath,
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
      applicationSchemasPath: rootPath + apc.cFullDevSchemasPath,
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
  // let commandResult = '';
  try {
    // 1. Wait for all bootstrapping to complete
    await bootstrapApplication();

    // await haystacksGui.enqueueCommand(cmd.cprintDataHive);
    // while (await haystacksGui.isCommandQueueEmpty() === false) {
    //   commandResult = await haystacksGui.processCommandQueue();
    // } // End-While (await haystacksGui.isCommandQueueEmpty() === false)

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
  const functionName = createWindow.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);

  let windowsConfig = await haystacksGui.executeBusinessRules(['', ''], [biz.cgetAllWindowConfigurations]);

  // windowsConfig is:
  await haystacksGui.consoleLog(namespacePrefix, functionName, 'windowsConfig is: ' + JSON.stringify(windowsConfig));

  // TODO: Make sure we hydrate all windows in the window configuration, NOT just the main window!!
  // TODO: TEST BELOW!!!!
  // let mainWindowSuccess = await haystacksGui.executeBusinessRules([windowsConfig, wrd.cmain], [biz.ccreateWindowRule]);

  for (const windowKey in windowsConfig) {
    // windowKey is:
    await haystacksGui.consoleLog(namespacePrefix, functionName, 'windowKey is: ' + windowKey);
    const windowCfg = windowsConfig[windowKey];
    // windowCfg is:
    await haystacksGui.consoleLog(namespacePrefix, functionName, 'windowCfg is: ' + JSON.stringify(windowCfg));
    await haystacksGui.executeBusinessRules([windowCfg, windowCfg[bas.cid]], [biz.ccreateWindowRule]);
    // Attach listeners as needed (move/resize/close)
  }

  console.log(`END ${namespacePrefix}${functionName} function`);
};

app.whenReady().then(await applicationInit);