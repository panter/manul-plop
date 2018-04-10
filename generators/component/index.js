module.exports = function(plop, config) {
  const { insertIf } = require('../utils')(plop)
  const { templatePath } = require('../paths')(config)
  plop.setActionType('component', (answers, actionConfig, { runActions }) =>
    runActions(
      [
        {
          type: 'add',
          skipIfExists: true,
          path: `${actionConfig.path}/{{name}}.js`,
          templateFile: actionConfig.componentTemplate,
        },
        ...insertIf(actionConfig.storyTemplate, {
          type: 'add',
          skipIfExists: true,
          path: `${actionConfig.path}/stories/{{name}}.stories.js`,
          templateFile: actionConfig.storyTemplate,
        }),
        ...insertIf(actionConfig.testTemplate, {
          type: 'add',
          skipIfExists: true,
          path: `${actionConfig.path}/tests/{{name}}.test.js`,
          templateFile: actionConfig.testTemplate,
        }),
      ],
      answers
    )
  )

  plop.setGenerator('component', {
    mixins: ['with-module'],
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the component name?",
      },
    ],
    actions: [
      {
        type: 'component',
        pathInModule: 'components',
        componentTemplate: `${templatePath}/components/component.js`,
        testTemplate: `${templatePath}/components/component.test.js`,
        storyTemplate: `${templatePath}/components/component.stories.js`,
      },
    ],
  })

  plop.setGenerator('component-primitives', {
    mixins: ['with-module'],
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the component name?",
      },
    ],
    actions: [
      {
        type: 'component',
        pathInModule: 'components',
        componentTemplate: `${templatePath}/components/component.js`,
        testTemplate: config.componentTests
          ? `${templatePath}/components/component.test.js`
          : null,
        storyTemplate: config.componentStorybook
          ? `${templatePath}/components/component.stories.js`
          : null,
      },
    ],
  })
}
