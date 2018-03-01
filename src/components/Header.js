import React from "react";
import Link from "gatsby-link";

const Header = props => (
  <nav className={`navbar navbar-expand-sm navbar-dark bg-dark`}>
    <Link to={`/`} className={`navbar-brand`}>
      {props.title}
    </Link>
    <button
      className={`navbar-toggler`}
      type={`button`}
      data-toggle={`collapse`}
      data-target={`#navbarNav`}
      aria-controls={`navbarNav`}
      aria-expanded={`false`}
      aria-label={`Toggle navigation`}
    >
      <span className={`navbar-toggler-icon`} />
    </button>
    <div className={`collapse navbar-collapse`} id={`navbarNav`}>
      <ul className={`navbar-nav`}>
        {props.menu.map(item => (
          <li key={item.wordpress_id} className={`nav-item`}>
            <Link
              to={`/${item.object_slug}`}
              className={`nav-link`}
              activeClassName={`active`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Header;
