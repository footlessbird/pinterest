import { createReducer, action } from "typesafe-actions";
import produce from "immer";
import { PinState, PinterestAction } from "../actions/types";
import {
  CREATE_PIN_REQUEST,
  CREATE_PIN_SUCCESS,
  CREATE_PIN_FAILURE,
} from "../actions";

const initialState: PinState = {
  loading: false,
  error: null,
  data: null,
};

const pinReducer = createReducer<PinState, PinterestAction>(initialState, {
  [CREATE_PIN_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }),
  [CREATE_PIN_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [CREATE_PIN_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }),
});

export default pinReducer;
