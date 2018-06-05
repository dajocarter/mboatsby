import React from "react";
import ChangePasswordForm from "../components/forms/ChangePassword";
import { Grid, Row, Col } from "react-bootstrap";

const ChangePasswordPage = ({ changePassword }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <ChangePasswordForm changePassword={changePassword} />
        </Col>
      </Row>
    </Grid>
  );
};

export default ChangePasswordPage;
