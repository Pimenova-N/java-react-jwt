import { combineReducers } from 'redux';
import authorsReducer from './authorsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  authors: authorsReducer,
  users: usersReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>