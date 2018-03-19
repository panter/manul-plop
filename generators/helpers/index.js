const { upperFirst, camelCase } = require('lodash')
const nodePath = require('path')

const pascalCase = s => upperFirst(camelCase(s))
const getReducerStateType = reducerName => `${pascalCase(reducerName)}State`

module.exports = function(plop, config) {
  const paths = require('../paths')(config)
  const getPath = (key, { data: { root: data } }) =>
    plop.renderString(paths[key], data)

  plop.setHelper('getPath', (key, context) => getPath(key, context))

  plop.setHelper('getStateType', reducerName =>
    getReducerStateType(reducerName)
  )

  const removeExtension = path => path.substring(0, path.lastIndexOf('.'))

  plop.setHelper('getRelativePath', (baseFileKey, fileKey, context) => {
    const { stripExtension = true } = context.hash

    const baseFile = getPath(baseFileKey, context)
    const file = getPath(fileKey, context)
    const baseDir = nodePath.dirname(baseFile)
    const fileDir = nodePath.dirname(file)
    let relativePath
    // nodePath.relative does not append "./" if its in same directory
    if (baseDir === fileDir) {
      relativePath = `./${nodePath.basename(file)}`
    } else {
      relativePath = nodePath.relative(baseDir, file)
    }

    return stripExtension ? removeExtension(relativePath) : relativePath
  })

  return plop
}
