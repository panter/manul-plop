module.exports = function(plop, config) {
  const { insertIf } = require('../utils')(plop);
  const { templatePath } = require('../paths')(config);
  plop.setActionType('component', (answers, _actionConfig, { runActions }) => {
    const actionConfig = {
      path: 'src/components',
      ..._actionConfig
    };
    return runActions(
      [
        {
          type: 'add',
          path: `${actionConfig.path}/{{name}}.js`,
          templateFile: actionConfig.componentTemplate
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
    );
  });

  plop.setGenerator('component', {
    mixins: ['with-module'],
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the component name?"
      }
    ],
    actions: [
      {
        type: 'component',
        pathInModule: 'components',
        componentTemplate: `${templatePath}/components/component.js`,
        testTemplate: `${templatePath}/components/component.test.js`,
        storyTemplate: `${templatePath}/components/component.story.js`
      }
    ]
  });

  plop.setGenerator('component-primitives', {
    mixins: ['with-module'],
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the component name?"
      }
    ],
    actions: [
      {
        type: 'component',
        pathInModule: 'components',
        componentTemplate: `${templatePath}/components/component.js`,
        testTemplate: `${templatePath}/components/component.test.js`,
        storyTemplate: `${templatePath}/components/component.story.js`
      }
    ]
  });
};
