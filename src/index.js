import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import { reduxFirestore } from 'redux-firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
import rootReducer from './reducers/rootReducer'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(
                sagaMiddleware
            ),
            reduxFirestore(fbConfig),
            reactReduxFirebase(fbConfig, { attachAuthIsReady: true })
        )
    )
    return store
}

const store = configureStore();

store.subscribe(() => {
    // console.log(store.getState())
});

sagaMiddleware.run(rootSaga)

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store = {store}>
        <App />
    </Provider>, document.getElementById('root'));
});

serviceWorker.unregister();


