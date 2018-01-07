import { all } from 'redux-saga/effects';

/* this is the saga index. */

/* 📌 IMPORTS */
import core from '../modules/core/sagas/index.js'

const allSagas = [
  /* 📌 SYMBOLS */
  core,
];

export default function*(...args) {
  // start all sagas
  yield all(allSagas.map(...args));
}
