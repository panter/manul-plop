/* @flow */
import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {
  /* 📌 INITIAL-STATE */
  barVisible: false
};

export type UiState = typeof initialState;

// prefix all actions
const createAction = moduleActions('foo/ui');

/* 📌 ACTION-CREATORS */
export const showBar = createAction(`showBar`);

export const hideBar = createAction(`hideBar`);

export default handleActions(
  {
    /* 📌 ACTION-REDUCERS */
    showBar: (state, action) => ({
      ...state,
      barVisible: true
    }),

    hideBar: (state, action) => ({
      ...state,
      barVisible: Boolean(false)
    })
  },
  initialState
);
