import React from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LOCAL_LOGIN_REQUEST } from "../actions";
import { useModal } from "../utils/useModal";
import LoginModal from "./LoginModal";

function RegisterModal({ isOpen, onRequestClose }) {
  console.log("registerModal", isOpen);
  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
    dispatch({ type: LOCAL_LOGIN_REQUEST, data: { email, password } });
  };

  return (
    <Modal
      appElement={document.getElementById("root")}
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
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
              <button type="submit">Sign up</button>
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
              handleOpenModal("login");
            }}
          >
            Need an account? Sign up now
          </a>

          <LoginModal
            isOpen={showModal.loginModal}
            onRequestClose={handleCloseModal}
          />
        </div>
      </div>
    </Modal>
  );
}

export default RegisterModal;
