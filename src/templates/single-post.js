import React, { Component } from "react";
import PropTypes from "prop-types";

class SinglePostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost;

    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    );
  }
}

SinglePostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array
};

export default SinglePostTemplate;

export const pageQuery = graphql`
  query currentPostQuery($slug: String!) {
    wordpressPost(slug: { eq: $slug }) {
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
