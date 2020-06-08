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
  LOCAL_LOGIN_REQUEST,
  REGISTER_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAILURE,
  GITHUB_LOGIN_REQUEST,
  GITHUB_LOGIN_SUCCESS,
  GITHUB_LOGIN_FAILURE,
} from "../actions";
import API from "../services/api";
import axios from "axios";

// current_user
function getUserAPI() {
  console.log("sending token...", localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  return axios.get("/api/auth/current_user", {
    headers: { authorization: `Bearer ${token}` },
  });
}

function* getUser() {
  // try {
  //   const res = yield call(getUserAPI);
  //   yield put(getUserAsync.success(res.data));
  // } catch (err) {
  //   console.error(err);
  //   yield put(getUserAsync.failure(err));
  // }
  try {
    const result = yield call(getUserAPI);
    yield put({
      type: GET_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_USER_FAILURE,
      error: err,
    });
  }
}

function* watchGetUser() {
  yield takeEvery(GET_USER_REQUEST, getUser);
}

// local login
function localLoginAPI(loginData) {
  // return API.call("post", `auth/login`, loginData);
  const { email, password } = loginData;
  return axios.post("/api/auth/login", { email, password });
}

function* localLogin(action) {
  console.log("loginUser worker function called");
  // try {
  //   const res = yield call(loginUserAPI, action.data);
  //   localStorage.setItem("token", res.data.token);
  //   console.log("saving token...", localStorage.getItem("token"));
  //   yield put(loginUserAsync.success(res.data));
  // } catch (err) {
  //   console.error(err);
  //   yield put(loginUserAsync.failure(err));
  // }

  try {
    const result = yield call(localLoginAPI, action.data);
    localStorage.setItem("token", result.data.token);
    console.log("login result", result);
    yield put({
      type: LOCAL_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOCAL_LOGIN_FAILURE,
      error: err,
    });
  }
}

function* watchLocalLogin() {
  yield takeLatest(LOCAL_LOGIN_REQUEST, localLogin);
}

function githubLoginAPI() {
  return axios.get("/api/auth/github");
}

function* githubLogin() {
  try {
    const result = yield call(githubLoginAPI);
    console.log("githubLogin result", result);
    yield put({
      type: GITHUB_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GITHUB_LOGIN_FAILURE,
      error: err,
    });
  }
}

function* watchGithubLogin() {
  console.log("watchGithubLogin called");
  yield takeLatest(GITHUB_LOGIN_REQUEST, githubLogin);
}

export default function* userSaga() {
  yield all([
    fork(watchGetUser),
    fork(watchLocalLogin),
    fork(watchGithubLogin),
  ]);
}
