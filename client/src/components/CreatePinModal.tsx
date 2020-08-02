import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import defaultImage from "../assets/defaultImage.png";
import { createPinAsync } from "../actions";

function CreatePinModal({ openCreatePin, onClose }) {
  // const DEFAULT_IMAGE =
  //   "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png";

  const dispatch = useDispatch();
  const [pinImg, setPinImg] = useState(defaultImage);
  // const [pinImg, setPinImg] = useState(DEFAULT_IMAGE);
  // const [pinImg, setPinImg] = useState(
  //   "https://images.pexels.com/photos/3373303/pexels-photo-3373303.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  // );
  const { register, watch, handleSubmit, errors } = useForm();
  // const watchImg = watch("image", "");
  const watchImg = watch("image", pinImg);

  // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything

  const handleErrorImage = () => {
    console.log("handleErrorImage invoked");
    setPinImg(defaultImage);
    // setPinImg(DEFAULT_IMAGE);
  };

  const onSubmit = (data) => {
    // const { email, password } = data;
    // console.log(email, password);
    // dispatch({ type: REGISTER_USER_REQUEST, data: { email, password } });
    const { image, description } = data;
    const pinData = { imgLink: image, imgDescription: description };
    // if (pinImg === DEFAULT_IMAGE) {
    //   pinData.imgLink = DEFAULT_IMAGE;
    // }

    if (pinImg === defaultImage) {
      pinData.imgLink = defaultImage;
    }

    // dispatch(createPinAsync.request(data));
    dispatch(createPinAsync.request(pinData));
    onClose();
  };
  console.log("pinImg??", pinImg);
  return (
    <div className="inner-container">
      <div className="local-login">
        {/* <div className="item">
          <h2>New pin</h2>
        </div> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="item image-preview">
            <img
              src={pinImg}
              alt="This is the preview of the pin."
              onError={handleErrorImage}
            />
          </div>
          <div className="item">
            {/* <label>Email</label> */}
            <input
              type="text"
              name="image"
              placeholder="http://www.image.com/photo.jpg"
              ref={register({
                required: "Please provide an image link.",
                // pattern: {
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   message: "Invalid email.",
                // },
              })}
              onChange={() => setPinImg(watchImg)}
            />
            {/* {errors.email && (
              <h6 className="login-error">{errors.email.message}</h6>
            )} */}
          </div>
          <div className="item pin-description">
            {/* <label>Password</label> */}
            {/* <input
              type="password"
              placeholder="Create a password"
              name="password"
              ref={register({
                required: "Please enter your password.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <h6 className="login-error">{errors.password.message}</h6>
            )} */}
            <textarea
              name="description"
              id="description"
              placeholder="Please share a story about this pin."
              ref={register({
                required: "Please provide a little story about this pin.",
                // pattern: {
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   message: "Invalid email.",
                // },
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
