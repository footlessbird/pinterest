import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { REGISTER_USER_REQUEST } from "../actions";
import { useToasts } from "react-toast-notifications";

function RegisterModal({ openLogin, onClose }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  const onSubmit = (data) => {
    const { email, username, password } = data;
    console.log(email, username, password);
    dispatch({
      type: REGISTER_USER_REQUEST,
      data: { email, username, password },
    });
    addToast(`Thank you for signing up! Now you can log in`, {
      appearance: "success",
      autoDismiss: true,
    });
    onClose();
  };

  return (
    <div className="inner-container">
      <div className="local-login">
        <div className="item">
          <h2>Find new ideas to try</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="item">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="janedoe@email.com"
              ref={register({
                required: "Please enter your email.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email.",
                },
              })}
            />
            {errors.email && (
              <h6 className="login-error">{errors.email.message}</h6>
            )}
          </div>
          <div className="item">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Jane"
              ref={register({
                required: "Please enter username.",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters.",
                },
                // pattern: {
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   message: "Invalid email.",
                // },
              })}
            />
            {errors.username && (
              <h6 className="login-error">{errors.username.message}</h6>
            )}
          </div>
          <div className="item">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              name="password"
              ref={register({
                required: "Please enter your password.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <h6 className="login-error">{errors.password.message}</h6>
            )}
          </div>
          <div className="item">
            <button className="gen-btn" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div className="or">
        <label>OR</label>
      </div>
      <div className="item github-oauth">
        <a href="/api/auth/github">
          <FontAwesomeIcon icon={faGithub} /> Continue with Github
        </a>
      </div>
      {/* <hr /> */}
      <div className="item">
        <a
          onClick={() => {
            openLogin("login");
          }}
        >
          Already a member? Log in
        </a>
      </div>
    </div>
  );
}

export default RegisterModal;
