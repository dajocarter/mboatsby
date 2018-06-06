import React, { Component } from "react";
import { shape, arrayOf, number, string } from "prop-types";
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
  static propTypes = {
    inputIndex: number.isRequired,
    layoutIndex: number.isRequired,
    input: shape({
      label: string,
      answers: arrayOf(
        shape({
          possibility: string.isRequired
        })
      ).isRequired,
      hint: string
    })
  };

  state = {
    value: ``,
    validation: null,
    glyphicon: this.props.input.hint ? `question-sign` : ``,
    show: false
  };

  handleChange = event => {
    const { input } = this.props;

    const possibilities = input.answers.map(({ possibility }) =>
      possibility.toLowerCase()
    );
    const valueIsCorrect = possibilities.includes(
      event.target.value.toLowerCase()
    );
    const validation = valueIsCorrect ? `success` : `error`;
    const glyphicon = valueIsCorrect
      ? `ok-sign`
      : input.hint
        ? `question-sign`
        : `remove-sign`;

    this.setState({
      value: event.target.value,
      validation: validation,
      glyphicon: glyphicon
    });
  };

  handleClick = event => {
    this.setState({ target: event.target, show: !this.state.show });
  };

  render() {
    const { validation, value, glyphicon, show, target } = this.state;
    const {
      inputIndex,
      layoutIndex,
      layoutName,
      input: { label, answers, hint }
    } = this.props;

    return (
      <Form validationState={validation}>
        {label && (
          <ControlLabel htmlFor={`input-${layoutIndex}-${inputIndex}`}>
            {label}
          </ControlLabel>
        )}
        <InputGroup>
          <FormControl
            type={`text`}
            id={`input-${layoutIndex}-${inputIndex}`}
            value={value}
            onChange={this.handleChange}
          />
          <InputGroup.Addon>
            <Glyphicon
              glyph={glyphicon}
              onClick={hint ? this.handleClick : null}
            />
          </InputGroup.Addon>
        </InputGroup>
        {hint && (
          <Overlay
            show={show}
            target={target}
            placement={`top`}
            container={this}
            containerPadding={0}
          >
            <Popover
              id={`hint-${layoutIndex}-${inputIndex}`}
              title={label ? `Hint for ${label}` : `Hint`}
            >
              <div dangerouslySetInnerHTML={{ __html: hint }} />
            </Popover>
          </Overlay>
        )}
      </Form>
    );
  }
}
