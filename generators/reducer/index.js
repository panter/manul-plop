const { isEmpty, upperFirst } = require('lodash');

module.exports = function(plop, config) {
  const {
    exists,
    insertIf,
    makeAppendImportsAction,
    makeAppendSymbolsAction
  } = require('../utils')(plop, config);

  const { templatePath, modulePath, reduxRootPath } = require('../paths')(
    config
  );
  const moduleReducerPath = `${modulePath}/reducers`;
  const reducerIndexPath = `${moduleReducerPath}/index.js`;
  const reducerFilePath = `${moduleReducerPath}/{{camelCase reducerName}}.js`;
  const rootReducerPath = `${reduxRootPath}/rootReducer.js`;

  const makeIndexReducerActions = (data, { nameKey, file, index }) => [
    ...insertIf(!exists(data, index), {
      type: 'add',
      path: index,
      templateFile: `${templatePath}/reducers/index.js`
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

  const makeReducerActions = (data, overwriteData = {}) => {
    // we have to mutate data :-/
    Object.assign(data, overwriteData);

    return [
      // reducer file
      ...insertIf(!exists(data, reducerFilePath), {
        type: 'add',
        path: reducerFilePath,
        templateFile: `${templatePath}/reducers/reducer.js`
      }),
      {
        type: 'append',
        path: reducerFilePath,
        pattern: /\/\* 📌 ACTION-CREATORS \*\//gi,
        templateFile: `${templatePath}/reducers/actionCreator.js`
      },
      {
        type: 'append',
        path: reducerFilePath,
        pattern: /\/\* 📌 ACTION-REDUCERS \*\//gi,
        templateFile: `${templatePath}/reducers/actionReducer.js`
      },

      // update module reducer index file,
      ...makeIndexReducerActions(data, {
        nameKey: 'reducerName',
        index: reducerIndexPath,
        file: reducerFilePath
      }),

      // upsert rootReducer
      ...makeIndexReducerActions(data, {
        nameKey: 'moduleName',
        index: rootReducerPath,
        file: reducerIndexPath
      })
    ];
  };

  const reducerNamePrompt = {
    type: 'input',
    name: 'reducerName',
    message: "What's the reducer's name?",
    validate(value) {
      if (isEmpty(value)) return 'please provide a reducer name';
      return true;
    }
  };

  plop.setGenerator('reducer', {
    mixins: ['with-module'],
    description: 'create a reducer',
    prompts: [
      reducerNamePrompt,
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
    actions: makeReducerActions
  });
  plop.setGenerator('reducer-setter', {
    mixins: ['with-module'],
    description: 'create a setter reducer',
    prompts: [
      reducerNamePrompt,
      {
        type: 'input',
        name: 'propertyName',
        message: "What's the property's name?",
        validate(value) {
          if (isEmpty(value)) return 'please provide a property name';
          return true;
        }
      },
      {
        type: 'input',
        name: 'initialValue',
        message: "What's the property's initial value?",
        validate(value) {
          if (isEmpty(value)) return 'please provide a property value';
          return true;
        }
      }
    ],
    actions: data => [
      ...makeReducerActions(data, {
        actionName: `set${upperFirst(data.propertyName)}`
      }),
      {
        type: 'append',
        path: reducerFilePath,
        pattern: /\/\* 📌 INITIAL-STATE \*\//gi,
        templateFile: `${templatePath}/reducers/initialState.js`
      }
    ]
  });
};
