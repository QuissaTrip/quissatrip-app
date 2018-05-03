import {
    createStore,
    applyMiddleware }   from 'redux';
import {
    persistStore,
    persistReducer }    from 'redux-persist';
import storage          from 'redux-persist/lib/storage';
import autoMergeLevel2  from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk            from 'redux-thunk';
import reducers         from '../app/reducers';

const persistConfig = {
    storage,
    key: 'quissatrip-root',
    whitelist: ['general'],
    stateReconciler: autoMergeLevel2
}

const _persistReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    _persistReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);
