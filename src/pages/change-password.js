import React from "react";
import SignUpForm from "../components/forms/SignUp";
import { Grid, Row, Col } from "react-bootstrap";

const ChangePasswordPage = ({ location, signUp, signIn }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <SignUpForm location={location} signUp={signUp} signIn={signIn} />
        </Col>
      </Row>
    </Grid>
  );
};

export default ChangePasswordPage;
