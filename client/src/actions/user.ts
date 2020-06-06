import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

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
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
)<object, TUser, AxiosError>();

export const registerUserAsync = createAsyncAction(
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
)<string, TUser, AxiosError>();
