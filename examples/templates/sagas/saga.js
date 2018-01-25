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
const createAction = moduleActions('{{moduleName}}/{{sagaName}}');

export const start{{pascalCase sagaName}} = createAction("start{{pascalCase sagaName}}")
export const stop{{pascalCase sagaName}} = createAction("stop{{pascalCase sagaName}}")

export default function*() {
  

  takeEvery(start{{pascalCase sagaName}}, function*(){

    // Fill me!

  })
}
