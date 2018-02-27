import React from "react";
import Img from "gatsby-image";

const Image = ({ acf, layoutIndex }) => {
  return (
    <section className={`layout-${layoutIndex}`}>
      {acf.image && <Img sizes={acf.image.localFile.childImageSharp.sizes} />}
    </section>
  );
};

export default Image;
