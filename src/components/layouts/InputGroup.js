import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Checkbox, Radio } from "react-bootstrap";
import InputCheckbox from "../InputCheckbox";
import InputRadio from "../InputRadio";

export default class InputGroup extends Component {
  renderInputs() {
    switch (this.props.acf.input_type) {
      case "checkbox":
        return this.renderCheckboxes();
        break;
      case "radio":
        return this.renderRadios();
        break;
    }
  }
  renderCheckboxes = () =>
    this.props.acf.options.map((option, index) => (
      <InputCheckbox
        key={index}
        isCorrect={option.is_correct}
        label={option.text}
      />
    ));
  renderRadios = () =>
    this.props.acf.options.map((option, index) => (
      <InputRadio
        key={index}
        isCorrect={option.is_correct}
        label={option.text}
        name={`layout-${this.props.layoutIndex}`}
      />
    ));
  render() {
    return (
      <Row id={`layout-${this.props.layoutIndex}`}>
        <Col xs={12}>{this.renderInputs()}</Col>
      </Row>
    );
  }
}

InputGroup.propTypes = {};
