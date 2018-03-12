import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import withAuthorization from "../components/firebase/withAuthorization";
import { firebase } from "../utils/firebase";

class MyAccount extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>My Account</h1>
          </Col>
        </Row>
      </Grid>
    );
  }
}

MyAccount.contextTypes = {
  currentUser: PropTypes.object
};

const authCondition = currentUser => !!currentUser;

export default withAuthorization(authCondition)(MyAccount);
