import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../reducers";
import { getMyPinsAsync } from "../actions";

function MyPins() {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pins);
  useEffect(() => {
    dispatch(getMyPinsAsync.request(""));
  }, []);
  console.log("MyPins??", pins);

  return (
    <div>
      My Pins
      <ul>{pins.data && pins.data.map((pin) => <li>{pin.imgLink}</li>)}</ul>
    </div>
  );
}

export default MyPins;
