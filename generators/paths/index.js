module.exports = config => {
  const basePath = config.basePath;
  const templatePath = `${config.plopFilePath}/${config.templatePath}/`;
  const modulesPath = `${config.basePath}/${config.modulesPath}/`;
  const reduxRootPath = `${config.basePath}/${config.reduxRootPath}/`;
  const modulePath = `${modulesPath}{{camelCase moduleName}}/`;
  return {
    basePath,
    templatePath,
    modulesPath,
    modulePath,
    reduxRootPath
  };
};
