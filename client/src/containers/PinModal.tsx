import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { LOCAL_LOGIN_REQUEST, RESET_LOGIN } from "../actions";
import { useToasts } from "react-toast-notifications";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { RootState } from "../reducers";
import { removeError } from "../actions/index";

function PinModal({ pin }) {
  const auth = useSelector((state: RootState) => state.auth);
  const authError = useSelector((state: RootState) => state.error);

  const {
    localLoginLoading,
    localLoginUser,
    localLoginDone,
    localLoginError,
    githubLoginLoading,
    githubLoginUser,
    githubLoginDone,
    githubLoginError,
    currentUser,
  } = auth;

  const { user, imgLink, imgDescription, savedBy } = pin;

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  /*
  useEffect(() => {
    dispatch(removeError()); // 모달이 열릴 때 이전 오류 메세지 초기화해서 보이지 않도록
    // dispatch({ type: RESET_LOGIN });
    // if (localStorage.getItem("token")) {
    if (localLoginDone || githubLoginDone) {
      addToast(`Logged in successfully 💃🏼`, {
        appearance: "success",
        autoDismiss: true,
      });
      onClose();
    } else {
      return;
    }
    // }, [isLoggedin]);
  }, [localLoginDone]);

  useEffect(() => {}, [githubLoginDone]);
*/

  return (
    <div className="pin-modal-container">
      <LazyLoadImage
        className="pin-modal-image"
        alt={imgDescription}
        effect="blur"
        src={imgLink}
      />
      {currentUser ? (
        <span>
          <button className="pin-modal-btn">Save</button>
        </span>
      ) : null}
    </div>
  );
}

export default PinModal;
