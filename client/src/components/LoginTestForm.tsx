import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loginUserAsync,
  LOCAL_LOGIN_REQUEST,
  GITHUB_LOGIN_REQUEST,
} from "../actions";

function LoginTestForm() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: LOCAL_LOGIN_REQUEST,
      data: {
        email,
        password,
      },
    });
  };

  const { email, password } = values;

  return (
    <div>
      {/* <form onSubmit={() => dispatch(loginUserAsync.request(values))}> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {/* <a href="/api/auth/github">Login with Github</a> */}
      {/* <button onClick={() => dispatch({ type: GITHUB_LOGIN_REQUEST })}>
        Login with Github
      </button> */}
    </div>
  );
}

export default LoginTestForm;
