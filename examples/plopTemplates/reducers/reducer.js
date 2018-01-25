import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {
  /* 📌 INITIAL-STATE */
};

// prefix all actions
const createAction = moduleActions('{{moduleName}}/{{reducerName}}');

/* 📌 ACTION-CREATORS */

export default handleActions(
  {
    /* 📌 ACTION-REDUCERS */
  },
  initialState
);
