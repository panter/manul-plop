import { all } from 'redux-saga/effects';

/* this is the saga index. */

/* 💬 SAGA IMPORTS */
import das from './das.js'

const allSagas = [
  /* 💬 ALL SAGAS */
  das,
];

export default function*(...args) {
  yield all(allSagas.map(...args));
}
