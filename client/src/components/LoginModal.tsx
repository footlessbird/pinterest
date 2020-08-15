import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { LOCAL_LOGIN_REQUEST } from "../actions";
import { useToasts } from "react-toast-notifications";

function LoginModal({ openSignup, onClose }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
    dispatch({ type: LOCAL_LOGIN_REQUEST, data: { email, password } });
    // addToast("Logged in Successfully", { appearance: "success" });
    addToast(`Logged in successfully 💃🏼`, {
      appearance: "success",
      autoDismiss: true,
    });
    onClose();
  };

  return (
    <div className="inner-container">
      <div className="modal-content">
        <div className="item">
          <h2>Welcome to PPinterest</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="item">
            <p>
              <label>
                Email
                <span>
                  {errors.email && (
                    <h6 className="form-error">{errors.email.message}</h6>
                  )}
                </span>
              </label>
            </p>
            <input
              className="form-input"
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
            {/* {errors.email && (
              <h6 className="form-error">{errors.email.message}</h6>
            )} */}
          </div>
          <div className="item">
            {/* <label>Password</label> */}
            <p>
              <label>
                Password
                <span>
                  {errors.password && (
                    <h6 className="form-error">{errors.password.message}</h6>
                  )}
                </span>
              </label>
            </p>
            <input
              className="form-input"
              type="password"
              placeholder="password"
              name="password"
              ref={register({
                required: "Please enter your password.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />
            {/* {errors.password && (
              <h6 className="form-error">{errors.password.message}</h6>
            )} */}
          </div>
          <div className="item">
            <button className="gen-btn" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
      <div className="or">
        <label>OR</label>
      </div>
      {/* <div className="item github-oauth">
        <a href="/api/auth/github">
          <FontAwesomeIcon icon={faGithub} /> Continue with Github
        </a>
      </div> */}
      <div className="item">
        <button
          className="oauth-btn"
          onClick={() => window.location.replace("/api/auth/github")}
        >
          <span>
            <FontAwesomeIcon icon={faGithub} /> Continue with Github
          </span>
        </button>
      </div>
      {/* <hr /> */}
      <div className="item">
        <a
          onClick={() => {
            openSignup("signup");
          }}
        >
          Need an account? Sign up now
        </a>
      </div>
    </div>
  );
}

export default LoginModal;
