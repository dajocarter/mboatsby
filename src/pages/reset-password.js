import React from "react";
import ResetPwForm from "../components/firebase/ResetPassword";
import { Grid, Row, Col } from "react-bootstrap";

const ResetPasswordPage = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <ResetPwForm />
        </Col>
      </Row>
    </Grid>
  );
};

export default ResetPasswordPage;
