import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { LOCAL_LOGIN_REQUEST, GITHUB_LOGIN_REQUEST } from "../actions";
import { RootState } from "../reducers";

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
        <label>
          Email
          <input
            type="text"
            placeholder="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <input
          type="password"
          placeholder="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <a href="/api/auth/github">Login with Github</a>

      {/* <button onClick={() => dispatch({ type: GITHUB_LOGIN_REQUEST })}>
        Login with Github
      </button> */}
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          axios
            .get("/api/auth/github")
            .then((res) => (window.location.href = res.data))
            .catch((e) => console.error(e));
        }}
      >
        Login with Github
      </button> */}
      {/* <Link to="/api/auth/github">Login with Github</Link> */}
    </div>
  );
}

export default LoginTestForm;
