import React from "react";
import Img from "gatsby-image";
import { Row, Col } from "react-bootstrap";

const Image = ({ acf, layoutIndex }) => {
  return (
    <Row id={`layout-${layoutIndex}`}>
      {acf.image && (
        <Col xs={12}>
          <Img sizes={acf.image.localFile.childImageSharp.sizes} />
        </Col>
      )}
    </Row>
  );
};

export default Image;
