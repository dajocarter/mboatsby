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

export default class ChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { displayName: "", phoneNumber: "", error: null };

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
    const { displayName, phoneNumber } = this.state;
    firebase
      .auth()
      .currentUser.updateProfile({ displayName, phoneNumber })
      .then(() => {
        this.setState({
          displayName: "",
          phoneNumber: "",
          error: null
        });
      })
      .catch(error => this.setState({ error: error }));

    event.preventDefault();
  }

  render() {
    const { displayName, phoneNumber, error } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormTitle>Edit Profile</FormTitle>

        <FormGroup controlId="displayName">
          <FormControl
            type="text"
            placeholder="Full Name"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="phoneNumber">
          <FormControl
            type="text"
            placeholder="(555) 555-5555"
            name="phoneNumber"
            value={phoneNumber}
            onChange={this.handleChange}
          />
        </FormGroup>

        <Button
          block
          bsStyle="primary"
          type="submit"
          disabled={displayName === "" && phoneNumber === ""}
        >
          Update Profile
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}
      </Form>
    );
  }
}
