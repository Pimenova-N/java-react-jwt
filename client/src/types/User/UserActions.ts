import { Action } from 'redux';
import { IRegisterRequest, ILoginRequest } from "./User";
import { IRegisterFailureResponse, IRegisterSuccessResponse, ILoginSuccessResponse, ILoginFailureResponse} from "./User";
import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REMOVE_ERROR} from "../../consts/UserConsts";
import { NavigateFunction } from 'react-router-dom';

export interface IRegisterRequestAction extends Action<typeof REGISTER_REQUEST> {
  type: typeof REGISTER_REQUEST;
  payload: IRegisterRequest;
  navigate: NavigateFunction
}

export interface IRegisterSuccessAction extends Action<typeof REGISTER_SUCCESS> {
  type: typeof REGISTER_SUCCESS;
  payload: IRegisterSuccessResponse;
}

export interface IRegisterFailureAction extends Action<typeof REGISTER_FAILURE> {
  type: typeof REGISTER_FAILURE;
  payload: IRegisterFailureResponse;
}

export interface ILoginRequestAction extends Action<typeof LOGIN_REQUEST> {
  type: typeof LOGIN_REQUEST;
  payload: ILoginRequest;
  navigate: NavigateFunction
}

export interface ILoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
  type: typeof LOGIN_SUCCESS;
  payload: ILoginSuccessResponse;
}

export interface ILoginFailureAction extends Action<typeof LOGIN_FAILURE> {
  type: typeof LOGIN_FAILURE;
  payload: ILoginFailureResponse;
}

export interface ILogoutRequestAction extends Action<typeof LOGOUT> {
  type: typeof LOGOUT;
  navigate: NavigateFunction
}

export interface IRemoveError extends Action<typeof REMOVE_ERROR>{
  type: typeof REMOVE_ERROR;
}

export type UserActions =   
IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailureAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailureAction
  | ILogoutRequestAction
  | IRemoveError
  ;