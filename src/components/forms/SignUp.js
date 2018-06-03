import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
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

const INITIAL_STATE = { email: "", password: "", error: null };

export default class SignUpForm extends Component {
  static contextTypes = { firebase: PropTypes.object.isRequired };

  static propTypes = {
    signUp: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = INITIAL_STATE;

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { signUp, history } = this.props;
    const { email, password } = this.state;

    event.preventDefault();

    return signUp(email, password)
      .then(() => {
        this.setState(INITIAL_STATE);
        history.goBack();
      })
      .catch(error => {
        console.error(error);
        // TODO: notify user of the error
      });
  };

  handleProvider = event => {
    const { signIn, history } = this.props;
    const provider = event.target.dataset.provider;
    return signIn(provider)
      .then(() => {
        history.goBack();
      })
      .catch(error => {
        console.log(error);
        // TODO: notify user of the error
      });
  };

  render() {
    const { email, password, error } = this.state;
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
        <FormGroup controlId="password">
          <FormControl
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button
          block
          bsStyle="success"
          type="submit"
          disabled={password === "" || email === ""}
        >
          Sign Up
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}

        <hr />

        <Button
          block
          bsStyle="primary"
          type="button"
          onClick={this.handleProvider}
          data-provider="facebook"
        >
          Continue with Facebook
        </Button>

        <Button
          block
          bsStyle="danger"
          type="button"
          onClick={this.handleProvider}
          data-provider="google"
        >
          Continue with Google
        </Button>

        <Button
          block
          bsStyle="info"
          type="button"
          onClick={this.handleProvider}
          data-provider="twitter"
        >
          Continue with Twitter
        </Button>

        <hr />

        <FormLinks>
          Already have an account? <Link to="/login/">Login</Link>
        </FormLinks>
        <FormLinks>
          Forgot your password? <Link to="/reset-password/">Reset it</Link>
        </FormLinks>
        <FormLinks>
          Want to change your password?{" "}
          <Link to="/change-password/">Change it</Link>
        </FormLinks>
      </Form>
    );
  }
}
