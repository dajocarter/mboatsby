import React from "react";
import LoginForm from "../components/firebase/Login";
import { Grid, Row, Col } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <LoginForm />
        </Col>
      </Row>
    </Grid>
  );
};

export default LoginPage;
