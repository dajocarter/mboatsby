import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebase } from "../utils/firebase";
import withAuthorization from "../components/firebase/withAuthorization";
import EditProfile from "../components/forms/EditProfile";
import ChangeEmail from "../components/forms/ChangeEmail";
import ChangePassword from "../components/forms/ChangePassword";
import styled from "styled-components";
import Img from "gatsby-image";
import { Grid, Row, Col, Tabs, Tab } from "react-bootstrap";

const Template = styled.div``;

const HeroUnit = styled.div`
  height: 200px;
  background: #4776e6;
  background: linear-gradient(to bottom, #8e54e9, #4776e6);
  position: relative;
`;

const UserInfo = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #000;
  text-shadow: 1px 1px 1px #fff;
`;

const Username = styled.h1`
  margin: 0;
`;

const Email = styled.h3``;

const PhoneNumber = styled.p``;

const TabsContainer = styled.div`
  margin: 8rem auto;
`;

class MyAccount extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 1
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    const { displayName, phoneNumber, email } = this.context.currentUser;
    return (
      <Template>
        <HeroUnit>
          <UserInfo>
            <Username>{displayName || `Your Name`}</Username>
            <Email>{email || `example@gmail.com`}</Email>
            <PhoneNumber>{phoneNumber || `(555) 555-5555`}</PhoneNumber>
          </UserInfo>
        </HeroUnit>
        <Grid>
          <Row>
            <Col xs={12}>
              <TabsContainer>
                <Tabs
                  activeKey={this.state.key}
                  onSelect={this.handleSelect}
                  id="form-tabs"
                >
                  <Tab eventKey={1} title="Edit Profile">
                    <EditProfile />
                  </Tab>
                  <Tab eventKey={2} title="Change Email">
                    <ChangeEmail />
                  </Tab>
                  <Tab eventKey={3} title="Change Password">
                    <ChangePassword />
                  </Tab>
                </Tabs>
              </TabsContainer>
            </Col>
          </Row>
        </Grid>
      </Template>
    );
  }
}

MyAccount.contextTypes = {
  currentUser: PropTypes.object
};

const authCondition = currentUser => !!currentUser;

export default withAuthorization(authCondition)(MyAccount);
