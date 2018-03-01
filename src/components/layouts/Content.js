import React from "react";
import PropTypes, { string, number } from "prop-types";
import { Row, Col } from "react-bootstrap";

const Content = ({ acf, layoutIndex }) => (
  <Row id={`layout-${layoutIndex}`}>
    {acf.content && (
      <Col
        xs={12}
        className="wp-content"
        dangerouslySetInnerHTML={{ __html: acf.content }}
      />
    )}
  </Row>
);

export default Content;

Content.propTypes = {
  acf: PropTypes.shape({
    content: PropTypes.string.isRequired
  }),
  layoutIndex: PropTypes.number.isRequired
};
