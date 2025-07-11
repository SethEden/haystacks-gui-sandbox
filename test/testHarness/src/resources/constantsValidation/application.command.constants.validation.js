/**
 * @file application.command.constants.validation.js
 * @module application.command.constants.validation
 * @description Contains all validations for named application command constants.
 * @requires module:application.command.constants
 * @author Seth Hollingsead
 * @date 2025/06/22
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as app_cmd from '../../constants/application.command.constants.js';

/**
 * @function applicationCommandConstantsValidation
 * @description Initializes the application command constants validation data objects array.
 * @return {array<Object<NamedCurve,Actual,Expected>>} An array of constants validation data objects.
 * @author Seth Hollingsead
 * @date 2025/06/22
 */
export const applicationCommandConstantsValidation = [
  // ********************************
  // ApplicationSystem Commands in order
  // ********************************
  {Name: 'cinstructions', Actual: app_cmd.cinstructions, Expected: 'instructions'},
  {Name: 'capplicationHelp', Actual: app_cmd.capplicationHelp, Expected: 'applicationHelp'},
  {Name: 'capplicationWorkflowHelp', Actual: app_cmd.capplicationWorkflowHelp, Expected: 'applicationWorkflowHelp'},

  // ********************************
  // ApplicationTest Commands in order
  // ********************************
  {Name: 'cvalidateApplicationConstants', Actual: app_cmd.cvalidateApplicationConstants, Expected: 'validateApplicationConstants'},
  {Name: 'cvalidateApplicationCommandAliases', Actual: app_cmd.cvalidateApplicationCommandAliases, Expected: 'validateApplicationCommandAliases'},
  {Name: 'cvalidateApplicationWorkflows', Actual: app_cmd.cvalidateApplicationWorkflows, Expected: 'validateApplicationWorkflows'},
  {Name: 'callApplicationValidations', Actual: app_cmd.callApplicationValidations, Expected: 'allApplicationValidations'},

  // ********************************
  // Client Commands in order
  // ********************************
  {Name: 'ccustomEchoCommand', Actual: app_cmd.ccustomEchoCommand, Expected: 'customEchoCommand'},
  {Name: 'cbossPanic', Actual: app_cmd.cbossPanic, Expected: 'bossPanic'},
  {Name: 'ccommand01', Actual: app_cmd.ccommand01, Expected: 'command01'},
  {Name: 'ccommand02', Actual: app_cmd.ccommand02, Expected: 'command02'},
  {Name: 'ccommand03', Actual: app_cmd.ccommand03, Expected: 'command03'},
  {Name: 'ccommand04', Actual: app_cmd.ccommand04, Expected: 'command04'},
  {Name: 'ccommand05', Actual: app_cmd.ccommand05, Expected: 'command05'},
  {Name: 'ccommand06', Actual: app_cmd.ccommand06, Expected: 'command06'},
  {Name: 'ccommand07', Actual: app_cmd.ccommand07, Expected: 'command07'},
  {Name: 'ccommand08', Actual: app_cmd.ccommand08, Expected: 'command08'},
  {Name: 'ccommand09', Actual: app_cmd.ccommand09, Expected: 'command09'},
  {Name: 'ccommand10', Actual: app_cmd.ccommand10, Expected: 'command10'},

  // ********************************
  // Application Workflows in order
  // ********************************
  {Name: 'cApplicationStartupWorkflow', Actual: app_cmd.cApplicationStartupWorkflow, Expected: 'Workflow applicationStartup'}
];