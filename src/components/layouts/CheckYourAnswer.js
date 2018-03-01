import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { columnClasses } from "../../utils/helpers";
import InputForm from "../InputForm";

export default class CheckYourAnswer extends Component {
  render() {
    return (
      <Row id={`layout-${this.props.layoutIndex}`}>
        {this.props.acf.inputs &&
          this.props.acf.inputs.map((input, index) => (
            <Col
              key={index}
              sm={columnClasses(index, this.props.acf.inputs.length)}
            >
              <InputForm
                input={input}
                inputIndex={index}
                layoutIndex={this.props.layoutIndex}
              />
            </Col>
          ))}
      </Row>
    );
  }
}

CheckYourAnswer.propTypes = {};
