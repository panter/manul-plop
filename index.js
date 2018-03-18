const defaultConfig = {
  basePath: './src',
  modulesPath: 'ui',
  reduxRootPath: 'redux',
  templatePath: 'plopTemplates'
};

module.exports = function(plop, customConfig = {}) {
  const config = {
    ...defaultConfig,
    ...customConfig
  };

  require('./generators')(plop, config);

  return plop;
};
