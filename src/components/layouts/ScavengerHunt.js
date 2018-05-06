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

export default class ScavengerHunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      fileName: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(file) {
    this.setState({ fileSelected: true, fileName: file.name });
    console.log(file);
    storage
      .ref("images")
      .child(file.name)
      .put(file)
      .then(snapshot => console.log(`Successful Upload!`));
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
              <UploadBtn
                className={`btn btn-block btn-primary`}
                disabled={this.state.fileSelected}
              >
                Upload Screenshot
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  disabled={this.state.fileSelected}
                  onChange={event => this.handleChange(event.target.files[0])}
                />
              </UploadBtn>
              <Instructions>
                {this.state.fileSelected
                  ? `Uploading ${this.state.fileName}`
                  : `Please use your initials in the filename, e.g., ABC.png`}
              </Instructions>
            </FormGroup>
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
