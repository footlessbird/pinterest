import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { LOCAL_LOGIN_REQUEST, RESET_LOGIN } from "../actions";
import { useToasts } from "react-toast-notifications";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { RootState } from "../reducers";

import PinButton from "../components/PinButton";

function PinModal({ pin, onClose }) {
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

  return (
    <div className="pin-modal-container">
      <LazyLoadImage
        className="pin-modal-image"
        alt={imgDescription}
        effect="blur"
        src={imgLink}
      />
      {/* {currentUser ? (
        <span>
          <button className="pin-modal-btn">Save</button>
        </span>
      ) : null} */}
      <span>
        <PinButton
          pinId={pin._id}
          userId={user._id}
          savedBy={savedBy}
          modal={true}
          onClose={onClose}
        />
      </span>
    </div>
  );
}

export default memo(PinModal);
