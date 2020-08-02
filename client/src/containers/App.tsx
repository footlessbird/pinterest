import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAsync, GET_CURRENT_USER_REQUEST, TUser } from "../actions";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import { setToken } from "../services/api";
import LoginTestForm from "../components/LoginTestForm";
import { RootState } from "../reducers";
import GithubLogin from "../components/GithubLogin";
import NavigationMenu from "../components/NavigationMenu";
import CreatePin from "../components/CreatePin";
import Pins from "./Pins";
import MyPins from "./MyPins";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { isLoading, isAuthenticated, user } = auth;
  // const { showModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    // dispatch(getUserAsync.request());
    const loginMethod = localStorage.getItem("loginMethod");
    console.log("loginMethod?? ", loginMethod);
    const token = localStorage.getItem("token");

    if (loginMethod === "local") {
      if (token !== undefined || token !== null || token !== "") {
        dispatch({ type: GET_CURRENT_USER_REQUEST });
        console.log("auth??", auth);
      } else {
        throw new Error("no token");
      }
    } else if (loginMethod === "github") {
      const githubCode = localStorage.getItem("code");
      if (token !== undefined || token !== null || token !== "") {
        if (
          githubCode !== undefined ||
          githubCode !== null ||
          githubCode !== ""
        ) {
          dispatch({ type: GET_CURRENT_USER_REQUEST });
          console.log("auth??", auth);
        } else {
          throw new Error("somwthing went wrong with github code");
        }
      } else {
        throw new Error("somwthing went wrong with token");
      }
    } else {
      return;
    }
  }, []);

  return (
    <div>
      <Router>
        <NavigationMenu auth={auth} />
        {/* <LoginTestForm /> */}
        {/* <CreatePin /> */}
        <Switch>
          <Route exact path="/" render={() => <Pins auth={auth} />} />
          {/* <Route exact path="/" component={Pins} /> */}
          <Route path="/githublogin" component={GithubLogin} />

          {/* <Route path="/login" component={LoginModal} /> */}
          {/* <Route path="/register" component={RegisterModal} /> */}

          <Route
            path="/mypins"
            render={() => (isAuthenticated ? <MyPins /> : <Redirect to="/" />)}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
