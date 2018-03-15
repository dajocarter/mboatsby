import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Link from "gatsby-link";
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

const FormLinks = styled(FormControl.Static)`
  text-align: center;
  && {
    padding: 1.5rem 0 0;
  }
`;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: null };

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
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ email: "", password: "", error: null });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ error: error }));

    event.preventDefault();
  }

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
          bsStyle="primary"
          type="submit"
          disabled={password === "" || email === ""}
        >
          Login
        </Button>

        {error && <FormControl.Static>{error.message}</FormControl.Static>}

        <FormLinks>
          Don't have an account? <Link to="/signup/">Create one</Link>
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

export default withRouter(LoginForm);
