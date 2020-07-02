import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePinAsync } from "../actions";
import { RootState } from "../reducers";

function Pin({ pin }) {
  const dispatch = useDispatch();
  console.log("pinId from Pin", pin);
  // const auth = useSelector((state: RootState) => state.auth);
  // const loggedInUserId = auth.user && auth.user._id;
  // console.log("loggedInUserId??", loggedInUserId);
  const { user, imgLink, imgDescription, savedBy } = pin;
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  // console.log('pinId from Pin' )
  const handleSave = (e) => {
    console.log("handleSave");
    e.preventDefault();
    dispatch(savePinAsync.request(pin._id));
  };

  console.log("user._id", user._id);
  console.log("loggeInUserId", loggedInUserId);
  console.log("typeof loggeInUserId", typeof loggedInUserId);
  const pinButton = () => {
    if (loggedInUserId) {
      if (
        user._id === loggedInUserId ||
        (savedBy && Object.keys(savedBy).includes(loggedInUserId))
        // 남의 핀 세이브 or 내가 생성한 핀
      ) {
        return <button onClick={() => console.log("Remove")}>Remove</button>;
      } else {
        return <button onClick={handleSave}>Save</button>;
      }
    }
  };

  return (
    <li>
      <img src={imgLink} alt={imgDescription} />
      <div>{user.username}</div>

      {pinButton()}
    </li>
  );
}

export default Pin;
