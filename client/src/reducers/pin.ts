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
} from "../actions";

const initialState: PinState = {
  loading: false,
  error: null,
  data: [],
};

/*
export default (state: PinState = initialState, action: PinterestAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case CREATE_PIN_REQUEST: {
        draft.loading = true;
        draft.error = null;
        break;
      }
      case CREATE_PIN_SUCCESS: {
        draft.loading = false;
        draft.error = null;
        // draft.data?.unshift(action.payload);
        draft.data?.push(action.payload);
        break;
      }
      case CREATE_PIN_FAILURE: {
        draft.loading = true;
        draft.error = null;
        break;
      }
      case GET_ALL_PINS_REQUEST: {
        draft.loading = true;
        draft.error = null;
        break;
      }
      case GET_ALL_PINS_SUCCESS: {
        draft.loading = false;
        draft.error = null;
        draft.data = action.payload;
        break;
      }
      case GET_ALL_PINS_FAILURE: {
        draft.loading = false;
        draft.error = action.payload;
        break;
      }
      default:
        break;
    }
  });
};
*/

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
      draft.data = action.payload;
    }),

  [GET_ALL_PINS_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = action.payload;
    }),
});

export default pinReducer;
