import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT_USER } from "../actions";
// import { logoutUserAsync } from "../actions";
import { ReactComponent as PinterestLogo } from "../assets/badgeRGB.svg";

import Modal from "react-modal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useModal } from "../utils/useModal";
import { useToasts } from "react-toast-notifications";

function NavigationMenu({ auth }) {
  const { isLoading, isAuthenticated, user, error } = auth;
  // console.log("isAuthenticated? ", isAuthenticated);
  const { addToast } = useToasts();
  console.log("navigation err", error);
  const {
    showModal,
    setShowModal,
    handleOpenModal,
    handleCloseModal,
  } = useModal();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    // dispatch(logoutUserAsync.request(null));
    // localStorage.clear(); // 바로 지워짐
    dispatch({ type: LOGOUT_USER });
    addToast("See you again 🙋🏻‍♀️", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  return (
    <nav>
      <div className="nav-container">
        <div key="nav-brand" className="nav-brand">
          <Link to="/">
            <PinterestLogo className="logo" />
          </Link>
        </div>
        <div className="nav-auth">
          <Link to="/" className="nav-btn navigation">
            Home
          </Link>
          {isAuthenticated && user
            ? [
                <Link className="nav-btn navigation" key="my-pins" to="/mypins">
                  My pins
                </Link>,
                <button
                  className="nav-btn navigation"
                  key="logout-button"
                  onClick={handleLogout}
                >
                  Log out
                </button>,
              ]
            : [
                <button
                  className="nav-btn navigation"
                  onClick={() => handleOpenModal("login")}
                >
                  Log in
                </button>,
                <Modal
                  className="modal"
                  overlayClassName="overlay"
                  isOpen={showModal.loginModal}
                  onRequestClose={handleCloseModal}
                >
                  <LoginModal
                    openSignup={handleOpenModal}
                    onClose={handleCloseModal}
                  />
                  {/* <button onClick={() => handleOpenModal("signup")}>
                    No account? Sign up
                  </button> */}
                </Modal>,
                <button
                  className="nav-btn navigation"
                  onClick={() => handleOpenModal("signup")}
                >
                  Sign up
                </button>,
                <Modal
                  className="modal"
                  overlayClassName="overlay"
                  isOpen={showModal.signupModal}
                  onRequestClose={handleCloseModal}
                >
                  <RegisterModal
                    openLogin={handleOpenModal}
                    onClose={handleCloseModal}
                  />
                  {/* <button onClick={() => handleOpenModal("login")}>
                    Already a member? Log in
                  </button> */}
                </Modal>,
              ]}
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;
