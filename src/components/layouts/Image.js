import React from "react";
import { number, string, object } from "prop-types";
import Img from "gatsby-image";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const ACFimage = styled(Img)`
  max-width: 589px;
  margin-left: auto;
  margin-right: auto;
`;

const Image = ({ layoutIndex, layoutName, acf: { image } }) => (
  <Row id={`layout-${layoutIndex}`} className={layoutName}>
    {image && (
      <Col xs={12}>
        <ACFimage sizes={image.localFile.childImageSharp.sizes} />
      </Col>
    )}
  </Row>
);

Image.propTypes = {
  layoutIndex: number.isRequired,
  layoutName: string.isRequired,
  acf: object.isRequired
};

export default Image;
