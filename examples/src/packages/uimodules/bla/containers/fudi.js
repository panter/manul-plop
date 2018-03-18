// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import fudi from '../components/fudi';
import { type State } from '../../../redux/rootReducer';

const fudiContainer = compose(
  connect((state: State) => ({}), dispatch => ({}))
)(fudi);
export default fudiContainer;
