import { createPinAsync, CREATE_PIN_REQUEST } from "../actions";
import { takeEvery, takeLatest, all, fork } from "redux-saga/effects";
import createAsyncSaga from "../utils/createAsyncSaga";
import API from "../services/api";

async function createPin(data) {
  console.log("createPin data??", data);
  return API.call("post", "pins", data);
}

const createPinSaga = createAsyncSaga(createPinAsync, createPin);

export function* watchCreatePin() {
  yield takeLatest(CREATE_PIN_REQUEST, createPinSaga);
}

export default function* pinSaga() {
  yield all([fork(watchCreatePin)]);
}
