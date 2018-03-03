import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  FormGroup,
  ControlLabel,
  InputGroup,
  FormControl,
  Glyphicon,
  Overlay,
  Popover
} from "react-bootstrap";

const Form = styled(FormGroup)`
  max-width: 589px;
  margin-left: auto;
  margin-right: auto;
`;

export default class InputForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: ``,
      validation: null,
      glyphicon: props.input.hint ? `question-sign` : ``,
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(event) {
    this.setState({ target: event.target, show: !this.state.show });
  }

  render() {
    return (
      <Form validationState={this.state.validation}>
        {this.props.input.label && (
          <ControlLabel
            htmlFor={`input-${this.props.layoutIndex}-${this.props.inputIndex}`}
          >
            {this.props.input.label}
          </ControlLabel>
        )}
        <InputGroup>
          <FormControl
            type={`text`}
            id={`input-${this.props.layoutIndex}-${this.props.inputIndex}`}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <InputGroup.Addon>
            <Glyphicon
              glyph={this.state.glyphicon}
              onClick={this.props.input.hint ? this.handleClick : null}
            />
          </InputGroup.Addon>
        </InputGroup>
        {this.props.input.hint && (
          <Overlay
            show={this.state.show}
            target={this.state.target}
            placement={`top`}
            container={this}
            containerPadding={0}
          >
            <Popover
              id={`hint-${this.props.layoutIndex}-${this.props.inputIndex}`}
              title={
                this.props.input.label
                  ? `Hint for ${this.props.input.label}`
                  : `Hint`
              }
            >
              <div
                dangerouslySetInnerHTML={{ __html: this.props.input.hint }}
              />
            </Popover>
          </Overlay>
        )}
      </Form>
    );
  }
}
