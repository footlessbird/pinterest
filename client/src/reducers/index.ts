import { combineReducers } from "redux";

import authReducer from "./auth";
import pinReducer from "./pin";
import errorReducer from "./error";

const rootReducer = combineReducers({
  auth: authReducer,
  pins: pinReducer,
  error: errorReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
