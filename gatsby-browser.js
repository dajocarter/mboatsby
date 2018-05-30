import React from "react";
import { Router } from "react-router-dom";
import FirebaseProvider from "./src/containers/FirebaseProvider";
import firebase from "./src/utils/firebase";

exports.replaceRouterComponent = ({ history }) => {
  const ConnectedRouterWrapper = ({ children }) => (
    <FirebaseProvider firebase={firebase}>
      <Router history={history}>{children}</Router>
    </FirebaseProvider>
  );
  return ConnectedRouterWrapper;
};