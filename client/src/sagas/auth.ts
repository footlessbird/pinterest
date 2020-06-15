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
  GET_CURRENT_USER_REQUEST,
  LOCAL_LOGIN_REQUEST,
  REGISTER_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAILURE,
  GITHUB_LOGIN_REQUEST,
  GITHUB_LOGIN_SUCCESS,
  GITHUB_LOGIN_FAILURE,
} from "../actions";
import API from "../services/api";
import axios from "axios";

// current_user
function getCurrentUserAPI() {
  console.log("sending token...", localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  if (token === null || token === undefined)
    throw new Error("No token provided");
  return axios.get("/api/auth/current_user", {
    headers: { authorization: `Bearer ${token}` },
  });
}

function* getCurrentUser() {
  // try {
  //   const res = yield call(getUserAPI);
  //   yield put(getUserAsync.success(res.data));
  // } catch (err) {
  //   console.error(err);
  //   yield put(getUserAsync.failure(err));
  // }
  try {
    const result = yield call(getCurrentUserAPI);
    yield put({
      type: GET_CURRENT_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_CURRENT_USER_FAILURE,
      error: err,
    });
  }
}

function* watchGetCurrentUser() {
  yield takeEvery(GET_CURRENT_USER_REQUEST, getCurrentUser);
}

// local login
function localLoginAPI(loginData) {
  // return API.call("post", `auth/login`, loginData);
  const { email, password } = loginData;
  return axios.post("/api/auth/login", { email, password });
}

function* localLogin(action) {
  // console.log("loginUser worker function called");
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
    localStorage.setItem("loginMethod", "local");
    localStorage.setItem("token", result.data.token);

    console.log("local login result", result);
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

/*
function githubLoginAPI() {
  return axios.get("/api/auth/github");
  // return axios.get("/api/auth/github").then((url) => axios.get(url.data));
}

function* githubLogin() {
  try {
    const result = yield call(githubLoginAPI);
    console.log("githubLogin result", result);
    // localStorage.setItem("token", result.data.token);
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
  // console.log("watchGithubLogin called");
  yield takeLatest(GITHUB_LOGIN_REQUEST, githubLogin);
}
*/

function githubLoginAPI() {
  console.log("getGithubUserAPI called");
  const githubCode = { githubCode: localStorage.getItem("code") };
  console.log("code is ", githubCode);
  if (!githubCode) {
    throw new Error("could not retrive a code from Github");
  } else {
    // return axios.get("/api/auth/github_callback", { data: githubCode });

    // one : the http method should be set to POST instead of GET since you want to send something.
    // https://stackoverflow.com/questions/52561124/body-data-not-sent-in-axios-request
    return axios.post("/api/auth/github_callback", githubCode);
  }
}

function* githubLogin() {
  try {
    const result = yield call(githubLoginAPI);
    console.log("getGithubUser", result.data);
    localStorage.setItem("loginMethod", "github");
    localStorage.setItem("token", result.data.token);

    yield put({
      type: GITHUB_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GITHUB_LOGIN_FAILURE,
      data: err,
    });
  }
}

function* watchGithubLogin() {
  // console.log("watchGetGithubUser called");
  yield takeLatest(GITHUB_LOGIN_REQUEST, githubLogin);
}

export default function* userSaga() {
  yield all([
    fork(watchGetCurrentUser),
    fork(watchLocalLogin),
    // fork(watchGithubLogin),
    fork(watchGithubLogin),
  ]);
}
