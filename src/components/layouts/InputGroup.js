import React from "react";
import { number, string, object } from "prop-types";
import styled from "styled-components";
import { Row, Col, Checkbox, Radio } from "react-bootstrap";

import InputCheckbox from "../InputCheckbox";
import InputRadio from "../InputRadio";

const Group = styled.div`
  max-width: 589px;
  margin-left: auto;
  margin-right: auto;
`;

const InputGroup = ({
  layoutIndex,
  layoutName,
  acf: { input_type, options }
}) => (
  <Row id={`layout-${layoutIndex}`} className={layoutName}>
    <Col xs={12}>
      <Group>
        {(() => {
          switch (input_type) {
            case "checkbox":
              return (() =>
                options.map((option, index) => (
                  <InputCheckbox
                    key={index}
                    isCorrect={option.is_correct}
                    label={option.text}
                  />
                )))();
              break;
            case "radio":
              return (() =>
                options.map((option, index) => (
                  <InputRadio
                    key={index}
                    isCorrect={option.is_correct}
                    label={option.text}
                    name={`layout-${layoutIndex}`}
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

InputGroup.propTypes = {
  layoutIndex: number.isRequired,
  layoutName: string.isRequired,
  acf: object.isRequired
};
