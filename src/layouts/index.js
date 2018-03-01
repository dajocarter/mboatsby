import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./index.scss";

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
    />
    <Header
      title={data.site.siteMetadata.title}
      menu={data.wordpressWpApiMenusMenusItems.items}
    />
    <main className="container">{children()}</main>
    <Footer siteMetadata={data.site.siteMetadata} />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object.isRequired
};

export default TemplateWrapper;

export const indexQuery = graphql`
  query indexQuery {
    site {
      siteMetadata {
        title
        description
        author {
          name
          email
        }
      }
    }
    wordpressWpApiMenusMenusItems(wordpress_id: { eq: 5 }) {
      items {
        wordpress_id
        title
        object_slug
      }
    }
  }
`;
