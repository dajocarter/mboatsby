import React, { Component } from "react";
import { bool, string } from "prop-types";
import { Checkbox } from "react-bootstrap";

export default class InputCheckbox extends Component {
  static propTypes = {
    isCorrect: bool.isRequired,
    label: string.isRequired
  };

  state = {
    checked: false,
    validation: null
  };

  handleChange = () => {
    this.setState((prevState, props) => ({
      checked: !prevState.checked,
      validation: prevState.checked
        ? null
        : props.isCorrect
          ? `success`
          : `error`
    }));
  };

  render() {
    const { checked, validation } = this.state;
    const { label } = this.props;

    return (
      <Checkbox
        checked={checked}
        validationState={validation}
        onChange={this.handleChange}
      >
        {label}
      </Checkbox>
    );
  }
}
