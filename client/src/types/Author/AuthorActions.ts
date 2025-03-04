import { Action } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import {
  IFetchAuthorsRequest, IFetchAuthorRequest, IDeleteAuthorRequest, ICreateAuthorRequest, IUpdateAuthorRequest
} from "../Author/AuthorsRequest";
import {
  IAuthorsFailureResponse,
  IFetchAuthorsSuccessResponse,
  IFetchAuthorSuccessResponse,
  IUpdateAuthorSuccessResponse
} from "../Author/AuthorsResponse";
import {

  FETCH_AUTHORS_FAILURE,
  FETCH_AUTHORS_REQUEST,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHOR_FAILURE,
  FETCH_AUTHOR_REQUEST,
  FETCH_AUTHOR_SUCCESS,
  CREATE_AUTHOR_REQUEST,
  CREATE_AUTHOR_SUCCESS,
  CREATE_AUTHOR_FAILURE,
  UPDATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_FAILURE,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  REMOVE_MESSAGES

} from "../../consts/AuthorsConsts";

export interface IFetchAuthorsRequestAction extends Action<typeof FETCH_AUTHORS_REQUEST> {
  type: typeof FETCH_AUTHORS_REQUEST;
  payload: IFetchAuthorsRequest;
}

export interface IFetchAuthorsSuccessAction extends Action<typeof FETCH_AUTHORS_SUCCESS> {
  type: typeof FETCH_AUTHORS_SUCCESS;
  payload: IFetchAuthorsSuccessResponse;
}

export interface IFetchAuthorsFailureAction extends Action<typeof FETCH_AUTHORS_FAILURE> {
  type: typeof FETCH_AUTHORS_FAILURE;
  payload: IAuthorsFailureResponse;
}

export interface IFetchAuthorRequestAction extends Action<typeof FETCH_AUTHOR_REQUEST> {
  type: typeof FETCH_AUTHOR_REQUEST;
  payload: IFetchAuthorRequest;
}

export interface IFetchAuthorSuccessAction extends Action<typeof FETCH_AUTHOR_SUCCESS> {
  type: typeof FETCH_AUTHOR_SUCCESS;
  payload: IFetchAuthorSuccessResponse;
}

export interface IFetchAuthorFailureAction extends Action<typeof FETCH_AUTHOR_FAILURE> {
  type: typeof FETCH_AUTHOR_FAILURE;
  payload: IAuthorsFailureResponse;
}

export interface IDeleteAuthorRequestAction extends Action<typeof DELETE_AUTHOR_REQUEST>{
  type: typeof DELETE_AUTHOR_REQUEST;
  payload: IDeleteAuthorRequest;
  navigate: NavigateFunction;
}

export interface IDeleteAuthorsSuccessAction extends Action<typeof DELETE_AUTHOR_SUCCESS> {
  type: typeof DELETE_AUTHOR_SUCCESS;
  payload: string;  
}

export interface IDeleteAuthorsFailureAction extends Action<typeof DELETE_AUTHOR_FAILURE> {
  type: typeof DELETE_AUTHOR_FAILURE;
  payload: IAuthorsFailureResponse;
}

export interface ICreateAuthorRequestAction extends Action<typeof CREATE_AUTHOR_REQUEST> {
  type: typeof CREATE_AUTHOR_REQUEST;
  payload: ICreateAuthorRequest;
}

export interface ICreateAuthorsSuccessAction extends Action<typeof CREATE_AUTHOR_SUCCESS> {
  type: typeof CREATE_AUTHOR_SUCCESS;
  payload: string;
}

export interface ICreateAuthorsFailureAction extends Action<typeof CREATE_AUTHOR_FAILURE> {
  type: typeof CREATE_AUTHOR_FAILURE;
  payload: IAuthorsFailureResponse;
}


export interface IUpdateAuthorRequestAction extends Action<typeof UPDATE_AUTHOR_REQUEST> {
  type: typeof UPDATE_AUTHOR_REQUEST;
  payload: IUpdateAuthorRequest;
}

export interface IUpdateAuthorsSuccessAction extends Action<typeof UPDATE_AUTHOR_SUCCESS> {
  type: typeof UPDATE_AUTHOR_SUCCESS;
  payload: IUpdateAuthorSuccessResponse;
}

export interface IUpdateAuthorsFailureAction extends Action<typeof UPDATE_AUTHOR_FAILURE> {
  type: typeof UPDATE_AUTHOR_FAILURE;
  payload: IAuthorsFailureResponse;
}

export interface IRemoveMessages extends Action<typeof REMOVE_MESSAGES>{
  type: typeof REMOVE_MESSAGES;
}

export type AuthorsActions =   
IFetchAuthorsRequestAction
  | IFetchAuthorsSuccessAction
  | IFetchAuthorsFailureAction
  | IFetchAuthorRequestAction
  | IFetchAuthorSuccessAction
  | IFetchAuthorFailureAction
  | ICreateAuthorRequestAction
  | ICreateAuthorsSuccessAction
  | ICreateAuthorsFailureAction
  | IDeleteAuthorRequestAction
  | IDeleteAuthorsSuccessAction
  | IDeleteAuthorsFailureAction
  | IUpdateAuthorRequestAction
  | IUpdateAuthorsSuccessAction
  | IUpdateAuthorsFailureAction
  | IRemoveMessages
  ;