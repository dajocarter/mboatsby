import React, { Component } from "react";
import PropTypes from "prop-types";
import { Radio } from "react-bootstrap";

export default class InputRadio extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false, validation: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState((prevState, props) => ({
      checked: !prevState.checked,
      validation: prevState.checked
        ? null
        : props.isCorrect ? `success` : `error`
    }));
  }

  render() {
    return (
      <Radio
        checked={this.state.checked}
        validationState={this.state.validation}
        name={this.props.name}
      >
        {this.props.label}
      </Radio>
    );
  }
}
