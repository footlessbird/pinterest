import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT_USER } from "../actions";
// import { logoutUserAsync } from "../actions";

function NavigationMenu({ auth }) {
  const { isLoading, isAuthenticated, user } = auth;
  console.log("isAuthenticated? ", isAuthenticated);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    // dispatch(logoutUserAsync.request(null));
    // localStorage.clear(); // 바로 지워짐
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <nav>
      <div className="nav-wrapper">
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          [
            <div className="nav-brand">
              <Link to="/">Home</Link>
              {/* {isAuthenticated && user ? (
                <h1>Welcome {user.username}</h1>
              ) : null} */}
            </div>,
            <div className="nav-auth">
              {isAuthenticated && user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button>Login</button>
              )}
            </div>,
          ]
        )}
        <div className="nav-content"></div>
      </div>
    </nav>
  );
}

export default NavigationMenu;
