import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState({
    loginModal: false,
    signupModal: false,
  });
  // console.log("useModal", showModal.loginModal);
  const handleOpenModal = (loginOrSignup) => {
    if (loginOrSignup === "login") {
      // setShowModal(true);
      setShowModal({ ...showModal, loginModal: true, signupModal: false });
    } else {
      setShowModal({ ...showModal, loginModal: false, signupModal: true });
    }
  };

  const handleCloseModal = () => {
    setShowModal({ ...showModal, loginModal: false, signupModal: false });
  };

  return {
    showModal,
    handleOpenModal,
    handleCloseModal,
  };
};
