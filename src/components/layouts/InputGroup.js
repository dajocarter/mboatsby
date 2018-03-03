import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Col, Checkbox, Radio } from "react-bootstrap";
import InputCheckbox from "../InputCheckbox";
import InputRadio from "../InputRadio";

const Group = styled.div`
  max-width: 589px;
  margin-left: auto;
  margin-right: auto;
`;

const InputGroup = props => (
  <Row id={`layout-${props.layoutIndex}`} className={props.layoutName}>
    <Col xs={12}>
      <Group>
        {(() => {
          switch (props.acf.input_type) {
            case "checkbox":
              return (() =>
                props.acf.options.map((option, index) => (
                  <InputCheckbox
                    key={index}
                    isCorrect={option.is_correct}
                    label={option.text}
                  />
                )))();
              break;
            case "radio":
              return (() =>
                props.acf.options.map((option, index) => (
                  <InputRadio
                    key={index}
                    isCorrect={option.is_correct}
                    label={option.text}
                    name={`layout-${props.layoutIndex}`}
                  />
                )))();
              break;
          }
        })()}
      </Group>
    </Col>
  </Row>
);

export default InputGroup;

InputGroup.propTypes = {};
