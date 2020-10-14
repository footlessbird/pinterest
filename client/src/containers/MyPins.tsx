import React, { memo, useEffect, useMemo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import Masonry from "react-masonry-component";

import { RootState } from "../reducers";
import { getMyPinsAsync } from "../actions";
import Pin from "./Pin";

function MyPins() {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pins, shallowEqual);
  useEffect(() => {
    dispatch(getMyPinsAsync.request(""));
  }, []);
  console.log("MyPins??", pins);

  const masonryOptions = {
    transitionDuration: 0,
    fitWidth: true, // center masonry
  };
  return (
    <div>
      <Masonry
        className="pins-container"
        elementType={"ul"}
        options={masonryOptions}
      >
        {pins.data && pins.data.map((pin) => <Pin pin={pin} key={pin._id} />)}
      </Masonry>
    </div>
  );
}

export default memo(MyPins);
