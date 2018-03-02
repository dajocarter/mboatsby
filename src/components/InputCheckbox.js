import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "react-bootstrap";

export default class InputCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      validation: null
    };
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
      <Checkbox
        checked={this.state.checked}
        validationState={this.state.validation}
        onChange={this.handleChange}
      >
        {this.props.label}
      </Checkbox>
    );
  }
}
