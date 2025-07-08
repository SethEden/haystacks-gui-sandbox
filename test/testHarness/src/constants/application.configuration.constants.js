/**
 * @file application.configuration.constants.js
 * @module application.configuration.constants
 * @description A file to hold all of the client configuration constants.
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @author Seth Hollingsead
 * @date 2025/06/22
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// External imports
import hayConst from '@haystacks/constants';
const {gen, wrd} = hayConst;

// smuggle something ccustomEchoCommand = wr1.ccustom + wr1.cEcho + wr1.cCommand; // customEchoCommand
export const cargumentDrivenInterface = wrd.cargument + wrd.cDriven + wrd.cInterface; // argumentDrivenInterface
export const cspawnNativeCliCommandWindow = wrd.cspawn + wrd.cNative + gen.cCli + wrd.cCommand + wrd.cWindow; // spawnNativeCliCommandWindow
export const clogToSocketTransmissionEnabled = wrd.clog + wrd.cTo + wrd.cSocket + wrd.cTransmission + wrd.cEnabled; // logToSocketTransmissionEnabled