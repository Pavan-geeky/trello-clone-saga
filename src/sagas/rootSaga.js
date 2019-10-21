import { call, all } from 'redux-saga/effects';

import { authSaga } from './authSagas';
import { projectSaga } from './projectSagas'
import { userSaga } from './userSagas'

export default function* rootSaga() {
     yield all([ 
          call(authSaga),
          call(projectSaga),
          call(userSaga)
     ])
}