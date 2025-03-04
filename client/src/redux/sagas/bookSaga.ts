import { takeEvery, put, call, delay } from "redux-saga/effects";
import { CREATE_BOOK_REQUEST, UPDATE_BOOK_REQUEST, DELETE_BOOK_REQUEST } from "../../consts/BookConsts";
import { Action } from "redux";
import { createBook, deleteBook, updateBook } from '../../api/AuthorsApi'
import { ICreateBookRequestAction, IUpdateBookRequestAction, IDeleteBookRequestAction } from "../../types/Book/BookAction";
import { deleteBookSuccess, deleteBookFailure, createBookSuccess, createBookFailure, updateBookSuccess, updateBookFailure } from '../actions/BookAction';
import { fetchAuthorRequest } from '../actions/AuthorAction';
import { IBookFailureResponse } from "../../types/Book/BookResponse";
import { AxiosError } from "axios";
import IBook from "../../types/Book/IBook";

function* deleteBookWorker(action: Action<typeof DELETE_BOOK_REQUEST> & IDeleteBookRequestAction): Generator {
    try {
        const data = action.payload;
        const id = data.id;
        const authorId = data.authorId;
        const message = (yield call(deleteBook, data)) as string;
        yield put(deleteBookSuccess({ message, id, authorId }));
    } catch (error) {
        const axiosError = (error as AxiosError);
        const message = axiosError.response?.data as IBookFailureResponse;
        yield put(deleteBookFailure(message.message));
    }

}

function* createBookWorker(action: Action<typeof CREATE_BOOK_REQUEST> & ICreateBookRequestAction): Generator {
    try {
        const data = action.payload;
        const authorId = data.authorId;
        const book = (yield call(createBook, data)) as IBook;
        const message = 'Book was created';
        yield put(createBookSuccess({ book, message, authorId }));
        yield delay(1000);
        yield put(fetchAuthorRequest({ id: String(authorId) }));
    } catch (error) {
        const axiosError = (error as AxiosError);
        const message = axiosError.response?.data as IBookFailureResponse;
        yield put(createBookFailure(message.message));
    }

}

function* updateBookWorker(action: Action<typeof UPDATE_BOOK_REQUEST> & IUpdateBookRequestAction): Generator {
    try {
        const data = action.payload;
        const authorId = data.authorId;
        const book = (yield call(updateBook, data)) as IBook;
        const message = 'Book was updated';
        yield put(updateBookSuccess({ book, message, authorId }))
    } catch (error) {
        const axiosError = (error as AxiosError);
        const message = axiosError.response?.data as IBookFailureResponse;
        yield put(updateBookFailure(message.message));
    }
}

export function* bookSagaWatcher(): Generator {
    yield takeEvery(DELETE_BOOK_REQUEST, deleteBookWorker);
    yield takeEvery(CREATE_BOOK_REQUEST, createBookWorker);
    yield takeEvery(UPDATE_BOOK_REQUEST, updateBookWorker);
}