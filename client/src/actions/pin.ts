import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";

export type TPin = {
  user: string;
  imgLink: string;
  imgDescription: string;
  savedBy?: object;
};

export const CREATE_PIN_REQUEST = "CREATE_PIN_REQUEST";
export const CREATE_PIN_SUCCESS = "CREATE_PIN_SUCCESS";
export const CREATE_PIN_FAILURE = "CREATE_PIN_FAILURE";

export const createPinAsync = createAsyncAction(
  CREATE_PIN_REQUEST,
  CREATE_PIN_SUCCESS,
  CREATE_PIN_FAILURE
)<object, TPin, AxiosError>();
