import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAsync } from "../actions";

import LoginTestForm from "../components/LoginTestForm";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserAsync.request());
    console.log(user);
  }, []);
  return (
    <div>
      <LoginTestForm />
    </div>
  );
}

export default App;
