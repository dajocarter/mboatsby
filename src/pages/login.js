import React from "react";
import LoginForm from "../components/forms/Login";
import FormPage from "../templates/page-form";

const LoginPage = ({ location, signIn }) => {
  return (
    <FormPage form={() => <LoginForm location={location} signIn={signIn} />} />
  );
};

export default LoginPage;
