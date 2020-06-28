import {
  createPinAsync,
  CREATE_PIN_REQUEST,
  GET_ALL_PINS_REQUEST,
  getAllPinsAsync,
  GET_MY_PINS_REQUEST,
  getMyPinsAsync,
} from "../actions";
import { takeEvery, takeLatest, all, fork } from "redux-saga/effects";
import createAsyncSaga from "../utils/createAsyncSaga";
import API from "../services/api";
import axios from "axios";

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
  // return Axios.get('/api/pins')
}

const getAllPinsSaga = createAsyncSaga(getAllPinsAsync, getAllPins);

export function* watchGetAllPins() {
  yield takeEvery(GET_ALL_PINS_REQUEST, getAllPinsSaga);
}

function getMyPins() {
  const token = localStorage.getItem("token");
  // if (!token) return;
  return API.call("get", "pins/user", "", {
    headers: { authorization: `Bearer ${token}` },
  });
}

const getMyPinsSaga = createAsyncSaga(getMyPinsAsync, getMyPins);

export function* watchGetMypins() {
  yield takeEvery(GET_MY_PINS_REQUEST, getMyPinsSaga);
}

export default function* pinSaga() {
  yield all([fork(watchCreatePin)]);
  yield all([fork(watchGetAllPins)]);
  yield all([fork(watchGetMypins)]);
}
