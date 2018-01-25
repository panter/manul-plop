const defaultConfig = {
  modulePath: './modules/{{camelCase moduleName}}',
  reduxRootPath: './redux'
};

module.exports = function(plop, customConfig = {}) {
  const config = {
    ...defaultConfig,
    ...customConfig
  };

  require('./generators')(plop, config);

  return plop;
};
