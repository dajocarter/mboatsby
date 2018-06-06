import React from "react";
import PropTypes from "prop-types";

import DefaultPage from "./page-default";

const PageTemplate = ({
  data: {
    page: { title, content }
  }
}) => (
  <DefaultPage
    content={() => (
      <div>
        <h1>{title}</h1>
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p>
            Oops...looks like this page is missing content. Check back soon.
          </p>
        )}
      </div>
    )}
  />
);

export default PageTemplate;

PageTemplate.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string
    }).isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    page: wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`;
