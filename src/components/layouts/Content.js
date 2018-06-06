import React from "react";
import { shape, string, number } from "prop-types";
import { Row, Col } from "react-bootstrap";

const Content = ({ layoutIndex, layoutName, acf: { content } }) => (
  <Row id={`layout-${layoutIndex}`} className={layoutName}>
    {content && (
      <Col
        xs={12}
        className="wp-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )}
  </Row>
);

export default Content;

Content.propTypes = {
  acf: shape({
    content: string.isRequired
  }),
  layoutIndex: number.isRequired,
  layoutName: string.isRequired
};
