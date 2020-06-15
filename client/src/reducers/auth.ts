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
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAILURE,
  GITHUB_LOGIN_REQUEST,
  GITHUB_LOGIN_SUCCESS,
  GITHUB_LOGIN_FAILURE,
} from "../actions";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
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

    default:
      return state;
  }
};
