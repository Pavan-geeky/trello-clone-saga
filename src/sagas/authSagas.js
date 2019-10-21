import firebase from '../config/fbConfig'
import { call, put, takeLatest, all } from 'redux-saga/effects';
const fireStore = firebase.firestore()

// sagas
function* createUserCollection (id, formData) {
     yield fireStore.collection('users').doc(id).set({
          ...formData,
          roles: ['developer']
     });
}

export function* createUser({ formData }) {
     const u = yield firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);
     yield call(createUserCollection, u.user.uid, formData)
     yield put({ type: 'LOGIN_SUCCESS' })
}

export function* signIn({ formData }) {
     try {
          yield firebase.auth().signInWithEmailAndPassword(formData.email, formData.password);
          yield put({ type: 'LOGIN_SUCCESS' })
     }
     catch(err) {
          yield({ type: 'LOGIN_ERROR', err })
     }
}

export function* signOut() {
     yield firebase.auth().signOut();
     yield put ({ type: 'LOGOUT_SUCCESS' })
}

// sagawatchers
export function* onCreateUser() {
     yield takeLatest('CREATE_USER_START', createUser)
}

export function* onsignIn() {
     yield takeLatest('SIGN_IN_START', signIn)
}

export function* onsignOut() {
     yield takeLatest('SIGN_OUT_START', signOut)
}
 
// exporting
export function* authSaga() {
     yield all([ 
          call(onCreateUser),
          call(onsignIn),
          call(onsignOut)
     ])
}