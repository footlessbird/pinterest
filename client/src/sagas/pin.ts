import {
  createPinAsync,
  CREATE_PIN_REQUEST,
  GET_ALL_PINS_REQUEST,
  getAllPinsAsync,
  GET_MY_PINS_REQUEST,
  getMyPinsAsync,
  SAVE_PIN_REQUEST,
  savePinAsync,
  DELETE_PIN_REQUEST,
  deletePinAsync,
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

function getAllPins(lastOneId) {
  // return API.call("get", "pins");
  if (lastOneId === "") {
    return API.call("get", `pins`);
  } else {
    return API.call("get", `pins?lastOneId=${lastOneId}`);
  }
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

function savePin(id) {
  console.log("pinId??", id);
  const token = localStorage.getItem("token");
  return API.call("post", `pins/${id}`, id, {
    headers: { authorization: `bearer ${token}` },
  });
}

const savePinSaga = createAsyncSaga(savePinAsync, savePin);

export function* watchSavePin() {
  yield takeEvery(SAVE_PIN_REQUEST, savePinSaga);
}

function deletePin(id) {
  const token = localStorage.getItem("token");
  return API.call("delete", `pins/${id}`, {
    headers: { authorization: `bearer ${token}` },
  });
}

const deletePinSaga = createAsyncSaga(deletePinAsync, deletePin);

export function* watchDeletePin() {
  yield takeLatest(DELETE_PIN_REQUEST, deletePinSaga);
}

export default function* pinSaga() {
  yield all([fork(watchCreatePin)]);
  yield all([fork(watchGetAllPins)]);
  yield all([fork(watchGetMypins)]);
  yield all([fork(watchSavePin)]);
  yield all([fork(watchDeletePin)]);
}
