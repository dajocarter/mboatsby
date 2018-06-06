import React from "react";
import { shape, arrayOf, number, string, object } from "prop-types";
import { Row, Col } from "react-bootstrap";
import { columnClasses } from "../../utils/helpers";
import InputForm from "../InputForm";

const CheckYourAnswer = ({ layoutIndex, layoutName, acf: { inputs } }) => (
  <Row id={`layout-${layoutIndex}`} className={layoutName}>
    {inputs &&
      inputs.map((input, index) => (
        <Col key={index} xs={12} sm={columnClasses(index, inputs.length)}>
          <InputForm
            input={input}
            inputIndex={index}
            layoutIndex={layoutIndex}
          />
        </Col>
      ))}
  </Row>
);

CheckYourAnswer.propTypes = {
  layoutIndex: number.isRequired,
  layoutName: string.isRequired,
  acf: shape({
    inputs: arrayOf(object.isRequired)
  })
};

export default CheckYourAnswer;

CheckYourAnswer.propTypes = {};
