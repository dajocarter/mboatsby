import React, { Component } from "react";
import PropTypes, { string, number } from "prop-types";
import { storage } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button
} from "react-bootstrap";

export default class ScavengerHunt extends Component {
  constructor() {
    super();

    this.state = {
      isUploading: false,
      progress: 0
    };

    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      progress: 0
    });

  handleProgress = progress =>
    this.setState({
      progress
    });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({
      progress: 100,
      isUploading: false
    });
    storage
      .ref("images")
      .child(filename)
      .getDownloadURL();
  };

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
              {this.state.isUploading && (
                <p>Progress: {this.state.progress}%</p>
              )}
              <FileUploader
                accept="image/*"
                name="screenshot"
                storageRef={storage.ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
              <HelpBlock>
                Please use your initials in the filename, e.g., ABC.png
              </HelpBlock>
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
