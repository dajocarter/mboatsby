import React, { Component } from "react";
import PropTypes, { string, number } from "prop-types";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from "react-bootstrap";

export default class ScavengerHunt extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(urlbase, uri, base64, token) {
    let apiUrl = urlbase + "/wp-json/wp/v2/media";
    let formData = new FormData();

    //dynamically get file type
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    //generate some random number for the filename
    var randNumber1 = Math.floor(Math.random() * 100);
    var randNumber2 = Math.floor(Math.random() * 100);

    formData.append("file", {
      base64,
      name: `photo-${randNumber1}-${randNumber2}.${fileType}`,
      type: `image/${fileType}`
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache"
      }
    };

    console.log("header options: ", options);
    console.log("form-data options: ", formData);

    return fetch(apiUrl, options);
  }

  render() {
    return (
      <Row
        id={`layout-${this.props.layoutIndex}`}
        className={this.props.layoutName}
      >
        {this.props.acf.content && (
          <Col
            xs={12}
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: this.props.acf.content }}
          />
        )}
        <Col xs={12}>
          <form>
            <FormGroup controlId="fileUpload">
              <ControlLabel>Upload File</ControlLabel>
              <FormControl type="file" />
              <HelpBlock>Upload a .png or .jpg file</HelpBlock>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </form>
        </Col>
      </Row>
    );
  }
}

ScavengerHunt.propTypes = {
  acf: PropTypes.shape({
    content: PropTypes.string.isRequired
  }),
  layoutIndex: PropTypes.number.isRequired
};
