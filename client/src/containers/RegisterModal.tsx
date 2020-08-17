import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { REGISTER_USER_REQUEST, RESET_REGISTER_SUCCESS } from "../actions";
import { useToasts } from "react-toast-notifications";
import { RootState } from "../reducers";
import { removeError } from "../actions/index";

function RegisterModal({ openLogin, onClose }) {
  const auth = useSelector((state: RootState) => state.auth);
  const authError = useSelector((state: RootState) => state.error);

  console.log("authError", authError);
  // const { isLoading, isAuthenticated, user, error, isSuccessful } = auth;
  const { registerUserLoading, registerUserDone, registerUserError } = auth;

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  console.log("useForm err", errors);
  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(removeError()); // 모달이 열릴 때 이전 오류 메세지 초기화해서 보이지 않도록
    dispatch({ type: RESET_REGISTER_SUCCESS }); // 모달이 열릴 때 이전 isSuccessful 초기화하여 다시 새로이 회원가입할 수 있도록 설정
    // if (isSuccessful) {
    if (registerUserDone) {
      addToast(`Thank you for signing up! Now you can log in`, {
        appearance: "success",
        autoDismiss: true,
      });
      onClose();
    } else {
      return;
    }
  }, [registerUserDone]);

  const onSubmit = async (data) => {
    const { email, username, password } = data;
    console.log(email, username, password);
    // 이전 에러가 있다면 제거
    // if (authError.error && authError.error.message) {
    //   console.log("에러 로그 발견 이전 에러기록 삭제");
    //   dispatch(removeError());
    // }
    dispatch({
      type: REGISTER_USER_REQUEST,
      data: { email, username, password },
    });

    /*
    if (isSuccessful) {
      addToast(`Thank you for signing up! Now you can log in`, {
        appearance: "success",
        autoDismiss: true,
      });
      onClose();
    } else {
      return;
    }
    */
  };

  return (
    <div className="inner-container">
      <div className="modal-content">
        <div className="item">
          <h2>Find new ideas to try</h2>
        </div>
        <div className="item">
          {authError.error ? (
            <h6 className="form-error">{authError.error.message}</h6>
          ) : null}
          {/* {error && error.message ? (
            <h6 className="form-error">{error.message}</h6>
          ) : null} */}
        </div>
        {/* {error ? <h6 className="form-error">{error.message}</h6> : null} */}
        {/* {authError.error ? (
          <h6 className="form-error">{authError.error.message}</h6>
        ) : null} */}

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
              className={
                errors.email && Object.keys(errors.email).length >= 1
                  ? "input-error"
                  : "form-input"
              }
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
            <p>
              <label>
                Username
                <span>
                  {errors.username && (
                    <h6 className="form-error">{errors.username.message}</h6>
                  )}
                </span>
              </label>
            </p>
            <input
              className={
                errors.username && Object.keys(errors.username).length >= 1
                  ? "input-error"
                  : "form-input"
              }
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
          </div>
          <div className="item">
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
              className={
                errors.password && Object.keys(errors.password).length >= 1
                  ? "input-error"
                  : "form-input"
              }
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
      {/* <div className="item github-oauth"> */}
      <div className="item">
        <button
          className="oauth-btn"
          // onClick={() => history.push("/api/auth/github")}
          onClick={() => window.location.replace("/api/auth/github")}
        >
          {/* <a href="/api/auth/github"> */}
          {/* <FontAwesomeIcon icon={faGithub} /> Continue with Github */}
          {/* </a> */}
          <span>
            <FontAwesomeIcon icon={faGithub} /> Continue with Github
          </span>
        </button>
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
