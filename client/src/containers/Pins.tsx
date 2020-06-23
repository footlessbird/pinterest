import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { RootState } from "../reducers";
import { getAllPinsAsync } from "../actions";

function Pins() {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pins);

  useEffect(() => {
    dispatch(getAllPinsAsync.request(""));
  }, []);
  console.log("pins??", pins);

  return (
    <div>
      <h1>Pins</h1>
    </div>
  );
}

export default Pins;
