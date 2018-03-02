import React from "react";
import PropTypes, { string, number } from "prop-types";
import { Row, Col } from "react-bootstrap";

const Content = props => (
  <Row id={`layout-${props.layoutIndex}`} className={props.layoutName}>
    {props.acf.content && (
      <Col
        xs={12}
        className="wp-content"
        dangerouslySetInnerHTML={{ __html: props.acf.content }}
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
