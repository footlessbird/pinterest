import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePinAsync, deletePinAsync } from "../actions";
import { RootState } from "../reducers";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Modal from "react-modal";
import { useModal } from "../utils/useModal";

import PinButton from "../components/PinButton";
import PinModal from "./PinModal";

function Pin({ pin }) {
  const { user, imgLink, imgDescription, savedBy } = pin;

  const {
    showModal,
    setShowModal,
    handleOpenModal,
    handleCloseModal,
  } = useModal();

  return (
    <>
      <div className="pin-modal-trigger" onClick={() => handleOpenModal("pin")}>
        <li className="pin">
          <LazyLoadImage
            className="pin-image"
            alt={imgDescription}
            effect="blur"
            src={imgLink}
          />
          <div className="pin-description">{imgDescription}</div>

          <PinButton
            pinId={pin._id}
            userId={user._id}
            savedBy={savedBy}
            modal={false}
            onClose={handleCloseModal}
          />
        </li>
      </div>

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

export default memo(Pin);
