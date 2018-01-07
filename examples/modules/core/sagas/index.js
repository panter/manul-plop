import { all } from 'redux-saga/effects';

/* this is the saga index. */

/* 📌 IMPORTS */
import fetchdata from './fetchdata.js'
import sync from './sync.js'

const allSagas = [
  /* 📌 SYMBOLS */
  fetchdata,
  sync,
];

export default function*(...args) {
  // start all sagas
  yield all(allSagas.map(...args));
}
