import { AuthorsActions } from '../../types/Author/AuthorActions';
import { BookActions } from '../../types/Book/BookAction';
import { AuthorsState } from '../../types/Author/AuthorsState';
import {
  FETCH_AUTHORS_REQUEST,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
  FETCH_AUTHOR_REQUEST,
  FETCH_AUTHOR_SUCCESS,
  FETCH_AUTHOR_FAILURE,
  CREATE_AUTHOR_REQUEST,
  CREATE_AUTHOR_SUCCESS,
  CREATE_AUTHOR_FAILURE,
  UPDATE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_FAILURE,
  UPDATE_AUTHOR_REQUEST,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  REMOVE_MESSAGES,
} from '../../consts/AuthorsConsts';
import {
  DELETE_BOOK_FAILURE, DELETE_BOOK_REQUEST, DELETE_BOOK_SUCCESS,
  CREATE_BOOK_REQUEST, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAILURE
} from '../../consts/BookConsts';

const initialState: AuthorsState = {
  page: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  last: true,
  authors: [],
  successMessage: null,
  isLoading: false,
  error: null,
};

const authorsReducer = (state = initialState, action: AuthorsActions | BookActions): AuthorsState => {
  switch (action.type) {
    case FETCH_AUTHORS_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        error: null,
      };
    case FETCH_AUTHORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authors: action.payload.content,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        successMessage: null,
        error: null,
      };
    case FETCH_AUTHORS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case FETCH_AUTHOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        error: null,
      };
    case FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authors: [action.payload],
      };
    case FETCH_AUTHOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case DELETE_AUTHOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        error: null,
      }
    case DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
      };
    case DELETE_AUTHOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case CREATE_AUTHOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        error: null,
      }
    case CREATE_AUTHOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
      };
    case CREATE_AUTHOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case UPDATE_AUTHOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        error: null,
      }
    case UPDATE_AUTHOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload.message,
        authors: [...state.authors.map(
          author => author.id === action.payload.id
            ? { ...author, firstName: action.payload.firstName, lastName: action.payload.lastName, description: action.payload.description }
            : author
        ),],
      };
    case UPDATE_AUTHOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case DELETE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        error: null,
      }
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload.message,
        authors: [...state.authors.map(
          author => author.id === action.payload.authorId
            ? { ...author, books: author.books.filter(book => book.id !== action.payload.id) }
            : author
        ),]

      };
    case DELETE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case CREATE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        error: null,
      }
    case CREATE_BOOK_SUCCESS:

      return {
        ...state,
        isLoading: false,
        successMessage: action.payload.message,
        authors: [...state.authors.map(
          author => author.id === action.payload.authorId
            ? { ...author, books: author.books.concat(action.payload.book) }
            : author
        ),],
      };
    case CREATE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case UPDATE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        error: null,
      }
    case UPDATE_BOOK_SUCCESS:

      return {
        ...state,
        isLoading: false,
        successMessage: action.payload.message,
        authors: [...state.authors.map(
          author => author.id === action.payload.authorId
            ? { ...author, books: author.books.map(book => book.id === action.payload.book.id ? action.payload.book : book) }
            : author
        ),],
      };
    case UPDATE_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case REMOVE_MESSAGES:
      return {
        ...state,
        error: null,
        successMessage: null
      }
    default:
      return state;
  }
};

export default authorsReducer;