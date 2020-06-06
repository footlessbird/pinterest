import { createReducer, action } from "typesafe-actions";
import produce from "immer";

import {
  TUser,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../actions";
import { stat } from "fs";

const INITIAL_STATE = {
  error: null,
  user: {},
};

const userReducer = createReducer(INITIAL_STATE, {
  [GET_USER_REQUEST]: (state) => ({
    ...state,
    error: null,
    user: {},
  }),
  [GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    error: null,
    user: action,
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

export default userReducer;
