import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import {
  getUserAsync,
  loginUserAsync,
  registerUserAsync,
  GET_USER_REQUEST,
  LOGIN_USER_REQUEST,
  REGISTER_USER_REQUEST,
} from "../actions/";
import API from "../services/api";
import axios from "axios";

// current_user
function getUserAPI() {
  // return API.call("get", `auth/current_user`, {
  //   headers: { authorization: localStorage.getItem("token") },
  // });
  console.log("sending token...", localStorage.getItem("token"));
  return axios.get("/api/auth/current_user", {
    headers: { authorization: localStorage.getItem("token") },
  });
}

function* getUser() {
  try {
    const res = yield call(getUserAPI);
    yield put(getUserAsync.success(res.data));
  } catch (err) {
    console.error(err);
    yield put(getUserAsync.failure(err));
  }
}

function* watchGetUser() {
  yield takeEvery(GET_USER_REQUEST, getUser);
}

// local login
function loginUserAPI(loginData) {
  // return API.call("post", `auth/login`, loginData);
  const { email, password } = loginData;
  return axios.post("/api/auth/login", { email, password });
}

function* loginUser(action) {
  console.log("loginUser worker function called");
  try {
    const res = yield call(loginUserAPI, action.data);
    localStorage.setItem("token", res.data.token);
    console.log("saving token...", localStorage.getItem("token"));
    yield put(loginUserAsync.success(res.data));
  } catch (err) {
    console.error(err);
    yield put(loginUserAsync.failure(err));
  }
}

function* watchLoginUser() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUser);
}

export default function* userSaga() {
  yield all([fork(watchGetUser), fork(watchLoginUser)]);
}
