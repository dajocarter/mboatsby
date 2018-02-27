import React from "react";
import PropTypes, { string, number } from "prop-types";

const Content = ({ acf, layoutIndex }) => {
  return (
    <section className={`layout-${layoutIndex}`}>
      {acf.content && (
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: acf.content }}
        />
      )}
    </section>
  );
};

export default Content;

Content.propTypes = {
  acf: PropTypes.shape({
    content: PropTypes.string.isRequired
  }),
  layoutIndex: PropTypes.number.isRequired
};
