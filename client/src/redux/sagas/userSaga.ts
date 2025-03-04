import { takeLatest, call, put } from "redux-saga/effects";
import { Action } from "redux";
import { REGISTER_REQUEST, LOGIN_REQUEST, LOGOUT } from "../../consts/UserConsts";
import { ILoginRequestAction, ILogoutRequestAction, IRegisterRequestAction } from "../../types/User/UserActions";
import { ILoginSuccessResponse, IRegisterSuccessResponse, ILoginFailureResponse } from "../../types/User/User"
import { loginSuccess, loginFailure, registerFailure, registerSuccess } from "../actions/UserActions";
import { registerUser, loginUser, storeToken, clearToken } from "../../api/UsersApi"
import { AxiosError } from "axios";

function* registerWorker(action: Action<typeof REGISTER_REQUEST> & IRegisterRequestAction): Generator {
  try {
    const data = action.payload;
    const response = (yield call(registerUser, data)) as IRegisterSuccessResponse;
    console.log(response);
    yield put(registerSuccess(response));
    action.navigate('/login')
  } catch (error) {
    const axiosError = (error as AxiosError);
    const result = axiosError.response?.data as ILoginFailureResponse;
    yield put(registerFailure(result));
  }
}

function* loginWorker(action: Action<typeof LOGIN_REQUEST> & ILoginRequestAction): Generator {
  try {
    const data = action.payload;
    const response = (yield call(loginUser, data)) as ILoginSuccessResponse;
    console.log(response);
    yield put(loginSuccess(response));
    yield call(storeToken, response.accessToken)
    action.navigate('/authors')
  } catch (error) {

    const axiosError = (error as AxiosError);
    const result = axiosError.response?.data as ILoginFailureResponse;
    yield put(loginFailure(result));
  }
}

function* loginOutWorker(action: Action<typeof LOGOUT> & ILogoutRequestAction): Generator {
  try {
    yield call(clearToken)
    action.navigate('/login')
  } catch (error) {

  }
}

export function* usersSagaWatcher(): Generator {
  yield takeLatest(REGISTER_REQUEST, registerWorker)
  yield takeLatest(LOGIN_REQUEST, loginWorker)
  yield takeLatest(LOGOUT, loginOutWorker)
}