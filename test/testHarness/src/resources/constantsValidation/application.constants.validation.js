/**
 * @file application.constants.validation.js
 * @description Contains all validations for named application constants.
 * @requires module:application.constants
 * @author Seth Hollingsead
 * @date 2025/06/22
 * @copyright Copyright © 2025-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as apc from '../../constants/application.constants.js';

/**
 * @function applicationConstantsValidation
 * @description Initializes the application constants validation data objects array.
 * @return {array<object<Name,Actual,Expected>>} An array of constants validation data objects.
 * @author Seth Hollingsead
 * @date 2025/06/22
 */
export const applicationConstantsValidation = [
  {Name: 'cExpectedActualFrameworkDevName', Actual: apc.cExpectedActualFrameworkDevName, Expected: 'haystacks-async'},
  {Name: 'cExpectedActualFrameworkProdName', Actual: apc.cExpectedActualFrameworkProdName, Expected: '@haystacks/async'},
  {Name: 'cApplicationName', Actual: apc.cApplicationName, Expected: 'testHarness'},
  {Name: 'cShellHarnessName', Actual: apc.cShellHarnessName, Expected: 'shellHarness'},
  {Name: 'cshellHarnessLabel', Actual: apc.cshellHarnessLabel, Expected: '[shellHarness] '},
  {Name: 'cAppDevPath', Actual: apc.cAppDevPath, Expected: '/src/'},
  {Name: 'cAppProdPath', Actual: apc.cAppProdPath, Expected: '/bin/'},
  {Name: 'cResourcesCommonPath', Actual: apc.cResourcesCommonPath, Expected: 'resources/'},
  {Name: 'cCommandsCommonPath', Actual: apc.cCommandsCommonPath, Expected: 'commands/'},
  {Name: 'cConstantsPath', Actual: apc.cConstantsPath, Expected: 'constants/'},
  {Name: 'cConfigurationCommonPath', Actual: apc.cConfigurationCommonPath, Expected: 'configuration/'},
  {Name: 'cPluginsRegistryCommonPath', Actual: apc.cPluginsRegistryCommonPath, Expected: 'plugins/plugins.json'},
  {Name: 'cWorkflowsCommonPath', Actual: apc.cWorkflowsCommonPath, Expected: 'workflows/'},
  {Name: 'cThemesCommonPath', Actual: apc.cThemesCommonPath, Expected: 'themes/'},
  {Name: 'cSchemasCommonPath', Actual: apc.cSchemasCommonPath, Expected: 'schemas/'},
  {Name: 'cReleasePath', Actual: apc.cReleasePath, Expected: 'release/'},
  {Name: 'cscriptsPath', Actual: apc.cscriptsPath, Expected: '/scripts/'},
  {Name: 'cshellHarnessBathFile', Actual: apc.cshellHarnessBathFile, Expected: 'launch-shellHarness'},

  // Full Dev Paths
  {Name: 'cFullDevResourcesPath', Actual: apc.cFullDevResourcesPath, Expected: '/src/resources/'},
  {Name: 'cFullDevCommandsPath', Actual: apc.cFullDevCommandsPath, Expected: '/src/resources/commands/'},
  {Name: 'cFullDevConstantsPath', Actual: apc.cFullDevConstantsPath, Expected: '/src/constants/'},
  {Name: 'cFullDevConfigurationPath', Actual: apc.cFullDevConfigurationPath, Expected: '/src/resources/configuration/'},
  {Name: 'cFullDevPluginsRegistryPath', Actual: apc.cFullDevPluginsRegistryPath, Expected: '/src/resources/plugins/plugins.json'},
  {Name: 'cFullDevWorkflowsPath', Actual: apc.cFullDevWorkflowsPath, Expected: '/src/resources/workflows/'},
  {Name: 'cFullDevThemesPath', Actual: apc.cFullDevThemesPath, Expected: '/src/resources/themes/'},
  {Name: 'cFullDevSchemasPath', Actual: apc.cFullDevSchemasPath, Expected: '/src/resources/schemas/'},
  {Name: 'cmetaDataDevPath', Actual: apc.cmetaDataDevPath, Expected: '/src/resources/metaData.json'},

  // Full Prod Paths
  {Name: 'cFullProdResourcesPath', Actual: apc.cFullProdResourcesPath, Expected: '/bin/resources/'},
  {Name: 'cFullProdCommandsPath', Actual: apc.cFullProdCommandsPath, Expected: '/bin/resources/commands/'},
  {Name: 'cFullProdConstantsPath', Actual: apc.cFullProdConstantsPath, Expected: '/bin/constants/'},
  {Name: 'cFullProdConfigurationPath', Actual: apc.cFullProdConfigurationPath, Expected: '/bin/resources/configuration/'},
  {Name: 'cFullProdPluginsRegistryPath', Actual: apc.cFullProdPluginsRegistryPath, Expected: '/bin/resources/plugins/plugins.json'},
  {Name: 'cFullProdWorkflowsPath', Actual: apc.cFullProdWorkflowsPath, Expected: '/bin/resources/workflows/'},
  {Name: 'cFullProdThemesPath', Actual: apc.cFullProdThemesPath, Expected: '/bin/resources/themes/'},
  {Name: 'cFullProdSchemasPath', Actual: apc.cFullProdSchemasPath, Expected: '/bin/resources/schemas/'},
  {Name: 'cmetaDataProdPath', Actual: apc.cmetaDataProdPath, Expected: '/bin/resources/metaData.json'}
];