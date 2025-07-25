/**
 * @file application.message.constants.js
 * @module application.message.constants
 * @description Contains many re-usable application message constants.
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @author Seth Hollingsead
 * @date 2025/06/22
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal Imports
import * as app_sys from './application.system.constants.js';

// External imports
import hayConst from '@haystacks/constants';
const {bas, gen, msg, num, phn, sys, wrd} = hayConst;

// Client String Parsing
export const cclientStringParsingDotCustomEcho = wrd.cclient + wrd.cString + wrd.cParsing + bas.cDot + wrd.ccustom + wrd.cEcho; // clientStringParsing.customEcho

// Application Test Harness
export const cargumentDrivenInterfaceIs = wrd.cargument + wrd.cDriven + wrd.cInterface + sys.cSpaceIsColonSpace; // argumentDrivenInterface is:

// Instructions
export const cinstructionsMessage00 = wrd.cInstructions + bas.cSpace + wrd.cto + bas.cSpace + wrd.cend + bas.cSpace + wrd.cuser + bas.cColon + bas.cSpace; // Instructions to end user:

// Messages
export const ccomparisonIterationIs = wrd.ccomparison + bas.cSpace + wrd.citeration + sys.cSpaceIsColonSpace; // comparison iteration is:
export const cstartingPointIs = wrd.cstarting + wrd.cPoint + sys.cSpaceIsColonSpace; // startingPoint is:
export const cendingPointIs = wrd.cending + wrd.cPoint + sys.cSpaceIsColonSpace; // endingPoint is:
export const cinputDataDotCharAtJIs = wrd.cinput + wrd.cData + bas.cDot + wrd.cchar + wrd.cAt + bas.cOpenParenthesis + bas.cj + bas.cCloseParenthesis + sys.cSpaceIsColonSpace; // inputData.charAt(j) is:
export const cinputDataDotCharAtInputDataDotLengthDash = wrd.cinput + wrd.cData + bas.cDot + wrd.cchar + wrd.cAt + bas.cOpenParenthesis + wrd.cinput + wrd.cData + bas.cDot + wrd.clength + bas.cSpace + bas.cDash + bas.cSpace; // inputData.charAt(inputData.length) -
export const cCloseParenthesisIs = bas.cCloseParenthesis + sys.cSpaceIsColonSpace; // ) is:
export const cWeGotMismatch = bas.cWe + bas.cSpace + wrd.cgot + bas.cSpace + bas.ca + bas.cSpace + phn.cmis + wrd.cmatch + bas.cExclamation; // We got a mismatch!
export const cmisCompareCountBeforeIncrementIs = phn.cmis + wrd.cCompare + wrd.cCount + bas.cSpace + wrd.cbefore + bas.cSpace + wrd.cincrement + sys.cSpaceIsColonSpace; // misCompareCount before increment is:
export const cmisCompareCountPostIncrementIs = phn.cmis + wrd.cCompare + wrd.cCount + bas.cSpace + wrd.cpost + bas.cSpace + wrd.cincrement + sys.cSpaceIsColonSpace; // misCompareCount post increment is:
export const cmisCompareCountAfterForLoopIs = phn.cmis + wrd.cCompare + wrd.cCount + bas.cSpace + wrd.cafter + bas.cSpace + wrd.cthe + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop + sys.cSpaceIsColonSpace; // misCompareCount after the for-loop is:
export const cclientLoggerToUseIs = wrd.cclient + wrd.cLogger + wrd.cTo + wrd.cUse + sys.cSpaceIsColonSpace; // clientLoggerToUse is:
export const cclientLoggerSchemaIs = wrd.cclient + wrd.cLogger + wrd.cSchema + sys.cSpaceIsColonSpace; // clientLoggerSchema is:
export const cappConfigIs = wrd.capp + wrd.cConfig + sys.cSpaceIsColonSpace; // appConfig is:
export const ctransmitLogsIs = wrd.ctransmit + wrd.cLogs + sys.cSpaceIsColonSpace; // transmitLogs is:
export const cwindowTitleIs = wrd.cwindow + wrd.cTitle + sys.cSpaceIsColonSpace; // windowTitle is:
export const cinteractiveNativeCliWindowIs = wrd.cinteractive + wrd.cNative + gen.cCli + wrd.cWindow + sys.cSpaceIsColonSpace; // interactiveNativeCliWindow is:
export const cbatFilePathIs = gen.cbat + wrd.cFile + wrd.cPath + sys.cSpaceIsColonSpace; // batFilePath is:

export const cmostPopularNumberMessage01 = wrd.cBEGIN + bas.cSpace + num.cfirst + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop; // BEGIN first for-loop
export const cmostPopularNumberMessage02 = wrd.cBEGIN + bas.cSpace + wrd.cnested + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop + bas.cSpace + bas.ci + bas.cSpace + bas.cEqual + bas.cSpace; // BEGIN nested for-loop i =
export const cmostPopularNumberMessage03 = wrd.cBEGIN + bas.cSpace + wrd.cnested + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop + bas.cSpace + bas.cj + bas.cSpace + bas.cEqual + bas.cSpace; // BEGIN nested for-loop j =
export const cmostPopularNumberMessage04 = wrd.cFOUND + bas.cSpace + bas.ca + bas.cSpace + wrd.cMATCH + bas.cExclamation + bas.cExclamation; // FOUND a MATCH!!
export const cmostPopularNumberMessage05 = msg.cinputMetaData + bas.cOpenBracket + bas.ci + bas.cCloseBracket + sys.cSpaceIsColonSpace; // inputMetaData[i] is:
export const cmostPopularNumberMessage06 = msg.cinputMetaData + bas.cOpenBracket + bas.cj + bas.cCloseBracket + sys.cSpaceIsColonSpace; // inputMetaData[j] is:
export const cmostPopularNumberMessage07 = wrd.ccontents + bas.cSpace + bas.cof + bas.cSpace + wrd.ctemp + wrd.cArray + num.c1 + bas.cSpace + wrd.care + bas.cColon + bas.cSpace; // contents of tempArray1 are:
export const cmostPopularNumberMessage08 = wrd.cEND + bas.cSpace + wrd.cnested + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop + bas.cSpace + bas.cj + bas.cSpace + bas.cEqual + bas.cSpace; // END nested for-loop j =
export const cmostPopularNumberMessage09 = wrd.cEND + bas.cSpace + wrd.cnested + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop + bas.cSpace + bas.ci + bas.cSpace + bas.cEqual + bas.cSpace; // END nested for-loop i =
export const cmostPopularNumberMessage10 = wrd.cEND + bas.cSpace + num.cfirst + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop; // END first for-loop
export const cmostPopularNumberMessage11 = wrd.cBEGIN + bas.cSpace + num.csecond + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop; // BEGIN second for-loop
export const cmostPopularNumberMessage12 = wrd.cBEGIN + bas.cSpace + wrd.citeration + bas.cSpace + bas.cj + bas.cSpace + bas.cEqual + bas.cSpace; // BEGIN iteration j =
export const cmostPopularNumberMessage13 = wrd.ctemp + wrd.cArray + num.c1 + bas.cOpenBracket + bas.ci + bas.cCloseBracket + sys.cSpaceIsColonSpace; // tempArray1[i] is:
export const cmostPopularNumberMessage14 = wrd.cinstance + wrd.cCounter + bas.cSpace + wrd.cbefore + bas.cSpace + wrd.cincrement + sys.cSpaceIsColonSpace; // instanceCounter before increment is:
export const cmostPopularNumberMessage15 = wrd.cinstance + wrd.cCounter + bas.cSpace + wrd.cafter + bas.cSpace + wrd.cincrement + sys.cSpaceIsColonSpace; // instanceCounter after increment is:
export const cmostPopularNumberMessage16 = wrd.ccontents + bas.cSpace + wrd.cof + bas.cSpace + wrd.ctemp + wrd.cArray + num.c2 + bas.cSpace + wrd.care + bas.cColon + bas.cSpace; // contents of tempArray2 are:
export const cmostPopularNumberMessage17 = wrd.cEND + bas.cSpace + wrd.citeration + bas.cSpace + bas.cj + bas.cSpace + bas.cEqual + bas.cSpace; // END iteration j =
export const cmostPopularNumberMessage18 = wrd.cEND + bas.cSpace + wrd.cnested + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop + bas.cSpace + bas.ci + bas.cSpace + bas.cEqual + bas.cSpace; // END nested for-loop i =
export const cmostPopularNumberMessage19 = wrd.cEND + bas.cSpace + num.csecond + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop; // END second for-loop
export const cmostPopularNumberMessage20 = wrd.cBEGIN + bas.cSpace + num.cthird + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop; // BEGIN third for-loop
export const cmostPopularNumberMessage21 = wrd.ctemp + wrd.cArray + num.c2 + bas.cDot + wrd.clength + sys.cSpaceIsColonSpace; // tempArray2.length is:
export const cmostPopularNumberMessage22 = wrd.cBEGIN + bas.cSpace + wrd.citeration + bas.cSpace + bas.ci + bas.cSpace + bas.cEqual + bas.cSpace; // BEGIN iteration i =
// if-condition i = 0 has been met! i =
export const cmostPopularNumberMessage23 = wrd.cif + bas.cDash + wrd.ccondition + bas.cSpace + bas.ci + bas.cSpace + bas.cEqual + bas.cSpace + num.c0 + bas.cSpace + wrd.chas + bas.cSpace + wrd.cbeen + bas.cSpace + wrd.cmet + bas.cExclamation + bas.cSpace + bas.ci + bas.cSpace + bas.cEqual + bas.cSpace;
// if-condition-else i <> 0 has been met! i =
export const cmostPopularNumberMessage24 = wrd.cif + bas.cDash + wrd.ccondition + bas.cDash + wrd.celse + bas.cSpace + bas.ci + bas.cSpace + bas.cLessThan + bas.cGreaterThan + bas.cSpace + num.c0 + bas.cSpace + wrd.chas + bas.cSpace + wrd.cbeen + bas.cSpace + wrd.cmet + bas.cExclamation + bas.cSpace + bas.ci + bas.cSpace + bas.cEqual + bas.cSpace;
export const cmostPopularNumberMessage25 = wrd.cfound + bas.cSpace + num.cone + bas.cSpace + wrd.cgreater; // found one greater
export const cmostPopularNumberMessage26 = wrd.ctemp + wrd.cArray + num.c2 + bas.cOpenBracket + bas.ci + bas.cCloseBracket + sys.cSpaceIsColonSpace; // tempArray2[i] is:
export const cmostPopularNumberMessage27 = wrd.ctemp + wrd.cArray + num.c2 + bas.cOpenBracket + bas.ci + bas.cSpace + bas.cDash + bas.cSpace + num.c1 + bas.cCloseBracket + sys.cSpaceIsColonSpace; // tempArray2[i - 1] is:
export const cmostPopularNumberMessage28 = wrd.cEND + bas.cSpace + wrd.citeration + bas.cSpace + bas.ci + bas.cSpace + bas.cEqual + bas.cSpace; // END iteration i =
export const cmostPopularNumberMessage29 = wrd.cEND + bas.cSpace + num.cthird + bas.cSpace + wrd.cfor + bas.cDash + wrd.cloop; // END third for-loop
export const cmostPopularNumberMessage30 = wrd.cINVALID + bas.cSpace + wrd.cENTRY + bas.cColon + bas.cSpace + wrd.cPlease + bas.cSpace + wrd.center + bas.cSpace + wrd.csome + bas.cSpace + wrd.cvalid + bas.cSpace + wrd.cnumbers + bas.cDot; // INVALID ENTRY: Please enter some valid numbers.
export const cmainPromptLoopMessage01 = wrd.cprogramming + wrd.cRunning + bas.cSpace + wrd.cis + bas.cSpace + gen.cfalse + bas.cDot + bas.cSpace + wrd.cReturning + bas.cDot; // programmingRunning is false. Returning.
export const cmainPromptLoopMessage02 = wrd.cChecking + bas.cSpace + wrd.cif + bas.cSpace + wrd.ccommand + bas.cSpace + wrd.cqueue + bas.cSpace + wrd.cis + bas.cSpace + wrd.cempty + bas.cDot.repeat(3); // Checking if command queue is empty...
export const cmainPromptLoopMessage03 = wrd.cis + wrd.cCommand + wrd.cQueue + wrd.cEmpty + bas.cColon + bas.cSpace; // isCommandQueueEmpty:
export const cmainPromptLoopMessage04 = wrd.cPrompting + bas.cSpace + wrd.cuser + bas.cSpace + bas.cOpenParenthesis + phn.cnon + bas.cDash + wrd.cblocking + bas.cCloseParenthesis + bas.cDot.repeat(3); // Prompting user (non-blocking)...
export const cmainPromptLoopMessage05 = wrd.cUser + bas.cSpace + wrd.centered + bas.cColon + bas.cSpace; // User entered:
export const cmainPromptLoopMessage06 = wrd.cCommand + bas.cSpace + wrd.cenqueued + bas.cComa + bas.cSpace + wrd.cstarting + bas.cSpace + wrd.cprocess + wrd.cCommand + wrd.cLoop + bas.cDot.repeat(3); // Command enqueued, starting processCommandLoop...
export const cmainPromptLoopMessage07 = wrd.cCommands + bas.cSpace + wrd.cpending + bas.cComa + bas.cSpace + wrd.cprocessing + bas.cSpace + wrd.cqueue + bas.cDot.repeat(3); // Commands pending, processing queue...
export const cprocessCommandLoopMessage01 = wrd.cProcessing + bas.cSpace + wrd.cnext + bas.cSpace + wrd.ccommand + bas.cSpace + wrd.cin + bas.cSpace + wrd.cqueue + bas.cDot.repeat(3); // Processing next command in queue...
export const cprocessCommandLoopMessage02 = wrd.cExit + bas.cSpace + wrd.ccondition + bas.cSpace + wrd.cmet + bas.cComa + bas.cSpace + wrd.cending + bas.cSpace + wrd.cprocess + wrd.cCommand + wrd.cLoop + bas.cDot; // Exit condition met, ending processCommandLoop.
export const cprocessCommandLoopMessage03 = wrd.cCommand + bas.cSpace + wrd.cqueue + bas.cSpace + wrd.cis + bas.cSpace + wrd.cempty + bas.cComa + bas.cSpace + wrd.ccalling + bas.cSpace + wrd.cmain + wrd.cPrompt + wrd.cLoop + bas.cDot.repeat(3); // Command queue is empty, calling mainPromptLoop...
export const claunchingInteractiveNativeCliShellWindow = wrd.cLaunching + bas.cSpace + wrd.cinteractive + bas.cSpace + wrd.cnative + bas.cSpace + gen.cCLI + bas.cSpace + wrd.cshell + bas.cSpace + wrd.cwindow + bas.cDot; // Launching interactive native CLI shell window.
export const cinteractiveNativeCliWindowDisabledByConfig = wrd.cInteractive + bas.cSpace + wrd.cnative + gen.cCLI + bas.cSpace + wrd.cwindow + bas.cSpace + wrd.cis + bas.cSpace + wrd.cdisabled + bas.cSpace + wrd.cby + bas.cSpace + wrd.cconfiguration + bas.cDot; // Interactive nativeCLI window is disabled by configuration.
export const cconnectedToHastacksGuiServerCommandsBelow = wrd.cConnected + bas.cSpace + wrd.cto + bas.cSpace + wrd.cHaystacks + bas.cSpace + gen.cGUI + bas.cSpace + wrd.cserver + bas.cDot + bas.cSpace + wrd.cType + bas.cSpace + wrd.ccommands + bas.cSpace + wrd.cbelow + bas.cColon + bas.cSpace; // Connected to Haystacks GUI server. Type commands below:
export const cWarningUnknownMessageType = msg.cWARNING_Colon + wrd.cWe + bas.cSpace + wrd.chave + bas.cSpace + wrd.cno + bas.cSpace + wrd.cidea + bas.cSpace + wrd.cwhat + bas.cSpace + wrd.ckind + bas.cSpace + wrd.cof + bas.cSpace + wrd.cobject + bas.cSpace + wrd.cwe + bas.cSpace + wrd.care + bas.cSpace + wrd.cdealing + bas.cSpace + wrd.cwith + bas.cExclamation; // WARNING: We have no idea what kind of object we are dealing with!
export const cdisconnectedFromServer = wrd.cDisconnected + bas.cSpace + wrd.cfrom + bas.cSpace + wrd.cserver + bas.cDot; // Disconnected from server.
export const csocketError = wrd.cSocket + bas.cSpace + wrd.cerror + bas.cColon + bas.cSpace; // Socket error:
export const cshuttingDownGoodbye = wrd.cshutting + bas.cSpace + wrd.cdown + bas.cComa + bas.cSpace + wrd.cgood + wrd.cbye + bas.cDot; // shutting down, goodbye.
export const cshutdownAllMessage01 = wrd.cAttempting + bas.cSpace + wrd.cto + bas.cSpace + wrd.ckill + bas.cSpace + wrd.cwindows + bas.cSpace + wrd.cwith + bas.cSpace + wrd.ctitle + bas.cSpace + wrd.ccontaining + bas.cColon + bas.cSpace; // Attempting to kill windows with title containing:
export const cshutdownAllMessage02 = wrd.cSuccessfully + bas.cSpace + wrd.ckilled + bas.cSpace + wrd.cwindow + bas.cSpace + wrd.ctitled + bas.cColon + bas.cSpace; // Successfully killed window titled:
export const cshutdownAllMessage03 = wrd.cNo + bas.cSpace + wrd.cwindow + bas.cSpace + wrd.cwith + bas.cSpace + wrd.ctitle + bas.cSpace + wrd.cfound + bas.cSpace + wrd.cor + bas.cSpace + wrd.ckilled + bas.cColon + bas.cSpace; // No window with title found or killed:
export const cshutdownAllMessage04 = wrd.cFinished + bas.cSpace + wrd.ckill + wrd.cShell + wrd.cWindow + wrd.cBy + wrd.cTitle; // Finished killShellWindowByTitle

export const cisAlmostPalindromeInvalidEntry = wrd.cINVALID + bas.cSpace + wrd.cENTRY + bas.cColon + bas.cSpace + wrd.cPlease + bas.cSpace + wrd.center + bas.cSpace + wrd.csome + bas.cSpace + wrd.cvalid + bas.cSpace + wrd.cstring + bas.cDot; // INVALID ENTRY: Please enter some valid string.
export const cstringInputIs = wrd.cstring + wrd.cInput + sys.cSpaceIsColonSpace; // stringInput is:
export const cstringArrayIs = wrd.cstring + wrd.cArray + sys.cSpaceIsColonSpace; // stringArray is:
// INVALID ENTRY: Please enter 3 arrays of numbers each containing 2 numbers in the following format:
export const cthreePointAverageInvalidInput = wrd.cINVALID + bas.cSpace + wrd.cENTRY + bas.cColon + bas.cSpace + wrd.cPlease + bas.cSpace + wrd.center + bas.cSpace + num.c3 + bas.cSpace + wrd.carrays + bas.cSpace + bas.cof + bas.cSpace + wrd.cnumbers + bas.cSpace + wrd.ceach + bas.cSpace + wrd.ccontaining + bas.cSpace + num.c2 + bas.cSpace + wrd.cnumbers + bas.cSpace + wrd.cin + bas.cSpace + wrd.cthe + bas.cSpace + wrd.cfollowing + bas.cSpace + wrd.cformat + bas.cColon + bas.cSpace;
// [x1,y1] [x2,y2] [x3,y3]
export const cthreePointAverageInputFormat = bas.cOpenBracket + bas.cx + num.c1 + bas.cComa + bas.cy + num.c1 + bas.cCloseBracket + bas.cSpace + bas.cOpenBracket + bas.cx + num.c2 + bas.cComa + bas.cy + num.c2 + bas.cCloseBracket + bas.cSpace + bas.cOpenBracket + bas.cx + num.c3 + bas.cComa + bas.cy + num.c3 + bas.cCloseBracket;
export const cx1Is = bas.cx + num.c1 + sys.cSpaceIsColonSpace; // x1 is:
export const cy1Is = bas.cy + num.c1 + sys.cSpaceIsColonSpace; // y1 is:
export const cx2Is = bas.cx + num.c2 + sys.cSpaceIsColonSpace; // x2 is:
export const cy2Is = bas.cy + num.c2 + sys.cSpaceIsColonSpace; // y2 is:
export const cx3Is = bas.cx + num.c3 + sys.cSpaceIsColonSpace; // x3 is:
export const cy3Is = bas.cy + num.c3 + sys.cSpaceIsColonSpace; // y3 is:
export const cx1x2x3Is = bas.cx + num.c1 + bas.cSpace + bas.cPlus + bas.cSpace + bas.cx + num.c2 + bas.cSpace + bas.cPlus + bas.cSpace + bas.cx + num.c3 + sys.cSpaceIsColonSpace; // x1 + x2 + x3 is:
export const cy1y2y3Is = bas.cy + num.c1 + bas.cSpace + bas.cPlus + bas.cSpace + bas.cy + num.c2 + bas.cSpace + bas.cPlus + bas.cSpace + bas.cy + num.c3 + sys.cSpaceIsColonSpace; // y1 + y2 + y3 is:

// Constants Validation
export const callClientConstantsValidationDataIs = wrd.call + wrd.cClient + wrd.cConstants + wrd.cValidation + wrd.cData + sys.cSpaceIsColonSpace; // allClientConstantsValidationData is:
export const cresolvedConstantsPath_ApplicationBusinessIs = app_sys.cresolvedConstantsPath_Application + wrd.cBusiness + sys.cSpaceIsColonSpace; // resolvedConstantsPath_ApplicationBusiness is:
export const cresolvedConstantsPath_ApplicationCommandIs = app_sys.cresolvedConstantsPath_Application + wrd.cCommand + sys.cSpaceIsColonSpace; // resolvedConstantsPath_ApplicationCommand is:
export const cresolvedConstantsPath_ApplicationConfigurationIs = app_sys.cresolvedConstantsPath_Application + wrd.cConfiguration + sys.cSpaceIsColonSpace; // resolvedConstantsPath_ApplicationConfiguration is:
export const cresolvedConstantsPath_ApplicationConstantIs = app_sys.cresolvedConstantsPath_Application + wrd.cConstant + sys.cSpaceIsColonSpace; // resolvedConstantsPath_ApplicationConstant is:
export const cresolvedConstantsPath_ApplicationMessageIs = app_sys.cresolvedConstantsPath_Application + wrd.cMessage + sys.cSpaceIsColonSpace; // resolvedConstantsPath_ApplicationMessage is:
export const cresolvedConstantsPath_ApplicationSystemIs = app_sys.cresolvedConstantsPath_Application + wrd.cSystem + sys.cSpaceIsColonSpace; // resolvedConstantsPath_ApplicationSystem is:

export const cApplicationBusinessConstantsPhase1Validation = wrd.cApplication + bas.cSpace + wrd.cBusiness + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c1 + bas.cSpace + wrd.cValidation; // Application Business Constants Phase 1 Validation
export const cApplicationCommandConstantsPhase1Validation = wrd.cApplication + bas.cSpace + wrd.cCommand + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c1 + bas.cSpace + wrd.cValidation; // Application Command Constants Phase 1 Validation
export const cApplicationConfigurationConstantsPhase1Validation = wrd.cApplication + bas.cSpace + wrd.cConfiguration + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c1 + bas.cSpace + wrd.cValidation; // Application Configuration Constants Phase 1 Validation
export const cApplicationConstantsPhase1Validation = wrd.cApplication + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c1 + bas.cSpace + wrd.cValidation; // Application Constants Phase 1 Validation
export const cApplicationMessageConstantsPhase1Validation = wrd.cApplication + bas.cSpace + wrd.cMessage + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c1 + bas.cSpace + wrd.cValidation; // Application Message Constants Phase 1 Validation
export const cApplicationSystemConstantsPhase1Validation = wrd.cApplication + bas.cSpace + wrd.cSystem + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c1 + bas.cSpace + wrd.cValidation; // Application System Constants Phase 1 Validation

export const cApplicationBusinessConstantsPhase2Validation = wrd.cApplication + bas.cSpace + wrd.cBusiness + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c2 + bas.cSpace + wrd.cValidation; // Application Business Constants Phase 2 Validation
export const cApplicationCommandConstantsPhase2Validation = wrd.cApplication + bas.cSpace + wrd.cCommand + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c2 + bas.cSpace + wrd.cValidation; // Application Command Constants Phase 2 Validation
export const cApplicationConfigurationConstantsPhase2Validation = wrd.cApplication + bas.cSpace + wrd.cConfiguration + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c2 + bas.cSpace + wrd.cValidation; // Application Configuration Constants Phase 2 Validation
export const cApplicationConstantsPhase2Validation = wrd.cApplication + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c2 + bas.cSpace + wrd.cValidation; // Application Constants Phase 2 Validation
export const cApplicationMessageConstantsPhase2Validation = wrd.cApplication + bas.cSpace + wrd.cMessage + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c2 + bas.cSpace + wrd.cValidation; // Application Message Constants Phase 2 Validation
export const cApplicationSystemConstantsPhase2Validation = wrd.cApplication + bas.cSpace + wrd.cSystem + bas.cSpace + wrd.cConstants + bas.cSpace + wrd.cPhase + bas.cSpace + num.c2 + bas.cSpace + wrd.cValidation; // Application System Constants Phase 2 Validation

// Caught the case that some arguments were passed in as input to the function.
export const capplicationMessage00 = wrd.cCaught + bas.cSpace + wrd.cthe + bas.cSpace + wrd.ccase + bas.cSpace + wrd.cthat + bas.cSpace + wrd.csome + bas.cSpace + wrd.carguments + bas.cSpace + wrd.cwere + bas.cSpace + wrd.cpassed + bas.cSpace + wrd.cin + bas.cSpace + wrd.cas + bas.cSpace + wrd.cinput + bas.cSpace + wrd.cto + bas.cSpace + wrd.cthe + bas.cSpace + wrd.cfunction + bas.cDot;
export const capplicationMessage01 = wrd.cBEGIN + bas.cSpace + wrd.cmain + bas.cSpace + wrd.cprogram + bas.cSpace + wrd.cloop; // BEGIN main program loop
export const capplicationMessage02 = wrd.cBEGIN + bas.cSpace + wrd.ccommand + bas.cSpace + wrd.cparser; // BEGIN command parser
export const capplicationMessage03 = wrd.cEND + bas.cSpace + wrd.ccommand + bas.cSpace + wrd.cparser; // END command parser
export const capplicationMessage04 = wrd.cEND + bas.cSpace + wrd.cmain + bas.cSpace + wrd.cprogram + bas.cSpace + wrd.cloop; // END main program loop
export const capplicationMessage05 = wrd.cExiting + bas.cSpace + wrd.cTEST + bas.cSpace + wrd.cHARNESS + bas.cSpace + wrd.cAPPLICATION; // Exiting TEST HARNESS APPLICATION