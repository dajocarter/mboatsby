import React, { Component } from "react";
import { bool, string } from "prop-types";
import { Radio } from "react-bootstrap";

export default class InputRadio extends Component {
  static propTypes = {
    isCorrect: bool.isRequired,
    name: string.isRequired,
    label: string.isRequired
  };

  state = { checked: false, validation: null };

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
    const { name, label } = this.props;

    return (
      <Radio
        checked={checked}
        validationState={validation}
        onChange={this.handleChange}
        name={name}
      >
        {label}
      </Radio>
    );
  }
}
