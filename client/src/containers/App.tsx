import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAsync, GET_USER_REQUEST } from "../actions";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import LoginTestForm from "../components/LoginTestForm";
import { RootState } from "../reducers";
import GithubLogin from "./GithubLogin";

function App() {
  const dispatch = useDispatch();
  const auth: any = useSelector((state: RootState) => state.auth);
  const { isLoading, isAuthenticated, user } = auth;
  useEffect(() => {
    // dispatch(getUserAsync.request());
    dispatch({ type: GET_USER_REQUEST });
    console.log(auth);
  }, []);

  return (
    <div>
      <Router>
        {isAuthenticated ? <h1>Welcome {user.username}</h1> : null}
        <LoginTestForm />
        <Switch>
          {/* <Route component={LoginTestForm} /> */}
          <Route path="/githublogin" component={GithubLogin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
