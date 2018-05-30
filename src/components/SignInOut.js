import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const SignIn = ({ onClick, text }) => <Button onClick={onClick}>{text}</Button>;

SignIn.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default SignIn;
