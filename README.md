# manul-plop
Mantra-style plop-pack for [plop](https://github.com/amwmedia/plop/), replacing mantra-cli.

*Work in progress*, uses currently a forked version o()https://github.com/amwmedia/plop/f plop-node (https://github.com/panter/node-plop.git#9985bae2e8e87d16f2891eb076f63732990aae73), 
upstream PRS are pending


`plop` is a micro-framework to create code-generators like yeoman, but much simpler. This is a plop-pack 
to create mantra-like react-redux-apps (where everything is organized in modules). 

It can generate components, containers (todo), reducers and actions, as well as sagas and wires everything up. It's little opinionated and can be highly customized later, but gives good defaults to work with.




## generators

- `component`: creates a component in a module with storybookfile and unittest
- `saga` createas a saga file in a module and wires this saga to the root saga
- `reducer` creates a named reducer and an action inside a module and merges this reducer in the root reducer (using combineReducers)
- `reducer-setter` same as above, but you specify a property instead of the action name. It will create a setter based on that property

## mixins

- `with-module`: asks for module name and sets `path` within created module folder (if you specify `pathInModule` on an action). 
Every generator shipped uses this mixin.

## custom action types

- `component` will create a component, a storybook file and a unittest


### TODO:

- [ ] hope that every change needed on `plop-node` gets merged
- [ ] add container generator
- [ ] expose some more custom-actions like index-updaters
- [ ] document templates
