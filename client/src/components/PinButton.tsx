import React from "react";
import { useDispatch } from "react-redux";
import { savePinAsync, deletePinAsync } from "../actions";

function PinButton({ pinId, userId, savedBy, modal }) {
  const dispatch = useDispatch();
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  const handleSave = (e) => {
    console.log("handleSave");
    e.preventDefault();
    dispatch(savePinAsync.request(pinId));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePinAsync.request(pinId));
  };
  const currentUrl = window.location.href;

  function pinButton() {
    if (loggedInUserId) {
      if (userId === loggedInUserId) {
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
  }

  // return <div className="pin-btn-wrapper">{pinButton()}</div>;
  return (
    <div className={!modal ? "pin-btn-wrapper" : "pin-modal-btn"}>
      {pinButton()}
    </div>
  );
}

export default PinButton;
