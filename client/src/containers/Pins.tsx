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
const Pins = ({ firstRender, auth }) => {
  const { currentUser } = auth;
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pins, shallowEqual);
  const [allPins, setAllPins] = useState<TPin[]>([]);
  const { hasMorePins, loading } = pins;
  console.log("Pins rendered");
  console.log("pins", pins);

  const {
    showModal,
    setShowModal,
    handleOpenModal,
    handleCloseModal,
  } = useModal();

  const masonryOptions = {
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
    console.log("onScroll called");
    if (
      window.pageYOffset + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePins && !loading) {
        let lastId = pins.data[pins.data.length - 1]._id;
        dispatch(getAllPinsAsync.request(lastId));
      } else {
        return;
      }
    }
  }, [hasMorePins, loading, pins.data]);

  useEffect(() => {
    if (firstRender === true) {
      dispatch(getAllPinsAsync.request(""));
    }
    window.addEventListener("scroll", onScroll);

    setAllPins({ ...pins.data });
    console.log("allPins", allPins);
    console.log(typeof allPins);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePins, loading, pins.data]);
  const allPinsArr = Object.values(allPins);
  console.log("allPinsArr", allPinsArr);

  return (
    <div className="pins">
      <Masonry
        className="pins-container"
        elementType={"ul"}
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {pins.data && pins.data.length < pins.countPins
          ? pins.totalPins.map((pin) => <Pin key={pin._id} pin={pin} />)
          : pins.data &&
            pins.data.map((pin) => <Pin key={pin._id} pin={pin} />)}
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
