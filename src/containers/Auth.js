import React, { Component } from "react";
import PropTypes from "prop-types";

const INITIAL_STATE = {
  uid: "",
  email: "",
  password: "",
  displayName: ""
};

export default class Auth extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  static contextTypes = {
    firebase: PropTypes.object
  };

  state = INITIAL_STATE;

  componentDidMount() {
    const { auth } = this.context.firebase;

    this.stopAuthListener = auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, email, displayName } = user;
        this.setState({
          uid,
          email,
          displayName
        });
      } else {
        this.setState(INITIAL_STATE);
      }
    });
  }

  componentWillUnmount() {
    this.stopAuthListener();
  }

  handleSignUp = (email, password) => {
    const { auth } = this.context.firebase;

    return auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        // TODO: notify the user of the error
        return error;
      });
  };

  handleSignIn = (email, password) => {
    const { auth } = this.context.firebase;

    return auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        // TODO: notify the user of the error
        return error;
      });
  };

  handleSignOut = () => {
    const { auth } = this.context.firebase;
    return auth().signOut();
  };

  handlePasswordReset = email => {
    const { auth } = this.context.firebase;

    return auth()
      .sendPasswordResetEmail(email)
      .catch(error => {
        console.log(error);
        // TODO: notify the user of the error
        return error;
      });
  };

  handlePasswordChange = password => {
    const { auth } = this.context.firebase;

    return auth()
      .currentUser.updatePassword(password)
      .catch(error => {
        console.log(error);
        // TODO: notify the user of the error
        return error;
      });
  };

  render() {
    const isAuthed = !!this.state.uid;
    return this.props.children({
      ...this.state,
      signIn: this.handleSignIn,
      signOut: this.handleSignOut,
      signUp: this.handleSignUp,
      resetPassword: this.handlePasswordReset,
      changePassword: this.handlePasswordChange,
      isAuthed
    });
  }
}
