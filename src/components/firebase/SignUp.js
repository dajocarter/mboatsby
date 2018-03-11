import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth, db } from "../../firebase";
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

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, password } = this.state;

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db
          .doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push("/");
          })
          .catch(error => {
            this.setState(updateByPropertyName("error", error));
          });
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      error
    } = this.state;

    const isInvalid =
      password !== passwordConfirmation ||
      password === "" ||
      username === "" ||
      email === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <FormTitle>My Brain on Anatomy</FormTitle>
        <FormGroup controlId="username">
          <FormControl
            value={username}
            onChange={event =>
              this.setState(
                updateByPropertyName("username", event.target.value)
              )
            }
            type="text"
            placeholder="Full Name"
          />
        </FormGroup>
        <FormGroup controlId="email">
          <FormControl
            value={email}
            onChange={event =>
              this.setState(updateByPropertyName("email", event.target.value))
            }
            type="email"
            placeholder="Email Address"
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            value={password}
            onChange={event =>
              this.setState(
                updateByPropertyName("password", event.target.value)
              )
            }
            type="password"
            placeholder="Password"
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
            placeholder="Confirm Password"
          />
        </FormGroup>
        <Button bsStyle="primary" block disabled={isInvalid} type="submit">
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
