import React from "react";
import { shape, string } from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { Grid, Row, Col, NavbarBrand } from "react-bootstrap";

const SiteFooter = styled.footer`
  background-color: #f8f8f8;
  bottom: 0;
  color: #777;
  height: 330px;
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
  && {
    padding-left: 0;
  }
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

const Footer = ({ siteMetadata }) => (
  <SiteFooter>
    <FooterContainer>
      <Row>
        <Col xs={12}>
          <NavbarBrand>
            <FooterSiteTitle>
              <Link to={`/`}>{siteMetadata.title}</Link>
            </FooterSiteTitle>
          </NavbarBrand>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4}>
          <AuthorContactList>
            <li>{siteMetadata.author.name}</li>
            <li>
              <Link to={`mailto:${siteMetadata.author.email}`}>
                {siteMetadata.author.email}
              </Link>
            </li>
          </AuthorContactList>
        </Col>
        <Col xs={12} sm={6} smOffset={2}>
          <p>{siteMetadata.description}</p>
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

export default Footer;

Footer.propTypes = {
  siteMetadata: shape({
    title: string.isRequired,
    description: string.isRequired,
    author: shape({
      name: string.isRequired,
      email: string.isRequired
    })
  })
};
