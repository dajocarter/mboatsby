import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { columnClasses } from "../../utils/helpers";
import InputForm from "../InputForm";

const CheckYourAnswer = props => (
  <Row id={`layout-${props.layoutIndex}`} className={props.layoutName}>
    {props.acf.inputs &&
      props.acf.inputs.map((input, index) => (
        <Col key={index} sm={columnClasses(index, props.acf.inputs.length)}>
          <InputForm
            input={input}
            inputIndex={index}
            layoutIndex={props.layoutIndex}
          />
        </Col>
      ))}
  </Row>
);

export default CheckYourAnswer;

CheckYourAnswer.propTypes = {};
