import React from "react";
import SignupForm from "../components/forms/SignUp";
import { Grid, Row, Col } from "react-bootstrap";

const SignupPage = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <SignupForm />
        </Col>
      </Row>
    </Grid>
  );
};

export default SignupPage;
