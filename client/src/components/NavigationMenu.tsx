import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT_USER } from "../actions";
// import { logoutUserAsync } from "../actions";
import { ReactComponent as PinterestLogo } from "../assets/badgeRGB.svg";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useModal } from "../utils/useModal";

function NavigationMenu({ auth }) {
  const { isLoading, isAuthenticated, user } = auth;
  console.log("isAuthenticated? ", isAuthenticated);
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const dispatch = useDispatch();

  // useEffect(() => {}, [showModal]);

  /*
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  */

  const handleLogout = (e) => {
    e.preventDefault();
    // dispatch(logoutUserAsync.request(null));
    // localStorage.clear(); // 바로 지워짐
    dispatch({ type: LOGOUT_USER });
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
          <Link to="/" className="btn navigation">
            Home
          </Link>
          {isAuthenticated && user
            ? [
                <Link className="btn navigation" key="my-pins" to="/mypins">
                  My pins
                </Link>,
                <button
                  className="btn navigation"
                  key="logout-button"
                  onClick={handleLogout}
                >
                  Log out
                </button>,
              ]
            : [
                <button
                  className="btn navigation"
                  onClick={() => handleOpenModal("login")}
                >
                  Log in
                </button>,
                <LoginModal
                  isOpen={
                    showModal.signupModal
                      ? (showModal.loginModal = false)
                      : !!showModal.loginModal
                  }
                  onRequestClose={handleCloseModal}
                />,
                <button
                  className="btn navigation"
                  onClick={() => handleOpenModal("signup")}
                >
                  Sign up
                </button>,
                <RegisterModal
                  isOpen={
                    showModal.loginModal
                      ? (showModal.signupModal = false)
                      : !!showModal.signupModal
                  }
                  onRequestClose={handleCloseModal}
                />,
              ]}
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;
