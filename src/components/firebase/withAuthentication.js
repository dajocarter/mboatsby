import React from "react";
import PropTypes from "prop-types";
import { firebase } from "../../utils/firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        currentUser: null
      };
    }

    getChildContext() {
      return {
        currentUser: this.state.currentUser
      };
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(currentUser => {
        currentUser
          ? this.setState({ currentUser })
          : this.setState({ currentUser: null });
      });
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  WithAuthentication.childContextTypes = {
    currentUser: PropTypes.object
  };

  return WithAuthentication;
};

export default withAuthentication;
