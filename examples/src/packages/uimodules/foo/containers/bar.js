// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { showBar } from '../reducers/ui';
import bar from '../components/bar';

const barContainer = compose(
  connect(
    ({ foo }) => ({
      visible: foo.barVisible
    }),
    showBar
  )
)(bar);
export default barContainer;
