import React, { useEffect, memo, useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector, connect, shallowEqual } from "react-redux";
import { RootState } from "../reducers";
import { getAllPinsAsync, TPin } from "../actions";
import Pin from "./Pin";
import Masonry from "react-masonry-component";
import Modal from "react-modal";

import { useModal } from "../utils/useModal";
import CreatePinModal from "../components/CreatePinModal";
import { PinState } from "../actions/types";

// function Pins({ auth }) {
const Pins = ({ firstRender, loginMethod, auth }) => {
  const { currentUser } = auth;
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pins, shallowEqual);

  const { hasMorePins, loading } = pins;

  // console.log("pins", pins);
  // console.log("firstRender", firstRender);
  const {
    showModal,
    setShowModal,
    handleOpenModal,
    handleCloseModal,
  } = useModal();

  const masonryOptions = {
    transitionDuration: 0,
    fitWidth: true, // center masonry
  };

  // useEffect(() => {
  //   dispatch(getAllPinsAsync.request(""));
  // }, []);

  // useEffect(() => {
  //   let lastId = "";
  //   if (pins.data.length > 0) {
  //     lastId = pins.data[pins.data.length - 1]._id;
  //   }
  //   // const lastId = pins.data[pins.data.length - 1]._id;
  //   console.log("lastId", lastId);
  //   setTimeout(() => {
  //     dispatch(getAllPinsAsync.request(lastId));
  //     // dispatch(getAllPinsAsync.request(""));
  //   }, 2000);
  // }, [pins.data]);

  // infinite scroll

  const onScroll = useCallback(() => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
      // window.pageYOffset + document.documentElement.clientHeight ===
      // document.documentElement.scrollHeight
    ) {
      if (hasMorePins && !loading) {
        let lastId = pins.allPins[pins.allPins.length - 1]._id;
        dispatch(getAllPinsAsync.request(lastId));
      } else {
        return;
      }
    }
  }, [hasMorePins, pins.allPins, loading]);

  useEffect(() => {
    if (firstRender === true) {
      dispatch(getAllPinsAsync.request(""));
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePins, pins.allPins]);

  return (
    <div className="pins">
      <Masonry
        className="pins-container"
        elementType={"ul"}
        options={masonryOptions}
        disableImagesLoaded={true}
        updateOnEachImageLoad={true}
      >
        {pins.allPins &&
          pins.allPins.map((pin) => <Pin key={pin._id} pin={pin} />)}
      </Masonry>

      {currentUser ? (
        <div>
          <button
            className="create-btn"
            onClick={() => handleOpenModal("create")}
          >
            +
          </button>
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={showModal.createModal}
            onRequestClose={handleCloseModal}
          >
            <CreatePinModal
              onClose={handleCloseModal}
              openCreatePin={handleOpenModal}
            />
          </Modal>
        </div>
      ) : null}
    </div>
  );
};

export default memo(Pins);
