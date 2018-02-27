import React from "react";
import PropTypes, { string } from "prop-types";
import Link from "gatsby-link";

const Links = ({ acf }) => {
  return (
    <div>
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: acf.context }} />
      {acf.links.map((button, index) => (
        <Link className={`btn btn-primary btn-block`} key={index} to={`/${button.page.post_name}`}>{button.text}</Link>
      ))}
    </div>
  );
};

export default Links;

Links.propTypes = {
  acf: PropTypes.shape({
    context: PropTypes.string
  })
};
