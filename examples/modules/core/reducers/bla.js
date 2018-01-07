// @flow
import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {
  /* 📌 INITIAL-STATE */
};

// prefix all actions
const createAction = moduleActions('core/bla');

/* 📌 ACTION-CREATORS */
export const blubb = createAction(
  `blubb`,
  (f) => f
);


export default handleActions(
  {
    /* 📌 ACTION-REDUCERS */
[blubb.toString()]: (state: State, action) => ({
  ...state,
  : action.payload
}),

  },
  initialState
);
