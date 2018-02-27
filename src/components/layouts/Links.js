import React from "react";
import PropTypes, { number } from "prop-types";
import Link from "gatsby-link";

const Links = ({ acf, layoutIndex }) => {
  return (
    <section className={`layout-${layoutIndex}`}>
      {acf.links &&
        acf.links.map((button, index) => (
          <Link
            className={`btn btn-primary btn-block`}
            key={index}
            to={`/${button.page.post_name}`}
          >
            {button.text}
          </Link>
        ))}
    </section>
  );
};

export default Links;

Links.propTypes = {
  layoutIndex: PropTypes.number.isRequired
};
