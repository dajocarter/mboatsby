import React, { Component } from "react";
import PropTypes from "prop-types";

class PageTemplate extends Component {
  render() {
    const page = this.props.data.wordpressPage;

    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    );
  }
}

export default PageTemplate;

export const pageQuery = graphql`
  query currentPageQuery($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
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
