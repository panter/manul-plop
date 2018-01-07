
module.exports = function(plop) {
  const {
    insertIf,
  } = require('../utils')(plop);

  plop.setActionType('component', (answers, _actionConfig, { runActions }) => {
    const actionConfig = {
      path: "src/components",
      ..._actionConfig
    }
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
        pathInModule: "components",
        componentTemplate: 'templates/components/component.js',
        testTemplate: 'templates/components/component.test.js',
        storyTemplate: 'templates/components/component.story.js'
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
        pathInModule: "components",
        componentTemplate: 'templates/components/component.js',
        testTemplate: 'templates/components/component.test.js',
        storyTemplate: 'templates/components/component.story.js'
      }
    ]
  });
};
