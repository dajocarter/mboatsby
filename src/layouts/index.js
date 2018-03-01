import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
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

const Footer = props => (
  <footer>
    <div className="container">
      <h2 className="navbar-brand">
        <Link to={`/`}>{props.siteMetadata.title}</Link>
      </h2>
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          <ul>
            <li>{props.siteMetadata.author.name}</li>
            <li>
              <Link to={`mailto:${props.siteMetadata.author.email}`}>
                {props.siteMetadata.author.email}
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-xs-12 col-sm-6 col-sm-offset-2">
          <p>{props.siteMetadata.description}</p>
        </div>
        <div className="col-xs-12">
          <a href={`//www.netlify.com`} target={`_blank`}>
            <img
              src="https://www.netlify.com/img/global/badges/netlify-light.svg"
              alt={`Deploys by Netlify`}
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
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
