import React, { Component } from "react";
import { shape, arrayOf, string, number, func, object } from "prop-types";
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
    children: func.isRequired,
    data: shape({
      menu: shape({
        items: arrayOf(
          shape({
            title: string.isRequired,
            object_id: number.isRequired,
            object_slug: string.isRequired
          })
        )
      }),
      cases: shape({
        edges: arrayOf(
          shape({
            node: shape({
              wordpress_id: number.isRequired,
              categories: arrayOf(number).isRequired
            })
          })
        )
      }),
      categories: shape({
        edges: arrayOf(
          shape({
            node: shape({
              wordpress_id: number.isRequired,
              slug: string.isRequired
            })
          })
        )
      }),
      site: shape({
        siteMetadata: shape({
          title: string.isRequired,
          description: string,
          author: shape({
            name: string,
            email: string
          })
        })
      })
    }),
    location: object.isRequired
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
    const {
      data: {
        site: { siteMetadata }
      },
      children,
      location
    } = this.props;
    const menuItems = this.createMenuItems();
    return (
      <Auth>
        {auth => {
          return (
            <div>
              <Helmet
                title={siteMetadata.title}
                meta={[
                  { name: "description", content: "Sample" },
                  { name: "keywords", content: "sample, something" }
                ]}
              />
              <Header
                title={siteMetadata.title}
                menu={menuItems}
                location={location}
                {...auth}
              />
              <main>{children({ ...this.props, ...auth })}</main>
              <Footer siteMetadata={siteMetadata} />
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
