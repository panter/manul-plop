const fs = require('fs');
const nodePath = require('path');

const makeMarkerPattern = marker => new RegExp(`/* 📌 ${marker} */`, 'gi');

module.exports = plop => {
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

  const makeAppendImportsAction = ({
    defaultImport,
    typeImports,
    path,
    fileToImport,
    data
  }) => {
    let imports = '';
    if (defaultImport) {
      imports += defaultImport;
    }
    if (typeImports) {
      imports += `, { ${typeImports.map(t => `type ${t}`).join(', ')}}`;
    }
    return {
      type: 'append',
      data,
      path,
      pattern: makeMarkerPattern('IMPORTS'),
      template: `import ${imports} from '${relative(path, fileToImport)}'`
    };
  };

  const makeAppendKeyValueAction = ({ key, value, path, data, marker }) => ({
    type: 'append',
    data,
    path,
    pattern: makeMarkerPattern(marker),
    template: `  ${key}: ${value}, `
  });

  return {
    makeAppendImportsAction,
    makeAppendKeyValueAction,
    insertIf,
    exists,
    relative
  };
};
