import firebase from '../config/fbConfig'
import { call, put, takeLatest, all } from 'redux-saga/effects';
const fireStore = firebase.firestore()

// sagas
export function* getUsers() {
     const result = yield fireStore.collection('users').get();
     let users =[]
     result.docs.forEach(doc => {
          users.push({ id: doc.id, name: doc.data().name, email: doc.data().email, roles: doc.data().roles })
     });
     yield put({ type: 'GET_USERS', payload:  users})
}

export function* isAdmin({ id }) {
     const result = yield fireStore.collection('users').doc(id).get();
     let rolesArr = result.data().roles;
     let isAdmin = rolesArr.includes('admin');
     yield put({ type: 'IS_ADMIN', payload: isAdmin })
}

// sagawatchers
export function* ongetUsers() {
     yield takeLatest('GET_USERS_START', getUsers)
}

export function* onisAdmin() {
     yield takeLatest('IS_ADMIN_START', isAdmin)
}
 
// exporting
export function* userSaga() {
     yield all([ 
          call(ongetUsers),
          call(onisAdmin)
     ])
}