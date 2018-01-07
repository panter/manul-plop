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
const createAction = moduleActions('core/fetchdata');

export const startFetchdata = createAction("startFetchdata")
export const stopFetchdata = createAction("stopFetchdata")

export default function*() {
  

  takeEvery(startFetchdata, function*(){

    // Fill me!

  })
}
