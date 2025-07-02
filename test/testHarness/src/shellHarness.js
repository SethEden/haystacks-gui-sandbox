/**
 * @file shellHarness.js
 * @module shellHarness
 * @description This is the main init for the shell application interface.
 * It will work with Bash/Dos/Shell, Mac, Linux and Windows.
 * All messages are pipes back to the main process using an inter-process communication channel - IPC.
 * This code is designed to be executed from a secondary spawned child process.
 * This is a DUMB TERMINAL ONLY!!
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://nodejs.org/api/readline.html|readline}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/07/01
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import readline from 'readline';
import path from 'path';

const {bas, msg, wrd} = hayConst;

console.log('[proxyShell] Proxy Shell started. Type commands below:');

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: bas.cGreaterThan + bas.cSpace
});

r1.prompt();

r1.on(wrd.cline, (line) => {
  // Output to parent: all user input lines
  process.stdout.write('[shellHarness] input: ' + line + bas.cCarRetNewLin);
  r1.prompt();
}).on(wrd.cclose, () => {
  process.stdout.write('Exiting proxy shell. Goodbye!' + bas.cCarRetNewLin);
  process.exit(0);
});

// Optional: Listen for piped messages from parent (could be process.stdin, but may require extra plumbing)
process.on(wrd.cmessage, (eventMsg) => {
  // For 'fork' model, not standard shell
  if (eventMsg && eventMsg[wrd.ctype] === wrd.coutput) {
    process.stdout.write(eventMsg[wrd.cpayload + bas.cCarRetNewLin]);
  }
});