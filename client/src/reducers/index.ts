import { combineReducers } from "redux";

import authReducer from "./auth";
import pinReducer from "./pin";

const rootReducer = combineReducers({
  auth: authReducer,
  pin: pinReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
