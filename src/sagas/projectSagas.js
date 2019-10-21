import firebase from '../config/fbConfig'
import { call, put, takeLatest, all } from 'redux-saga/effects';
const fireStore = firebase.firestore()

// sagas
export function* createProject({ payload: {formData, userId} }) {
     yield fireStore.collection('projects').add({
          ...formData,
          users: [userId],
          tasks: [],
          createdAt: new Date()
     })
     yield put({ type: 'CREATE_PROJECT', formData })
}

export function* deleteProject({ id }) {
     yield fireStore.collection('projects').doc(id).delete();
} 

export function* getProject() {
     const result = yield fireStore.collection('projects').get();
     let projects =[];
     result.docs.forEach(doc => {
          projects.push({ id: doc.id, name: doc.data().name, createdAt: doc.data().createdAt, createdBy: doc.data().createdBy, tasks: doc.data().tasks, users: doc.data().users })
     });
     yield put({ type: 'GET_PROJECTS', payload: projects})
}

export function* addTask({ payload: {newTask, id} }) {
     const data = yield fireStore.collection('projects').doc(id).get();
     let tasks = data.data().tasks;
     const AddTaskQuery = yield fireStore.collection('projects').doc(id);
     AddTaskQuery.update({
          tasks: [...tasks, newTask]
     });
}

export function* addUser({ payload: { userData, id } }) {
     const data = yield fireStore.collection('projects').doc(id).get();
     let users = data.data().users;
     const AddUserQuery = fireStore.collection('projects').doc(id);
     AddUserQuery.update({
          users: [...users, userData]
     })
}

export function* removeUser({payload: { userId, id }}) {
     const data = yield fireStore.collection('projects').doc(id).get();
     let users = data.data().users;
     let updatedUsers = users.filter(user => {
          return user.id !== userId
     })
     const RemoveUserQuery = fireStore.collection('projects').doc(id);
     RemoveUserQuery.update({
          users: updatedUsers
     })
}

export function* removeTask({payload: { taskId, id }}) {
     const data = yield fireStore.collection('projects').doc(id).get();
     let tasks = data.data().tasks;
     let updatedTasks = tasks.filter(task => {
          return task.id !== taskId
     })
     const RemoveTaskQuery = fireStore.collection('projects').doc(id);
     RemoveTaskQuery.update({
          tasks: updatedTasks
     })
}

export function* editTask({payload: { taskId, id, editedTask }}) {
     const data = yield fireStore.collection('projects').doc(id).get();
     let tasks = data.data().tasks;
     let editTask = tasks.filter(task => {
          return task.id === taskId
     });
     let users = []
     if(editTask[0].users.length === 0) {
          users.push(editedTask.users[0])
          // users = []
     } else {
          editTask[0].users.forEach(user => {
               users.push(user)
          })
          users.push(editedTask.users[0])
     }
     editedTask.users = users
     let e = editTask[0]
     Object.assign(e, editedTask)
     const EditTaskQuery = fireStore.collection('projects').doc(id);
     EditTaskQuery.update({
          tasks
     })
}

export function* editTaskStatus({payload: { taskId, id, status }}) {
     const data = yield fireStore.collection('projects').doc(id).get();
     let tasks = data.data().tasks;
     let editTask = tasks.filter(task => {
          return task.id === taskId
     })
     let updatedtasks = tasks.filter(task => {
          return task.id !== taskId
     })
     editTask[0].status = status

     updatedtasks.push(editTask[0])
     const EditTaskQuery = fireStore.collection('projects').doc(id);
     EditTaskQuery.update({
          tasks: updatedtasks
     });
}

// sagawatchers
export function* oncreateProject() {
     yield takeLatest('CREATE_PROJECT_START', createProject)
}

export function* ondeleteProject() {
     yield takeLatest('DELETE_PROJECT_START', deleteProject)
}

export function* ongetProject() {
     yield takeLatest('GET_PROJECTS_START', getProject)
}

export function* onaddTask() {
     yield takeLatest('ADD_TASK_START', addTask)
}

export function* onaddUser() {
     yield takeLatest('ADD_USER_START', addUser)
}

export function* onremoveUser() {
     yield takeLatest('REMOVE_USER_START', removeUser)
}

export function* onremoveTask() {
     yield takeLatest('REMOVE_TASK_START', removeTask)
}

export function* oneditTask() {
     yield takeLatest('EDIT_TASK_START', editTask)
}

export function* oneditTaskStatus() {
     yield takeLatest('EDIT_TASKSTATUS_START', editTaskStatus)
}

 
// exporting
export function* projectSaga() {
     yield all([ 
          call(oncreateProject),
          call(ondeleteProject),
          call(ongetProject),
          call(onaddTask),
          call(onaddUser),
          call(onremoveUser),
          call(onremoveTask),
          call(oneditTask),
          call(oneditTaskStatus)
     ])
}