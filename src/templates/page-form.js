import React from "react";
import { func } from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";

const FormPage = ({ form }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          {form()}
        </Col>
      </Row>
    </Grid>
  );
};

FormPage.propTypes = {
  form: func.isRequired
};

export default FormPage;
