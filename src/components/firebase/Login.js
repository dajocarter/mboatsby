import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Link from "gatsby-link";
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
  email: "",
  password: "",
  error: null
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push("/");
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <FormTitle>My Brain on Anatomy</FormTitle>
        <FormGroup controlId="email">
          <FormControl
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={event =>
              this.setState(updateByPropertyName("email", event.target.value))
            }
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            type="password"
            placeholder="Password"
            value={password}
            onChange={event =>
              this.setState(
                updateByPropertyName("password", event.target.value)
              )
            }
          />
        </FormGroup>
        <Button block bsStyle="primary" disabled={isInvalid} type="submit">
          Login
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}

        <FormLinks>
          <Link to="/signup/">Create an account</Link> or{" "}
          <Link to="reset-password">reset password</Link>
        </FormLinks>
      </Form>
    );
  }
}

export default withRouter(LoginForm);
