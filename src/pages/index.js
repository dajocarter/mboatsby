import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import { Grid, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { columnClasses } from "../utils/helpers";

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
  margin-left: auto;
  margin-right: auto;
`;

const IndexPage = props => (
  <Grid>
    <h1>{props.data.page.title}</h1>
    {props.data.page.acf.rows.map((row, rowIndex) => (
      <Row key={rowIndex}>
        <Col xs={12}>
          <h2>{row.row_title}</h2>
        </Col>
        {row.columns.map((column, columnIndex) => {
          const colCase = props.data.cases.edges.filter(
            ({ node }) => node.wordpress_id === column.column_link.wordpress_id
          )[0].node;
          const category = props.data.categories.edges.filter(
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
                <Link to={`/${category.slug}/${column.column_link.post_name}`}>
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
  </Grid>
);

export default IndexPage;

export const homeQuery = graphql`
  query homeQuery {
    page: wordpressPage(wordpress_id: { eq: 7 }) {
      title
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
  }
`;
