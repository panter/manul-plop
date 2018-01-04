const { isEmpty } = require('lodash');

module.exports = function(plop, config) {
  const {
    exists,
    insertIf,
    makeModuleGenerator,
    makeAppendImportsAction,
    makeAppendSymbolsAction
  } = require('./utils')(plop, config);

  const { modulePath, reduxRootPath } = config;

  const moduleReducerPath = `${modulePath}/reducers`;
  const reducerIndexPath = `${moduleReducerPath}/index.js`;
  const reducerFilePath = `${moduleReducerPath}/{{camelCase reducerName}}.js`;
  const rootReducerPath = `${reduxRootPath}/rootReducer.js`;

  const makeIndexReducerActions = (data, { nameKey, file, index }) => [
    ...insertIf(
      !exists(data, index),

      {
        type: 'add',
        path: index,
        templateFile: 'templates/reducers/index.js'
      }
    ),
    makeAppendImportsAction({
      nameKey,
      path: index,
      fileToImport: file
    }),
    makeAppendSymbolsAction({
      nameKey,
      path: index
    })
  ];

  makeModuleGenerator('reducer', {
    description: 'create a reducer',
    prompts: [
      {
        type: 'input',
        name: 'reducerName',
        message: "What's the reducer's name?",
        validate(value) {
          if (isEmpty(value)) return 'please provide a reducer name';
          return true;
        }
      },
      {
        type: 'input',
        name: 'actionName',
        message: "What's the actions's name?",
        validate(value) {
          if (isEmpty(value)) return 'please provide a action name';
          return true;
        }
      }
    ],

    actions: data => [
      // reducer file
      ...insertIf(!exists(data, reducerFilePath), {
        type: 'add',
        path: reducerFilePath,
        templateFile: 'templates/reducers/reducer.js',
        abortOnFail: false
      }),
      {
        type: 'append',
        path: reducerFilePath,
        pattern: /\/\* 💬 ACTION-CREATORS \*\//gi,
        templateFile: 'templates/reducers/actionCreator.js',
        abortOnFail: false
      },
      {
        type: 'append',
        path: reducerFilePath,
        pattern: /\/\* 💬 ACTION-REDUCERS \*\//gi,
        templateFile: 'templates/reducers/actionReducer.js',
        abortOnFail: false
      },

      // update module reducer index file,
      ...makeIndexReducerActions(data, {
        nameKey: 'reducerName',
        index: reducerIndexPath,
        file: reducerFilePath
      }),
      ...insertIf(
        data.createModule,
        // upsert rootReducer
        ...makeIndexReducerActions(data, {
          nameKey: 'moduleName',
          index: rootReducerPath,
          file: reducerIndexPath
        })
      )
    ]
  });
};
