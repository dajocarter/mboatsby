import React from "react";
import { shape, arrayOf, number, string, object } from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { columnClasses } from "../../utils/helpers";

const ButtonLink = styled(Link)`
  max-width: 589px;
  margin-left: auto;
  margin-right: auto;
`;

const Links = ({ layoutIndex, layoutName, path, acf: { links } }) => (
  <Row id={`layout-${layoutIndex}`} className={layoutName}>
    {links &&
      links.map((button, index) => (
        <Col key={index} xs={12} sm={columnClasses(index, links.length)}>
          <ButtonLink
            className={`btn btn-primary btn-block`}
            to={`/${path}/${button.page.post_name}`}
          >
            {button.text}
          </ButtonLink>
        </Col>
      ))}
  </Row>
);

export default Links;

Links.propTypes = {
  layoutIndex: number.isRequired,
  layoutName: string.isRequired,
  acf: shape({
    links: arrayOf(
      shape({
        page: shape({
          post_name: string.isRequired
        }),
        text: string.isRequired
      })
    )
  })
};
