const { isEmpty } = require('lodash')

module.exports = function(plop, config) {
  const {
    makeAppendImportsAction,
    makeAppendToListAction,
  } = require('../utils')(plop, config)

  const { templatePath } = require('../paths')(config)

  const makeIndexSagaActions = (
    data,
    { nameKey, filePathKey, indexPathKey }
  ) => [
    {
      skipIfExists: true,
      type: 'add',
      path: `{{getPath "${indexPathKey}"}}`,
      templateFile: `${templatePath}/sagas/index.js`,
    },
    makeAppendImportsAction({
      defaultImport: `{{camelCase ${nameKey}}}`,
      pathKey: indexPathKey,
      fileToImportPathKey: filePathKey,
    }),
    makeAppendToListAction({
      marker: 'SYMBOLS',
      key: `{{camelCase ${nameKey}}}`,
      value: `{{camelCase ${nameKey}}}`,
      path: `{{getPath "${indexPathKey}"}}`,
    }),
  ]

  plop.setGenerator('saga', {
    description: 'create a saga',
    mixins: ['with-module'],
    prompts: [
      {
        type: 'input',
        name: 'sagaName',
        message: "What's the saga's name?",
        validate(value) {
          if (isEmpty(value)) return 'please provide a saga name'
          return true
        },
      },
    ],

    actions: data => [
      // saga file
      {
        type: 'add',
        path: '{{getPath "sagaFilePath"}}',
        templateFile: `${templatePath}/sagas/saga.js`,
        abortOnFail: true,
      },
      // update module saga index file,
      ...makeIndexSagaActions(data, {
        nameKey: 'sagaName',
        indexPathKey: 'sagaIndexPath',
        filePathKey: 'sagaFilePath',
      }),

      // upsert rootSaga
      ...makeIndexSagaActions(data, {
        nameKey: 'moduleName',
        indexPathKey: 'rootSagaPath',
        filePathKey: 'sagaIndexPath',
      }),
    ],
  })
}
