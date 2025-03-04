import { NavigateFunction } from "react-router-dom";
import {
  FETCH_AUTHORS_REQUEST, FETCH_AUTHORS_SUCCESS, FETCH_AUTHORS_FAILURE,
  FETCH_AUTHOR_REQUEST, FETCH_AUTHOR_SUCCESS, FETCH_AUTHOR_FAILURE,
  CREATE_AUTHOR_REQUEST, CREATE_AUTHOR_SUCCESS, CREATE_AUTHOR_FAILURE,
  UPDATE_AUTHOR_REQUEST, UPDATE_AUTHOR_SUCCESS, UPDATE_AUTHOR_FAILURE,
  DELETE_AUTHOR_REQUEST, DELETE_AUTHOR_SUCCESS, DELETE_AUTHOR_FAILURE,
  REMOVE_MESSAGES,
}
  from "../../consts/AuthorsConsts";
import { IFetchAuthorsSuccessResponse, IFetchAuthorSuccessResponse, IUpdateAuthorSuccessResponse } from "../../types/Author/AuthorsResponse"
import { IFetchAuthorsRequest, IFetchAuthorRequest, ICreateAuthorRequest, IUpdateAuthorRequest, IDeleteAuthorRequest } from "../../types/Author/AuthorsRequest"
import {
  IFetchAuthorsSuccessAction, IFetchAuthorsFailureAction, IFetchAuthorsRequestAction,
  IFetchAuthorRequestAction, IFetchAuthorSuccessAction, IFetchAuthorFailureAction,
  IDeleteAuthorRequestAction, IDeleteAuthorsSuccessAction, IDeleteAuthorsFailureAction
  , ICreateAuthorRequestAction, ICreateAuthorsSuccessAction, ICreateAuthorsFailureAction,
  IUpdateAuthorRequestAction, IUpdateAuthorsSuccessAction, IUpdateAuthorsFailureAction,
  IRemoveMessages
} from "../../types/Author/AuthorActions"


export const fetchAuthorsRequest = (data: IFetchAuthorsRequest): IFetchAuthorsRequestAction => ({
  type: FETCH_AUTHORS_REQUEST,
  payload: data,
});

export const fetchAuthorsSuccess = (data: IFetchAuthorsSuccessResponse): IFetchAuthorsSuccessAction => ({
  type: FETCH_AUTHORS_SUCCESS,
  payload: data,
});

export const fetchAuthorsFailure = (error: string): IFetchAuthorsFailureAction => ({
  type: FETCH_AUTHORS_FAILURE,
  payload: {
    message: error
  },
});

export const fetchAuthorRequest = (data: IFetchAuthorRequest): IFetchAuthorRequestAction => ({
  type: FETCH_AUTHOR_REQUEST,
  payload: data,
});

export const fetchAuthorSuccess = (data: IFetchAuthorSuccessResponse): IFetchAuthorSuccessAction => ({
  type: FETCH_AUTHOR_SUCCESS,
  payload: data,
});

export const fetchAuthorFailure = (error: string): IFetchAuthorFailureAction => ({
  type: FETCH_AUTHOR_FAILURE,
  payload: {
    message: error
  },
});

export const deleteAuthorRequest = (data: IDeleteAuthorRequest, navigate: NavigateFunction): IDeleteAuthorRequestAction => ({
  type: DELETE_AUTHOR_REQUEST,
  payload: data,
  navigate: navigate,
});

export const deleteAuthorsSuccess = (data: string): IDeleteAuthorsSuccessAction => ({
  type: DELETE_AUTHOR_SUCCESS,
  payload: data,
});

export const deleteAuthorsFailure = (error: string): IDeleteAuthorsFailureAction => ({
  type: DELETE_AUTHOR_FAILURE,
  payload: {
    message: error
  },
});

export const createAuthorRequest = (data: ICreateAuthorRequest): ICreateAuthorRequestAction => ({
  type: CREATE_AUTHOR_REQUEST,
  payload: data,
});

export const createAuthorsSuccess = (data: string): ICreateAuthorsSuccessAction => ({
  type: CREATE_AUTHOR_SUCCESS,
  payload: data,
});

export const createAuthorsFailure = (error: string): ICreateAuthorsFailureAction => ({
  type: CREATE_AUTHOR_FAILURE,
  payload: {
    message: error
  },
});

export const updateAuthorRequest = (data: IUpdateAuthorRequest): IUpdateAuthorRequestAction => ({
  type: UPDATE_AUTHOR_REQUEST,
  payload: data,
});

export const updateAuthorsSuccess = (data: IUpdateAuthorSuccessResponse): IUpdateAuthorsSuccessAction => ({
  type: UPDATE_AUTHOR_SUCCESS,
  payload: data,
});

export const updateAuthorsFailure = (error: string): IUpdateAuthorsFailureAction => ({
  type: UPDATE_AUTHOR_FAILURE,
  payload: {
    message: error
  },
});

export const removeMessages = (): IRemoveMessages => ({
  type: REMOVE_MESSAGES
})