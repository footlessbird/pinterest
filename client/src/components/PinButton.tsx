import React from "react";
import { useDispatch } from "react-redux";
import { savePinAsync, deletePinAsync } from "../actions";
import { useModal } from "../utils/useModal";

function PinButton({ pinId, userId, savedBy, modal, onClose }) {
  const dispatch = useDispatch();
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  // const {
  //   showModal,
  //   setShowModal,
  //   handleOpenModal,
  //   handleCloseModal,
  // } = useModal();

  const handleSave = (e) => {
    // console.log("handleSave");
    e.preventDefault();
    e.stopPropagation();
    dispatch(savePinAsync.request(pinId));
    onClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deletePinAsync.request(pinId));
    onClose();
  };
  const currentUrl = window.location.href;

  function pinButton() {
    if (loggedInUserId) {
      if (userId == loggedInUserId) {
        return (
          <button
            className={modal ? "pin-modal-btn" : "pin-btn"}
            onClick={handleDelete}
          >
            Remove
          </button>
        );
      } else if (savedBy && Object.keys(savedBy).includes(loggedInUserId)) {
        if (currentUrl.includes("mypins")) {
          return (
            <button
              className={modal ? "pin-modal-btn" : "pin-btn"}
              onClick={handleDelete}
            >
              Unsave
            </button>
          );
        } else {
          return null;
        }
      } else {
        return (
          <button
            className={modal ? "pin-modal-btn" : "pin-btn"}
            onClick={handleSave}
          >
            Save
          </button>
        );
      }
    }
  }

  // return <div className="pin-btn-wrapper">{pinButton()}</div>;
  return <div className={!modal ? "pin-btn-wrapper" : ""}>{pinButton()}</div>;
}

export default PinButton;
