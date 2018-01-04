const defaultConfig = {
  modulePath: './ui/{{camelCase moduleName}}',
  reduxRootPath: './redux'
};

module.exports = function(plop, customConfig = {}) {
  const config = {
    ...defaultConfig,
    ...customConfig
  };

  require('./reducer')(plop, config);
  require('./saga')(plop, config);
};
