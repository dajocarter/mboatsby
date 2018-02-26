import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CheckYourAnswer extends Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.props.acf.context }} />;
  }
}

CheckYourAnswer.propTypes = {
  acf: PropTypes.shape({
    context: PropTypes.string
  })
};
