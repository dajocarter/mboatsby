import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";

export default class Checkboxes extends Component {
  render() {
    return (
      <Row id={`layout-${this.props.layoutIndex}`}>
        {this.props.acf.options &&
          this.props.acf.options.map((option, index) => (
            <label key={index} htmlFor={`option-${index}`}>
              <input
                type={this.props.acf.input_type}
                id={`option-${index}`}
                name={`${this.props.acf.input_type}-group-${
                  this.props.layoutIndex
                }`}
              />
              {option.text}
            </label>
          ))}
      </Row>
    );
  }
}

Checkboxes.propTypes = {};
