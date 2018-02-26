import React from "react";
import PropTypes, { string } from "prop-types";

const Links = ({ acf }) => {
  return <div dangerouslySetInnerHTML={{ __html: acf.context }} />;
};

export default Links;

Links.propTypes = {
  acf: PropTypes.shape({
    context: PropTypes.string.isRequired
  })
};
