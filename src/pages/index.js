import React from "react";
import Link from "gatsby-link";
import { Grid } from "react-bootstrap";

const IndexPage = () => (
  <Grid>
    <h1>Try out these cases</h1>
    <p>
      <Link to={`/accc-intro/`}>A Curious Cardiovascular Case</Link>
    </p>
    <p>
      <Link to={`/amm-intro/`}>A Mysterious Mass</Link>
    </p>
  </Grid>
);

export default IndexPage;
