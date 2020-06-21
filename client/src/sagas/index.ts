import { all, fork } from "redux-saga/effects";
import auth from "./auth";
import pin from "./pin";

export default function* rootSaga() {
  yield all([fork(auth)]);
  yield all([fork(pin)]);
}
