/* @flow */
import { handleActions } from 'redux-actions';
import { moduleActions } from '@panter/manul-redux-utils';

const initialState = {
  /* 📌 INITIAL-STATE */
  height: 0, 
};

export type RoomState = typeof initialState;
// prefix all actions
const createAction = moduleActions('core/room');

/* 📌 ACTION-CREATORS */
export const setHeight = createAction(
  `setHeight`,
  (f) => f
);


export default handleActions(
  {
    /* 📌 ACTION-REDUCERS */
setHeight: (state: RoomState, action) => ({
  ...state,
  height: action.payload
}),

  },
  initialState
);
