const { isEmpty } = require('lodash');

module.exports = (plop, config) => {
  const { modulePath } = require('../paths')(config);
  const { exists } = require('../utils')(plop);

  const moduleNamePrompt = {
    type: 'input',
    name: 'moduleName',
    message: "What's the module name?",
    validate(value) {
      if (isEmpty(value)) return 'please provide a module name';
      return true;
    }
  };

  const createModuleIfNotExistsPrompt = {
    type: 'confirm',
    name: 'createModule',
    when(data) {
      return !exists(data, modulePath);
    },
    message: 'This module does not exist. Should I create this module?'
  };

  plop.setGeneratorMixin('with-module', {
    prompts: prompts => [
      moduleNamePrompt,
      ...prompts,
      createModuleIfNotExistsPrompt
    ],
    actions: (actions = [], data) => {
      if (data.createModule === false) {
        return []; // abort
      }
      const result = actions.map(actionConfig => ({
        ...actionConfig,
        path: actionConfig.path || `${modulePath}/${actionConfig.pathInModule}`
      }));

      return result;
    }
  });
};
