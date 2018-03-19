const fs = require('fs')
const nodePath = require('path')

const makeMarkerPattern = marker =>
  new RegExp(`\\/\\* 📌 ${marker} \\*\\/`, 'gi')

module.exports = plop => {
  const insertIf = (condition, ...elements) => (condition ? elements : [])

  const makeDestPath = p => nodePath.resolve(plop.getDestBasePath(), p)
  const exists = (data, pathTemlate) => {
    const fileDestPath = makeDestPath(
      plop.renderString(pathTemlate || '', data)
    )
    return fs.existsSync(fileDestPath)
  }

  const makeAppendImportsAction = ({
    defaultImport,
    typeImports,
    pathKey,
    fileToImportPathKey,
    data,
  }) => {
    let imports = ''
    if (defaultImport) {
      imports += defaultImport
    }
    if (typeImports) {
      imports += `, { ${typeImports.map(t => `type ${t}`).join(', ')} }`
    }
    const template = `import ${imports} from '{{getRelativePath "${pathKey}" "${fileToImportPathKey}" stripExtension=true}}'`
    return {
      type: 'append',
      data,
      path: `{{getPath "${pathKey}"}}`,
      pattern: makeMarkerPattern('IMPORTS'),
      template,
    }
  }

  const makeAppendKeyValueAction = ({ key, value, path, data, marker }) => ({
    type: 'append',
    data,
    path,
    pattern: makeMarkerPattern(marker),
    template: `  ${key}: ${value},`,
  })
  const makeAppendToListAction = ({ value, path, data, marker }) => ({
    type: 'append',
    data,
    path,
    pattern: makeMarkerPattern(marker),
    template: `  ${value},`,
  })

  return {
    makeAppendImportsAction,
    makeAppendToListAction,
    makeAppendKeyValueAction,
    insertIf,
    exists,
  }
}
