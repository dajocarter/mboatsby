import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { firebase } from "../utils/firebase";
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap";

const SiteHeader = styled(Navbar)`
  && {
    border-radius: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }
`;

const NavItem = styled.li``;

const Logout = styled(Navbar.Link)`
  cursor: pointer;
  && {
    color: #333;
    &:hover {
      color: #333;
    }
  }
`;

const Header = (props, { currentUser }) => (
  <SiteHeader
    inverse
    fixedTop
    collapseOnSelect
    componentClass={`header`}
    role={`banner`}
  >
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={`/`}>{props.title}</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight role={`navigation`}>
        <NavDropdown eventKey={1} title="Cases" id="menu-dropdown">
          {props.menu.map((item, index) => (
            <NavItem key={item.wordpress_id} role={`presentation`}>
              <Link
                to={`/${item.object_slug}`}
                activeClassName={`active`}
                role={`menuitem`}
                tabIndex={-1}
              >
                {item.title}
              </Link>
            </NavItem>
          ))}
        </NavDropdown>

        {currentUser ? (
          <NavDropdown
            eventKey={2}
            title={
              currentUser.displayName
                ? currentUser.displayName
                : currentUser.email
            }
            id="user-dropdown"
          >
            <NavItem role="presentation">
              <Link
                to="/my-account"
                activeClassName="active"
                role="menuitem"
                tabIndex="-1"
              >
                My Account
              </Link>
              <Logout
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Logout
              </Logout>
            </NavItem>
          </NavDropdown>
        ) : (
          <NavItem>
            <Link to="/login/">Login</Link>
          </NavItem>
        )}
      </Nav>
    </Navbar.Collapse>
  </SiteHeader>
);

export default Header;

Header.contextTypes = {
  currentUser: PropTypes.object
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      object_slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      wordpress_id: PropTypes.number.isRequired
    })
  )
};
