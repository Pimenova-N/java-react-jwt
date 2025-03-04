import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from "../sagas/index";
import rootReducer from "../reducers";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(sagaMiddleware)})

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootWatcher)
