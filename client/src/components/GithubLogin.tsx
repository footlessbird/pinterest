import React, { useEffect } from "react";
import { parse, stringify } from "querystring";
import { useDispatch } from "react-redux";

import { GET_GITHUB_USER_REQUEST } from "../actions";

function GithubLogin(props) {
  // console.log("props ", props);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("GithubCallback rendered");
    const href = window.location.href.split("?");
    const { code } = parse(href[1]);
    localStorage.setItem("code", code as string);
    console.log("code?? ", code);
    dispatch({ type: GET_GITHUB_USER_REQUEST });
    props.history.replace("/");
  }, []);
  return null;
}

export default GithubLogin;
