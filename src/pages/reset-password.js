import React from "react";
import PropTypes from "prop-types";

import ResetPasswordForm from "../components/forms/ResetPassword";
import FormPage from "../templates/page-form";

const ResetPasswordPage = ({ resetPassword }) => {
  return (
    <FormPage
      form={() => <ResetPasswordForm resetPassword={resetPassword} />}
    />
  );
};

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired
};

export default ResetPasswordPage;
