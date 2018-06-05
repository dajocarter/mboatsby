import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
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
`;

const Header = ({ location, title, menu, isAuthed, signIn, signOut }) => (
  <SiteHeader
    inverse
    fixedTop
    collapseOnSelect
    componentClass={`header`}
    role={`banner`}
  >
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={`/`}>{title}</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight role={`navigation`}>
        <NavDropdown eventKey={1} title="Cases" id="menu-dropdown">
          {menu.map((item, index) => (
            <NavItem key={index} role={`presentation`}>
              <Link
                to={`/${item.case_slug}/${item.object_slug}`}
                activeClassName={`active`}
                role={`menuitem`}
                tabIndex={-1}
              >
                {item.title}
              </Link>
            </NavItem>
          ))}
        </NavDropdown>
        {isAuthed ? (
          <NavItem>
            <Logout onClick={signOut}>Logout</Logout>
          </NavItem>
        ) : (
          <NavItem>
            <Link to={`/login/?ref=${location.pathname}`}>Login</Link>
          </NavItem>
        )}
      </Nav>
    </Navbar.Collapse>
  </SiteHeader>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      object_slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      case_slug: PropTypes.string.isRequired
    })
  ),
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool
};
