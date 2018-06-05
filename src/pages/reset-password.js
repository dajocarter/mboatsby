import React from "react";
import ResetPasswordForm from "../components/forms/ResetPassword";
import { Grid, Row, Col } from "react-bootstrap";

const ResetPasswordPage = ({ resetPassword }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <ResetPasswordForm resetPassword={resetPassword} />
        </Col>
      </Row>
    </Grid>
  );
};

export default ResetPasswordPage;
