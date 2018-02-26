import React from "react";
import PropTypes, { string } from "prop-types";

const Content = ({ acf }) => {
  return <div dangerouslySetInnerHTML={{ __html: acf.content }} />;
};

export default Content;

Content.propTypes = {
  acf: PropTypes.shape({
    content: PropTypes.string.isRequired
  })
};