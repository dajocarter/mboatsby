import React from "react";
import { func } from "prop-types";

import ChangePasswordForm from "../components/forms/ChangePassword";
import FormPage from "../templates/page-form";

const ChangePasswordPage = ({ changePassword }) => {
  return (
    <FormPage
      form={() => <ChangePasswordForm changePassword={changePassword} />}
    />
  );
};

ChangePasswordPage.propTypes = {
  changePassword: func.isRequired
};

export default ChangePasswordPage;
