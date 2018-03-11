import React, { Component } from "react";
import { auth } from "../../firebase";
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

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null
};

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <FormTitle>My Brain on Anatomy</FormTitle>
        <FormControl.Static>
          Enter your email address and we'll send you an email with a link to
          reset your password.
        </FormControl.Static>
        <FormGroup controlId="email">
          <FormControl
            value={this.state.email}
            onChange={event =>
              this.setState(updateByPropertyName("email", event.target.value))
            }
            type="email"
            placeholder="Email Address"
          />
        </FormGroup>
        <Button bsStyle="primary" block disabled={isInvalid} type="submit">
          Reset Password
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}
      </Form>
    );
  }
}
