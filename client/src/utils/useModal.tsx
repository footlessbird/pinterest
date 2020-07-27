import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState({
    loginModal: false,
    signupModal: false,
    createModal: false,
  });
  // console.log("useModal", showModal.loginModal);
  const handleOpenModal = (type) => {
    if (type === "login") {
      setShowModal({
        ...showModal,
        loginModal: true,
        signupModal: false,
        createModal: false,
      });
    } else if (type === "signup") {
      setShowModal({
        ...showModal,
        loginModal: false,
        signupModal: true,
        createModal: false,
      });
    } else if (type === "create") {
      setShowModal({
        ...showModal,
        loginModal: false,
        signupModal: false,
        createModal: true,
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal({
      ...showModal,
      loginModal: false,
      signupModal: false,
      createModal: false,
    });
    // if (type === "login") {
    //   setShowModal({ ...showModal, loginModal: false });
    // } else if (type === "signup") {
    //   setShowModal({ ...showModal, signupModal: false });
    // }
  };

  return {
    showModal,
    setShowModal,
    handleOpenModal,
    handleCloseModal,
  };
};
