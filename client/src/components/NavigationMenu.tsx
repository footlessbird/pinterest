import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT_USER } from "../actions";
// import { logoutUserAsync } from "../actions";
import { ReactComponent as PinterestLogo } from "../assets/badgeRGB.svg";
import LoginModal from "./LoginModal";

function NavigationMenu({ auth }) {
  const { isLoading, isAuthenticated, user } = auth;
  console.log("isAuthenticated? ", isAuthenticated);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
                  My Pins
                </Link>,
                <button
                  className="btn navigation"
                  key="logout-button"
                  onClick={handleLogout}
                >
                  Log Out
                </button>,
              ]
            : [
                <button className="btn navigation" onClick={handleOpenModal}>
                  Log In
                </button>,
                <LoginModal
                  isOpen={showModal}
                  onRequestClose={handleCloseModal}
                />,
              ]}
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;
