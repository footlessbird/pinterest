import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginUserAsync } from "../actions";

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
  const { email, password } = values;

  return (
    <div>
      <form onSubmit={() => dispatch(loginUserAsync.request(values))}>
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
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginTestForm;
