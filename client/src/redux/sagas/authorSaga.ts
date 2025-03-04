import { put, call, takeLatest, delay } from 'redux-saga/effects'
import { Action } from 'redux';
import {
  FETCH_AUTHORS_REQUEST, FETCH_AUTHOR_REQUEST, CREATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_REQUEST, DELETE_AUTHOR_REQUEST
} from '../../consts/AuthorsConsts';
import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from '../../api/AuthorsApi'
import {
  IFetchAuthorRequestAction, IFetchAuthorsRequestAction, ICreateAuthorRequestAction,
  IUpdateAuthorRequestAction, IDeleteAuthorRequestAction
} from '../../types/Author/AuthorActions';
import { IFetchAuthorsSuccessResponse, IFetchAuthorSuccessResponse, IAuthorsFailureResponse } from '../../types/Author/AuthorsResponse';

import {
  fetchAuthorsSuccess, fetchAuthorsFailure,
  fetchAuthorSuccess, fetchAuthorFailure,
  createAuthorsSuccess, createAuthorsFailure,
  updateAuthorsSuccess, updateAuthorsFailure,
  deleteAuthorsSuccess, deleteAuthorsFailure, fetchAuthorsRequest
} from '../actions/AuthorAction';
import { AxiosError } from 'axios';
import IAuthor from '../../types/Author/IAuthor';

function* fetchAuthorsWorker(action: Action<typeof FETCH_AUTHORS_REQUEST> & IFetchAuthorsRequestAction): Generator {
  try {
    const data = action.payload;
    const response = (yield call(getAuthors, data)) as IFetchAuthorsSuccessResponse;
    yield put(fetchAuthorsSuccess(response));
  } catch (error) {
    const axiosError = (error as AxiosError);
    const message = axiosError?.response?.data as IAuthorsFailureResponse;
    yield put(fetchAuthorsFailure(message.message));

  }
}

function* fetchAuthorWorker(action: Action<typeof FETCH_AUTHOR_REQUEST> & IFetchAuthorRequestAction): Generator {
  try {
    const data = action.payload;
    const response = (yield call(getAuthor, data)) as IFetchAuthorSuccessResponse;
    yield put(fetchAuthorSuccess(response));
  } catch (error) {
    yield put(fetchAuthorFailure('Автор не найден!'));
  }
}

function* deleteAuthorWorker(action: Action<typeof DELETE_AUTHOR_REQUEST> & IDeleteAuthorRequestAction): Generator {
  try {
    const data = action.payload;
    const response = (yield call(deleteAuthor, data)) as string;
    yield put(deleteAuthorsSuccess(response));
    action.navigate('/authors')
  } catch (error) {
    const axiosError = (error as AxiosError);
    const message = axiosError.response?.data as IAuthorsFailureResponse;
    yield put(deleteAuthorsFailure(message.message));
  }
}

function* createAuthorWorker(action: Action<typeof CREATE_AUTHOR_REQUEST> & ICreateAuthorRequestAction): Generator {
  try {
    const data = action.payload;
    yield call(createAuthor, data);
    yield put(createAuthorsSuccess('author was created'));

    yield delay(1000);
    yield put(fetchAuthorsRequest({ page: 0, size: 9, sort: 'firstName', direction: 'ASC' }));

  } catch (error) {
    const axiosError = (error as AxiosError);
    const message = axiosError.response?.data as IAuthorsFailureResponse;
    yield put(createAuthorsFailure(message.message));
  }
}

function* updateAuthorWorker(action: Action<typeof UPDATE_AUTHOR_REQUEST> & IUpdateAuthorRequestAction): Generator {
  try {
    const data = action.payload;
    const response = (yield call(updateAuthor, data)) as IAuthor;
    const message = 'author was updated';
    yield put(updateAuthorsSuccess({ ...response, message }));
  } catch (error) {
    const axiosError = (error as AxiosError);
    const message = axiosError.response?.data as IAuthorsFailureResponse;
    yield put(updateAuthorsFailure(message.message));
  }

}

export function* authorsSagaWatcher(): Generator {
  yield takeLatest(FETCH_AUTHORS_REQUEST, fetchAuthorsWorker);
  yield takeLatest(FETCH_AUTHOR_REQUEST, fetchAuthorWorker);
  yield takeLatest(CREATE_AUTHOR_REQUEST, createAuthorWorker);
  yield takeLatest(UPDATE_AUTHOR_REQUEST, updateAuthorWorker);
  yield takeLatest(DELETE_AUTHOR_REQUEST, deleteAuthorWorker);
}