import { createAsyncAction, createAction } from "typesafe-actions";
import { AxiosError } from "axios";

export const AUTH_USER_REQUEST = "AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export const AUTH_USER_FAILURE = "AUTH_USER_FAILURE";

export const GET_CURRENT_USER_REQUEST = "GET_CURRENT_USER_REQUEST";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_FAILURE = "GET_CURRENT_USER_FAILURE";

export const LOCAL_LOGIN_REQUEST = "LOGIN_USER_REQUEST";
export const LOCAL_LOGIN_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOCAL_LOGIN_FAILURE = "LOGIN_USER_FAILURE";

export const GITHUB_LOGIN_REQUEST = "GITHUB_LOGIN_REQUEST";
export const GITHUB_LOGIN_SUCCESS = "GITHUB_LOGIN_SUCCESS";
export const GITHUB_LOGIN_FAILURE = "GITHUB_LOGIN_FAILURE";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const LOGOUT_USER = "LOGOUT_USER";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

/*
export const GET_GITHUB_USER_REQUEST = "GET_GITHUB_USER_REQUEST";
export const GET_GITHUB_USER_SUCCESS = "GET_GITHUB_USER_SUCCESS";
export const GET_GITHUB_USER_FAILURE = "GET_GITHUB_USER_SUCCESS";
*/

export type TUser = {
  githubId?: string;
  email: string;
  username: string;
  pins: string[];
};

export const getUserAsync = createAsyncAction(
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE
)<undefined, TUser, AxiosError>(); // <요청, 성공, 실패>

export const loginUserAsync = createAsyncAction(
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAILURE
)<object, TUser, AxiosError>();

export const registerUserAsync = createAsyncAction(
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
)<object, TUser, AxiosError>();

/*
export const logoutUserAsync = createAsyncAction(
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
)<null, null, AxiosError>(); // logoutUserAsync.request() 들어갈 인자가 없으므로 undefined
*/

export const logoutUser = createAction(LOGOUT_USER)();
