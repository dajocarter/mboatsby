import React from "react";
import PropTypes, { number } from "prop-types";
import Link from "gatsby-link";
import { Row } from "react-bootstrap";

const Links = ({ acf, layoutIndex }) => {
  return (
    <Row id={`layout-${layoutIndex}`}>
      {acf.links &&
        acf.links.map((button, index) => (
          <Link
            className={`btn btn-primary btn-block`}
            key={index}
            to={`/${button.page.post_name}`}
          >
            {button.text}
          </Link>
        ))}
    </Row>
  );
};

export default Links;

Links.propTypes = {
  layoutIndex: PropTypes.number.isRequired
};
