import React from "react";
import Img from "gatsby-image";
import { Row, Col } from "react-bootstrap";

const Image = props => (
  <Row id={`layout-${props.layoutIndex}`} className={props.layoutName}>
    {props.acf.image && (
      <Col xs={12}>
        <Img sizes={props.acf.image.localFile.childImageSharp.sizes} />
      </Col>
    )}
  </Row>
);

export default Image;
