import { createReducer, action } from "typesafe-actions";
import produce from "immer";
import { PinState, PinterestAction } from "../actions/types";
import {
  CREATE_PIN_REQUEST,
  CREATE_PIN_SUCCESS,
  CREATE_PIN_FAILURE,
  GET_ALL_PINS_REQUEST,
  GET_ALL_PINS_SUCCESS,
  GET_ALL_PINS_FAILURE,
  GET_MY_PINS_REQUEST,
  GET_MY_PINS_SUCCESS,
  GET_MY_PINS_FAILURE,
  DELETE_PIN_REQUEST,
  DELETE_PIN_SUCCESS,
  DELETE_PIN_FAILURE,
  SAVE_PIN_REQUEST,
  SAVE_PIN_SUCCESS,
  SAVE_PIN_FAILURE,
  TPin,
} from "../actions";

const initialState: PinState = {
  loading: false,
  error: null,
  data: [],
  hasMorePins: true,
  countPins: 0,
  totalPins: [],
};

const pinReducer = createReducer<PinState, PinterestAction>(initialState, {
  [CREATE_PIN_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    }),

  [CREATE_PIN_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = null;
      // draft.data?.unshift(action.payload);
      draft.data?.push(action.payload);
    }),

  [CREATE_PIN_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = action.payload;
    }),

  [GET_ALL_PINS_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    }),

  [GET_ALL_PINS_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = draft.data.concat(action.payload);
      draft.hasMorePins = action.payload.length === 10;
      draft.countPins += action.payload.length;
      draft.totalPins = draft.totalPins.concat(action.payload);
    }),

  [GET_ALL_PINS_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = action.payload;
    }),

  [GET_MY_PINS_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    }),

  [GET_MY_PINS_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = action.payload;
    }),

  [GET_MY_PINS_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = action.payload;
    }),
  [DELETE_PIN_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    }),
  [DELETE_PIN_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = draft.data?.filter((p) => p._id !== action.payload.pinId);
    }),
  [DELETE_PIN_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = action.payload;
    }),

  [SAVE_PIN_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [SAVE_PIN_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    data: [
      ...state.data.filter((p) => p._id !== action.payload._id),
      action.payload,
    ],
    error: null,
  }),
  [SAVE_PIN_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
});

export default pinReducer;
