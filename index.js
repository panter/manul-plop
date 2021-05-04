const defaultConfig = {
  basePath: './src',
  modulesPath: 'ui',
  reduxRootPath: 'redux',
  templatePath: 'plopTemplates',
  componentSubmodule: false,
  componentStorybook: true,
  componentTests: true,
  containerStorybook: true,
  containerTests: true,
  extension: 'js',
  jsxExtension: 'js',
}

module.exports = function(plop, customConfig = {}) {
  const config = {
    ...defaultConfig,
    ...customConfig,
  }

  require('./generators')(plop, config)

  return plop
}
