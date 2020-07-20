// import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development"
    ? compose(
        applyMiddleware(sagaMiddleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      )
    : compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
