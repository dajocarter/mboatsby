import React from "react";
import ResetPasswordForm from "../components/forms/ResetPassword";
import FormPage from "../templates/page-form";

const ResetPasswordPage = ({ resetPassword }) => {
  return (
    <FormPage
      form={() => <ResetPasswordForm resetPassword={resetPassword} />}
    />
  );
};

export default ResetPasswordPage;
