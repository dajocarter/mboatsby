import React from "react";
import PropTypes from "prop-types";
import CheckYourAnswer from "../components/layouts/CheckYourAnswer";
import Checkboxes from "../components/layouts/Checkboxes";
import Content from "../components/layouts/Content";
import Image from "../components/layouts/Image";
import Links from "../components/layouts/Links";
import { Grid } from "react-bootstrap";

const CaseTemplate = props => (
  <Grid>
    <h1>{props.data.case.title}</h1>
    {props.data.case.acf.layouts_case &&
      props.data.case.acf.layouts_case.map((acf_type, index) => {
        switch (acf_type.__typename) {
          case "WordPressAcf_check_your_answer":
            return (
              <CheckYourAnswer
                key={`layout-${index}-${acf_type.__typename}`}
                layoutIndex={index}
                acf={acf_type}
              />
            );
            break;
          case "WordPressAcf_checkboxes":
            return (
              <Checkboxes
                key={`layout-${index}-${acf_type.__typename}`}
                layoutIndex={index}
                acf={acf_type}
              />
            );
            break;
          case "WordPressAcf_content":
            return (
              <Content
                key={`layout-${index}-${acf_type.__typename}`}
                layoutIndex={index}
                acf={acf_type}
              />
            );
            break;
          case "WordPressAcf_image":
            return (
              <Image
                key={`layout-${index}-${acf_type.__typename}`}
                layoutIndex={index}
                acf={acf_type}
              />
            );
            break;
          case "WordPressAcf_links":
            return (
              <Links
                key={`layout-${index}-${acf_type.__typename}`}
                layoutIndex={index}
                acf={acf_type}
              />
            );
            break;
        }
      })}
  </Grid>
);

export default CaseTemplate;

export const caseQuery = graphql`
  query currentCaseQuery($slug: String!) {
    case: wordpressWpCases(slug: { eq: $slug }) {
      title
      acf {
        layouts_case {
          __typename
          ... on WordPressAcf_checkboxes {
            input_type
            options {
              text
              is_correct
            }
          }
          ... on WordPressAcf_check_your_answer {
            inputs {
              label
              answers {
                possibility
              }
              hint
            }
          }
          ... on WordPressAcf_content {
            content
          }
          ... on WordPressAcf_image {
            image {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 800) {
                    ...GatsbyImageSharpSizes_tracedSVG
                  }
                }
              }
            }
          }
          ... on WordPressAcf_links {
            links {
              page {
                post_name
              }
              text
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
