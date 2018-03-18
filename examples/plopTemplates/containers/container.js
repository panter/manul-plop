// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {{name}} from '../components/{{name}}';

const {{name}}Container = compose(
  connect(
    ({ {{moduleName}} }) => ({

    }),
    dispatch => ({

    }),
  )
)({{name}});
export default {{name}}Container;
