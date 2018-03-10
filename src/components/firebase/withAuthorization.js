import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { firebase } from "../../firebase";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push("/login");
        }
      });
    }

    render() {
      return this.context.authUser ? <Component {...this.props} /> : null;
    }
  }

  WithAuthorization.contextTypes = {
    authUser: PropTypes.object
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
