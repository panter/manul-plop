import { all } from 'redux-saga/effects';

/* this is the saga index. */

/* 💬 SAGA IMPORTS */
import fo from '../ui/fo/sagas/index.js'
import na from '../ui/na/sagas/index.js'

const allSagas = [
  /* 💬 ALL SAGAS */
  fo,
  na,
];

export default function*(...args) {
  yield all(allSagas.map(...args));
}
