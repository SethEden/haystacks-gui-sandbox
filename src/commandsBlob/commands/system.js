/**
* @file system.js
* @module system
* @description Contains all of the system level commands.
* @requires module:commandBroker
* @requires module:ruleBroker
* @requires module:workflowBroker
* @requires module:configurator
* @requires module:loggers
* @requires module:data
* @requires module:stack
* @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
* @requires {@link https://www.npmjs.com/package/figlet|figlet}
* @requires {@link https://www.npmjs.com/package/path|path}
* @author Seth Hollingsead
* @date 2022/04/20
* @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
*/

// Internal imports
import commandBroker from '../../brokers/commandBroker.js';
import ruleBroker from '../../brokers/ruleBroker.js';
import workflowBroker from '../../brokers/workflowBroker.js';
import configurator from '../../executrix/configurator.js';
import loggers from '../../executrix/loggers.js';
import D from '../../structures/data.js';
import stack from '../../structures/stack.js';
// External imports
import hayConst from '@haystacks/constants';
import figlet from 'figlet';
import path from 'path';

const {bas, biz, cfg, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.commandsBlob.commands.system.
const namespacePrefix = wrd.cframework + bas.cDot + sys.ccommandsBlob + bas.cDot + wrd.ccommands + bas.cDot + baseFileName + bas.cDot;

/**
 * @function echoCommand
 * @description Returns the input as the output without any changes.
 * @param {array<boolean|string|integer>} inputData String that should be echoed.
 * inputData[0] === 'echoCommand'
 * @param {string} inputMetaData Not used for this business rule.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/02/04
 */
async function echoCommand(inputData, inputMetaData) {
  let functionName = echoCommand.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  let errorMessage = '';
  if (inputData) {
    inputData.shift();
    await loggers.consoleLog(wrd.cInfo, inputData.join(bas.cSpace));
    returnData[1] = inputData.join(bas.cSpace);
  } else {
    // Nothing to echo.
    errorMessage = msg.cNothingToEcho;
    await loggers.consoleLog(wrd.cError, errorMessage);
    returnData[1] = errorMessage;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function exit
 * @description Returns false so the entire application can exit.
 * @param {array<boolean|string|integer>} inputData Not used for this command.
 * inputData[0] === 'exit'
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean False value to
 * indicate if the application exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/02/04
 */
async function exit(inputData, inputMetaData) {
  let functionName = exit.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [false, true];
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function version
 * @description Displays the current version number for the current application.
 * @param {array<boolean|string|integer>} inputData Not used for this command.
 * inputData[0] = 'version'
 * inputData[1] === 'application|framework' (optional)
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/02/04
 */
async function version(inputData, inputMetaData) {
  let functionName = version.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  let configVersion = '';
  let appContext = '';
  if (inputData.length === 2) {
     appContext = inputData[1];
     if (appContext.toUpperCase() === wrd.cAPPLICATION) {
        configVersion = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationVersionNumber);
     } else if (appContext.toUpperCase() === wrd.cFRAMEWORK) {
        configVersion = await configurator.getConfigurationSetting(wrd.csystem, sys.cFrameworkVersionNumber);
     } else if (appContext.toUpperCase().includes(wrd.cPLUGIN)) {
      configVersion = await configurator.getConfigurationSetting(wrd.csystem, sys.cPluginVersionNumber);
     } else {
        configVersion = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationVersionNumber);
     }
  } else {
    configVersion = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationVersionNumber);
  }
  await loggers.consoleLog(wrd.cInfo, configVersion);
  returnData[1] = configVersion;
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function about
 * @description Displays the message about the current application.
 * @param {array<boolean|string|integer>} inputData Not used for this command.
 * inputData[0] === 'about'
 * inputData[1] === 'application|framework' (optional)
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/02/04
 */
async function about(inputData, inputMetaData) {
  let functionName = about.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  let configDescription = '';
  let appContext = '';
  if (inputData.length === 2) {
    appContext = inputData[1];
    if (appContext.toUpperCase() === wrd.cAPPLICATION) {
      configDescription = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationDescription);
    } else if (appContext.toUpperCase() === wrd.cFRAMEWORK) {
      configDescription = await configurator.getConfigurationSetting(wrd.csystem, sys.cFrameworkDescription);
    } else if (appContext.toUpperCase().includes(wrd.cPLUGIN)) {
      configDescription = await configurator.getConfigurationSetting(wrd.csystem, sys.cPluginDescription);
    } else {
      configDescription = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationDescription);
    }
  } else {
    configDescription = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationDescription);
  }
  await loggers.consoleLog(wrd.cInfo, configDescription);
  returnData[1] = configDescription;
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function name
 * @description Displays the name of the current application in standard font format, nothing special.
 * Optional argument to output in figlet font.
 * @param {array<boolean|string|integer>} inputData An array that could really contain anything depending
 * on what the user entered, but the function converts and filters out for a boolean
 * True or False value internally to the function.
 * inputData[0] === 'name'
 * inputData[1] === 'application|framework' (optional)
 * inputData[2] === 'true|false' (optional)
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/02/04
 */
async function name(inputData, inputMetaData) {
  let functionName = name.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, ''];
  let reportedName = '';
  let figletFont = '';
  let appContext = '';
  let useFancyFont = false;
  if (inputData.length === 2) {
    appContext = inputData[1];
  } // End-if (inputData.length === 2)
  if (inputData.length === 3) {
    appContext = inputData[1];
    useFancyFont = await ruleBroker.processRules([inputData[2], ''], [biz.cstringToDataType]);
  } // End-if (inputData.length === 3)
  if (appContext !== '') {
    if (appContext.toUpperCase() === wrd.cAPPLICATION) {
      reportedName = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationName);
    } else if (appContext.toUpperCase() === wrd.cFRAMEWORK) {
      reportedName = await configurator.getConfigurationSetting(wrd.csystem, sys.cFrameworkName);
    } else if (appContext.toUpperCase().includes(wrd.cPLUGIN)) {
      reportedName = await configurator.getConfigurationSetting(wrd.csystem, sys.cPluginName);
    } else {
      reportedName = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationName);
    }
  } else {
    reportedName = await configurator.getConfigurationSetting(wrd.csystem, sys.cApplicationName);
  }
  if (useFancyFont === true) {
    figletFont = await configurator.getConfigurationSetting(wrd.csystem, cfg.cfigletFont);
    await loggers.consoleLog(wrd.cInfo, figlet.textSync(reportedName, {font: figletFont, horizontalLayout: wrd.cfull}));
  } else {
    await loggers.consoleLog(wrd.cInfo, reportedName);
  }
  returnData[1] = reportedName;
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function clearScreen
 * @description Clears all data from the console cache by printing a bunch of blank lines to the screen.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/02/04
 */
// eslint-disable-next-line no-unused-vars
async function clearScreen(inputData, inputMetaData) {
  let functionName = clearScreen.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  // loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  // loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = [true, {}];
  // console.clear(); // This will clear the screen, but not the cache, you can still scroll up and see the previous commands.
  // process.stdout.write('\u001B[2J\u-001B[0;0f'); // Same as above.
  // eslint-disable-next-line no-undef
  process.stdout.write('\u001b[H\u001b[2J\u001b[3J');
  returnData[1] = true;
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function help
 * @description Displays all the information about all of the commands in the system,
 * including both system defined commands and client defined commands.
 * @param {array<boolean|string|integer>} inputData An array that could possibly include the name of this command,
 * and a list of top-level command data structure data types to print help for.
 * That way we can parameterize and optimize the help to print commands specific to the Haystacks platform,
 * the host application, loaded plugins, or various combinations of these.
 * inputData[0] = 'help'
 * inputData[1] = Could be a coma-separated string list of command catagories to get help for.
 * inputData[n] = Could be additional list of command catagories to get help for if the user entered a space-separated list.
 * Options are: Framework,Platform,Application,App,Plugins,Plugin
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/02/22
 */
// eslint-disable-next-line no-unused-vars
async function help(inputData, inputMetaData) {
  let functionName = help.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  let returnData = [true, []];
  let commandNamespaceTypesInputArray = []; // Use this to process any inputs the user may have entered.
  let commandNamespaceTypesConfirmedArray = []; // Use this once we've confirmed valid user entry for inputs given.
  let validUserEntry = false;
  let errorMessage = '';
  let namespaceAllCommandsDataObject = [];
  let validCommandNamespaceTypes = [wrd.cFramework, wrd.cApplication, wrd.cPlugins];

  // Process user input(s).
  if (Array.isArray(inputData) && inputData.length === 2) {
    // The user entered only 1 parameter namespace, but that could actually be a coma-separated list.
    // inputData.length is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataLengthIs + inputData.length);
    if (inputData[1].includes(bas.cComa)) {
      commandNamespaceTypesInputArray = inputData[1].split(bas.cComa);
    } else if (inputData[1].includes(bas.cSemiColon)) {
      commandNamespaceTypesInputArray = inputData[1].split(bas.cSemiColon);
    } else if (inputData[1].includes(bas.cForwardSlash)) {
      commandNamespaceTypesInputArray = inputData[1].split(bas.cForwardSlash);
    } else if (inputData[1].includes(bas.cBackSlash)) {
      commandNamespaceTypesInputArray = inputData[1].split(bas.cBackSlash);
    } else {
      // shift the data1!
      await loggers.consoleLog(namespacePrefix + functionName, msg.cshiftData1);
      inputData.shift();
      commandNamespaceTypesInputArray = inputData;
    }
  } else if (Array.isArray(inputData) && inputData.length > 2) {
    // shift the data2!
    await loggers.consoleLog(namespacePrefix + functionName, msg.cshiftData2);
    inputData.shift();
    commandNamespaceTypesInputArray = inputData;
  }

  // commandNamespaceTypesInputArray is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.ccommandNamespaceTypesInputArrayIs + JSON.stringify(commandNamespaceTypesInputArray));

  // This is where we need to process the array of inputs to normalize them to the command types available by the system,
  // or run a generic search to find the command namespace alias data.
  // Available official types are: Framework,Platform,Application,App,Plugins,Plugin
  if (commandNamespaceTypesInputArray.length > 0) {
    for (let commandNamespaceEntityKey in commandNamespaceTypesInputArray) {
      let commandNamespaceEntity = commandNamespaceTypesInputArray[commandNamespaceEntityKey]
      if (commandNamespaceEntity.toUpperCase().trim() === wrd.cFRAMEWORK || commandNamespaceEntity.toUpperCase().trim() === wrd.cPLATFORM) {
        commandNamespaceTypesConfirmedArray.push(wrd.cFramework);
      } else if (commandNamespaceEntity.toUpperCase().trim() === wrd.cAPPLICATION || commandNamespaceEntity.toUpperCase().trim() === wrd.cAPP) {
        commandNamespaceTypesConfirmedArray.push(wrd.cApplication);
      } else if (commandNamespaceEntity.toUpperCase().trim() === wrd.cPLUGINS || commandNamespaceEntity.toUpperCase().trim() === wrd.cPLUGIN) {
        commandNamespaceTypesConfirmedArray.push(wrd.cPlugins);
      } else if (commandNamespaceEntity === '') {
        // Just ignore it!
      } else {
        // Not sure what the user may have entered here, but it could be some valid namespace, so just add it to the array, and assume best intent.
        // If its going to error out, then it will print an error some place else.
        commandNamespaceTypesConfirmedArray.push(commandNamespaceEntity);
      }
    } // End-for (let commandNamespaceEntity in commandNamespaceTypesInputArray)
    if (commandNamespaceTypesConfirmedArray.length > 0) {
      validUserEntry = true;
    }
  } else {
    // User didn't enter any parameters at all....just gather them all!
    commandNamespaceTypesConfirmedArray = validCommandNamespaceTypes;
    validUserEntry = true;
  }

  // commandNamespaceTypesConfirmedArray is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.ccommandNamespaceTypesConfirmedArrayIs + JSON.stringify(commandNamespaceTypesConfirmedArray));

  if (validUserEntry) {
    if (commandNamespaceTypesConfirmedArray.length > 0) {
      for (const commandNamespaceTypeConfirmedKey in commandNamespaceTypesConfirmedArray) {
        const commandNamespaceTypeConfirmedEntity = commandNamespaceTypesConfirmedArray[commandNamespaceTypeConfirmedKey];
        if (commandNamespaceTypeConfirmedEntity === wrd.cFramework) {
          // processing framework commands
          await loggers.consoleLog(namespacePrefix + functionName, msg.cprocessingFrameworkCommands);
          let frameworkCommandAliases = await commandBroker.getAllCommandAliasData(D[sys.cCommandsAliases][wrd.cFramework]);
          if (frameworkCommandAliases) {
            if (Object.keys(namespaceAllCommandsDataObject).length != 0) {
              // frameworkCommandAliases is:
              await loggers.consoleLog(namespacePrefix + functionName, msg.cframeworkCommandAliasesIs + JSON.stringify(frameworkCommandAliases));
              namespaceAllCommandsDataObject = await ruleBroker.processRules([namespaceAllCommandsDataObject, frameworkCommandAliases], [biz.cobjectDeepMerge]);
            } else {
              namespaceAllCommandsDataObject = frameworkCommandAliases;
            }
          } // End-if (frameworkCommandAliases)
        } else if (commandNamespaceTypeConfirmedEntity === wrd.cApplication) {
          // processing application commands
          await loggers.consoleLog(namespacePrefix + functionName, msg.cprocessingApplicationCommands);
          let applicationCommandAliases = await commandBroker.getAllCommandAliasData(D[sys.cCommandsAliases][wrd.cApplication]);
          if (applicationCommandAliases) {
            if (Object.keys(namespaceAllCommandsDataObject).length != 0) {
              // applicationCommandAliases is:
              await loggers.consoleLog(namespacePrefix + functionName, msg.capplicationCommandAliasesIs + JSON.stringify(applicationCommandAliases));
              namespaceAllCommandsDataObject = await ruleBroker.processRules([namespaceAllCommandsDataObject, applicationCommandAliases], [biz.cobjectDeepMerge]);
            } else {
              namespaceAllCommandsDataObject = applicationCommandAliases;
            }
          } // End-if (applicationCommandAliases)
        } else if (commandNamespaceTypeConfirmedEntity === wrd.cPlugins) {
          if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenablePluginLoader)) {
            // processing plugins commands
            await loggers.consoleLog(namespacePrefix + functionName, msg.cprocessingPluginsCommands);
            let pluginsCommandAliases = await commandBroker.getAllCommandAliasData(D[sys.cCommandsAliases][wrd.cPlugins]);
            if (pluginsCommandAliases) {
              if (Object.keys(namespaceAllCommandsDataObject).length != 0) {
                // pluginsCommandAliases is:
                await loggers.consoleLog(namespacePrefix + functionName, msg.cpluginsCommandAliasesIs + JSON.stringify(pluginsCommandAliases));
                namespaceAllCommandsDataObject = await ruleBroker.processRules([namespaceAllCommandsDataObject, pluginsCommandAliases], [biz.cobjectDeepMerge]);
              } else {
                namespaceAllCommandsDataObject = pluginsCommandAliases;
              }
            } // End-if (pluginsCommandAliases)
          } // End-if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenablePluginLoader))
        } else {
          // calling getCommandNamespaceDataObject() function,
          // because the user entered some namespace we should look for!
          // processing commands for:
          await loggers.consoleLog(namespacePrefix + functionName, msg.cprocessingCommandsFor + commandNamespaceTypeConfirmedEntity);
          let namespaceCommandsData = await commandBroker.getCommandNamespaceDataObject(undefined, commandNamespaceTypeConfirmedEntity);
          // namespaceCommandsData is:
          await loggers.consoleLog(namespacePrefix + functionName, msg.cnamespaceCommandsDataIs + JSON.stringify(namespaceCommandsData));
          if (namespaceCommandsData === false) {
            // ERROR: The command namespace was not found.
            // Please make sure you have entered the correct name and try again.
            errorMessage = msg.chelpCommandMessage01 + bas.cSpace + msg.chelpCommandMessage02;
            await loggers.consoleLog(wrd.cError, errorMessage);
          } else {
            // NOW call getAllCommandAliasData with the above found data!
            await loggers.consoleLog(namespacePrefix + functionName, msg.chelpCommandMessage03);
            let extraUserEnteredCommandAliases = await commandBroker.getAllCommandAliasData(namespaceCommandsData);
            if (extraUserEnteredCommandAliases) {
              if (Object.keys(namespaceAllCommandsDataObject).length != 0) {
                // extraUserEnteredCommandAliases is:
                await loggers.consoleLog(namespacePrefix + functionName, msg.cextraUserEnteredCommandAliasesIs + JSON.stringify(extraUserEnteredCommandAliases));
                namespaceAllCommandsDataObject = await ruleBroker.processRules([namespaceAllCommandsDataObject, extraUserEnteredCommandAliases], [biz.cobjectDeepMerge]);
              } else {
                namespaceAllCommandsDataObject = extraUserEnteredCommandAliases;
              }
            } // End-if (extraUserEnteredCommandAliases)
          }
        }
        // namespaceAllCommandsDataObject is:
        await loggers.consoleLog(namespacePrefix + functionName, msg.cnamespaceAllCommandsDataObjectIs + JSON.stringify(namespaceAllCommandsDataObject));
      } // End-for (const commandNamespaceTypeConfirmedKey in commandNamespaceTypesConfirmedArray)
    } else {
      // Should never get here, but just in case we do, protect the system and get all the command alias data so the command can still finish successfully.
      namespaceAllCommandsDataObject = await commandBroker.getAllCommandAliasData(D[sys.cCommandsAliases]);
    }
    returnData[1] = await ruleBroker.processRules([namespaceAllCommandsDataObject, ''], [biz.carrayDeepClone]);
    // namespaceAllCommandsDataObject is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cnamespaceAllCommandsDataObjectIs + JSON.stringify(namespaceAllCommandsDataObject[0]));
    await loggers.consoleTableLog(baseFileName + bas.cDot + functionName, namespaceAllCommandsDataObject[0], [wrd.cName, wrd.cDescription]);
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function workflowHelp
 * @description Displays all the information about all the workflows in the system,
 * including both system defined workflows & client defined workflows.
 * @param {array<boolean|string|integer>} inputData An array that could possibly include the name of this command,
 * and a list of top-level workflow catagories data structures to be printed.
 * That way we can parameterize and optimize the workflow help to print workflows specific to the Haystacks platform,
 * the host application, loaded plugins, or various combinations of these.
 * inputData[0] = 'workflowHelp'
 * inputData[1] = Could be a coma-separated string list of command catagories to get workflow help for.
 * inputData[n] = Could be additional list of command catagories to get help for if the user entered a space-separated list.
 * Options are: Framework,Platform,Application,App,Plugins,Plugin
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/02/22
 */
async function workflowHelp(inputData, inputMetaData) {
  let functionName = workflowHelp.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, []];
  let errorMessage = '';
  let workflowNamespaceTypesInputArray = []; // Use this to process any inputs the user may have entered.
  let workflowNamespaceTypesConfirmedArray = []; // Use this once we've confirmed vaid user entry for inputs given.
  let validUserEntry = false;
  let namespaceAllWorkflowsDataObject = [];
  let validWorkflowsNamespaceTypes = [wrd.cFramework, wrd.cApplication, wrd.cPlugins];

  // Process user input(s).
  if (Array.isArray(inputData) && inputData.length === 2) {
    // The user entered only 1 parameter namespace, but that could actually be a coma-separated list.
    // inputData.length is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataLengthIs + inputData.length);
    if (inputData[1].includes(bas.cComa)) {
      workflowNamespaceTypesInputArray = inputData[1].split(bas.cComa);
    } else if (inputData[1].includes(bas.cSemiColon)) {
      workflowNamespaceTypesInputArray = inputData[1].split(bas.cSemiColon);
    } else if (inputData[1].includes(bas.cForwardSlash)) {
      workflowNamespaceTypesInputArray = inputData[1].split(bas.cForwardSlash);
    } else if (inputData[1].includes(bas.cBackSlash)) {
      workflowNamespaceTypesInputArray = inputData[1].split(bas.cBackSlash);
    } else {
      // shift the data1!
      await loggers.consoleLog(namespacePrefix + functionName, msg.cshiftData1);
      inputData.shift();
      workflowNamespaceTypesInputArray = inputData;
    }
  } else if (Array.isArray(inputData) && inputData.length > 2) {
    // shift the data2!
    await loggers.consoleLog(namespacePrefix + functionName, msg.cshiftData2);
    inputData.shift();
    workflowNamespaceTypesInputArray = inputData;
  }

  // workflowNamespaceTypesInputArray is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cworkflowNamespaceTypesInputArrayIs + JSON.stringify(workflowNamespaceTypesInputArray));

  // This is where we need to process the array of inputs to normalize them to the workflow types available by the system,
  // or run a generic search to find the workflow data.
  // Available official types are: Framework,Platform,Application,App,Plugins,Plugin
  if (workflowNamespaceTypesInputArray.length > 0) {
    for (let workflowNamespaceEntityKey in workflowNamespaceTypesInputArray) {
      let workflowNamespaceEntity = workflowNamespaceTypesInputArray[workflowNamespaceEntityKey];
      if (workflowNamespaceEntity.toUpperCase().trim() === wrd.cFRAMEWORK || workflowNamespaceEntity.toUpperCase().trim() === wrd.cPLATFORM) {
        workflowNamespaceTypesConfirmedArray.push(wrd.cFramework);
      } else if (workflowNamespaceEntity.toUpperCase().trim() === wrd.cAPPLICATION || workflowNamespaceEntity.toUpperCase().trim() === wrd.cAPP) {
        workflowNamespaceTypesConfirmedArray.push(wrd.cApplication);
      } else if (workflowNamespaceEntity.toUpperCase().trim() === wrd.cPLUGINS || workflowNamespaceEntity.toUpperCase().trim() === wrd.cPLUGIN) {
        workflowNamespaceTypesConfirmedArray.push(wrd.cPlugins);
      } else if (workflowNamespaceEntity === '') {
        // Just ignore it!
      } else {
        // Not sure what the user may have entered here, but it could be some valid namespace, so just add it to the array, and assume best intent.
        // If its going to error out, then it will print an error some place else.
        workflowNamespaceTypesConfirmedArray.push(workflowNamespaceEntity);
      }
    } // End-for (let workflowNamespaceEntityKey in workflowNamespaceTypesInputArray)
    if (workflowNamespaceTypesConfirmedArray.length > 0) {
      validUserEntry = true;
    }
  } else {
    // User didn't enter any parameters at al....just gather them all!
    workflowNamespaceTypesConfirmedArray = validWorkflowsNamespaceTypes;
    validUserEntry = true;
  }

  // workflowNamespaceTypesConfirmedArray is:
  await loggers.consoleLog(namespacePrefix + functionName, msg.cworkflowNamespaceTypesConfirmedArrayIs + JSON.stringify(workflowNamespaceTypesConfirmedArray));

  if (validUserEntry) {
    if (workflowNamespaceTypesConfirmedArray.length > 0) {
      for (const workflowNamespaceTypeConfirmedKey in workflowNamespaceTypesConfirmedArray) {
        const workflowNamespaceTypeConfirmedEntity = workflowNamespaceTypesConfirmedArray[workflowNamespaceTypeConfirmedKey];
        if (workflowNamespaceTypeConfirmedEntity === wrd.cFramework) {
          // processing framework workflows
          await loggers.consoleLog(namespacePrefix + functionName, msg.cprocessingFrameworkWorkflows);
          let frameworkWorkflows = await workflowBroker.getAllWorkflows(D[sys.cCommandWorkflows][wrd.cFramework]);
          if (frameworkWorkflows) {
            if (namespaceAllWorkflowsDataObject.length != 0) {
              // frameworkWorkflows is:
              await loggers.consoleLog(namespacePrefix + functionName, msg.cframeworkWorkflowsIs + JSON.stringify(frameworkWorkflows));
              namespaceAllWorkflowsDataObject.push(...frameworkWorkflows);
            } else {
              namespaceAllWorkflowsDataObject = frameworkWorkflows;
            }
          } // End-if (frameworkWorkflows)
        } else if (workflowNamespaceTypeConfirmedEntity === wrd.cApplication) {
          // processing application workflows
          await loggers.consoleLog(namespacePrefix + functionName, msg.cprocessingApplicationWorkflows);
          let applicationWorkflows = await workflowBroker.getAllWorkflows(D[sys.cCommandWorkflows][wrd.cApplication]);
          if (applicationWorkflows) {
            if (namespaceAllWorkflowsDataObject.length != 0) {
              // applicationWorkflows is:
              await loggers.consoleLog(namespacePrefix + functionName, msg.capplicationWorkflowsIs + JSON.stringify(applicationWorkflows));
              namespaceAllWorkflowsDataObject.push(...applicationWorkflows);
            } else {
              namespaceAllWorkflowsDataObject = applicationWorkflows;
            }
          } // End-if (applicationWorkflows)
        } else if (workflowNamespaceTypeConfirmedEntity === wrd.cPlugins) {
          if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenablePluginLoader)) {
            // processing plugins workflows
            await loggers.consoleLog(namespacePrefix + functionName, msg.cprocessingPluginsWorkflows);
            let pluginWorkflows = await workflowBroker.getAllWorkflows(D[sys.cCommandWorkflows][wrd.cPlugins]);
            if (pluginWorkflows) {
              if (namespaceAllWorkflowsDataObject.length != 0) {
                // pluginWorkflows is:
                await loggers.consoleLog(namespacePrefix + functionName, msg.cpluginWorkflowsIs + JSON.stringify(pluginWorkflows));
                namespaceAllWorkflowsDataObject.push(...pluginWorkflows);
              } else {
                namespaceAllWorkflowsDataObject = pluginWorkflows;
              }
            } // End-if (pluginWorkflows)
          } // End-if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenablePluginLoader))
        } else {
          // calling getWorkflowNamespaceDataObject() function,
          // because the user entered some namespace we should look for!
          // processing workflows for:
          await loggers.consoleLog(namespacePrefix + functionName, msg.cprocessingWorkflowsFor + workflowNamespaceTypeConfirmedEntity);
          let namespaceWorkflowData = await workflowBroker.getWorkflowNamespaceDataObject(undefined, workflowNamespaceTypeConfirmedEntity);
          // namespaceWorkflowData is:
          await loggers.consoleLog(namespacePrefix + functionName, msg.cnamespaceWorkflowDataIs + JSON.stringify(namespaceWorkflowData));
          if (namespaceWorkflowData === false) {
            // ERROR: The workflow namespace was not found.
            // Please make sure you have entered the correct name and try again.
            errorMessage = msg.cworkflowHelpCommandMessage01 + bas.cSpace + msg.chelpCommandMessage02;
            await loggers.consoleLog(wrd.cError, errorMessage);
          } else {
            // NOW call getAllWorkflows with the above found data!
            await loggers.consoleLog(namespacePrefix + functionName, msg.cworkfowHelpMessage03);
            let extraUserEnteredWorkflows = await workflowBroker.getAllWorkflows(namespaceWorkflowData);
            if (extraUserEnteredWorkflows) {
              if (namespaceAllWorkflowsDataObject.length != 0) {
                // extraUserEnteredWorkflows is:
                await loggers.consoleLog(namespacePrefix + functionName, msg.cextraUserEnteredWorkflowsIs + JSON.stringify(extraUserEnteredWorkflows));
                // namespaceAllWorkflowsDataObject = await ruleBroker.processRules([namespaceAllWorkflowsDataObject, extraUserEnteredWorkflows], [biz.cobjectDeepMerge]);
                namespaceAllWorkflowsDataObject.push(...extraUserEnteredWorkflows);
              } else {
                namespaceAllWorkflowsDataObject = extraUserEnteredWorkflows;
              }
            } // End-if (extraUserEnteredWorkflows)
          }
        }
        // namespaceAllWorkflowsDataObject is:
        await loggers.consoleLog(namespacePrefix + functionName, msg.cnamespaceAllWorkflowsDataObjectIs + JSON.stringify(namespaceAllWorkflowsDataObject));
      } // End-for (const workflowNamespaceTypeConfirmedKey in workflowNamespaceTypesConfirmedArray)
    } else {
      // Should never get here, but just in case we do, protect the system and get all the workflows data so the command can still finish successfully.
      // just call getAllWorkflows functions with no input,
      // will return all and print all.
      namespaceAllWorkflowsDataObject = await workflowBroker.getAllWorkflows();
    }
    returnData[1] = await ruleBroker.processRules([namespaceAllWorkflowsDataObject, ''], [biz.carrayDeepClone]);
    // namespaceAllWorkflowsDataObject is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cnamespaceAllWorkflowsDataObjectIs + JSON.stringify(namespaceAllWorkflowsDataObject));
    await loggers.consoleTableLog(baseFileName + bas.cDot + functionName, namespaceAllWorkflowsDataObject);
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function printCommands
 * @description Prints out a RAW dump of the commands data structure, useful for debugging the commands in the live environment.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,array<string>>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an empty.
 * @author Seth Hollingsead
 * @date 2023/11/10
 */
async function printCommands(inputData, inputMetaData) {
  let functionName = printCommands.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, []];
  await loggers.consoleLog(wrd.cInfo, msg.ccommandsAre, D[wrd.cCommands]);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function printBusinessRules
 * @description Prints out a RAW dump of the business rules data structure, useful for debugging the business rules in the live environment.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,array<string>>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an empty.
 * @author Seth Hollingsead
 * @date 2023/11/10
 */
async function printBusinessRules(inputData, inputMetaData) {
  let functionName = printBusinessRules.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, []];
  await loggers.consoleLog(wrd.cInfo, msg.cbusinessRulesAre, D[sys.cbusinessRules]);
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function printUserCommandsLog
 * @description Prints out the command log of all the commands the user has entered since the start of the application for this instance it was running.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,array<string>>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an array of strings that is the user entered commands.
 * @author Seth Hollingsead
 * @date 2023/02/14
 */
async function printUserCommandsLog(inputData, inputMetaData) {
  let functionName = printUserCommandsLog.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, []];
  if (await configurator.getConfigurationSetting(wrd.csystem, cfg.clogUserEnteredCommands) === true) {
    if (await stack.isEmpty(sys.cUserEnteredCommandLog) === false) {
      let userEnteredCommandLogArray = await stack.getStackContents(sys.cUserEnteredCommandLog);
      let userEnteredCommandLog = userEnteredCommandLogArray.join(bas.cComa + bas.cNewLine + bas.cCarriageReturn);
      returnData[1] = userEnteredCommandLog;
      await loggers.consoleLog(wrd.cInfo, userEnteredCommandLog);
    } else {
      // User commands log is empty.
      await loggers.consoleLog(wrd.cInfo, msg.cUserCommandsLogIsEmpty);
      returnData[1] = '';
    }
  } else {
    // NOTE: The user entered command log setting is not enabled.
    // Change the setting logUserEnteredCommands to enable user entered command log data to be captured for printing.
    await loggers.consoleLog(wrd.cInfo, msg.cprintUserCommandLogMessage01 + bas.cSpace + msg.cprintUserCommandLogMessage02);
    returnData[1] = false;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function printAllCommandsLog
 * @description Prints out a log of all the commands executed by the system since the start of the application for this instance it was running.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,array<string>>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by an array of strings that is the user entered commands.
 * @author Seth Hollingsead
 * @date 2023/02/14
 */
async function printAllCommandsLog(inputData, inputMetaData) {
  let functionName = printAllCommandsLog.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, []];
  if (await configurator.getConfigurationSetting(wrd.csystem, cfg.clogAllCommands) === true) {
    if (await stack.isEmpty(sys.cSystemCommandLog) === false) {
      let allCommandsLogArray = await stack.getStackContents(sys.cSystemCommandLog);
      let allCommandsLog = allCommandsLogArray.join(bas.cComa + bas.cNewLine + bas.cCarriageReturn);
      returnData[1] = allCommandsLog;
      await loggers.consoleLog(wrd.cInfo, allCommandsLog);
    } else {
      // All commands log is empty.
      await loggers.consoleLog(wrd.cInfo, msg.cAllCommandsLogIsEmpty);
      returnData[1] = '';
    }
  } else {
    // NOTE: The command log setting is not enabled.
    // Change the setting logAllCommands to enable command log data to be captured for printing.
    await loggers.consoleLog(wrd.cInfo, msg.cprintAllCommandLogMessage01 + bas.cSpace + msg.cprintAllCommandLogMessage02);
    returnData[1] = false;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function clearUserCommandsLog
 * @description Wipes out the user command log, destroying all evidence of whatever commands the user has entered.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,boolean>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by another boolean value to indicate if the operation was successful or not.
 * @author Seth Hollingsead
 * @date 2023/02/14
 */
async function clearUserCommandsLog(inputData, inputMetaData) {
  let functionName = clearUserCommandsLog.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, []];
  if (await configurator.getConfigurationSetting(wrd.csystem, cfg.clogUserEnteredCommands) === true) {
    if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenableUserCommandsLogClearing) === true) {
      returnData[1] = await stack.clearStack(sys.cUserEnteredCommandLog);
    } else {
      // NOTE: User commands log clearing setting is not enabled.
      await loggers.consoleLog(wrd.cInfo, msg.cclearUserCommandsLogMessage01);
      returnData[1] = false;
    }
  } else {
    // NOTE: The user entered command log setting is not enabled.
    await loggers.consoleLog(wrd.cInfo, msg.cprintUserCommandLogMessage01);
    returnData[1] = false;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function clearAllCommandsLog
 * @description Wipes out the all commands log, destroying all evidence of whatever commands were executed by the system.
 * @param {string} inputData Not used for this command.
 * @param {string} inputMetaData Not used for this command.
 * @return {array<boolean,boolean>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by another boolean value to indicate if the operation was successful or not.
 * @author Seth Hollingsead
 * @date 2023/02/14
 */
async function clearAllCommandsLog(inputData, inputMetaData) {
  let functionName = clearAllCommandsLog.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, []];
  if (await configurator.getConfigurationSetting(wrd.csystem, cfg.clogAllCommands) === true) {
    if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenableAllCommandsLogClearing) === true) {
      returnData[1] = await stack.clearStack(sys.cSystemCommandLog);
    } else {
      // NOTE: All commands log clearing setting is not enabled.
      await loggers.consoleLog(wrd.cInfo, msg.cclearAllCommandsLogMessage01);
      returnData[1] = false;
    }
  } else {
    // NOTE: The command log setting is not enabled.
    await loggers.consoleLog(wrd.cInfo, msg.cprintAllCommandLogMessage01);
    returnData[1] = false;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  echoCommand,
  exit,
  version,
  about,
  name,
  clearScreen,
  help,
  workflowHelp,
  printCommands,
  printBusinessRules,
  printUserCommandsLog,
  printAllCommandsLog,
  clearUserCommandsLog,
  clearAllCommandsLog
};
