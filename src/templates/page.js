import React from "react";
import PropTypes from "prop-types";

const PageTemplate = props => (
  <div>
    <h1>{props.data.page.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: props.data.page.content }} />
  </div>
);

export default PageTemplate;

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    page: wordpressPage(id: { eq: $id }) {
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
