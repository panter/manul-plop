import { all } from 'redux-saga/effects';

/* this is the saga index. */

/* 💬 SAGA IMPORTS */
import blafffff from './blafffff.js'
import blaffff from './blaffff.js'
import blafff from './blafff.js'
import blaff from './blaff.js'
import bar from './bar.js'

const allSagas = [
  /* 💬 ALL SAGAS */
  blafffff,
  blaffff,
  blafff,
  blaff,
  bar,
];

export default function*(...args) {
  yield all(allSagas.map(...args));
}
