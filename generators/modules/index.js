const { isEmpty, forEach, uniq, filter } = require('lodash')
const { exec } = require('child_process')

module.exports = (plop, config) => {
  const { modulePath } = require('../paths')(config)
  const { exists } = require('../utils')(plop)

  const moduleNamePrompt = {
    type: 'input',
    name: 'moduleName',
    message: "What's the module name?",
    validate(value) {
      if (isEmpty(value)) return 'please provide a module name'
      return true
    }
  }

  const createModuleIfNotExistsPrompt = {
    type: 'confirm',
    name: 'createModule',
    when(data) {
      return !exists(data, modulePath)
    },
    message: 'This module does not exist. Should I create this module?'
  }

  const appendPaths = data => {
    const paths = require('../paths')(config)
    forEach(paths, (value, key) => {
      data[key] = value
    })
  }

  plop.setGeneratorMixin('with-module', {
    prompts: prompts => [
      moduleNamePrompt,
      ...prompts,
      createModuleIfNotExistsPrompt
    ],
    actions: (actions = [], data) => {
      if (data.createModule === false) {
        return [] // abort
      }
      const getPath = actionConfig =>
        actionConfig.path || `${modulePath}/${actionConfig.pathInModule}`
      const result = actions.map(actionConfig => ({
        ...actionConfig,
        path: getPath(actionConfig)
      }))
      const pathsToOpen = filter(
        uniq(
          actions.map(actionConfig =>
            plop.renderString(getPath(actionConfig), {
              ...data,
              ...actionConfig.data
            })
          )
        )
      )

      pathsToOpen.forEach(path => {
        const cmd = `open ${path}`
        console.log(`cmd: ${cmd}`)

        exec(cmd)
      })

      return result
    }
  })
}
