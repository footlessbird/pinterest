import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";
import { GET_CURRENT_USER_FAILURE } from "./auth";

export type TPin = {
  _id: string;
  user: string;
  imgLink: string;
  imgDescription: string;
  savedBy?: object;
};

export const CREATE_PIN_REQUEST = "CREATE_PIN_REQUEST";
export const CREATE_PIN_SUCCESS = "CREATE_PIN_SUCCESS";
export const CREATE_PIN_FAILURE = "CREATE_PIN_FAILURE";

export const GET_ALL_PINS_REQUEST = "GET_ALL_PINS_REQUEST";
export const GET_ALL_PINS_SUCCESS = "GET_ALL_PINS_SUCCESS";
export const GET_ALL_PINS_FAILURE = "GET_ALL_PINS_FAILURE";

export const GET_MY_PINS_REQUEST = "GET_MY_PINS_REQUEST";
export const GET_MY_PINS_SUCCESS = "GET_MY_PINS_SUCCESS";
export const GET_MY_PINS_FAILURE = "GET_MY_PINS_FAILURE";

export const SAVE_PIN_REQUEST = "SAVE_PIN_REQUEST";
export const SAVE_PIN_SUCCESS = "SAVE_PIN_SUCCESS";
export const SAVE_PIN_FAILURE = "SAVE_PIN_FAILURE";

export const createPinAsync = createAsyncAction(
  CREATE_PIN_REQUEST,
  CREATE_PIN_SUCCESS,
  CREATE_PIN_FAILURE
)<object, TPin, AxiosError>();

export const getAllPinsAsync = createAsyncAction(
  GET_ALL_PINS_REQUEST,
  GET_ALL_PINS_SUCCESS,
  GET_ALL_PINS_FAILURE
)<string, TPin[], AxiosError>();

export const getMyPinsAsync = createAsyncAction(
  GET_MY_PINS_REQUEST,
  GET_MY_PINS_SUCCESS,
  GET_MY_PINS_FAILURE
)<string, TPin[], AxiosError>();

export const savePinAsync = createAsyncAction(
  SAVE_PIN_REQUEST,
  SAVE_PIN_SUCCESS,
  SAVE_PIN_FAILURE
)<string, TPin, AxiosError>();
