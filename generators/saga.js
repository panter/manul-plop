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

  const moduleSagaPath = `${modulePath}/sagas`;
  const sagaIndexPath = `${moduleSagaPath}/index.js`;
  const sagaFilePath = `${moduleSagaPath}/{{camelCase sagaName}}.js`;
  const rootSagaPath = `${reduxRootPath}/rootSaga.js`;

  const makeIndexSagaActions = (data, { nameKey, file, index }) => [
    ...insertIf(
      !exists(data, index),

      {
        type: 'add',
        path: index,
        templateFile: 'templates/sagas/index.js'
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

  makeModuleGenerator('saga', {
    description: 'create a saga',
    prompts: [
      {
        type: 'input',
        name: 'sagaName',
        message: "What's the saga's name?",
        validate(value) {
          if (isEmpty(value)) return 'please provide a saga name';
          return true;
        }
      }
    ],

    actions: data => [
      // saga file
      {
        type: 'add',
        path: sagaFilePath,
        templateFile: 'templates/sagas/saga.js',
        abortOnFail: true
      },
      // update module saga index file,
      ...makeIndexSagaActions(data, {
        nameKey: 'sagaName',
        index: sagaIndexPath,
        file: sagaFilePath
      }),
      ...insertIf(
        data.createModule,
        // upsert rootSaga
        ...makeIndexSagaActions(data, {
          nameKey: 'moduleName',
          index: rootSagaPath,
          file: sagaIndexPath
        })
      )
    ]
  });
};
