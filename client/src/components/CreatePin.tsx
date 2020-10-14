import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { createPinAsync } from "../actions";

function CreatePin() {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    imgLink: "",
    imgDescription: "",
  });

  const { imgLink, imgDescription } = values;

  const handleChange = useCallback(
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    [values]
  );

  const handleSubmit = useCallback((e) => {
    if (imgLink === "" || imgDescription === "") {
      alert("You must enter all fields.");
      return;
    }
    e.preventDefault();
    dispatch(createPinAsync.request(values));
  }, []);

  return (
    <div>
      {/* <form onSubmit={() => dispatch(loginUserAsync.request(values))}> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please enter image link"
          value={imgLink}
          name="imgLink"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="What is this image about?"
          value={imgDescription}
          name="imgDescription"
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePin;
