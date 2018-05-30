import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import SignInOut from "./SignInOut";

const SiteHeader = styled(Navbar)`
  && {
    border-radius: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }
`;

const NavItem = styled.li``;

const Header = ({ title, menu, isAuthed, signIn, signOut }) => (
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
        <SignInOut
          onClick={() => (isAuthed ? signOut() : signIn("google"))}
          text={isAuthed ? "Sign Out" : "Sign In"}
        />
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
      wordpress_id: PropTypes.number.isRequired
    })
  ),
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool
};
