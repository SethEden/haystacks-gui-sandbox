/**
 * @file application.message.constants.validation.js
 * @module application.message.constants.validation
 * @description Contains all validations for named application message constants.
 * @requires module:application.message.constants
 * @author Seth Hollingsead
 * @date 2025/06/22
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as app_msg from '../../constants/application.message.constants.js';

/**
 * @function applicationMessageConstantsValidation
 * @description Initializes the application message constants validation data objects array.
 * @return {array<object<Name,Actual,Expected>>} An array of constants validation data objects.
 * @author Seth Hollingsead
 * @date 2025/06/22
 */
export const applicationMessageConstantsValidation = [
  // Client String Parsing
  {Name: 'cclientStringParsingDotCustomEcho', Actual: app_msg.cclientStringParsingDotCustomEcho, Expected: 'clientStringParsing.customEcho'},

  // Application Test Harness
  {Name: 'cargumentDrivenInterfaceIs', Actual: app_msg.cargumentDrivenInterfaceIs, Expected: 'argumentDrivenInterface is: '},

  // Instructions
  {Name: 'cinstructionsMessage00', Actual: app_msg.cinstructionsMessage00, Expected: 'Instructions to end user: '},

  // Messages
  {Name: 'ccomparisonIterationIs', Actual: app_msg.ccomparisonIterationIs, Expected: 'comparison iteration is: '},
  {Name: 'cstartingPointIs', Actual: app_msg.cstartingPointIs, Expected: 'startingPoint is: '},
  {Name: 'cendingPointIs', Actual: app_msg.cendingPointIs, Expected: 'endingPoint is: '},
  {Name: 'cinputDataDotCharAtJIs', Actual: app_msg.cinputDataDotCharAtJIs, Expected: 'inputData.charAt(j) is: '},
  {Name: 'cinputDataDotCharAtInputDataDotLengthDash', Actual: app_msg.cinputDataDotCharAtInputDataDotLengthDash, Expected: 'inputData.charAt(inputData.length - '},
  {Name: 'cCloseParenthesisIs', Actual: app_msg.cCloseParenthesisIs, Expected: ') is: '},
  {Name: 'cWeGotMismatch', Actual: app_msg.cWeGotMismatch, Expected: 'We got a mismatch!'},
  {Name: 'cmisCompareCountBeforeIncrementIs', Actual: app_msg.cmisCompareCountBeforeIncrementIs, Expected: 'misCompareCount before increment is: '},
  {Name: 'cmisCompareCountPostIncrementIs', Actual: app_msg.cmisCompareCountPostIncrementIs, Expected: 'misCompareCount post increment is: '},
  {Name: 'cmisCompareCountAfterForLoopIs', Actual: app_msg.cmisCompareCountAfterForLoopIs, Expected: 'misCompareCount after the for-loop is: '},
  {Name: 'cclientLoggerToUseIs', Actual: app_msg.cclientLoggerToUseIs, Expected: 'clientLoggerToUse is: '},
  {Name: 'cclientLoggerSchemaIs', Actual: app_msg.cclientLoggerSchemaIs, Expected: 'clientLoggerSchema is: '},
  {Name: 'cappConfigIs', Actual: app_msg.cappConfigIs, Expected: 'appConfig is: '},
  {Name: 'ctransmitLogsIs', Actual: app_msg.ctransmitLogsIs, Expected: 'transmitLogs is: '},
  {Name: 'cwindowTitleIs', Actual: app_msg.cwindowTitleIs, Expected: 'windowTitle is: '},
  {Name: 'cinteractiveNativeCliWindowIs', Actual: app_msg.cinteractiveNativeCliWindowIs, Expected: 'interactiveNativeCliWindow is: '},
  {Name: 'cbatFilePathIs', Actual: app_msg.cbatFilePathIs, Expected: 'batFilePath is: '},

  {Name: 'cmostPopularNumberMessage01', Actual: app_msg.cmostPopularNumberMessage01, Expected: 'BEGIN first for-loop'},
  {Name: 'cmostPopularNumberMessage02', Actual: app_msg.cmostPopularNumberMessage02, Expected: 'BEGIN nested for-loop i = '},
  {Name: 'cmostPopularNumberMessage03', Actual: app_msg.cmostPopularNumberMessage03, Expected: 'BEGIN nested for-loop j = '},
  {Name: 'cmostPopularNumberMessage04', Actual: app_msg.cmostPopularNumberMessage04, Expected: 'FOUND a MATCH!!'},
  {Name: 'cmostPopularNumberMessage05', Actual: app_msg.cmostPopularNumberMessage05, Expected: 'inputMetaData[i] is: '},
  {Name: 'cmostPopularNumberMessage06', Actual: app_msg.cmostPopularNumberMessage06, Expected: 'inputMetaData[j] is: '},
  {Name: 'cmostPopularNumberMessage07', Actual: app_msg.cmostPopularNumberMessage07, Expected: 'contents of tempArray1 are: '},
  {Name: 'cmostPopularNumberMessage08', Actual: app_msg.cmostPopularNumberMessage08, Expected: 'END nested for-loop j = '},
  {Name: 'cmostPopularNumberMessage09', Actual: app_msg.cmostPopularNumberMessage09, Expected: 'END nested for-loop i = '},
  {Name: 'cmostPopularNumberMessage10', Actual: app_msg.cmostPopularNumberMessage10, Expected: 'END first for-loop'},
  {Name: 'cmostPopularNumberMessage11', Actual: app_msg.cmostPopularNumberMessage11, Expected: 'BEGIN second for-loop'},
  {Name: 'cmostPopularNumberMessage12', Actual: app_msg.cmostPopularNumberMessage12, Expected: 'BEGIN iteration j = '},
  {Name: 'cmostPopularNumberMessage13', Actual: app_msg.cmostPopularNumberMessage13, Expected: 'tempArray1[i] is: '},
  {Name: 'cmostPopularNumberMessage14', Actual: app_msg.cmostPopularNumberMessage14, Expected: 'instanceCounter before increment is: '},
  {Name: 'cmostPopularNumberMessage15', Actual: app_msg.cmostPopularNumberMessage15, Expected: 'instanceCounter after increment is: '},
  {Name: 'cmostPopularNumberMessage16', Actual: app_msg.cmostPopularNumberMessage16, Expected: 'contents of tempArray2 are: '},
  {Name: 'cmostPopularNumberMessage17', Actual: app_msg.cmostPopularNumberMessage17, Expected: 'END iteration j = '},
  {Name: 'cmostPopularNumberMessage18', Actual: app_msg.cmostPopularNumberMessage18, Expected: 'END nested for-loop i = '},
  {Name: 'cmostPopularNumberMessage19', Actual: app_msg.cmostPopularNumberMessage19, Expected: 'END second for-loop'},
  {Name: 'cmostPopularNumberMessage20', Actual: app_msg.cmostPopularNumberMessage20, Expected: 'BEGIN third for-loop'},
  {Name: 'cmostPopularNumberMessage21', Actual: app_msg.cmostPopularNumberMessage21, Expected: 'tempArray2.length is: '},
  {Name: 'cmostPopularNumberMessage22', Actual: app_msg.cmostPopularNumberMessage22, Expected: 'BEGIN iteration i = '},
  {Name: 'cmostPopularNumberMessage23', Actual: app_msg.cmostPopularNumberMessage23, Expected: 'if-condition i = 0 has been met! i = '},
  {Name: 'cmostPopularNumberMessage24', Actual: app_msg.cmostPopularNumberMessage24, Expected: 'if-condition-else i <> 0 has been met! i = '},
  {Name: 'cmostPopularNumberMessage25', Actual: app_msg.cmostPopularNumberMessage25, Expected: 'found one greater'},
  {Name: 'cmostPopularNumberMessage26', Actual: app_msg.cmostPopularNumberMessage26, Expected: 'tempArray2[i] is: '},
  {Name: 'cmostPopularNumberMessage27', Actual: app_msg.cmostPopularNumberMessage27, Expected: 'tempArray2[i - 1] is: '},
  {Name: 'cmostPopularNumberMessage28', Actual: app_msg.cmostPopularNumberMessage28, Expected: 'END iteration i = '},
  {Name: 'cmostPopularNumberMessage29', Actual: app_msg.cmostPopularNumberMessage29, Expected: 'END third for-loop'},
  {Name: 'cmostPopularNumberMessage30', Actual: app_msg.cmostPopularNumberMessage30, Expected: 'INVALID ENTRY: Please enter some valid numbers.'},
  {Name: 'cmainPromptLoopMessage01', Actual: app_msg.cmainPromptLoopMessage01, Expected: 'programmingRunning is false. Returning.'},
  {Name: 'cmainPromptLoopMessage02', Actual: app_msg.cmainPromptLoopMessage02, Expected: 'Checking if command queue is empty...'},
  {Name: 'cmainPromptLoopMessage03', Actual: app_msg.cmainPromptLoopMessage03, Expected: 'isCommandQueueEmpty: '},
  {Name: 'cmainPromptLoopMessage04', Actual: app_msg.cmainPromptLoopMessage04, Expected: 'Prompting user (non-blocking)...'},
  {Name: 'cmainPromptLoopMessage05', Actual: app_msg.cmainPromptLoopMessage05, Expected: 'User entered: '},
  {Name: 'cmainPromptLoopMessage06', Actual: app_msg.cmainPromptLoopMessage06, Expected: 'Command enqueued, starting processCommandLoop...'},
  {Name: 'cmainPromptLoopMessage07', Actual: app_msg.cmainPromptLoopMessage07, Expected: 'Commands pending, processing queue...'},
  {Name: 'cprocessCommandLoopMessage01', Actual: app_msg.cprocessCommandLoopMessage01, Expected: 'Processing next command in queue...'},
  {Name: 'cprocessCommandLoopMessage02', Actual: app_msg.cprocessCommandLoopMessage02, Expected: 'Exit condition met, ending processCommandLoop.'},
  {Name: 'cprocessCommandLoopMessage03', Actual: app_msg.cprocessCommandLoopMessage03, Expected: 'Command queue is empty, calling mainPromptLoop...'},
  {Name: 'claunchingInteractiveNativeCliShellWindow', Actual: app_msg.claunchingInteractiveNativeCliShellWindow, Expected: 'Launching interactive native CLI shell window.'},
  {Name: 'cinteractiveNativeCliWindowDisabledByConfig', Actual: app_msg.cinteractiveNativeCliWindowDisabledByConfig, Expected: 'Interactive nativeCLI window is disabled by configuration.'},
  {Name: 'cconnectedToHastacksGuiServerCommandsBelow', Actual: app_msg.cconnectedToHastacksGuiServerCommandsBelow, Expected: 'Connected to Haystacks GUI server. Type commands below: '},
  {Name: 'cWarningUnknownMessageType', Actual: app_msg.cWarningUnknownMessageType, Expected: 'WARNING: We have no idea what kind of object we are dealing with!'},
  {Name: 'cdisconnectedFromServer', Actual: app_msg.cdisconnectedFromServer, Expected: 'Disconnected from server.'},
  {Name: 'csocketError', Actual: app_msg.csocketError, Expected: 'Socket error: '},
  {Name: 'cshuttingDownGoodbye', Actual: app_msg.cshuttingDownGoodbye, Expected: 'shutting down, goodbye.'},
  {Name: 'cshutdownAllMessage01', Actual: app_msg.cshutdownAllMessage01, Expected: 'Attempting to kill windows with title containing: '},
  {Name: 'cshutdownAllMessage02', Actual: app_msg.cshutdownAllMessage02, Expected: 'Successfully killed window titled: '},
  {Name: 'cshutdownAllMessage03', Actual: app_msg.cshutdownAllMessage03, Expected: 'No window with title found or killed: '},
  {Name: 'cshutdownAllMessage04', Actual: app_msg.cshutdownAllMessage04, Expected: 'Finished killShellWindowByTitle'},

  {Name: 'cisAlmostPalindromeInvalidEntry', Actual: app_msg.cisAlmostPalindromeInvalidEntry, Expected: 'INVALID ENTRY: Please enter some valid string.'},
  {Name: 'cstringInputIs', Actual: app_msg.cstringInputIs, Expected: 'stringInput is: '},
  {Name: 'cstringArrayIs', Actual: app_msg.cstringArrayIs, Expected: 'stringArray is: '},
  {Name: 'cthreePointAverageInvalidInput', Actual: app_msg.cthreePointAverageInvalidInput, Expected: 'INVALID ENTRY: Please enter 3 arrays of numbers each containing 2 numbers in the following format: '},
  {Name: 'cthreePointAverageInputFormat', Actual: app_msg.cthreePointAverageInputFormat, Expected: '[x1,y1] [x2,y2] [x3,y3]'},
  {Name: 'cx1Is', Actual: app_msg.cx1Is, Expected: 'x1 is: '},
  {Name: 'cy1Is', Actual: app_msg.cy1Is, Expected: 'y1 is: '},
  {Name: 'cx2Is', Actual: app_msg.cx2Is, Expected: 'x2 is: '},
  {Name: 'cy2Is', Actual: app_msg.cy2Is, Expected: 'y2 is: '},
  {Name: 'cx3Is', Actual: app_msg.cx3Is, Expected: 'x3 is: '},
  {Name: 'cy3Is', Actual: app_msg.cy3Is, Expected: 'y3 is: '},
  {Name: 'cx1x2x3Is', Actual: app_msg.cx1x2x3Is, Expected: 'x1 + x2 + x3 is: '},
  {Name: 'cy1y2y3Is', Actual: app_msg.cy1y2y3Is, Expected: 'y1 + y2 + y3 is: '},

  // Constants Validation
  {Name: 'callClientConstantsValidationDataIs', Actual: app_msg.callClientConstantsValidationDataIs, Expected: 'allClientConstantsValidationData is: '},
  {Name: 'cresolvedConstantsPath_ApplicationBusinessIs', Actual: app_msg.cresolvedConstantsPath_ApplicationBusinessIs, Expected: 'resolvedConstantsPath_ApplicationBusiness is: '},
  {Name: 'cresolvedConstantsPath_ApplicationCommandIs', Actual: app_msg.cresolvedConstantsPath_ApplicationCommandIs, Expected: 'resolvedConstantsPath_ApplicationCommand is: '},
  {Name: 'cresolvedConstantsPath_ApplicationConfigurationIs', Actual: app_msg.cresolvedConstantsPath_ApplicationConfigurationIs, Expected: 'resolvedConstantsPath_ApplicationConfiguration is: '},
  {Name: 'cresolvedConstantsPath_ApplicationConstantIs', Actual: app_msg.cresolvedConstantsPath_ApplicationConstantIs, Expected: 'resolvedConstantsPath_ApplicationConstant is: '},
  {Name: 'cresolvedConstantsPath_ApplicationMessageIs', Actual: app_msg.cresolvedConstantsPath_ApplicationMessageIs, Expected: 'resolvedConstantsPath_ApplicationMessage is: '},
  {Name: 'cresolvedConstantsPath_ApplicationSystemIs', Actual: app_msg.cresolvedConstantsPath_ApplicationSystemIs, Expected: 'resolvedConstantsPath_ApplicationSystem is: '},

  {Name: 'cApplicationBusinessConstantsPhase1Validation', Actual: app_msg.cApplicationBusinessConstantsPhase1Validation, Expected: 'Application Business Constants Phase 1 Validation'},
  {Name: 'cApplicationCommandConstantsPhase1Validation', Actual: app_msg.cApplicationCommandConstantsPhase1Validation, Expected: 'Application Command Constants Phase 1 Validation'},
  {Name: 'cApplicationConfigurationConstantsPhase1Validation', Actual: app_msg.cApplicationConfigurationConstantsPhase1Validation, Expected: 'Application Configuration Constants Phase 1 Validation'},
  {Name: 'cApplicationConstantsPhase1Validation', Actual: app_msg.cApplicationConstantsPhase1Validation, Expected: 'Application Constants Phase 1 Validation'},
  {Name: 'cApplicationMessageConstantsPhase1Validation', Actual: app_msg.cApplicationMessageConstantsPhase1Validation, Expected: 'Application Message Constants Phase 1 Validation'},
  {Name: 'cApplicationSystemConstantsPhase1Validation', Actual: app_msg.cApplicationSystemConstantsPhase1Validation, Expected: 'Application System Constants Phase 1 Validation'},

  {Name: 'cApplicationBusinessConstantsPhase2Validation', Actual: app_msg.cApplicationBusinessConstantsPhase2Validation, Expected: 'Application Business Constants Phase 2 Validation'},
  {Name: 'cApplicationCommandConstantsPhase2Validation', Actual: app_msg.cApplicationCommandConstantsPhase2Validation, Expected: 'Application Command Constants Phase 2 Validation'},
  {Name: 'cApplicationConfigurationConstantsPhase2Validation', Actual: app_msg.cApplicationConfigurationConstantsPhase2Validation, Expected: 'Application Configuration Constants Phase 2 Validation'},
  {Name: 'cApplicationConstantsPhase2Validation', Actual: app_msg.cApplicationConstantsPhase2Validation, Expected: 'Application Constants Phase 2 Validation'},
  {Name: 'cApplicationMessageConstantsPhase2Validation', Actual: app_msg.cApplicationMessageConstantsPhase2Validation, Expected: 'Application Message Constants Phase 2 Validation'},
  {Name: 'cApplicationSystemConstantsPhase2Validation', Actual: app_msg.cApplicationSystemConstantsPhase2Validation, Expected: 'Application System Constants Phase 2 Validation'},

  {Name: 'capplicationMessage00', Actual: app_msg.capplicationMessage00, Expected: 'Caught the case that some arguments were passed in as input to the function.'},
  {Name: 'capplicationMessage01', Actual: app_msg.capplicationMessage01, Expected: 'BEGIN main program loop'},
  {Name: 'capplicationMessage02', Actual: app_msg.capplicationMessage02, Expected: 'BEGIN command parser'},
  {Name: 'capplicationMessage03', Actual: app_msg.capplicationMessage03, Expected: 'END command parser'},
  {Name: 'capplicationMessage04', Actual: app_msg.capplicationMessage04, Expected: 'END main program loop'},
  {Name: 'capplicationMessage05', Actual: app_msg.capplicationMessage05, Expected: 'Exiting TEST HARNESS APPLICATION'}

];