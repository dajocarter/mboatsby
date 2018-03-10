import React, { Component } from "react";
import { auth } from "../../firebase";

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
      <form onSubmit={this.onSubmit}>
        <input
          value={password}
          onChange={event =>
            this.setState(updateByPropertyName("password", event.target.value))
          }
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordConfirmation}
          onChange={event =>
            this.setState(
              updateByPropertyName("passwordConfirmation", event.target.value)
            )
          }
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
