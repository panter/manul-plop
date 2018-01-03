import { all } from 'redux-saga/effects';

/* this is the saga index. */

/* 💬 SAGA IMPORTS */

const allSagas = [
  /* 💬 ALL SAGAS */
];

export default function*(...args) {
  yield all(allSagas.map(...args));
}
