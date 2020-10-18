import React, { useEffect } from "react";
import { parse, stringify } from "querystring";
import { useDispatch } from "react-redux";
import { getAllPinsAsync } from "../actions";

import { GITHUB_LOGIN_REQUEST } from "../actions";

function GithubLogin(props) {
  // console.log("props ", props);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("GithubCallback rendered");
    const href = window.location.href.split("?");
    const { code } = parse(href[1]);
    localStorage.setItem("code", code as string);
    console.log("code?? ", code);
    dispatch({ type: GITHUB_LOGIN_REQUEST });
    dispatch(getAllPinsAsync.request(""));
    props.history.replace("/");
  }, []);
  return null;
}

export default GithubLogin;
