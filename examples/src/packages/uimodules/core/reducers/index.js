/* @flow */
import { combineReducers } from 'redux';

/* 📌 IMPORTS */
import room, { type RoomState} from './room.js'
import ui, { type UiState} from './ui.js'




export type CoreState = {
  /* 📌 SYMBOLS_TYPES */
  room: RoomState, 
  ui: UiState, 



}

export default combineReducers({
  /* 📌 SYMBOLS */
  room: room, 
  ui: ui, 



});
