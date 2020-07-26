import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePinAsync, deletePinAsync } from "../actions";
import { RootState } from "../reducers";

function Pin({ pin }) {
  const dispatch = useDispatch();
  console.log("Pin belongs to this url", window.location.href);
  // console.log("Pin component rerendered");
  // console.log("pinId from Pin", pin);
  // const auth = useSelector((state: RootState) => state.auth);
  // const loggedInUserId = auth.user && auth.user._id;
  // console.log("loggedInUserId??", loggedInUserId);

  const { user, imgLink, imgDescription, savedBy } = pin;

  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const handleSave = (e) => {
    console.log("handleSave");
    e.preventDefault();
    dispatch(savePinAsync.request(pin._id));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePinAsync.request(pin._id));
  };

  console.log("user._id", user._id);
  console.log("loggeInUserId", loggedInUserId);
  console.log("typeof loggeInUserId", typeof loggedInUserId);
  const pinButton = () => {
    const currentUrl = window.location.href;
    if (loggedInUserId) {
      /*
      if (
        user._id === loggedInUserId ||
        (savedBy && Object.keys(savedBy).includes(loggedInUserId))
        // 남의 핀 세이브 or 내가 생성한 핀
      ) {
        return <button onClick={handleDelete}>Remove</button>;
      } else {
        return <button onClick={handleSave}>Save</button>;
      }
      */
      if (user._id === loggedInUserId) {
        return (
          <button className="pin-btn" onClick={handleDelete}>
            Remove
          </button>
        );
      } else if (savedBy && Object.keys(savedBy).includes(loggedInUserId)) {
        if (currentUrl === "http://localhost:3000/mypins") {
          return (
            <button className="pin-btn" onClick={handleDelete}>
              Unsave
            </button>
          );
        } else {
          return null;
        }
      } else {
        return (
          <button className="pin-btn" onClick={handleSave}>
            Save
          </button>
        );
      }
    }
  };

  return (
    <li className="pin">
      <img className="pin-image" src={imgLink} alt={imgDescription} />
      <div>{user.username}</div>
      <div className="pin-btn-wrapper">{pinButton()}</div>
    </li>
  );
}

export default Pin;
