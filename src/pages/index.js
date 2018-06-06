import React from "react";
import { shape, arrayOf, object, number, string } from "prop-types";
import Link from "gatsby-link";
import Img from "gatsby-image";
import { Grid, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import { columnClasses } from "../utils/helpers";

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

const CircleImg = styled(Img)`
  height: 220px;
  width: 220px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const ColumnTitle = styled.h3`
  text-align: center;
`;

const ButtonLink = styled(Link)`
  max-width: 220px;
  && {
    margin: 0 auto 2rem;
  }
`;

const IndexPage = ({ data: { page, cases, categories, pdfs, ppt, pptx } }) => (
  <Template>
    <HeroUnit>
      <HeroImg sizes={page.featured_media.localFile.childImageSharp.sizes} />
      <HeroTitle>{page.title}</HeroTitle>
    </HeroUnit>
    <Grid>
      {page.acf.rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          <Col xs={12}>
            <h2>{row.row_title}</h2>
          </Col>
          {row.columns.map((column, columnIndex) => {
            const colCase = cases.edges.filter(
              ({ node }) =>
                node.wordpress_id === column.column_link.wordpress_id
            )[0].node;
            const category = categories.edges.filter(
              ({ node }) => node.wordpress_id === colCase.categories[0]
            )[0].node;
            return (
              <Col
                key={columnIndex}
                xs={12}
                sm={columnClasses(columnIndex, row.columns.length)}
              >
                <CircleImg
                  sizes={column.column_image.localFile.childImageSharp.sizes}
                />
                <ColumnTitle>
                  <Link
                    to={`/${category.slug}/${column.column_link.post_name}`}
                  >
                    {column.column_title}
                  </Link>
                </ColumnTitle>
                <div dangerouslySetInnerHTML={{ __html: column.column_text }} />
                <ButtonLink
                  className={`btn btn-primary btn-block`}
                  to={`/${category.slug}/${column.column_link.post_name}`}
                >
                  {column.button_text}
                </ButtonLink>
              </Col>
            );
          })}
        </Row>
      ))}
      <Row>
        <Col xs={12}>
          <h2>Learn More About the Cases</h2>
        </Col>
        <Col xs={12} sm={6}>
          <ColumnTitle>What is a Flipped Class?</ColumnTitle>
          <div>
            <p>
              Watch this{" "}
              <a
                href="https://www.youtube.com/watch?v=iQWvc6qhTds"
                target="_blank"
              >
                video
              </a>{" "}
              explaining what a flipped class is, and then check out this{" "}
              <a
                href="https://www.knewton.com/wp-content/uploads/flipped-classroom-1.jpg"
                target="_blank"
              >
                infographic
              </a>{" "}
              to learn more about flipped classes.
            </p>
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <ColumnTitle>Download Links</ColumnTitle>
          <div>
            <p>
              Download the HAPS 2015 Workshop Presentation as{" "}
              <a href={pptx.publicURL} target="_blank">
                a .pptx file
              </a>,{" "}
              <a href={ppt.publicURL} target="_blank">
                a .ppt file
              </a>, or{" "}
              <a href={pdfs.edges[1].node.publicURL} target="_blank">
                a .pdf file
              </a>. Also available for download is my{" "}
              <a href={pdfs.edges[0].node.publicURL} target="_blank">
                AAA 2015 poster
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Grid>
  </Template>
);

export default IndexPage;

IndexPage.propTypes = {
  data: shape({
    page: object.isRequired,
    cases: shape({
      edges: arrayOf(
        shape({
          node: shape({
            wordpress_id: number.isRequired,
            categories: arrayOf(number).isRequired
          })
        })
      )
    }),
    categories: shape({
      edges: arrayOf(
        shape({
          node: shape({
            wordpress_id: number.isRequired,
            slug: string.isRequired
          })
        })
      )
    }),
    pdfs: shape({
      edges: arrayOf(
        shape({
          node: shape({
            publicURL: string.isRequired
          })
        })
      )
    }),
    ppt: shape({
      publicURL: string.isRequired
    }),
    pptx: shape({
      publicURL: string.isRequired
    })
  }).isRequired
};

export const homeQuery = graphql`
  query homeQuery {
    page: wordpressPage(wordpress_id: { eq: 7 }) {
      title
      featured_media {
        localFile {
          childImageSharp {
            sizes {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
      }
      acf {
        rows {
          row_title
          columns {
            column_image {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 220) {
                    ...GatsbyImageSharpSizes_tracedSVG
                  }
                }
              }
            }
            column_title
            column_link {
              wordpress_id
              post_name
            }
            column_text
            button_text
          }
        }
      }
    }
    cases: allWordpressWpCases {
      edges {
        node {
          wordpress_id
          categories
        }
      }
    }
    categories: allWordpressCategory {
      edges {
        node {
          wordpress_id
          slug
        }
      }
    }
    pdfs: allFile(filter: { extension: { eq: "pdf" } }) {
      edges {
        node {
          publicURL
        }
      }
    }
    ppt: file(extension: { eq: "ppt" }) {
      publicURL
    }
    pptx: file(extension: { eq: "pptx" }) {
      publicURL
    }
  }
`;
