import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { RootState } from "../reducers";
import { getAllPinsAsync } from "../actions";
import { link } from "fs";

function Pins() {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pins);

  useEffect(() => {
    dispatch(getAllPinsAsync.request(""));
  }, []);
  console.log("pin data??", pins.data);
  console.log("what is type of pins.data??", typeof pins.data);

  return (
    <div>
      <h1>Pins</h1>
      <ul>{pins.data && pins.data.map((pin) => <li>{pin.imgLink}</li>)}</ul>
    </div>
  );
}

export default Pins;
