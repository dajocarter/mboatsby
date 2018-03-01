import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CheckYourAnswer extends Component {
  render() {
    return (
      <section className={`layout-${this.props.layoutIndex}`}>
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
      </section>
    );
  }
}

CheckYourAnswer.propTypes = {};
