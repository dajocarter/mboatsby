import React from "react";
import PropTypes from "prop-types";

import SignUpForm from "../components/forms/SignUp";
import FormPage from "../templates/page-form";

const SignUpPage = ({ location, signUp }) => {
  return (
    <FormPage form={() => <SignUpForm location={location} signUp={signUp} />} />
  );
};

SignUpPage.propTypes = {
  location: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired
};

export default SignUpPage;
