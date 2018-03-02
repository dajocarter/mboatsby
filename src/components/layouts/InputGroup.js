import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Checkbox, Radio } from "react-bootstrap";
import InputCheckbox from "../InputCheckbox";
import InputRadio from "../InputRadio";

const InputGroup = props => (
  <Row id={`layout-${props.layoutIndex}`}>
    <Col xs={12}>
      {(() => {
        switch (props.acf.input_type) {
          case "checkbox":
            return (() =>
              props.acf.options.map((option, index) => (
                <InputCheckbox
                  key={index}
                  isCorrect={option.is_correct}
                  label={option.text}
                />
              )))();
            break;
          case "radio":
            return (() =>
              props.acf.options.map((option, index) => (
                <InputRadio
                  key={index}
                  isCorrect={option.is_correct}
                  label={option.text}
                  name={`layout-${props.layoutIndex}`}
                />
              )))();
            break;
        }
      })()}
    </Col>
  </Row>
);

export default InputGroup;

InputGroup.propTypes = {};
