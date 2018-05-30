import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FirebaseProvider extends Component {
  static propTypes = {
    children: PropTypes.element,
    firebase: PropTypes.object.isRequired
  };

  static childContextTypes = {
    firebase: PropTypes.object
  };

  getChildContext() {
    const { firebase } = this.props;
    return { firebase };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
