import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { RootState } from "../reducers";
import { getAllPinsAsync, TPin } from "../actions";
import Pin from "./Pin";

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
      {/* <ul>{pins.data && pins.data.map((pin) => <li>{pin.imgLink}</li>)}</ul> */}
      <ul>
        {pins.data && pins.data.map((pin) => <Pin key={pin._id} pin={pin} />)}
      </ul>
    </div>
  );
}

export default Pins;
