module.exports = config => {
  const { basePath } = config
  const templatePath = `${config.plopFilePath}/${config.templatePath}`
  const modulesPath = `${basePath}/${config.modulesPath}`
  const reduxRootPath = `${basePath}/${config.reduxRootPath}`
  const modulePath = `${modulesPath}/{{moduleName}}`
  const moduleReducerPath = `${modulePath}/reducers`
  const reducerIndexPath = `${moduleReducerPath}/index.js`
  const reducerFilePath = `${moduleReducerPath}/{{camelCase reducerName}}.js`
  const rootReducerPath = `${reduxRootPath}/rootReducer.js`

  const moduleSagaPath = `${modulePath}/sagas`
  const sagaIndexPath = `${moduleSagaPath}/index.js`
  const sagaFilePath = `${moduleSagaPath}/{{camelCase sagaName}}.js`
  const rootSagaPath = `${reduxRootPath}/rootSaga.js`
  return {
    basePath,
    templatePath,
    modulesPath,
    modulePath,
    reduxRootPath,
    moduleReducerPath,
    reducerIndexPath,
    reducerFilePath,
    rootReducerPath,
    moduleSagaPath,
    sagaIndexPath,
    sagaFilePath,
    rootSagaPath,
  }
}
