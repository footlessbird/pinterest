import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import defaultImage from "../assets/defaultImage.png";
import { createPinAsync } from "../actions";
import { useToasts } from "react-toast-notifications";

function CreatePinModal({ openCreatePin, onClose }) {
  const dispatch = useDispatch();
  const [pinImg, setPinImg] = useState(defaultImage);
  const { register, watch, handleSubmit, errors } = useForm();
  const watchImg = watch("image", pinImg);
  const { addToast } = useToasts();

  const handleErrorImage = useCallback(() => {
    // console.log("handleErrorImage invoked");
    setPinImg(defaultImage);
  }, []);

  const onSubmit = useCallback(
    (data) => {
      const { image, description } = data;
      const pinData = { imgLink: image, imgDescription: description };

      if (pinImg === defaultImage) {
        pinData.imgLink = defaultImage;
      }

      dispatch(createPinAsync.request(pinData));
      addToast(`Created successfully 😎`, {
        appearance: "success",
        autoDismiss: true,
      });
      onClose();
    },
    [pinImg]
  );

  return (
    <div className="inner-container">
      <div className="local-login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="item image-preview">
            {/* <span className="create-modal-error">
              {errors.image && (
                <h6 className="form-error">{errors.image.message}</h6>
              )}
            </span> */}
            <img
              src={pinImg}
              alt="This is the preview of the pin."
              onError={handleErrorImage}
            />
          </div>
          <div className="item">
            <span className="create-modal-error">
              {errors.image && (
                <h6 className="form-error">{errors.image.message}</h6>
              )}
            </span>
            <input
              className="form-input"
              type="text"
              name="image"
              placeholder="http://www.image.com/photo.jpg"
              ref={register({
                required: "Please provide an image link.",
                pattern: {
                  value: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                  message: "Invalid url.",
                },
              })}
              onChange={() => setPinImg(watchImg)}
            />
            {/* {errors.email && (
              <h6 className="login-error">{errors.email.message}</h6>
            )} */}
          </div>
          <div className="item pin-description">
            <span className="create-modal-error">
              {errors.description && (
                <h6 className="form-error">{errors.description.message}</h6>
              )}
            </span>
            <textarea
              className="form-input"
              name="description"
              id="description"
              placeholder="Please share a story about this pin."
              ref={register({
                required: "Please provide a little story about this pin.",
                minLength: {
                  value: 5,
                  message: "This must be at least 5 characters.",
                },
              })}
            />
          </div>
          <div className="item">
            <button className="gen-btn" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePinModal;
