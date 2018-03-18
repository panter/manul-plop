/* @flow */
import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {
  /* 📌 INITIAL-STATE */
  loadingSpinnerVisible: false, 
  fooVisible: false, 
};

export type UiState = typeof initialState;
// prefix all actions
const createAction = moduleActions('core/ui');

/* 📌 ACTION-CREATORS */
export const showLoadingSpinner = createAction(
  `showLoadingSpinner`,
  
);

export const hideLoadingSpinner = createAction(
  `hideLoadingSpinner`,
  
);

export const showFoo = createAction(
  `showFoo`,
  
);

export const hideFoo = createAction(
  `hideFoo`,
  
);


export default handleActions(
  {
    /* 📌 ACTION-REDUCERS */
showLoadingSpinner: (state: UiState, action) => ({
  ...state,
  loadingSpinnerVisible: true
}),

hideLoadingSpinner: (state: UiState, action) => ({
  ...state,
  loadingSpinnerVisible: Boolean(false)
}),

showFoo: (state: UiState, action) => ({
  ...state,
  fooVisible: true
}),

hideFoo: (state: UiState, action) => ({
  ...state,
  fooVisible: Boolean(false)
}),

  },
  initialState
);
