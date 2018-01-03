import { all } from 'redux-saga/effects';

/* this is the saga index. */

/* 💬 IMPORTS */

const allSagas = [
  /* 💬 SYMBOLS */
];

export default function*(...args) {
  yield all(allSagas.map(...args));
}
