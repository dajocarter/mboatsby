import React from "react";
import Img from "gatsby-image";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const ACFimage = styled(Img)`
  max-width: 589px;
  margin-left: auto;
  margin-right: auto;
`;

const Image = props => (
  <Row id={`layout-${props.layoutIndex}`} className={props.layoutName}>
    {props.acf.image && (
      <Col xs={12}>
        <ACFimage sizes={props.acf.image.localFile.childImageSharp.sizes} />
      </Col>
    )}
  </Row>
);

export default Image;
