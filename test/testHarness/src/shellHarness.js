/**
 * @file shellHarness.js
 * @module shellHarness
 * @description This is the main init for the shell application interface.
 * It will work with Bash/Dos/Shell, Mac, Linux and Windows.
 * All messages are pipes back to the main process using an inter-process communication channel - IPC.
 * This code is designed to be executed from a secondary spawned child process.
 * This is a DUMB TERMINAL ONLY!!
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/01
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, msg, wrd} = hayConst;

// Dumb terminal: prompt for input, send to parent
/**
 * @function promptLoop
 * @description prompts the user for input, send user responses to parent.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2025/07/01
 */
function promptLoop() {
  console.log('[shellHarness] promptLoop: displaying prompt...');
  process.stdout.write('> ');
  process.stdin.once(wrd.cdata, (data) => {
    const input = data.toString().trim();
    console.log('[shellHarness] promptLoop: received user input:', input);
    if (input.length) {
      console.log('[shellHarness] promptLoop: sending IPC input to parent:', input);
      process.send({ type: wrd.cinput, payload: input });
    }
    // Continue prompting unless told to exit
    console.log('Continue prompting unless told to exit');
    promptLoop();
  });
}

// Display output from parent
process.on(wrd.cmessage, (eventMsg) => {
  console.log('[shellHarness] process.on("message"): received IPC message:', eventMsg);

  if (eventMsg[wrd.ctype] === wrd.coutput) {
    console.log('[shellHarness] process.on("message"): writing output to terminal:', eventMsg.payload);
    process.stdout.write(msg.payload + '\n');
  } else if (eventMsg[wrd.ctype] === wrd.clog) {
    console.log('[shellHarness] process.on("message"): writing log to terminal:', eventMsg.payload);
    process.stdout.write('[LOG] ' + msg.payload + '\n');
  } else if (eventMsg[wrd.ctype] === wrd.cexit) {
    console.log('[shellHarness] process.on("message"): received exit. Exiting CLI.');
    process.stdout.write('Exiting CLI. Goodbye!\n');
    process.exit(0);
  } else {
    console.log('[shellHarness] process.on("message"): unknown message type:', eventMsg.type);
  }
});

// Log script start for debugging
console.log('[shellHarness] Starting shellHarness.js — entering prompt loop.');
promptLoop();