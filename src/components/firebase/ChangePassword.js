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
  password: "",
  passwordConfirmation: "",
  error: null
};

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { password } = this.state;

    auth
      .doPasswordUpdate(password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { password, passwordConfirmation, error } = this.state;

    const isInvalid = password !== passwordConfirmation || password === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <FormTitle>My Brain on Anatomy</FormTitle>
        <FormGroup controlId="password">
          <FormControl
            value={password}
            onChange={event =>
              this.setState(
                updateByPropertyName("password", event.target.value)
              )
            }
            type="password"
            placeholder="New Password"
          />
        </FormGroup>
        <FormGroup controlId="passwordConfirmation">
          <FormControl
            value={passwordConfirmation}
            onChange={event =>
              this.setState(
                updateByPropertyName("passwordConfirmation", event.target.value)
              )
            }
            type="password"
            placeholder="Confirm New Password"
          />
        </FormGroup>
        <Button bsStyle="primary" block disabled={isInvalid} type="submit">
          Change Password
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}
      </Form>
    );
  }
}
