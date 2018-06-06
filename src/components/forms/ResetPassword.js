import React, { Component } from "react";
import { func } from "prop-types";
import Link, { navigateTo } from "gatsby-link";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";

const Form = styled.form`
  background: #e0e0e0;
  margin: 6rem 0;
  padding: 2rem;
`;

const FormTitle = styled.h1`
  margin-top: 0;
  text-align: center;
`;

const FormLinks = styled(FormControl.Static)`
  text-align: center;
  && {
    padding: 1.5rem 0 0;
  }
`;

const INITIAL_STATE = { email: "", error: null };

export default class ResetPasswordForm extends Component {
  static propTypes = {
    resetPassword: func.isRequired
  };

  state = INITIAL_STATE;

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { resetPassword } = this.props;
    const { email } = this.state;

    event.preventDefault();

    return resetPassword(email).then(() => {
      this.setState(INITIAL_STATE);
      navigateTo(`/login/`);
    });
  };

  render() {
    const { email, error } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormTitle>My Brain on Anatomy</FormTitle>
        <FormGroup controlId="email">
          <FormControl
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button block bsStyle="success" type="submit" disabled={email === ""}>
          Reset Password
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}

        <FormLinks>
          Remembered your password? <Link to="/login/">Login</Link>
        </FormLinks>
        <FormLinks>
          Want to change your password?{" "}
          <Link to="/change-password/">Change it</Link>
        </FormLinks>
      </Form>
    );
  }
}
