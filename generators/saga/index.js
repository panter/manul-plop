const { isEmpty } = require('lodash');

module.exports = function(plop, config) {
  const {
    exists,
    insertIf,
    makeAppendImportsAction,
    makeAppendSymbolsAction
  } = require('../utils')(plop, config);

  const { modulePath, reduxRootPath } = config;

  const moduleSagaPath = `${modulePath}/sagas`;
  const sagaIndexPath = `${moduleSagaPath}/index.js`;
  const sagaFilePath = `${moduleSagaPath}/{{camelCase sagaName}}.js`;
  const rootSagaPath = `${reduxRootPath}/rootSaga.js`;

  const makeIndexSagaActions = (data, { nameKey, file, index }) => [
    ...insertIf(!exists(data, index), {
      type: 'add',
      path: index,
      templateFile: `${config.templatePath}/sagas/index.js`
    }),
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

  plop.setGenerator('saga', {
    description: 'create a saga',
    mixins: ['with-module'],
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
        templateFile: `${config.templatePath}/sagas/saga.js`,
        abortOnFail: true
      },
      // update module saga index file,
      ...makeIndexSagaActions(data, {
        nameKey: 'sagaName',
        index: sagaIndexPath,
        file: sagaFilePath
      }),

      // upsert rootSaga
      ...makeIndexSagaActions(data, {
        nameKey: 'moduleName',
        index: rootSagaPath,
        file: sagaIndexPath
      })
    ]
  });
};
