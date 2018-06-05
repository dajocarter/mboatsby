import React from "react";
import SignUpForm from "../components/forms/SignUp";
import FormPage from "../templates/page-form";

const SignUpPage = ({ location, signUp }) => {
  return (
    <FormPage form={() => <SignUpForm location={location} signUp={signUp} />} />
  );
};

export default SignUpPage;
