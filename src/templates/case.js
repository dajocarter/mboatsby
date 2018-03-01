import React from "react";
import PropTypes from "prop-types";
import CheckYourAnswer from "../components/layouts/CheckYourAnswer";
import Checkboxes from "../components/layouts/Checkboxes";
import Content from "../components/layouts/Content";
import Image from "../components/layouts/Image";
import Links from "../components/layouts/Links";
import { Grid } from "react-bootstrap";
import styled from "styled-components";

const SiteTitle = styled.h1`
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
  letter-spacing: 1px;
`;

const CaseTitle = styled.h2`
  margin: 1rem 0 2rem;
  text-align: center;
`;

const CaseTemplate = props => (
  <Grid>
    {props.data.tags.edges
      .filter(({ node }) => node.wordpress_id === props.data.case.tags[0])
      .map(({ node }, index) => <SiteTitle key={index}>{node.name}</SiteTitle>)}
    {props.data.categories.edges
      .filter(({ node }) => node.wordpress_id === props.data.case.categories[0])
      .map(({ node }, index) => <CaseTitle key={index}>{node.name}</CaseTitle>)}
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
      categories
      tags
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
    categories: allWordpressCategory {
      edges {
        node {
          name
          wordpress_id
        }
      }
    }
    tags: allWordpressTag {
      edges {
        node {
          name
          wordpress_id
        }
      }
    }
  }
`;
