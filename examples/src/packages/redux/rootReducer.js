/* @flow */
import { combineReducers } from 'redux';

/* 📌 IMPORTS */
import core, { type CoreState} from '../uimodules/core/reducers/index.js'


import bla, { type BlaState} from '../uimodules/bla/reducers/index.js'




export type State = {
  /* 📌 SYMBOLS_TYPES */
  core: CoreState, 


  bla: BlaState, 



}

export default combineReducers({
  /* 📌 SYMBOLS */
  core: core, 


  bla: bla, 



});
