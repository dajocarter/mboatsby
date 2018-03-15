import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { firebase } from "../../utils/firebase";
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

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      error: null
    };

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
    const { email, password } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          email: "",
          password: "",
          passwordConfirmation: "",
          error: null
        });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ error: error }));

    event.preventDefault();
  }

  render() {
    const { email, password, passwordConfirmation, error } = this.state;

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
        <FormGroup controlId="passwordConfirmation">
          <FormControl
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button
          bsStyle="primary"
          block
          disabled={
            password !== passwordConfirmation || password === "" || email === ""
          }
          type="submit"
        >
          Sign Up
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}

        <FormLinks>
          Already have an account? <Link to="/login">Login</Link>
        </FormLinks>
      </Form>
    );
  }
}

export default withRouter(SignUpForm);
