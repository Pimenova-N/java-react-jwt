import { 
    DELETE_BOOK_REQUEST, DELETE_BOOK_SUCCESS, DELETE_BOOK_FAILURE,
    CREATE_BOOK_REQUEST, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAILURE,
    UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAILURE } from '../../consts/BookConsts';
  import { ICreateBookRequest, IDeleteBookRequest, IUpdateBookRequest } from '../../types/Book/BookRequest';
  import { IDeleteBookRequestAction, IDeleteBookSuccessAction, IDeleteBookFailureAction, 
    ICreateBookRequestAction, ICreateBookSuccessAction, ICreateBookFailureAction,
    IUpdateBookRequestAction, IUpdateBookSuccessAction, IUpdateBookFailureAction} from '../../types/Book/BookAction';
  import { ICreateBookSuccessResponse, IUpdateBookSuccessResponse, IDeleteBookSuccessResponse } from '../../types/Book/BookResponse';
  
  export const deleteBookRequest = (data: IDeleteBookRequest): IDeleteBookRequestAction => ({
    type: DELETE_BOOK_REQUEST,
    payload: data,
  });
  
  
  export const deleteBookSuccess = (data: IDeleteBookSuccessResponse): IDeleteBookSuccessAction => ({
    type: DELETE_BOOK_SUCCESS,
    payload: data,
  });
  
  export const deleteBookFailure = (error: string): IDeleteBookFailureAction => ({
    type: DELETE_BOOK_FAILURE,
    payload: {
      message: error
    },
  });
  
  export const createBookRequest = (data: ICreateBookRequest): ICreateBookRequestAction => ({
    type: CREATE_BOOK_REQUEST,
    payload: data
  })
  
  export const createBookSuccess = (data: ICreateBookSuccessResponse): ICreateBookSuccessAction => ({
    type: CREATE_BOOK_SUCCESS,
    payload: data
  });
  
  export const createBookFailure = (error: string): ICreateBookFailureAction => ({
    type: CREATE_BOOK_FAILURE,
    payload: {
      message: error
    },
  });
  
  export const updateBookRequest = (data: IUpdateBookRequest): IUpdateBookRequestAction => ({
    type: UPDATE_BOOK_REQUEST,
    payload: data
  })
  
  
  export const updateBookSuccess = (data: IUpdateBookSuccessResponse) : IUpdateBookSuccessAction => ({
    type: UPDATE_BOOK_SUCCESS,
    payload: data
  })
  
  export const updateBookFailure = (error: string): IUpdateBookFailureAction => ({
    type: UPDATE_BOOK_FAILURE,
    payload: {
      message: error
    },
  });