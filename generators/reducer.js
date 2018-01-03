const { isEmpty } = require('lodash');

module.exports = function(plop, config) {
  const {
    relative,
    exists,
    insertIf,
    makeModuleGenerator
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
    {
      type: 'modify',
      path: index,
      pattern: /(\/\* 💬 SAGA IMPORTS \*\/)/gi,
      template: `$1\nimport {{camelCase ${nameKey}}} from '${relative(
        index,
        file
      )}'`
    },
    {
      type: 'modify',
      path: index,
      pattern: /(\/\* 💬 ALL SAGAS \*\/)/g,
      template: `$1\n  {{camelCase ${nameKey}}},`
    }
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
