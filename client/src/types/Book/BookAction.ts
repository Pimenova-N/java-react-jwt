import { Action } from 'redux';
import { 
  DELETE_BOOK_REQUEST, DELETE_BOOK_SUCCESS, DELETE_BOOK_FAILURE,
  CREATE_BOOK_REQUEST, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAILURE } from '../../consts/BookConsts';
import { ICreateBookRequest, IDeleteBookRequest, IUpdateBookRequest } from './BookRequest'
import { IBookFailureResponse, IDeleteBookSuccessResponse , ICreateBookSuccessResponse, IUpdateBookSuccessResponse} from './BookResponse'

export interface IDeleteBookRequestAction extends Action<typeof DELETE_BOOK_REQUEST>{
    type: typeof DELETE_BOOK_REQUEST;
    payload: IDeleteBookRequest;
  }
  
  export interface IDeleteBookSuccessAction extends Action<typeof DELETE_BOOK_SUCCESS> {
    type: typeof DELETE_BOOK_SUCCESS;
    payload: IDeleteBookSuccessResponse;
  }

export interface IDeleteBookFailureAction extends Action<typeof DELETE_BOOK_FAILURE> {
    type: typeof DELETE_BOOK_FAILURE;
    payload: IBookFailureResponse;
}

export interface ICreateBookRequestAction extends Action<typeof CREATE_BOOK_REQUEST>{
  type: typeof CREATE_BOOK_REQUEST;
  payload: ICreateBookRequest;
}

export interface ICreateBookSuccessAction extends Action<typeof CREATE_BOOK_SUCCESS>{
  type: typeof CREATE_BOOK_SUCCESS;
  payload: ICreateBookSuccessResponse;
}

export interface ICreateBookFailureAction extends Action<typeof CREATE_BOOK_FAILURE> {
  type: typeof CREATE_BOOK_FAILURE;
  payload: IBookFailureResponse;
}

export interface IUpdateBookRequestAction extends Action<typeof UPDATE_BOOK_REQUEST>{
  type: typeof UPDATE_BOOK_REQUEST;
  payload: IUpdateBookRequest;
}

export interface IUpdateBookSuccessAction extends Action<typeof UPDATE_BOOK_SUCCESS>{
  type: typeof UPDATE_BOOK_SUCCESS;
  payload: IUpdateBookSuccessResponse;
}

export interface IUpdateBookFailureAction extends Action<typeof UPDATE_BOOK_FAILURE> {
  type: typeof UPDATE_BOOK_FAILURE;
  payload: IBookFailureResponse;
}

export type BookActions =   
  IDeleteBookRequestAction
| IDeleteBookSuccessAction
| IDeleteBookFailureAction
| ICreateBookRequestAction
| ICreateBookSuccessAction
| ICreateBookFailureAction
| IUpdateBookRequestAction
| IUpdateBookSuccessAction
| IUpdateBookFailureAction