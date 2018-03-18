module.exports = function(plop, config) {
  const { insertIf } = require('../utils')(plop);
  const { templatePath } = require('../paths')(config);
  plop.setActionType('container', (answers, actionConfig, { runActions }) =>
    runActions(
      [
        {
          type: 'add',
          path: `${actionConfig.path}/{{name}}.js`,
          templateFile: actionConfig.containerTemplate
        },
        ...insertIf(actionConfig.storyTemplate, {
          type: 'add',
          path: `${actionConfig.path}/stories/{{name}}.story.js`,
          templateFile: actionConfig.storyTemplate
        }),
        ...insertIf(actionConfig.testTemplate, {
          type: 'add',
          path: `${actionConfig.path}/tests/{{name}}.test.js`,
          templateFile: actionConfig.testTemplate
        })
      ],
      answers
    )
  );

  plop.setGenerator('container', {
    mixins: ['with-module'],
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the containers name?"
      }
    ],
    actions: [
      {
        type: 'component',
        pathInModule: 'components',
        containerTemplate: `${templatePath}/components/component.js`,
        testTemplate: `${templatePath}/components/component.test.js`,
        storyTemplate: `${templatePath}/components/component.story.js`
      },
      {
        type: 'container',
        pathInModule: 'containers',
        containerTemplate: `${templatePath}/containers/container.js`,
        testTemplate: `${templatePath}/containers/container.test.js`,
        storyTemplate: `${templatePath}/containers/container.story.js`
      }
    ]
  });
};
