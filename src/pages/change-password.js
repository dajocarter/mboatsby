import React from "react";
import ChangePasswordForm from "../components/forms/ChangePassword";
import FormPage from "../templates/page-form";

const ChangePasswordPage = ({ changePassword }) => {
  return (
    <FormPage
      form={() => <ChangePasswordForm changePassword={changePassword} />}
    />
  );
};

export default ChangePasswordPage;
