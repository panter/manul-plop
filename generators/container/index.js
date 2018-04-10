module.exports = function(plop, config) {
  const { insertIf } = require('../utils')(plop)
  const { templatePath } = require('../paths')(config)
  plop.setActionType('container', (answers, actionConfig, { runActions }) =>
    runActions(
      [
        {
          type: 'add',
          skipIfExists: true,
          path: `${actionConfig.path}/{{name}}.js`,
          templateFile: actionConfig.containerTemplate,
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

  plop.setGenerator('container', {
    mixins: ['with-module'],
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the containers name?",
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
      {
        type: 'container',
        pathInModule: 'containers',
        containerTemplate: `${templatePath}/containers/container.js`,
        testTemplate: config.containerTests
          ? `${templatePath}/containers/container.test.js`
          : null,
        storyTemplate: config.containerStorybook
          ? `${templatePath}/containers/container.stories.js`
          : null,
      },
    ],
  })
}
