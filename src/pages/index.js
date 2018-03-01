import React from "react";
import Link from "gatsby-link";
import { Grid } from "react-bootstrap";

const IndexPage = () => (
  <Grid>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to={`/accc-intro/`}>A Curious Cardiovascular Case</Link>
  </Grid>
);

export default IndexPage;
