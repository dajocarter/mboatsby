import React, { Component } from "react";
import PropTypes, { string, number } from "prop-types";
import { storage } from "../../firebase";
import { Row, Col, FormGroup, HelpBlock } from "react-bootstrap";
import styled from "styled-components";

const UploadBtn = styled.label`
  input[type="file"] {
    display: none;
  }
`;

const Instructions = styled(HelpBlock)`
  text-align: center;
`;

const UploadedImg = styled.img`
  display: block;
  height: auto;
  width: 100%;
`;

export default class ScavengerHunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      fileName: "",
      progress: 0,
      uploadComplete: false,
      imgURL: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(file) {
    this.setState({ fileSelected: true, fileName: file.name });
    console.log(file);
    let pageTitle = this.props.pageTitle
      .split(" ")
      .join("-")
      .toLowerCase();
    let uploadTask = storage
      .ref()
      .child(this.props.path)
      .child(pageTitle)
      .child(file.name)
      .put(file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        let progress = Math.round(
          snapshot.bytesTransferred / snapshot.totalBytes * 100
        );
        this.setState({ progress });
      },
      error => {
        // Handle unsuccessful upload
      },
      () => {
        // Handle successful upload
        console.log(`Successful Upload!`);
        this.setState({
          fileSelected: false,
          fileName: "",
          progress: 100,
          uploadComplete: true
        });
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.setState({ imgURL: downloadURL });
        });
      }
    );
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
        <Col xs={12} sm={8} smOffset={2}>
          <form>
            <FormGroup controlId="fileUpload">
              <UploadBtn
                className={`btn btn-block btn-primary`}
                disabled={this.state.fileSelected || this.state.uploadComplete}
              >
                Upload Screenshot
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  disabled={
                    this.state.fileSelected || this.state.uploadComplete
                  }
                  onChange={event => this.handleChange(event.target.files[0])}
                />
              </UploadBtn>
              <Instructions>
                {this.state.fileSelected
                  ? `Uploading ${this.state.fileName} - ${this.state.progress}%`
                  : this.state.uploadComplete
                    ? `Successfully uploaded!`
                    : `Please include your initials in the filename, e.g., ABC.png`}
              </Instructions>
            </FormGroup>
          </form>
        </Col>
        {this.state.uploadComplete &&
          this.state.imgURL && (
            <Col xs={12}>
              <UploadedImg src={this.state.imgURL} />
            </Col>
          )}
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
