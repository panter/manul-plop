import { moduleActions } from '@panter/manul-redux-utils';
import {
  take,
  put,
  call,
  fork,
  select,
  all,
  race,
  spawn
} from 'redux-saga/effects';
import { delay, eventChannel, takeLatest, takeEvery } from 'redux-saga';

// prefix all actions
const createAction = moduleActions('core/sync');

export const startSync = createAction("startSync")
export const stopSync = createAction("stopSync")

export default function*() {
  

  takeEvery(startSync, function*(){

    // Fill me!

  })
}
