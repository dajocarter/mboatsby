import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { firebase } from "../../utils/firebase";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(currentUser => {
        if (!condition(currentUser)) {
          this.props.history.push("/login");
        }
      });
    }

    render() {
      return this.context.currentUser ? <Component {...this.props} /> : null;
    }
  }

  WithAuthorization.contextTypes = {
    currentUser: PropTypes.object
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
