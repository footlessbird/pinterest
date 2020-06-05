import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { getUserAsync, GET_USER_REQUEST } from "../actions/";
import API from "../services/api";

function loadUserAPI(userId) {
  return API.call("get", `auth/current_user`);
}

function* getUser(action) {
  try {
    const user = yield call(loadUserAPI, action.data);
    yield put(getUserAsync.success(user));
  } catch (err) {
    console.error(err);
    // yield put({
    //   type: LOAD_USER_FAILURE,
    //   error: err,
    // });
  }
}

function* watchGetUser() {
  yield takeEvery(GET_USER_REQUEST, getUser);
}
