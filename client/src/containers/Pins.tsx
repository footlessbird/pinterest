import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { RootState } from "../reducers";
import { getAllPinsAsync, TPin } from "../actions";
import Pin from "./Pin";
import Masonry from "react-masonry-component";
import Modal from "react-modal";
import { useModal } from "../utils/useModal";
import CreatePinModal from "../components/CreatePinModal";

function Pins({ auth }) {
  const { isLoading, isAuthenticated, user } = auth;

  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pins);
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

  useEffect(() => {
    dispatch(getAllPinsAsync.request(""));
  }, []);
  console.log("pin data??", pins.data);
  console.log("what is type of pins.data??", typeof pins.data);

  return (
    <div className="pins">
      <Masonry
        className="pins-container"
        elementType={"ul"}
        options={masonryOptions}
      >
        {pins.data && pins.data.map((pin) => <Pin key={pin._id} pin={pin} />)}
      </Masonry>
      {isAuthenticated ? (
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
            <CreatePinModal openCreatePin={handleOpenModal} />
          </Modal>
        </div>
      ) : null}
    </div>
  );
}

export default Pins;
