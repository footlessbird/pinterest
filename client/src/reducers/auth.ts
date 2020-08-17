import { createReducer, action } from "typesafe-actions";
import produce from "immer";

import {
  TUser,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  RESET_REGISTER_SUCCESS,
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAILURE,
  GITHUB_LOGIN_REQUEST,
  GITHUB_LOGIN_SUCCESS,
  GITHUB_LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_USER,
  RESET_LOGIN,
} from "../actions";
import { AuthState, PinterestAction } from "../actions/types";

/*
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isSuccessful: false,
  user: null,
  error: null,
};
*/

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  isSuccessful: false,
  user: null,
  error: null,
};

/*
const userReducer = createReducer(INITIAL_STATE, {
  [GET_USER_REQUEST]: (state) => ({
    ...state,
    error: null,
    user: {},
  }),
  [GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    error: null,
    user: action.data,
  }),
  [GET_USER_FAILURE]: (state, action) => ({
    ...state,
    error: action.data,
    user: {},
  }),
  [LOGIN_USER_REQUEST]: (state, action) => ({
    ...state,
    error: null,
    user: {},
  }),
  [LOGIN_USER_SUCCESS]: (state, action) => ({
    ...state,
    error: null,
    user: action.data,
  }),
  [LOGIN_USER_FAILURE]: (state, action) => ({
    ...state,
    error: action.data,
    user: {},
  }),
});
*/

/*
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.data,
        error: null,
      };
    case GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };
    case LOCAL_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case LOCAL_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.data,
        error: null,
      };
    case LOCAL_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };

    case GITHUB_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        error: null,
        user: null,
      };
    case GITHUB_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        user: action.data,
      };
    case GITHUB_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.error,
        user: null,
      };

    case LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: null,
        user: null,
      };

    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        error: null,
        isSuccessful: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        isSuccessful: true,
      };

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        isSuccessful: false,
      };

    default:
      return state;
  }
};
*/

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_CURRENT_USER_REQUEST: {
        draft.isLoading = true;
        draft.isAuthenticated = false;
        //
        draft.user = null;
        draft.error = null;
        //
        break;
      }
      case GET_CURRENT_USER_SUCCESS: {
        draft.isLoading = false;
        draft.isAuthenticated = true;
        draft.user = action.data;
        //
        draft.error = null;
        //
        break;
      }
      case GET_CURRENT_USER_FAILURE: {
        //
        draft.isLoading = false;
        //
        draft.isAuthenticated = false;
        draft.user = null;
        draft.error = action.error;
        break;
      }
      case LOCAL_LOGIN_REQUEST: {
        draft.isLoading = true;
        draft.isAuthenticated = false;
        // draft.isSuccessful = false;
        // 객체의 프로퍼티를 동일하게 설정해 줄 것
        // 예로 LOCAL_LOGIN_SUCCESS에 draft.user = action.data
        // 위와 같이 설정 되있다면 요청 또한 draft.user = null
        // 동일한 객체 프로퍼티를 갖도록
        // 아래 draft.user = null 이 없다면 로그인 후 화면을 수동으로 새로고침해야 로그인 된 화면으로 바뀜
        draft.user = null;
        draft.error = null;
        //
        break;
      }
      case LOCAL_LOGIN_SUCCESS: {
        draft.isLoading = false;
        //
        draft.isAuthenticated = true;
        // draft.isSuccessful = true;
        //
        draft.user = action.data;
        draft.error = null;

        break;
      }
      case LOCAL_LOGIN_FAILURE: {
        draft.isLoading = false;
        draft.isAuthenticated = false;
        // draft.isSuccessful = false;
        draft.user = null;
        draft.error = action.error;
        break;
      }
      case GITHUB_LOGIN_REQUEST: {
        draft.isLoading = true;
        draft.isAuthenticated = false;
        //
        // draft.isSuccessful = false;
        draft.error = null;
        draft.user = null;
        //
        break;
      }
      case GITHUB_LOGIN_SUCCESS: {
        draft.isLoading = false;
        //
        draft.isAuthenticated = true;
        // draft.isSuccessful = true;
        //
        draft.user = action.data;
        draft.error = null;
        break;
      }
      case GITHUB_LOGIN_FAILURE: {
        draft.isLoading = false;
        //
        draft.isAuthenticated = false;
        // draft.isSuccessful = false;
        //
        draft.user = null;
        draft.error = action.error;
        break;
      }
      case LOGOUT_USER: {
        localStorage.clear();
        draft.isLoading = false;
        draft.isAuthenticated = false;
        draft.error = null;
        draft.user = null;
        break;
      }
      case REGISTER_USER_REQUEST: {
        draft.isLoading = true;
        //
        draft.isAuthenticated = false;
        //
        draft.isSuccessful = false;
        draft.error = null;
        break;
      }
      case REGISTER_USER_SUCCESS: {
        draft.isLoading = false;
        draft.isSuccessful = true;
        draft.error = null;
        break;
      }
      case REGISTER_USER_FAILURE: {
        draft.isLoading = false;
        draft.isSuccessful = false;
        draft.error = action.error;
        break;
      }
      case RESET_REGISTER_SUCCESS: {
        draft.isSuccessful = false;
        draft.error = null;
      }
      case RESET_LOGIN: {
        draft.isAuthenticated = false;
        draft.isSuccessful = false;
        draft.error = null;
      }

      default: {
        break;
      }
    }
  });
};
