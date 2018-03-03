import React from "react";
import PropTypes, { number } from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { columnClasses } from "../../utils/helpers";

const ButtonLink = styled(Link)`
  max-width: 589px;
  margin-left: auto;
  margin-right: auto;
`;

const Links = props => (
  <Row id={`layout-${props.layoutIndex}`} className={props.layoutName}>
    {props.acf.links &&
      props.acf.links.map((button, index) => (
        <Col key={index} sm={columnClasses(index, props.acf.links.length)}>
          <ButtonLink
            className={`btn btn-primary btn-block`}
            to={`/${button.page.post_name}`}
          >
            {button.text}
          </ButtonLink>
        </Col>
      ))}
  </Row>
);

export default Links;

Links.propTypes = {
  layoutIndex: PropTypes.number.isRequired
};
