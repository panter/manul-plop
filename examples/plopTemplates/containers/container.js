// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {{name}} from '../components/{{name}}';
import { type State } from '../../../redux/rootReducer';

const {{name}}Container = compose(
  connect(
    ({ {{moduleName}} }: State) => ({
      {{moduleName}}: {{moduleName}}
    }),
    dispatch => ({

    }),
  )
)({{name}});
export default {{name}}Container;
