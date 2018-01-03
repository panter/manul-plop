const fs = require('fs');
const path = require('path');
const { isEmpty, isFunction } = require('lodash');

module.exports = (plop, config) => {
  const { modulePath } = config;

  const relative = (baseFile, file) => {
    const baseDir = path.dirname(baseFile);
    const fileDir = path.dirname(file);
    // path.relative does not append "./" if its in same directory
    if (baseDir === fileDir) {
      return `./${path.basename(file)}`;
    }
    return path.relative(baseDir, file);
  };

  const insertIf = (condition, ...elements) => (condition ? elements : []);

  const makeDestPath = p => path.resolve(plop.getDestBasePath(), p);
  const exists = (data, pathTemlate) => {
    const fileDestPath = makeDestPath(
      plop.renderString(pathTemlate || '', data)
    );
    return fs.existsSync(fileDestPath);
  };

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
    message: 'This module does not exist. Should we create this module?'
  };

  const makeModuleGenerator = (name, generatorConfig) =>
    plop.setGenerator(name, {
      ...generatorConfig,
      prompts: [
        moduleNamePrompt,
        ...generatorConfig.prompts,
        createModuleIfNotExistsPrompt
      ],
      actions: data => {
        if (data.createModule === false) {
          return []; // abort
        }
        if (isFunction(generatorConfig.actions)) {
          return generatorConfig.actions(data);
        }
        return generatorConfig.actions;
      }
    });

  return {
    insertIf,
    exists,
    relative,
    makeModuleGenerator
  };
};
