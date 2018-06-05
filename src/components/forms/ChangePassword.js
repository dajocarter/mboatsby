import React, { Component } from "react";
import PropTypes from "prop-types";
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

const INITIAL_STATE = { password: "", error: null };

export default class ChangePasswordForm extends Component {
  static propTypes = {
    changePassword: PropTypes.func.isRequired
  };

  state = INITIAL_STATE;

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { changePassword } = this.props;
    const { password } = this.state;

    event.preventDefault();

    return changePassword(password).then(() => {
      this.setState(INITIAL_STATE);
      navigateTo(`/login/`);
    });
  };

  render() {
    const { password, error } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormTitle>My Brain on Anatomy</FormTitle>
        <FormGroup controlId="password">
          <FormControl
            type="password"
            placeholder="New Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button
          block
          bsStyle="success"
          type="submit"
          disabled={password === ""}
        >
          Change Password
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}

        <FormLinks>
          Want to keep your password? <Link to="/login/">Login</Link>
        </FormLinks>
        <FormLinks>
          Forgot your password? <Link to="/reset-password/">Reset it</Link>
        </FormLinks>
      </Form>
    );
  }
}
