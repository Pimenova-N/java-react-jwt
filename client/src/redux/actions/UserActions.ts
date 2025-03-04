import { NavigateFunction } from "react-router-dom";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REMOVE_ERROR } from "../../consts/UserConsts";
import {IRegisterRequest, IRegisterSuccessResponse, IRegisterFailureResponse, ILoginRequest, ILoginSuccessResponse, ILoginFailureResponse} from "../../types/User/User"
import {IRegisterRequestAction, IRegisterSuccessAction, IRegisterFailureAction, ILoginRequestAction, ILoginSuccessAction, ILoginFailureAction, ILogoutRequestAction, IRemoveError} from "../../types/User/UserActions"


export const registerRequest = (data: IRegisterRequest, navigate: NavigateFunction): IRegisterRequestAction => ({
  type: REGISTER_REQUEST,
  payload: data,
  navigate: navigate
});

export const registerSuccess = (data: IRegisterSuccessResponse | any): IRegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    payload: data,
});

export const registerFailure = (data: IRegisterFailureResponse | any): IRegisterFailureAction => ({
    type: REGISTER_FAILURE,
    payload: data,
});  


export const loginRequest = (data: ILoginRequest, navigate: NavigateFunction): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: data,
  navigate: navigate
});

export const loginSuccess = (data: ILoginSuccessResponse | any): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (data: ILoginFailureResponse | any): ILoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: data,
}); 

export const logoutRequest = (navigate: NavigateFunction): ILogoutRequestAction => ({
  type: LOGOUT,
  navigate: navigate
}); 

export const removeError = (): IRemoveError => ({
  type: REMOVE_ERROR
})