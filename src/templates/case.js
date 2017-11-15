import React, { Component } from "react";
import PropTypes from "prop-types";

class CaseTemplate extends Component {
  render() {
    const page = this.props.data.wordpressWpCases;

    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    );
  }
}

export default CaseTemplate;

export const caseQuery = graphql`
  query currentCaseQuery($slug: String!) {
    wordpressWpCases(slug: { eq: $slug }) {
      title
      content
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
