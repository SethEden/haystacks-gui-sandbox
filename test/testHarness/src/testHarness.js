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
 * @requires module:application.system.constants
 * @requires module:warden
 * @requires module:allApplicationConstantsValidationMetadata
 * @requires module:main
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/electron|electron}
 * @requires {@link https://www.npmjs.com/package/url|url}
 * @requires {@link https://www.npmjs.com/package/dotenv|dotenv}
 * @requires {@link https://nodejs.org/api/child_process.html|child_process}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/06/19
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import clientRules from './businessRules/clientRulesLibrary.js';
import clientCommands from './commands/clientCommandsLibrary.js';
import * as app_cmd from './constants/application.command.constants.js';
import * as app_cfg from './constants/application.configuration.constants.js';
import * as apc from './constants/application.constants.js';
import * as app_msg from './constants/application.message.constants.js';
import * as app_sys from './constants/application.system.constants.js';
import warden from './controllers/warden.js';
import allAppCV from './resources/constantsValidation/allApplicationConstantsValidationMetadata.js';
// --- NEW: Import sockets server glue so we can wire up CLI <-> haystacksGui ---
import socketsServer from './childProcess/socketsServer.js';
// External imports
import haystacksGui from '../../../src/main.js';
import hayConst from '@haystacks/constants';
import { app, ipcMain, screen } from 'electron';
import url from 'url';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';

const {bas, biz, cmd, gen, msg, sys, wrd} = hayConst;
let shellProcess;
let rootPath = '';
let pathSeparator = '';
let baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// application.testHarness.
const namespacePrefix = wrd.capplication + bas.cDot + baseFileName + bas.cDot;
// eslint-disable-next-line no-undef
global.appRoot = path.resolve(process.cwd());
dotenv.config();
// eslint-disable-next-line no-undef
const {NODE_ENV} = process.env;
let exitConditionArrayIndex = 0;
let interactiveNativeCliWindow = false;

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
  if (rootPath.includes(bas.cBackSlash) === true) {
    pathSeparator = bas.cBackSlash;
  } else if (rootPath.includes(bas.cForwardSlash) === true) {
    pathSeparator = bas.cForwardSlash;
  }
  rootPathArray = rootPath.split(pathSeparator);
  rootPathArray.pop(); // remove any bin or src folder from the path.
  rootPath = rootPathArray.join(pathSeparator);
  // console.log('rootPath is: ' + rootPath);
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
  await haystacksGui.initServerLogTransmission(socketsServer.broadcastShellOutput);
  interactiveNativeCliWindow = await haystacksGui.getConfigurationSetting(wrd.csystem, app_cfg.cspawnNativeCliCommandWindow);
  // interactiveNativeCliWindow is:
  console.log('interactiveNativeCliWindow is: ' + interactiveNativeCliWindow);
  if (typeof interactiveNativeCliWindow === 'undefined') {
    interactiveNativeCliWindow = false;
  }
  await warden.initApplication(appConfig, interactiveNativeCliWindow);
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
    // await haystacksGui.enqueueCommand(cmd.cprintDataHive);
    // while (await haystacksGui.isCommandQueueEmpty() === false) {
    //   commandResult = await haystacksGui.processCommandQueue();
    // } // End-While (await haystacksGui.isCommandQueueEmpty() === false)

    // 2. Only now create the main application window
    await createWindows();

    // 3. Start the main application DOS/Bash/Shell CLI as a backup.
    // NOTE: If the application was started from a packaged EXE like a Electron-Builder or WebPack,
    // and that EXE is run by double-clicking the application icon,
    // then we might not have a DOS/Bash/Shell CLI interface.
    // But we can try here anyway!
    programRunning = true;
    if (interactiveNativeCliWindow === true) {
      console.log('----------------- interactiveNativeCliWindow is set to true!!');
      await launchInteractiveCli(); // WARNING: DO NOT await, it will block the rest of the application.
    } else {
      console.log('----------------- interactiveNativeCliWindow is set to FALSE!!');
    }
  } catch (error) {
    // ERROR: Fatal error during bootstrap: 
    console.log(app_msg.cErrorFatalBootstrap, error);
  }
  console.log(`END ${namespacePrefix}${functionName} function`);
}

/**
 * @function createWindows
 * @description This creates all the application windows according to the user configuration.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/06/22
 */
async function createWindows() {
  const functionName = createWindows.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);

  let windowsConfig = await haystacksGui.executeBusinessRules(['', ''], [biz.cgetAllWindowConfigurations]);
  // windowsConfig is:
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cwindowsConfigIs + JSON.stringify(windowsConfig));

  for (const windowKey in windowsConfig) {
    // windowKey is:
    await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cwindowKeyIs + windowKey);
    if (windowKey.includes(sys.cwindowsDot)) {
      // Gate object keys that are actual windows in case we have other meta-data at some point in the future.
      const windowCfg = windowsConfig[windowKey];
      // windowCfg is:
      await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cwindowCfgIs + JSON.stringify(windowCfg));
      if (windowCfg) {
        try {
          await haystacksGui.executeBusinessRules([windowCfg, windowCfg[bas.cid]], [biz.ccreateWindowRule]);
          // Attach listeners as needed (move/resize/close)

        } catch (windowError) {
          // ERROR: Failure creating the application window:
          console.log(msg.cErrorFailureCreatingApplicationWindow + windowCfg[bas.cid]);
          await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cErrorFailureCreatingApplicationWindow + windowCfg[bas.cid]);
        }
      } else {
        // ERROR: Failure to load window without metaData: 
        console.log(msg.cErrorFailureToLoadWindowWithoutMetaData + JSON.stringify(windowCfg));
      }
    } // End-if (windowKey.includes(sys.cwindowsDot))
  }
  console.log(`END ${namespacePrefix}${functionName} function`);
};

/**
 * @function launchInteractiveCli
 * @description This is the main program loop CLI, the init for the testHarness application.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/06/30
 */
async function launchInteractiveCli() {
  const functionName = launchInteractiveCli.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  let argumentDrivenInterface = false;
  let commandResult;

  argumentDrivenInterface = await haystacksGui.getConfigurationSetting(wrd.csystem, app_cfg.cargumentDrivenInterface);
  if (argumentDrivenInterface === undefined) {
    argumentDrivenInterface = false;
  }
  // argumentDrivenInterface is:
  await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cargumentDrivenInterfaceIs + argumentDrivenInterface);
  await haystacksGui.enqueueCommand(app_cmd.cApplicationStartupWorkflow);
  // NOTE: We are processing the argument driven interface first that way even if we are not in an argument driven interface,
  // arguments can still be passed in and they will be executed first, after the startup workflow is complete.
  //
  // We need to strip off any preceding "--" before we try to process it as an actual command.
  // Also need to make sure that the command to execute actually contains the "--" or "/" or "\" or "-".
  let commandToExecute = '';
  // Make sure we execute any and all commands so the command queue is empty before
  // we process the command args and add more commands to the command queue.
  // Really this is about getting out the application name, version and about message.
  while (await haystacksGui.isCommandQueueEmpty() === false) {
    commandResult = await haystacksGui.processCommandQueue();
  } // End-while (haystacksGui.isCommandQueueEmpty() === false)

  // NOW process the command args and add them to the command queue for execution.
  if (Array.isArray(process.argv) && process.argv.length > 2) {
    // Caught the case that some arguments were passed in as input to the application.
    console.log(app_msg.capplicationMessage00);
    if (process.argv[2].includes(bas.cDash) === true ||
    process.argv[2].includes(bas.cForwardSlash) === true ||
    process.argv[2].includes(bas.cBackSlash) === true) {
      commandToExecute = await haystacksGui.executeBusinessRules([process.argv, ''], [biz.caggregateCommandArguments]);
    } else {
      commandToExecute = await haystacksGui.executeBusinessRules([process.argv, ''], [biz.caggregateCommandArguments]);
    }
    if (commandToExecute !== '') {
      console.log(msg.ccommandToExecuteIs + commandToExecute);
      await haystacksGui.enqueueCommand(commandToExecute);
    }
    while (await haystacksGui.isCommandQueueEmpty() === false) {
      commandResult = await haystacksGui.processCommandQueue();
    } // End-while (haystacksGui.isCommandQueueEmpty() === false)
  } // End-if (Array.isArray(process.argv) && process.argv.length > 2)

  // NOW the application can continue with the interactive interface if the flag was set to false.
  if (argumentDrivenInterface === false) {
    // BEGIN main program loop
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.capplicationMessage01);

    // BEGIN command parser
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.capplicationMessage02);

    mainPromptLoop(); // WARNING: DO NOT await!! It will block the GUI.
  } // End-if (argumentDrivenInterface === false)
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
}

/**
 * @function mainPromptLoop
 * @description Main CLI event loop for non-blocking command line input.
 * Handles prompting the user and passing user commands into the haystacks command queue.
 * Runs asynchronously in parallel with the GUI event loop.
 * DO NOT await this function (fire-and-forget only).
 * All internal awaits (such as queue checks or enqueues)
 * do NOT block the GUI or main application thread.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2025/07/01
 * @NOTE NEVER await this function at the top level.
 * Safe to use 'await' for inner async calls as they operate inside event callbacks.
 * Designed for maximal concurrency: does not block the main event loop.
 */
async function mainPromptLoop() {
  const functionName = mainPromptLoop.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  let shouldReturnEarly = false;
  // Only prompt if program is running and the queue is empty
  if (!programRunning) {
    // programRunning is false. Returning.
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmainPromptLoopMessage01);
    shouldReturnEarly = true;
  } else {
    // Checking if command queue is empty...
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmainPromptLoopMessage02);
    await haystacksGui.isCommandQueueEmpty().then(async (isEmpty) => {
      // isCommandQueueEmpty: 
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmainPromptLoopMessage03 + isEmpty);
      if (isEmpty) {
        // Prompting user (non-blocking)...
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmainPromptLoopMessage04);
        haystacksGui.executeBusinessRules([bas.cGreaterThan, (answer) => {
          // User entered: 
          haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmainPromptLoopMessage05 + answer);
          haystacksGui.enqueueCommand(answer).then(() => {
            // Command enqueued, starting processCommandLoop...
            haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmainPromptLoopMessage06);
            processCommandLoop();
          });
        }], [biz.cpromptNonBlocking]);
      } else {
        // Commands pending, processing queue...
        await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cmainPromptLoopMessage07);
        processCommandLoop();
      }
      await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
    });
  }
  return shouldReturnEarly ? undefined : undefined;
}

/**
 * @function processCommandLoop
 * @description Processes the next command in the haystacks command queue.
 * If the program exit condition is met, ends the main prompt loop; otherwise,
 * returns control to the mainPromptLoop for further input.
 * DO NOT await this function (fire-and-forget only).
 * All internal awaits are safe; they only affect internal sequencing.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/01
 * @NOTE DO NOT await at top level. Function is designed for cooperative concurrency with mainPromptLoop
 */
async function processCommandLoop() {
  const functionName = processCommandLoop.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);

  // Process the next command in the queue (safe to await)
  while (!(await haystacksGui.isCommandQueueEmpty())) {
    // Processing next command in queue...
    await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cprocessCommandLoopMessage01);
    const commandResult = await haystacksGui.processCommandQueue();
    // commandResult is:
    // await haystacksGui.consoleLog(namespacePrefix, functionName, 'commandResult is: ' + JSON.stringify(commandResult));

    // Exit if commanded to
    if (commandResult && commandResult[exitConditionArrayIndex] === false) {
      // Exit condition met, ending processCommandLoop.
      await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cprocessCommandLoopMessage02);
      await shutdownAll();
      programRunning = false;
      return;
    }
  }
  // Now the queue is empty, so go back to prompting
  // Command queue is empty, calling mainPromptLoop...
  await haystacksGui.consoleLog(namespacePrefix, functionName, app_msg.cprocessCommandLoopMessage03);
  mainPromptLoop();
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
}

/**
 * @function shutdownAll
 * @description Orchestrates a complete, coordinated shutdown of all application components,
 * including the Electron windows, child shell processes, socket servers, and all active client connections.
 * This function ensures that all application processes, resources, and connections are cleanly terminated,
 * leaving no orphaned processes, open sockets, or lingering CLI windows.
 * It should be called in response to any application-wide exit event,
 * such as "exit" commands in the CLI, main window close events, or other programmatic shutdown triggers.
 * The sequence of operations is:
 * 1. Request Electron app to quit (which closes all windows).
 * 2. Kill the child shellHarness process, if running.
 * 3. Shut down the sockets server, notifying all clients to exit.
 * 4. Log shutdown completion and terminate the main process.
 * @returns {void}
 * @author Seth Hollingsead
 * @date 2025/07/09
 */
async function shutdownAll() {
  const functionName = shutdownAll.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  // 1. Tell Electron to close windows
  if (app && typeof app.quit === wrd.cfunction) {
    app.quit();
  }

  // 2. Send shutdown message to shellHarness (if running)
  if (typeof shellProcess !== 'undefined' && shellProcess && !shellProcess.killed) {
    shellProcess.kill();
  }

  // 3. Close sockets
  await socketsServer.shutdownSocketServer();

  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  // 4. Process exit
  process.exit(0);
}

let programRunning = false;
app.whenReady().then(async () => {
  // 1. Wait for all bootstrapping to complete
  // console.log('app.whenReady().then(async() => { BEGIN calling bootstrapApplication function');
  await bootstrapApplication();
  // console.log('app.whenReady().then(async() => { END calling bootstrapApplication function');
  if (interactiveNativeCliWindow === true) {
    // Launching interactive native CLI shell window.
    console.log(app_msg.claunchingInteractiveNativeCliShellWindow);
    
    // console.log('app.whenReady().then(async() => { BEGIN calling launchShellHarness function');
    launchShellHarness();
    // console.log('app.whenReady().then(async() => { END calling launchShellHarness function');

    // console.log('app.whenReady().then(async() => { BEGIN calling socketsServer.setShellCommandHandler function');
    socketsServer.setShellCommandHandler(async (command, clientId) => {
      await haystacksGui.enqueueCommand(command);
      // socketsServer.sendShellOutput(clientId, `[Queued] Command: ${command}`);
      // console.log('app.whenReady().then(async() => { BEGIN calling processCommandLoop function');
      processCommandLoop(); // (do not await!)
      // console.log('app.whenReady().then(async() => { END calling processCommandLoop function');
    });
    // console.log('app.whenReady().then(async() => { END calling socketsServer.setShellCommandHandler function');
  } else {
    // Interactive nativeCLI window is disabled by configuration.
    console.log(app_msg.cinteractiveNativeCliWindowDisabledByConfig);
  }

  // 3. Wait briefly to allow the shell to connect.
  // TODO: Replace this timeout with an event-driven handshake so we only proceed once the shellHarness is truly ready.
  await new Promise(resolve => setTimeout(resolve, 500));
  // Rationale: This artificial delay ensures the shellHarness CLI has connected before processing the startup workflow.
  // This should be replaced with a more robust ready-check for production use.

  // console.log('app.whenReady().then(async() => { BEGIN calling applicationInit function');
  await applicationInit();
  // console.log('app.whenReady().then(async() => { END calling applicationInit function');
});

app.on('window-all-closed', async () => {
  await shutdownAll();
});

/**
 * @function launchShellHarness
 * @description Launches the external Shell Harness CLI process in a new native command window,
 * providing an interactive command-line interface for the Haystacks GUI application.
 * The function determines the appropriate shell harness script path based on the current environment
 * (development or production), then spawns a detached child process using the Windows `cmd.exe` shell.
 * The child process is started in a new window and does not block the main application.
 * Features:
 * - Resolves the shell harness script location according to NODE_ENV.
 * - Uses Node's `spawn` with `detached: true` and `stdio: 'ignore'` for non-blocking execution.
 * - Ensures a separate native shell window is opened for interactive CLI, supporting Windows environments.
 * - Sets global reference `shellProcess` to the spawned process for later management (e.g., shutdown).
 * Use Cases:
 * - To provide end users with a native CLI shell alongside the Electron GUI for hybrid automation/testing workflows.
 * - For launching and managing a dedicated shell harness process in enterprise environments.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/09
 * @notes
 * - Designed for use on Windows (cmd.exe). If cross-platform support is needed, refactor to detect and launch the appropriate shell.
 * - Always stores the process handle in the global `shellProcess` variable for shutdown and lifecycle control.
 */
function launchShellHarness() {
  let shellHarnessPath = '';
  if (NODE_ENV === wrd.cdevelopment) {
    shellHarnessPath = path.resolve(rootPath + apc.cAppDevPath + apc.cShellHarnessName + gen.cDotjs);
  } else if (NODE_ENV === wrd.cproduction) {
    shellHarnessPath = path.resolve(rootPath + apc.cAppProdPath + apc.cShellHarnessName + gen.cDotjs);
  } else {
    shellHarnessPath = path.resolve(rootPath + apc.cAppDevPath + apc.cShellHarnessName + gen.cDotjs);
  }
  shellProcess = spawn(gen.ccmd + gen.cDotexe, [
    bas.cForwardSlash + bas.cc, wrd.cstart, gen.ccmd + gen.cDotexe, bas.cForwardSlash + bas.ck, wrd.cnode, shellHarnessPath
  ], {
    cwd: process.cwd(),
    detached: true,
    stdio: wrd.cignore
  });
}