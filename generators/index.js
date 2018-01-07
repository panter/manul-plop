const defaultConfig = {
  modulePath: './modules/{{camelCase moduleName}}',
  reduxRootPath: './redux'
};

module.exports = function(plop, customConfig = {}) {
  const config = {
    ...defaultConfig,
    ...customConfig
  };


  require('./modules')(plop, config);
  require('./component')(plop, config);
  require('./reducer')(plop, config);
  require('./saga')(plop, config);


  return plop


};
