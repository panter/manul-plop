const defaultConfig = {
  modulePath: './modules/{{camelCase moduleName}}',
  reduxRootPath: './redux'
};

module.exports = function(plop, customConfig = {}) {
  const config = {
    ...defaultConfig,
    ...customConfig
  };
  if (config.destBasePath) {
    plop.setPlopfilePath(config.destBasePath);
  }

  require('./generators')(plop, config);

  return plop;
};
