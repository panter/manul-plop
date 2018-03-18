const { isEmpty, upperFirst, camelCase } = require('lodash');

const pascalCase = s => upperFirst(camelCase(s));
const getReducerStateType = reducerName => `${pascalCase(reducerName)}State`;
module.exports = function(plop, config) {
  const {
    makeAppendImportsAction,
    makeAppendKeyValueAction
  } = require('../utils')(plop, config);

  const { templatePath, modulePath, reduxRootPath } = require('../paths')(
    config
  );
  const moduleReducerPath = `${modulePath}/reducers`;
  const reducerIndexPath = `${moduleReducerPath}/index.js`;
  const reducerFilePath = `${moduleReducerPath}/{{camelCase reducerName}}.js`;
  const rootReducerPath = `${reduxRootPath}/rootReducer.js`;

  const makeIndexReducerActions = ({ data, nameKey, file, index }) => [
    {
      data,
      skipIfExists: true,
      type: 'add',
      path: index,
      templateFile: `${templatePath}/reducers/index.js`
    },
    makeAppendImportsAction({
      data,
      defaultImport: `{{camelCase ${nameKey}}}`,
      typeImports: [`{{pascalCase ${nameKey}}}State`],
      path: index,
      fileToImport: file
    }),
    makeAppendKeyValueAction({
      data,
      key: `{{camelCase ${nameKey}}}`,
      value: `{{camelCase ${nameKey}}}`,
      marker: 'SYMBOLS',
      path: index
    }),
    makeAppendKeyValueAction({
      data,
      key: `{{camelCase ${nameKey}}}`,
      value: `{{pascalCase ${nameKey}}}State`,
      marker: 'SYMBOLS_TYPES',
      path: index
    })
  ];

  const makeReducerActions = (baseData, additionalData) => {
    const combinedData = { ...baseData, ...additionalData };
    const data = {
      ...combinedData,
      reducerStateType: getReducerStateType(combinedData.reducerName)
    };
    return [
      // reducer file
      {
        data,
        skipIfExists: true,
        type: 'add',
        path: reducerFilePath,
        templateFile: `${templatePath}/reducers/reducer.js`
      },
      {
        data,
        type: 'append',
        path: reducerFilePath,
        pattern: /\/\* 📌 ACTION-CREATORS \*\//gi,
        templateFile: `${templatePath}/reducers/actionCreator.js`
      },
      {
        data,
        type: 'append',
        path: reducerFilePath,
        pattern: /\/\* 📌 ACTION-REDUCERS \*\//gi,
        templateFile: `${templatePath}/reducers/actionReducer.js`
      },

      // update module reducer index file,
      ...makeIndexReducerActions({
        data,
        nameKey: 'reducerName',
        index: reducerIndexPath,
        file: reducerFilePath
      }),

      // upsert rootReducer
      ...makeIndexReducerActions({
        data,
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
  const uiElementNamePrompt = {
    type: 'input',
    name: 'uiElementName',
    message: "What's the ui-element's name?",
    validate(value) {
      if (isEmpty(value)) return 'please provide an ui-element name';
      return true;
    }
  };

  const propertyNamePrompt = {
    type: 'input',
    name: 'propertyName',
    message: "What's the property's name?",
    validate(value) {
      if (isEmpty(value)) return 'please provide a property name';
      return true;
    }
  };
  const initialValuePrompt = {
    type: 'input',
    name: 'initialValue',
    message: "What's the property's initial value?",
    validate(value) {
      if (isEmpty(value)) return 'please provide a property value';
      return true;
    }
  };

  plop.setGenerator('reducer-ui', {
    mixins: ['with-module'],
    description: 'create a ui reducer-action',
    prompts: [uiElementNamePrompt],
    actions: data => [
      ...makeReducerActions(data, {
        reducerName: 'ui',
        propertyName: `${data.uiElementName}Visible`,
        actionName: `hide${upperFirst(data.uiElementName)}`,
        propertyValue: 'Boolean(false)', // false is buggy (!) see https://github.com/amwmedia/plop/issues/112
        payloadCreator: null
      }),
      ...makeReducerActions(data, {
        reducerName: 'ui',
        actionName: `show${upperFirst(data.uiElementName)}`,
        propertyName: `${data.uiElementName}Visible`,
        propertyValue: 'true',
        payloadCreator: null
      }),

      {
        type: 'append',
        data: {
          reducerName: 'ui'
        },
        path: reducerFilePath,
        pattern: /\/\* 📌 INITIAL-STATE \*\//gi,
        template: `${data.uiElementName}Visible: false`
      }
    ]
  });
  plop.setGenerator('reducer-setter', {
    mixins: ['with-module'],
    description: 'create a setter reducer-action',
    prompts: [reducerNamePrompt, propertyNamePrompt, initialValuePrompt],
    actions: data => [
      ...makeReducerActions(data, {
        actionName: `set${upperFirst(data.propertyName)}`,
        propertyValue: 'action.payload',
        payloadCreator: `(f) => f`
      }),
      {
        type: 'append',
        path: reducerFilePath,
        pattern: /\/\* 📌 INITIAL-STATE \*\//gi,
        template: '{{propertyName}}: {{{initialValue}}}'
      }
    ]
  });

  plop.setGenerator('reducer-custom', {
    mixins: ['with-module'],
    description: 'create a custom reducer',
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
};
