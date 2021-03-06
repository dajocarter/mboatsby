import React from "react";
import { shape, object, bool, string } from "prop-types";
import Img from "gatsby-image";
import { Grid } from "react-bootstrap";
import styled from "styled-components";

import CheckYourAnswer from "../components/layouts/CheckYourAnswer";
import InputGroup from "../components/layouts/InputGroup";
import Content from "../components/layouts/Content";
import Image from "../components/layouts/Image";
import Links from "../components/layouts/Links";
import ScavengerHunt from "../components/layouts/ScavengerHunt";

const Template = styled.div``;

const HeroUnit = styled.div`
  position: relative;
`;

const HeroImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 200px;

  & > img {
    object-fit: cover !important;
    object-position: 50% 50% !important;
    font-family: "object-fit: cover !important; object-position: 50% 50% !important;";
  }
`;

const HeroTitle = styled.h1`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  margin: 0;
  text-align: center;
  text-shadow: 3px 3px 3px #fff;
`;

const BreadcrumbBar = styled.div`
  background: #333;
  color: #9d9d9d;
  width: 100%;
  margin-bottom: 5rem;
`;

const TagTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  padding: 1rem 0;
`;

const CaseTemplate = ({
  data: { wpCase, categories, tags },
  isAuthed,
  uid
}) => {
  const category = categories.edges.filter(
    ({ node }) => node.wordpress_id === wpCase.categories[0]
  )[0].node;
  const tag = tags.edges.filter(
    ({ node }) => node.wordpress_id === wpCase.tags[0]
  )[0].node;
  return (
    <Template>
      <HeroUnit>
        <HeroImg
          sizes={category.acf.banner_image.localFile.childImageSharp.sizes}
        />
        <HeroTitle>{category.name}</HeroTitle>
      </HeroUnit>
      <BreadcrumbBar>
        <Grid>
          <TagTitle>{tag.name}</TagTitle>
        </Grid>
      </BreadcrumbBar>
      <Grid>
        {wpCase.acf.layouts_case &&
          wpCase.acf.layouts_case.map((acf_type, index) => {
            switch (acf_type.__typename) {
              case "WordPressAcf_check_your_answer":
                return (
                  <CheckYourAnswer
                    key={`layout-${index}-${acf_type.__typename}`}
                    layoutName={acf_type.__typename}
                    layoutIndex={index}
                    acf={acf_type}
                  />
                );
                break;
              case "WordPressAcf_input_group":
                return (
                  <InputGroup
                    key={`layout-${index}-${acf_type.__typename}`}
                    layoutName={acf_type.__typename}
                    layoutIndex={index}
                    acf={acf_type}
                  />
                );
                break;
              case "WordPressAcf_content":
                return (
                  <Content
                    key={`layout-${index}-${acf_type.__typename}`}
                    layoutName={acf_type.__typename}
                    layoutIndex={index}
                    acf={acf_type}
                  />
                );
                break;
              case "WordPressAcf_image":
                return (
                  <Image
                    key={`layout-${index}-${acf_type.__typename}`}
                    layoutName={acf_type.__typename}
                    layoutIndex={index}
                    acf={acf_type}
                  />
                );
                break;
              case "WordPressAcf_links":
                return (
                  <Links
                    key={`layout-${index}-${acf_type.__typename}`}
                    layoutName={acf_type.__typename}
                    layoutIndex={index}
                    path={category.slug}
                    acf={acf_type}
                  />
                );
                break;
              case "WordPressAcf_scavenger_hunt":
                return (
                  <ScavengerHunt
                    key={`layout-${index}-${acf_type.__typename}`}
                    layoutName={acf_type.__typename}
                    layoutIndex={index}
                    path={category.slug}
                    pageTitle={wpCase.title}
                    acf={acf_type}
                    isAuthed={isAuthed}
                    uid={uid}
                  />
                );
                break;
            }
          })}
      </Grid>
    </Template>
  );
};

export default CaseTemplate;

CaseTemplate.propTypes = {
  data: shape({
    wpCase: object.isRequired,
    categories: object.isRequired,
    tags: object.isRequired
  }).isRequired,
  isAuthed: bool.isRequired,
  uid: string.isRequired
};

export const caseQuery = graphql`
  query currentCaseQuery($id: String!) {
    wpCase: wordpressWpCases(id: { eq: $id }) {
      title
      categories
      tags
      acf {
        layouts_case {
          __typename
          ... on WordPressAcf_input_group {
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
                  sizes(maxWidth: 589) {
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
          ... on WordPressAcf_scavenger_hunt {
            content
          }
        }
      }
    }
    categories: allWordpressCategory {
      edges {
        node {
          name
          wordpress_id
          slug
          acf {
            banner_image {
              localFile {
                childImageSharp {
                  sizes {
                    ...GatsbyImageSharpSizes_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
    tags: allWordpressTag {
      edges {
        node {
          name
          wordpress_id
          slug
        }
      }
    }
  }
`;
