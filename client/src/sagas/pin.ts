import { createPinAsync, CREATE_PIN_REQUEST } from "../actions";
import { takeEvery, takeLatest, all, fork } from "redux-saga/effects";
import createAsyncSaga from "../utils/createAsyncSaga";
import API, { tokenConfig } from "../services/api";
import api from "../services/api";
import Axios from "axios";

function createPin(data) {
  console.log("createPin data??", data);

  const token = localStorage.getItem("token");
  return API.call("post", "pins", data, {
    headers: { authorization: `Bearer ${token}` },
  });
}

const createPinSaga = createAsyncSaga(createPinAsync, createPin);

export function* watchCreatePin() {
  yield takeLatest(CREATE_PIN_REQUEST, createPinSaga);
}

export default function* pinSaga() {
  yield all([fork(watchCreatePin)]);
}
