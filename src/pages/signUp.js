import React from "react";
import SignUpForm from "../components/forms/SignUp";
import { Grid, Row, Col } from "react-bootstrap";

const SignUpPage = ({ location, signUp }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <SignUpForm location={location} signUp={signUp} />
        </Col>
      </Row>
    </Grid>
  );
};

export default SignUpPage;
