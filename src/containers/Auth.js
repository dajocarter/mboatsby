import React, { Component } from "react";
import PropTypes from "prop-types";

const INITIAL_STATE = {
  uid: "",
  isAnonymous: null,
  email: "",
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
        this.signIn(user);
      } else {
        this.signOut();
      }
    });
  }

  componentWillUnmount() {
    this.stopAuthListener();
  }

  handleSignIn = provider => {
    const { auth } = this.context.firebase;

    switch (provider) {
      case "google":
        return auth()
          .signInWithPopup(new auth.GoogleAuthProvider())
          .catch(error => {
            console.log(error);
            // TODO: notify the user of the error
            return error;
          });
      case "anonymous":
        return auth()
          .signInAnonymously()
          .catch(error => {
            console.log(error);
            // TODO: notify the user of the error
            return error;
          });
      default:
        const reason = "Invalid provider passed to signIn method";
        console.error(reason);
        return Promise.reject(reason);
    }
  };

  handleSignOut = () => {
    const { auth } = this.context.firebase;
    return auth().signOut();
  };

  signIn(user) {
    const { uid, isAnonymous, email, displayName } = user;
    this.setState({
      uid,
      isAnonymous,
      email,
      displayName
    });
  }

  signOut() {
    this.setState(INITIAL_STATE);
  }

  render() {
    const isAuthed = !!(this.state.uid && !this.state.isAnonymous);
    return this.props.children({
      ...this.state,
      signIn: this.handleSignIn,
      signOut: this.handleSignOut,
      isAuthed
    });
  }
}
