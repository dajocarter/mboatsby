import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";

const DefaultPage = ({ content }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>{content()}</Col>
      </Row>
    </Grid>
  );
};

DefaultPage.propTypes = {
  content: PropTypes.func.isRequired
};

export default DefaultPage;
