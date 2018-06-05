import React from "react";
import LoginForm from "../components/forms/Login";
import { Grid, Row, Col } from "react-bootstrap";

const LoginPage = ({ location, signIn }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <LoginForm location={location} signIn={signIn} />
        </Col>
      </Row>
    </Grid>
  );
};

export default LoginPage;
