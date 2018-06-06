import React from "react";
import PropTypes from "prop-types";

import LoginForm from "../components/forms/Login";
import FormPage from "../templates/page-form";

const LoginPage = ({ location, signIn }) => {
  return (
    <FormPage form={() => <LoginForm location={location} signIn={signIn} />} />
  );
};

LoginPage.propTypes = {
  location: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired
};

export default LoginPage;
