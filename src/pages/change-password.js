import React from "react";
import ChangePwForm from "../components/firebase/ChangePassword";
import { Grid, Row, Col } from "react-bootstrap";

const ChangePasswordPage = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <ChangePwForm />
        </Col>
      </Row>
    </Grid>
  );
};

export default ChangePasswordPage;
