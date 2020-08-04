import { ADD_ERROR, REMOVE_ERROR } from "../actions/error";

export default (state = { error: null }, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, error: action.error };
    case REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
