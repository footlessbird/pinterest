import {
  createPinAsync,
  CREATE_PIN_REQUEST,
  GET_ALL_PINS_REQUEST,
  getAllPinsAsync,
} from "../actions";
import { takeEvery, takeLatest, all, fork } from "redux-saga/effects";
import createAsyncSaga from "../utils/createAsyncSaga";
import API from "../services/api";

function createPin(data) {
  console.log("createPin data??", data);

  const token = localStorage.getItem("token");
  return API.call("post", "pins", data, {
    headers: { authorization: `Bearer ${token}` },
  });
  // return API.call("post", "pins", API.tokenConfig());
}

const createPinSaga = createAsyncSaga(createPinAsync, createPin);

export function* watchCreatePin() {
  yield takeLatest(CREATE_PIN_REQUEST, createPinSaga);
}

function getAllPins() {
  return API.call("get", "pins");
}

const getAllPinsSaga = createAsyncSaga(getAllPinsAsync, getAllPins);
export function* watchGetAllPins() {
  yield takeEvery(GET_ALL_PINS_REQUEST, getAllPinsSaga);
}

export default function* pinSaga() {
  yield all([fork(watchCreatePin)]);
  yield all([fork(watchGetAllPins)]);
}
