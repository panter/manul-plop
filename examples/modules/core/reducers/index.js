import { combineReducers } from 'redux';

/* 📌 IMPORTS */
import profile from './profile.js'
import foo from './foo.js'
import bla from './bla.js'


export default combineReducers({
  /* 📌 SYMBOLS */
  profile,
  foo,
  bla,

});
