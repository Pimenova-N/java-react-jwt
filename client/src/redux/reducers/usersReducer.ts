import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REMOVE_ERROR } from "../../consts/UserConsts"
import { UserActions } from "../../types/User/UserActions"
import { UserState } from "../../types/User/UserState"
const initialState: UserState = {
    successMessage: null,
    isLoading: false,
    error: null,
}

const usersReducer = (state = initialState, action: UserActions) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                successMessage: null,
                error: null,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                successMessage: action.payload.message
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                successMessage: null,
                error: null,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.message
            }
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                successMessage: null,
                error: null,
            }
        case REMOVE_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}

export default usersReducer;