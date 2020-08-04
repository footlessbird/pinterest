import { createAsyncAction, action, createAction } from "typesafe-actions";

export const ADD_ERROR = "ADD_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";

export const addError = (error) => action(ADD_ERROR, error);
export const removeError = () => action(REMOVE_ERROR);
