module.exports = function(plop, config) {
  const { insertIf } = require('../utils')(plop)
  const { jsxExtension } = config
  const { templatePath } = require('../paths')(config)
  plop.setActionType('component', (answers, actionConfig, { runActions }) =>
    runActions(
      [
        {
          type: 'add',
          skipIfExists: true,
          path: `${actionConfig.path}/{{name}}.${jsxExtension}`,
          templateFile: actionConfig.componentTemplate,
        },
        ...insertIf(actionConfig.storyTemplate, {
          type: 'add',
          skipIfExists: true,
          path: `${actionConfig.path}/stories/{{name}}.stories.${jsxExtension}`,
          templateFile: actionConfig.storyTemplate,
        }),
        ...insertIf(actionConfig.testTemplate, {
          type: 'add',
          skipIfExists: true,
          path: `${actionConfig.path}/tests/{{name}}.test.${jsxExtension}`,
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
        componentTemplate: `${templatePath}/components/component.${jsxExtension}`,
        testTemplate: config.componentTests
          ? `${templatePath}/components/component.test.${jsxExtension}`
          : null,
        storyTemplate: config.componentStorybook
          ? `${templatePath}/components/component.stories.${jsxExtension}`
          : null,
      },
    ],
  })
}
