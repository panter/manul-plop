const { isEmpty } = require('lodash');

module.exports = function(plop, config) {
  const {
    exists,
    insertIf,
    makeModuleGenerator,
    makeModifyImportsAction,
    makeModifySymbolsAction
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
    makeModifyImportsAction({
      nameKey,
      path: index,
      fileToImport: file
    }),
    makeModifySymbolsAction({
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
      }
    ],

    actions: data => [
      // reducer file
      {
        type: 'add',
        path: reducerFilePath,
        templateFile: 'templates/reducers/reducer.js',
        abortOnFail: true
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
