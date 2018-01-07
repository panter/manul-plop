// @flow
import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {
  /* 📌 INITIAL-STATE */
  username: null
};

// prefix all actions
const createAction = moduleActions('core/profile');

/* 📌 ACTION-CREATORS */
export const setUsername = createAction(`setUsername`, f => f);

export default handleActions(
  {
    /* 📌 ACTION-REDUCERS */
    [setUsername.toString()]: (state: State, action) => ({
      ...state,
      username: action.payload
    })
  },
  initialState
);
