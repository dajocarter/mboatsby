import React, { Component } from "react";
import { firebase } from "../../utils/firebase";
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

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", error: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({ email: "", error: null });
      })
      .catch(error => this.setState({ error: error }));

    event.preventDefault();
  }

  render() {
    const { email, error } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormTitle>My Brain on Anatomy</FormTitle>
        <FormControl.Static>
          Enter your email address and we'll send you an email with a link to
          reset your password.
        </FormControl.Static>
        <FormGroup controlId="email">
          <FormControl
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button block bsStyle="primary" type="submit" disabled={email === ""}>
          Reset Password
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}
      </Form>
    );
  }
}
