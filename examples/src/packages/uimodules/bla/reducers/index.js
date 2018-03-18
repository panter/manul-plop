/* @flow */
import { combineReducers } from 'redux';

/* 📌 IMPORTS */
import ui, { type UiState} from './ui.js'


export type BlaState = {
  /* 📌 SYMBOLS_TYPES */
  ui: UiState, 

}

export default combineReducers({
  /* 📌 SYMBOLS */
  ui: ui, 

});
