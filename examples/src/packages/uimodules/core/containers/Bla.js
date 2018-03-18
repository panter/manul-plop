// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Bla from '../components/Bla';
import { type State } from '../../../redux/rootReducer';

const BlaContainer = compose(
  connect(({ core }: State) => ({}), dispatch => ({}))
)(Bla);
export default BlaContainer;
