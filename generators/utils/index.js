const fs = require('fs');
const nodePath = require('path');
const { isEmpty, isFunction } = require('lodash');

module.exports = (plop, config) => {
  const { modulePath } = config;

  const relative = (baseFile, file) => {
    const baseDir = nodePath.dirname(baseFile);
    const fileDir = nodePath.dirname(file);
    // nodePath.relative does not append "./" if its in same directory
    if (baseDir === fileDir) {
      return `./${nodePath.basename(file)}`;
    }
    return nodePath.relative(baseDir, file);
  };

  const insertIf = (condition, ...elements) => (condition ? elements : []);

  const makeDestPath = p => nodePath.resolve(plop.getDestBasePath(), p);
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
    message: 'This module does not exist. Should I create this module?'
  };

  const makeAppendImportsAction = ({ nameKey, path, fileToImport }) => ({
    type: 'append',
    path,
    pattern: /\/\* 💬 IMPORTS \*\//gi,
    template: `import {{camelCase ${nameKey}}} from '${relative(
      path,
      fileToImport
    )}'`
  });

  const makeAppendSymbolsAction = ({ nameKey, path }) => ({
    type: 'append',
    path,
    pattern: /\/\* 💬 SYMBOLS \*\//g,
    template: `  {{camelCase ${nameKey}}},`
  });

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
    makeAppendImportsAction,
    makeAppendSymbolsAction,
    insertIf,
    exists,
    relative,
    makeModuleGenerator
  };
};
