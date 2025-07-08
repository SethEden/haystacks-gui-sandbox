/**
 * @file warden.js
 * @module warden
 * @description Contains all the functions to manage the entire haystacks-dui-sandbox testHarness application at the highest level.
 * Also provides an interface to easily manage all the framework features and various functionality from a single point of entry.
 * This is a single roll-up where all of the application commands engage with to dynamically generate application actions.
 * @requires module:application.configuration.constants
 * @requires module:application.constants
 * @requires module:application.message.constants
 * @requires module:application.system.constants
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/04 - Happy 4th of July!! Independence Day! America Day
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as apc_cfg from '../constants/application.configuration.constants.js';
import * as apc from '../constants/application.constants.js';
import * as apc_msg from '../constants/application.message.constants.js';
import * as apc_sys from '../constants/application.system.constants.js';
import haystacksGui from '../../../../src/main.js';
// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, biz, cmd, cfg, gen, msg, sys, wrd} = hayConst;
let baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// application.testHarness.controllers.warden.
const namespacePrefix = wrd.capplication + bas.cDot + apc.cApplicationName + bas.cDot + wrd.ccontrollers + bas.cDot + baseFileName + bas.cDot;

/**
 * @function initApplication
 * @description This function serves the purpose of packaging up all of the application specific configurations,
 * and ensuring that they all get stored on the haystacks configuration data stack so that all of that configuration data,
 * data paths and everything will be available to start ingesting of the filtered and optimized application dependency data.
 * @param {object} appConfig Contains a JSON data object that has all of the application paths where data should be loaded from,
 * as well as all the other configuration settings that should be set as part of the application startup process.
 * @param {boolean} transmitLogs A True or False value to indicate if logs should be transmitted or not.
 * @return {boolean} A True or False value to indicate if the initialization was completed successfully or not.
 * @author Seth Hollingsead
 * @date 2025/07/04 - Happy 4th of July!! Independence Day! America Day
 */
async function initApplication(appConfig, transmitLogs) {
  const functionName = initApplication.name;
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  // appConfig is:
  await haystacksGui.consoleLog(namespacePrefix, functionName, apc_msg.cappConfigIs + JSON.stringify(appConfig));
  // transmitLogs is:
  await haystacksGui.consoleLog(namespacePrefix, functionName, apc_msg.ctransmitLogsIs + transmitLogs);
  let returnData = false;
  let clientLoggerToUse = '';
  if (transmitLogs === true) {
    clientLoggerToUse = apc_sys.cclientLoggerTransmit;
  } else {
    clientLoggerToUse = apc_sys.cclientLoggerNoTransmit;
    // Force the configuration setting not to transmit logs to the socket server, because there is none.
    await haystacksGui.setConfigurationSetting(wrd.csystem, apc_cfg.clogToSocketTransmissionEnabled, false);
  }
  
  // clientLoggerToUse is:
  await haystacksGui.consoleLog(namespacePrefix, functionName, apc_msg.cclientLoggerToUseIs + clientLoggerToUse);
  let clientLoggerSchema = await haystacksGui.getSchemaData(clientLoggerToUse);
  // clientLoggerSchema is:
  await haystacksGui.consoleLog(namespacePrefix, functionName, apc_msg.cclientLoggerSchemaIs + JSON.stringify(clientLoggerSchema));
  if (clientLoggerSchema) {
    await haystacksGui.setSchemaData(sys.cloggerSchema, clientLoggerSchema);
  }
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.creturnDataIs + returnData);
  await haystacksGui.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
}

export default {
  initApplication
}