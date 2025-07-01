/**
 * @file frameworkShell.js
 * @module frameworkShell
 * @description Contains all window specific code.
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/electron|electron}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2025/06/30
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports

// External imports
import hayConst from '@haystacks/constants';
import { ipcRenderer } from 'electron';
import path from 'path';

const {bas, biz, cmd, cfg, gen, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// framework.windows.frameworkShell.
const namespacePrefix = wrd.cframework + bas.cDot + wrd.cwindows + bas.cDot + baseFileName + bas.cDot;

function sendCommand(cmd) {
  ipcRenderer.send('shell-command', cmd);
}

ipcRenderer.on('shell-output', (event, result) => {
  appendToShellOutput(result); // Your rendering logic here
});
