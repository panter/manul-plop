import { all } from 'redux-saga/effects';

/* this is the saga index. */

/* 💬 SAGA IMPORTS */
import blafffff from './blafffff.js'

const allSagas = [
  /* 💬 ALL SAGAS */
  blafffff,
];

export default function*(...args) {
  yield all(allSagas.map(...args));
}
