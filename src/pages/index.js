import React from "react";
import Link from "gatsby-link";
import { Grid } from "react-bootstrap";

const IndexPage = () => (
  <Grid>
    <h1>Try out these cases</h1>
    <p>
      <Link to={`/a-curious-cardiovascular-case/accc-intro/`}>
        A Curious Cardiovascular Case
      </Link>
    </p>
    <p>
      <Link to={`/a-mysterious-mass/amm-intro/`}>A Mysterious Mass</Link>
    </p>
    <p>
      <Link to={`/the-suspicious-lesion/tsl-intro/`}>
        The Suspicious Lesion
      </Link>
    </p>
    <p>
      <Link to={`/a-night-in-the-er/ner-intro/`}>A Night in the E.R.</Link>
    </p>
  </Grid>
);

export default IndexPage;
