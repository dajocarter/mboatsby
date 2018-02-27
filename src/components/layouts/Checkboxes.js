import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Checkboxes extends Component {
  render() {
    return (
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: this.props.acf.question }} />
    );
  }
}

Checkboxes.propTypes = {
  acf: PropTypes.shape({
    question: PropTypes.string
  })
};
