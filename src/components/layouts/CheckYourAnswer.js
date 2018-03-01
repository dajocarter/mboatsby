import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";

export default class CheckYourAnswer extends Component {
  render() {
    return (
      <Row id={`layout-${this.props.layoutIndex}`}>
        {this.props.acf.inputs &&
          this.props.acf.inputs.map((input, index) => (
            <div key={index} className="form-group">
              <label htmlFor={`input-${this.props.layoutIndex}-${index}`}>
                <strong>{input.label}</strong>
              </label>
              <input
                type="text"
                id={`input-${this.props.layoutIndex}-${index}`}
              />
            </div>
          ))}
      </Row>
    );
  }
}

CheckYourAnswer.propTypes = {};
