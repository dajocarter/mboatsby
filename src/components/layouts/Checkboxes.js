import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Checkboxes extends Component {
  render() {
    return (
      <section className={`layout-${this.props.layoutIndex}`}>
        {this.props.acf.options &&
          this.props.acf.options.map((option, index) => (
            <label htmlFor={`option-${index}`}>
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
      </section>
    );
  }
}

Checkboxes.propTypes = {};
