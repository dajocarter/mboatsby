import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Auth from "../containers/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./index.scss";

export default class TemplateWrapper extends Component {
  static propTypes = {
    children: PropTypes.func,
    data: PropTypes.object.isRequired
  };

  render() {
    const { data, children } = this.props;
    return (
      <Auth>
        {auth => {
          return (
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
                menu={data.menu.items}
                {...auth}
              />
              <main>{children({ ...this.props, ...auth })}</main>
              <Footer siteMetadata={data.site.siteMetadata} />
            </div>
          );
        }}
      </Auth>
    );
  }
}

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
    menu: wordpressWpApiMenusMenusItems(wordpress_id: { eq: 5 }) {
      items {
        wordpress_id
        title
        object_slug
      }
    }
  }
`;
