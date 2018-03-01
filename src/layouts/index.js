import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./index.scss";
import { Grid, Row, Col } from "react-bootstrap";

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

const SiteFooter = styled.footer`
  background-color: #f8f8f8;
  bottom: 0;
  color: #777;
  height: 330px;
  margin-top: 20px;
  position: absolute;
  width: 100%;
  @media (min-width: 768px) {
    height: 270px;
  }
`;

const FooterContainer = styled(Grid)`
  max-width: 100%;
`;

const FooterSiteTitle = styled.h2`
  padding-left: 0;
`;

const AuthorContactList = styled.ul`
  list-style: none;
  margin: 0 0 15px;
  padding: 0;
`;

const NetlifyImg = styled.img`
  display: block;
  height: auto;
  margin: 2rem auto;
  max-width: 100%;
`;

const Footer = props => (
  <SiteFooter>
    <FooterContainer>
      <Row>
        <Col xs={12}>
          <FooterSiteTitle className="navbar-brand">
            <Link to={`/`}>{props.siteMetadata.title}</Link>
          </FooterSiteTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4}>
          <AuthorContactList>
            <li>{props.siteMetadata.author.name}</li>
            <li>
              <Link to={`mailto:${props.siteMetadata.author.email}`}>
                {props.siteMetadata.author.email}
              </Link>
            </li>
          </AuthorContactList>
        </Col>
        <Col xs={12} sm={6} smOffset={2}>
          <p>{props.siteMetadata.description}</p>
        </Col>
        <Col xs={12}>
          <a href={`//www.netlify.com`} target={`_blank`}>
            <NetlifyImg
              src="https://www.netlify.com/img/global/badges/netlify-light.svg"
              alt={`Deploys by Netlify`}
            />
          </a>
        </Col>
      </Row>
    </FooterContainer>
  </SiteFooter>
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
