import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePinAsync, deletePinAsync } from "../actions";
import { RootState } from "../reducers";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Modal from "react-modal";
import { useModal } from "../utils/useModal";

import PinButton from "../components/PinButton";
import PinModal from "./PinModal";

function Pin({ pin }) {
  const dispatch = useDispatch();
  const { user, imgLink, imgDescription, savedBy } = pin;

  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const {
    showModal,
    setShowModal,
    handleOpenModal,
    handleCloseModal,
  } = useModal();

  // const handleSave = (e) => {
  //   console.log("handleSave");
  //   e.preventDefault();
  //   dispatch(savePinAsync.request(pin._id));
  // };

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   dispatch(deletePinAsync.request(pin._id));
  // };

  // console.log("user._id", user._id);
  // console.log("loggeInUserId", loggedInUserId);
  // console.log("typeof loggeInUserId", typeof loggedInUserId);

  /*
  const pinButton = () => {
    const currentUrl = window.location.href;
    if (loggedInUserId) {
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
  */

  return (
    <>
      <button
        className="pin-modal-trigger"
        onClick={() => handleOpenModal("pin")}
      >
        <li className="pin">
          <LazyLoadImage
            className="pin-image"
            alt={imgDescription}
            effect="blur"
            src={imgLink}
          />
          <div className="pin-description">{imgDescription}</div>
          {/* <div className="pin-btn-wrapper">{pinButton()}</div> */}
          {/* <div className="pin-btn-wrapper"> */}

          <PinButton
            pinId={pin._id}
            userId={user._id}
            savedBy={savedBy}
            modal={false}
            onClose={handleCloseModal}
          />

          {/* </div> */}
        </li>
      </button>

      <Modal
        appElement={document.getElementById("root")}
        className="pin-modal"
        overlayClassName="overlay"
        isOpen={showModal.pinModal}
        onRequestClose={handleCloseModal}
      >
        <PinModal pin={pin} onClose={handleCloseModal} />
      </Modal>
    </>
  );
}

export default Pin;
