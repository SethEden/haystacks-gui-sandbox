/**
* @file constant.js
* @module constant
* @description Contains all of the constant system commands.
* @requires module:ruleBroker
* @requires module:configurator
* @requires module:loggers
* @requires module:queue
* @requires module:stack
* @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
* @requires {@link https://www.npmjs.com/package/path|path}
* @author Seth Hollingsead
* @date 2022/02/04
* @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
*/

// Internal imports
import ruleBroker from '../../brokers/ruleBroker.js';
import configurator from '../../executrix/configurator.js';
import loggers from '../../executrix/loggers.js';
import queue from '../../structures/queue.js';
import stack from '../../structures/stack.js';
// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, biz, cmd, cfg, gen, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
const filePath = path.resolve(import.meta.url.replace(sys.cfileColonDoubleForwardSlash, ''));
// framework.commandsBlob.commands.constant.
const namespacePrefix = wrd.cframework + bas.cDot + sys.ccommandsBlob + bas.cDot + wrd.ccommands + bas.cDot + baseFileName + bas.cDot;

const commandsMetaData = [
  {[wrd.cName]: cmd.cconstantsGenerator, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [], [sys.cbusinessRulesDependencies]: [
    biz.cprompt, biz.cisConstantValid, biz.crecombineStringArrayWithSpaces, biz.cconstantsFulfillmentSystem, biz.cdoesConstantExist,
    biz.cgetConstantType, biz.cgetWordCountInString, biz.cgetWordsArrayFromString
  ]},
  {[wrd.cName]: cmd.cconstantsGeneratorList, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [cmd.cconstantsGenerator], [sys.cbusinessRulesDependencies]: [
    biz.cprompt, biz.cisConstantValid, biz.crecombineStringArrayWithSpaces
  ]},
  {[wrd.cName]: cmd.cconstantsPatternRecognizer, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [cmd.cconstantsGeneratorList], [sys.cbusinessRulesDependencies]: [
    biz.cprompt, biz.cisConstantValid, biz.crecombineStringArrayWithSpaces, biz.cgetWordsArrayFromString, biz.csearchForPatternsInStringArray, biz.cvalidatePatternsThatNeedImplementation
  ]},
  {[wrd.cName]: cmd.cevaluateConstant, [sys.cFilePath]: filePath, [wrd.cthreadable]: false, [sys.ccommandsDependencies]: [], [sys.cbusinessRulesDependencies]: [
    biz.cdoesConstantExist, biz.cgetConstantActualValue
  ]}
];

/**
 * @function initConstant
 * @description Adds the constant commands meta-data to the D-data structure commandsMetaData-framework data structure.
 * The meta-data is used to dynamically import all code dependencies such that a given command can be executed in a separate thread.
 * Multi-threading allows for parallel processing and greatly improved performance!!
 * @returns {boolean} True or False to indicate if the data structures were initialized or not.
 * @author Seth Hollingsead
 * @date 2025/07/16
 */
async function initConstant() {
  const functionName = initConstant.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  let returnData = false;
  // Add all of the commands meta-data to the D-data structure!
  if (D[sys.ccommandsMetaData] && D[sys.ccommandsMetaData][wrd.cframework]) {
    D[sys.ccommandsMetaData][wrd.cframework].push(...commandsMetaData);
    returnData = true;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function constantsGenerator
 * @description Requests a string input the user would like to have converted nto a constant,
 * while determining the most optimized way to define the new constant based on existing constants.
 * Also checks to see if that new constant is already defined in the constants system.
 * @param {string} inputData Parameterized constant to generate for.
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/03/30
 */
async function constantsGenerator(inputData, inputMetaData) {
  const functionName = constantsGenerator.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, []];
  let errorMessage = '';
  if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenableConstantsValidation) === true) {
    let validEntry = false;
    let userDefinedConstant = '';
    let constantsFulfillmentSystemRule = [biz.cconstantsFulfillmentSystem];
    let recombineArrayInputRule = [biz.crecombineStringArrayWithSpaces];

    if (inputData.length === 0) {
      while (validEntry === false) {
        await loggers.consoleLog(wrd.cInfo, msg.cConstantPrompt1);
        await loggers.consoleLog(wrd.cInfo, msg.cConstantPrompt2);
        await loggers.consoleLog(wrd.cInfo, msg.cConstantPrompt3);
        userDefinedConstant = await ruleBroker.processRules([bas.cGreaterThan, ''], [biz.cprompt]);
        validEntry = await ruleBroker.processRules([userDefinedConstant, ''], [biz.cisConstantValid]);
        if (validEntry === false) {
          // INVALID INPUT: Please enter a valid constant value that contains more than 4 characters.
          await loggers.consoleLog(wrd.cError, msg.cconstantsGeneratorMessage1);
        } // End-if (validEntry === false)
      } // End-while (validEntry === false)
    } else if (inputData.length === 2) {
      userDefinedConstant = inputData[1];
    } else {
      // We need to recombine all of the array elements after the 0-th element into a single string with spaces in between.
      userDefinedConstant = await ruleBroker.processRules([inputData, ''], [recombineArrayInputRule]);
    }
    // userDefinedConstant is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cuserDefinedConstantIs + userDefinedConstant);

    // First lets check if the constant is already defined, so we can warn the user.
    // NOTE: It could be that the developer is just looking to optimize the existing constant,
    // but if not, a warning to the user would be a good idea!
    let doesConstantExist = await ruleBroker.processRules([userDefinedConstant, ''], [biz.cdoesConstantExist]);
    if (doesConstantExist === true) {
      let constantType = await ruleBroker.processRules([userDefinedConstant, false], [biz.cgetConstantType]);
      // WARNING: The constant has already been defined in the following library(ies):
      await loggers.consoleLog(wrd.cWarning, msg.cconstantsGeneratorMessage2 + constantType);
    } // End-if (doesConstantExist === true)
    userDefinedConstant = userDefinedConstant.trim();
    let wordCount = await ruleBroker.processRules([userDefinedConstant, ''], [biz.cgetWordCountInString]);
    // wordCount is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cwordCountIs + wordCount);
    // Now begin the fulfillment algorithm.
    if (wordCount > 1) {
      let wordsArray = await ruleBroker.processRules([userDefinedConstant, ''], [biz.cgetWordsArrayFromString]);
      for (const element of wordsArray) {
        let optimizedWordConstantDefinition = await ruleBroker.processRules([element.trim(), element.trim()], [constantsFulfillmentSystemRule]);
        // Optimized constant definition for word:
        await loggers.consoleLog(wrd.cInfo, msg.cOptimizedConstantDefinitionForWord + bas.cc + element + bas.cSpace + bas.cEqual + bas.cSpace +
          optimizedWordConstantDefinition);
        returnData[1].push(optimizedWordConstantDefinition);
       } // End-for (const element of wordsArray)
    } else { // There is only a single word to process.
      returnData[1] = await ruleBroker.processRules([userDefinedConstant, userDefinedConstant], [constantsFulfillmentSystemRule])
      // output a proper line of code:
      // export const csomething = wrd.csome + wrd.cthing; // something
      await loggers.consoleLog(wrd.cInfo, wrd.cexport + bas.cSpace + gen.cconst + bas.cSpace + bas.cc + userDefinedConstant + bas.cSpace + bas.cEqual + bas.cSpace +
        returnData[1] + bas.cSemiColon + bas.cSpace + bas.cDoubleForwardSlash + bas.cSpace + userDefinedConstant)
    }
  } else {
    // The enableConstantsValidation flag is disabled. Enable this flag in the configuration settings to activate this command.
    errorMessage = msg.cconstantsGeneratorMessage3 + msg.cconstantsGeneratorMessage4;
    await loggers.consoleLog(wrd.cInfo, errorMessage);
    returnData[1] = errorMessage;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function constantsGeneratorList
 * @description Calls the constantsGenerator command to iterate over a list of constants and generate many constants sequentially.
 * @NOTE This function will also walk the list and determine if there are any common strings
 * internal to the list that could be defined as new constants to help with the optimization process.
 * @NOTE Testing string: constGenL somethingXML,whatever that is,A basic NodeJS template App,that can easily
 * @param {string} inputData Parameterized coma delimited list of constants to be auto-generated
 * @param {string} inputMetaData Not used for this business rule.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/03/30
 */
async function constantsGeneratorList(inputData, inputMetaData) {
  const functionName = constantsGeneratorList.name;
   await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
   await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
   await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
   let returnData = [true, {}];
   let errorMessage = '';
   if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenableConstantsValidation) === true) {
     let validEntry = false;
     let userDefinedConstantList = '';
     if (inputData.length === 0) {
       while (validEntry === false) {
         await loggers.consoleLog(wrd.cInfo, msg.cConstantsListPrompt1);
         await loggers.consoleLog(wrd.cInfo, msg.cConstantsListPrompt2);
         await loggers.consoleLog(wrd.cInfo, msg.cConstantsListPrompt3);
         userDefinedConstantList = await ruleBroker.processRules([bas.cGreaterThan, ''], [biz.cprompt]);
         validEntry = await ruleBroker.processRules([userDefinedConstantList, ''], [biz.cisConstantValid]);
         if (validEntry === false) {
           // INVALID INPUT: Please enter a valid constant list.
           await loggers.consoleLog(wrd.cError, msg.cconstantsGeneratorListMessage1);
         }
       } // End-while (validEntry === false)
     } else if (inputData.length === 2) {
       userDefinedConstantList = inputData[1];
     } else {
       // Combine all of the input parameters back into a single string then we will parse it for coma's into an array.
       // The array elements will then be used to enqueue the command constantsGenerator.
       userDefinedConstantList = await ruleBroker.processRules([inputData, ''], [biz.crecombineStringArrayWithSpaces]);
     }
     // userDefinedConstantList is:
     await loggers.consoleLog(namespacePrefix + functionName, msg.cuserDefinedConstantListIs + userDefinedConstantList);
     if (userDefinedConstantList.includes(bas.cComa) === true) {
       // userDefinedConstantList contains comas
       await loggers.consoleLog(namespacePrefix + functionName, msg.cuserDefinedConstantListContainsComas);
       let userDefinedConstantsListArray = userDefinedConstantList.split(bas.cComa);
       // userDefinedConstantsListArray is:
       await loggers.consoleLog(namespacePrefix + functionName, msg.cuserDefinedConstantsListArrayIs + JSON.stringify(userDefinedConstantsListArray));
       if (userDefinedConstantsListArray.length > 1) {
         for (const element of userDefinedConstantsListArray) {
          let commandToQueue1 = cmd.cconstantsGenerator + bas.cSpace + element.trim()
            if (await configurator.getConfigurationSetting(wrd.csystem, cfg.clogAllCommands) === true) {
              await stack.push(sys.cSystemCommandLog, commandToQueue1);
            }
            await queue.enqueue(sys.cCommandQueue, commandToQueue1);
         } // End-for (const element of userDefinedConstantsListArray)
         returnData[1] = true;
       } else if (userDefinedConstantsListArray.length === 1) {
         // Just enqueue the constants Generator command with the input directly.
         let commandToQueue2 = cmd.cconstantsGenerator + bas.cSpace + userDefinedConstantsListArray[0].trim();
         if (await configurator.getConfigurationSetting(wrd.csystem, cfg.clogAllCommands) === true) {
           await stack.push(sys.cSystemCommandLog, commandToQueue2);
         }
         await queue.enqueue(sys.cCommandQueue, commandToQueue2);
         returnData[1] = true;
       }
     } else {
       // userDefinedConstantsList DOES NOT contain comas
       await loggers.consoleLog(namespacePrefix + functionName, msg.cuserDefinedConstantsListDoesNotContainComas);
       let commandToQueue3 = cmd.cconstantsGenerator + bas.cSpace + userDefinedConstantList.trim();
       if (await configurator.getConfigurationSetting(wrd.csystem, cfg.clogAllCommands) === true) {
         await stack.push(sys.cSystemCommandLog, commandToQueue3);
       }
       await queue.enqueue(sys.cCommandQueue, commandToQueue3);
       returnData[1] = true;
     }
   } else {
     // The enableConstantsValidation flag is disabled. Enable this flag in the configuration settings to activate this command.
     errorMessage = msg.cconstantsGeneratorMessage3 + msg.cconstantsGeneratorMessage4;
     await loggers.consoleLog(wrd.cError, errorMessage);
     returnData[1] = errorMessage;
   }
   await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
   await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
   return returnData;
}

/**
 * @function constantsPatternRecognizer
 * @description Walks through a list of constants looking for patterns internal to the strings.
 * @param {string} inputData Parameterized coma delimited list of constants to be
 * passed through pattern recognition to find common strings among them.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/03/31
 */
async function constantsPatternRecognizer(inputData, inputMetaData) {
  const functionName = constantsPatternRecognizer.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, {}];
  let errorMessage = '';
  if (await configurator.getConfigurationSetting(wrd.csystem, cfg.cenableConstantsValidation) === true) {
    let validEntry = false;
    let userDefinedConstantList = '';
    let wordsArray = [];
    let commonPatternsArray = [];
    if (inputData.length === 0) {
      while (validEntry === false) {
        await loggers.consoleLog(wrd.cInfo, msg.cConstantsListPatternSearchPrompt1);
        await loggers.consoleLog(wrd.cInfo, msg.cConstantsListPatternSearchPrompt2);
        await loggers.consoleLog(wrd.cInfo, msg.cConstantsListPatternSearchPrompt3);
        userDefinedConstantList = await ruleBroker.processRules([bas.cGreaterThan, ''], [biz.cprompt]);
        validEntry = await ruleBroker.processRules([userDefinedConstantList, ''], [biz.cisConstantValid]);
        if (validEntry === false) {
          // INVALID INPUT: Please enter a valid constant list.
          await loggers.consoleLog(wrd.cError, msg.cconstantsGeneratorListMessage1);
        } // End-if (validEntry === false)
      } // End-while (validEntry === false)
    } else if (inputData.length === 2) {
      userDefinedConstantList = inputData[1];
    } else {
      // Combine all of the input parameters back into a single string then we will parse it for coma's into an array.
      // The array elements will then be used to enqueue the command constantsGenerator.
      userDefinedConstantList = await ruleBroker.processRules([inputData, ''], [biz.crecombineStringArrayWithSpaces]);
    }
    // userDefinedConstantList is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cuserDefinedConstantListIs + userDefinedConstantList);
    if (userDefinedConstantList.includes(bas.cComa) === true) {
      wordsArray = userDefinedConstantList.split(bas.cComa);
    } else {
      // userDefinedConstantList DOES NOT contain comas
      await loggers.consoleLog(namespacePrefix + functionName, msg.cuserDefinedConstantsListDoesNotContainComas);
      // Check and see if there is another delimiter we can use to break up the string into an array,
      // such as a space character, Maybe the user entered a sentence and would like all the words of the sentence to be optimized.
      wordsArray = await ruleBroker.processRules([userDefinedConstantList, ''], [biz.cgetWordsArrayFromString]);
    }
    // wordsArray is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.cwordsArrayIs + JSON.stringify(wordsArray));
    commonPatternsArray = await ruleBroker.processRules([wordsArray, ''], [biz.csearchForPatternsInStringArray]);
    // commonPatternsArray is:
    await loggers.consoleLog(namespacePrefix + functionName, msg.ccommonPatternsArrayIs + JSON.stringify(commonPatternsArray));
    // This next call will compare the identified string patterns with existing constants, and highlight which ones are not yet implemented.
    let newConstantsList = await ruleBroker.processRules([commonPatternsArray, ''], [biz.cvalidatePatternsThatNeedImplementation]);
    let constantsPatternGenerationSetting = await configurator.getConfigurationSetting(wrd.csystem, cfg.cenableConstantsPatternGeneration);
    if (constantsPatternGenerationSetting === true) {
      let commandToQueue = cmd.cconstantsGeneratorList + bas.cSpace + newConstantsList
      if (await configurator.getConfigurationSetting(wrd.csystem, cfg.clogAllCommands) === true) {
        await stack.push(sys.cSystemCommandLog, commandToQueue);
      }
      await queue.enqueue(sys.cCommandQueue, commandToQueue);
      returnData[1] = newConstantsList;
    } // End-if (constantsPatternGenerationSetting === true)
  } else {
    // The enableConstantsValidation flag is disabled. Enable this flag in the configuration settings to activate this command.
    errorMessage = msg.cconstantsGeneratorMessage3 + msg.cconstantsGeneratorMessage4;
    await loggers.consoleLog(wrd.cError, errorMessage);
    returnData[1] = errorMessage;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

/**
 * @function evaluateConstant
 * @description Resolves a constant and prints the output of the constant value.
 * @param {array<string>} inputData A string array that contains the name of the constant that should be resolved and printed.
 * inputData[0] = evaluateConstant
 * inputData[1] = constantToBeEvaluated - The constant that should be resolved and printed to the output if it exists.
 * @param {string} inputMetaData Not used for this command.
 * @returns {array<boolean,string|integer|boolean|object|array>} An array with a boolean True or False value to
 * indicate if the application should exit or not exit, followed by the command output.
 * @author Seth Hollingsead
 * @date 2022/05/11
 */
async function evaluateConstant(inputData, inputMetaData) {
  const functionName = evaluateConstant.name;
  await loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = [true, {}];
  let errorMessage = '';
  if (inputData && inputData.length > 1) {
    if (await ruleBroker.processRules([inputData[1], ''], [biz.cdoesConstantExist]) === true) {
      returnData[1] = await ruleBroker.processRules([inputData[1], ''], [biz.cgetConstantActualValue]);
      await loggers.consoleLog(wrd.cInfo, inputData[1] + bas.cSpace + bas.cEqual + bas.cSpace + returnData[1]);
    } else {
      // The constant does not exist:
      errorMessage = msg.cTheConstantDoesNotExist + inputData[1];
      await loggers.consoleLog(wrd.cError, errorMessage);
      returnData[1] = errorMessage;
    }
  } else {
    // ERROR: No constant value entered, please enter a constant name to evaluate.
    errorMessage = msg.cevaluateConstantMessage01;
    await loggers.consoleLog(wrd.cError, errorMessage);
    returnData[1] = errorMessage;
  }
  await loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  await loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
}

export default {
  initConstant,
  constantsGenerator,
  constantsGeneratorList,
  constantsPatternRecognizer,
  evaluateConstant
};
