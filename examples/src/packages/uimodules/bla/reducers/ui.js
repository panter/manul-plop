/* @flow */
import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {
  /* 📌 INITIAL-STATE */
  fudiVisible: false, 
};

export type UiState = typeof initialState;
// prefix all actions
const createAction = moduleActions('bla/ui');

/* 📌 ACTION-CREATORS */
export const showFudi = createAction(
  `showFudi`,
  
);

export const hideFudi = createAction(
  `hideFudi`,
  
);


export default handleActions(
  {
    /* 📌 ACTION-REDUCERS */
showFudi: (state: UiState, action) => ({
  ...state,
  fudiVisible: true
}),

hideFudi: (state: UiState, action) => ({
  ...state,
  fudiVisible: Boolean(false)
}),

  },
  initialState
);
