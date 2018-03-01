import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./index.scss";

const Header = props => (
  <nav className={`navbar navbar-expand-sm navbar-dark bg-dark`}>
    <Link to={`/`} className={`navbar-brand`}>
      {props.title}
    </Link>
    <button
      className={`navbar-toggler`}
      type={`button`}
      data-toggle={`collapse`}
      data-target={`#navbarNav`}
      aria-controls={`navbarNav`}
      aria-expanded={`false`}
      aria-label={`Toggle navigation`}
    >
      <span className={`navbar-toggler-icon`} />
    </button>
    <div className={`collapse navbar-collapse`} id={`navbarNav`}>
      <ul className={`navbar-nav`}>
        {props.menu.map(item => (
          <li key={item.wordpress_id} className={`nav-item`}>
            <Link
              to={`/${item.object_slug}`}
              className={`nav-link`}
              activeClassName={`active`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

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
