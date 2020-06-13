import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";

export const AUTH_USER_REQUEST = "AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export const AUTH_USER_FAILURE = "AUTH_USER_FAILURE";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const LOCAL_LOGIN_REQUEST = "LOGIN_USER_REQUEST";
export const LOCAL_LOGIN_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOCAL_LOGIN_FAILURE = "LOGIN_USER_FAILURE";

export const GITHUB_LOGIN_REQUEST = "GITHUB_LOGIN_REQUEST";
export const GITHUB_LOGIN_SUCCESS = "GITHUB_LOGIN_SUCCESS";
export const GITHUB_LOGIN_FAILURE = "GITHUB_LOGIN_FAILURE";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const GET_GITHUB_USER_REQUEST = "GET_GITHUB_USER";
export const GET_GITHUB_USER_SUCCESS = "GET_GITHUB_USER_SUCCESS";
export const GET_GITHUB_USER_FAILURE = "GET_GITHUB_USER_SUCCESS";

export type TUser = {
  githubId?: string;
  email: string;
  username: string;
  pins: string[];
};

export const getUserAsync = createAsyncAction(
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
)<undefined, TUser, AxiosError>();

export const loginUserAsync = createAsyncAction(
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAILURE
)<object, TUser, AxiosError>();

export const registerUserAsync = createAsyncAction(
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
)<string, TUser, AxiosError>();
