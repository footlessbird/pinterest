import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

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
)<string, TUser, AxiosError>();
