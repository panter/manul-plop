// @flow
import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {};

const createAction = moduleActions('{{moduleName}}/{{reducerName}}');

/* 💬 ACTION-CREATORS */

export default handleActions(
  {
    /* 💬 ACTION-REDUCERS */
    /*
    [setPositionOffset.toString()]: (state: State, action) => ({
      ...state,
      positionOffset: action.payload
    })
    */
  },
  initialState
);
