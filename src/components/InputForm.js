import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  ControlLabel,
  InputGroup,
  FormControl,
  Glyphicon
} from "react-bootstrap";

export default class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ``,
      validation: null,
      glyphicon: props.input.hint ? `question-sign` : ``
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const possibilities = this.props.input.answers.map(({ possibility }) =>
      possibility.toLowerCase()
    );
    const valueIsCorrect = possibilities.includes(
      event.target.value.toLowerCase()
    );
    const validation = valueIsCorrect ? `success` : `error`;
    const glyphicon = valueIsCorrect
      ? `ok-sign`
      : this.props.input.hint ? `question-sign` : `remove-sign`;
    this.setState({
      value: event.target.value,
      validation: validation,
      glyphicon: glyphicon
    });
  }

  render() {
    return (
      <FormGroup validationState={this.state.validation}>
        <ControlLabel
          htmlFor={`input-${this.props.layoutIndex}-${this.props.inputIndex}`}
        >
          {this.props.input.label}
        </ControlLabel>
        <InputGroup>
          <FormControl
            type={`text`}
            id={`input-${this.props.layoutIndex}-${this.props.inputIndex}`}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <InputGroup.Addon>
            <Glyphicon glyph={this.state.glyphicon} />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    );
  }
}
