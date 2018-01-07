// @flow
import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {
  /* 📌 INITIAL-STATE */
};

// prefix all actions
const createAction = moduleActions('core/foo');

/* 📌 ACTION-CREATORS */
export const setboasdf = createAction(
  `setboasdf`,
  (f) => f
);

export const bar = createAction(
  `bar`,
  (f) => f
);


export default handleActions(
  {
    /* 📌 ACTION-REDUCERS */
[setboasdf.toString()]: (state: State, action) => ({
  ...state,
  : action.payload
}),

[bar.toString()]: (state: State, action) => ({
  ...state,
  : action.payload
}),

  },
  initialState
);
