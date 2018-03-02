import React from "react";
import PropTypes, { number } from "prop-types";
import Link from "gatsby-link";
import { Row, Col } from "react-bootstrap";
import { columnClasses } from "../../utils/helpers";

const Links = ({ acf, layoutIndex }) => (
  <Row id={`layout-${layoutIndex}`}>
    {acf.links &&
      acf.links.map((button, index) => (
        <Col key={index} sm={columnClasses(index, acf.links.length)}>
          <Link
            className={`btn btn-primary btn-block`}
            to={`/${button.page.post_name}`}
          >
            {button.text}
          </Link>
        </Col>
      ))}
  </Row>
);

export default Links;

Links.propTypes = {
  layoutIndex: PropTypes.number.isRequired
};
