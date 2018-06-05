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

  createMenuItems = () => {
    const { menu, cases, categories } = this.props.data;
    const menuItems = menu.items.map(item => {
      const { title, object_slug, object_id } = item;
      const menuCase = cases.edges.filter(
        ({ node }) => node.wordpress_id === object_id
      )[0].node;
      const cat = categories.edges.filter(
        ({ node }) => node.wordpress_id === menuCase.categories[0]
      )[0].node;
      return { title, object_slug, case_slug: cat.slug };
    });
    return menuItems;
  };

  render() {
    const { data, children, location } = this.props;
    const menuItems = this.createMenuItems();
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
                menu={menuItems}
                location={location}
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
        object_id
        title
        object_slug
      }
    }
    cases: allWordpressWpCases {
      edges {
        node {
          wordpress_id
          categories
        }
      }
    }
    categories: allWordpressCategory {
      edges {
        node {
          wordpress_id
          slug
        }
      }
    }
  }
`;
