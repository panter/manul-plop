// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { type State } from '../../../redux/rootReducer';
import { showFoo } from '../reducers/ui';
import jlje from '../components/jlje';

const jljeContainer = compose(
  connect(
    ({ core }: State) => ({
      visible: core.ui.fooVisible,
      height: core.room.height
    }),
    { showFoo }
  )
)(jlje);
export default jljeContainer;
