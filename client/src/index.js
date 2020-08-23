import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { Route, HashRouter } from "react-router-dom";
import thunk from "redux-thunk";
//import PrivateRoute from "./utils/privateRoute";
import Login from "./components/login"
import Dashboard from "./components/dashboard"
import rootReducer from "./reducers/index";
import App from "./App";
import Alert from "./components/alert"
import Report from "./components/report";
//import {sessionService} from "redux-react-session"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <App/>
    <Alert/>
    <HashRouter>
       <Route exact path="/dashboard" component={Dashboard} />
       <Route exact path="/report" component={Report} />
      <Route exact path="/" component={Login} />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
