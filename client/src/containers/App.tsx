import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_CURRENT_USER_REQUEST } from "../actions";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { RootState } from "../reducers";
import GithubLogin from "../components/GithubLogin";
import NavigationMenu from "../components/NavigationMenu";
import Pins from "./Pins";
import MyPins from "./MyPins";
import LoginModal from "./LoginModal";

function App() {
  console.log("app rendered");
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [firstRender, setFirstRender] = useState(true);
  const firstRenderProps = { firstRender };
  const loginMethod = localStorage.getItem("loginMethod");
  const {
    getCurrentUserLoading,
    currentUser,
    getCurrentUserDone,
    getCurrentUserError,
  } = auth;

  useEffect(() => {
    // const loginMethod = localStorage.getItem("loginMethod");
    console.log("loginMethod?? ", loginMethod);
    const token = localStorage.getItem("token");

    if (loginMethod || token) {
      dispatch({ type: GET_CURRENT_USER_REQUEST });
    }
    setFirstRender(false);
  }, []);

  return (
    <div>
      <Router>
        <NavigationMenu auth={auth} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Pins
                {...firstRenderProps}
                loginMethod={loginMethod}
                auth={auth}
              />
            )}
          />
          <Route path="/githublogin" component={GithubLogin} />
          <Route
            path="/mypins"
            render={() =>
              getCurrentUserDone ? <MyPins /> : <Redirect to="/" />
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default memo(App);
