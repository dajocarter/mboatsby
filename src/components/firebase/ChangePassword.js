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

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", passwordConfirmation: "", error: null };

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
      .currentUser.updatePassword(this.state.password)
      .then(() => {
        this.setState({
          password: "",
          passwordConfirmation: "",
          error: null
        });
      })
      .catch(error => this.setState({ error: error }));

    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormTitle>My Brain on Anatomy</FormTitle>

        <FormGroup controlId="password">
          <FormControl
            type="password"
            placeholder="New Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="passwordConfirmation">
          <FormControl
            type="password"
            placeholder="Confirm New Password"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
          />
        </FormGroup>

        <Button
          block
          bsStyle="primary"
          type="submit"
          disabled={
            this.state.password !== this.state.passwordConfirmation ||
            this.state.password === ""
          }
        >
          Change Password
        </Button>

        {this.state.error && (
          <FormControl.Static>{this.state.error.message}</FormControl.Static>
        )}
      </Form>
    );
  }
}
