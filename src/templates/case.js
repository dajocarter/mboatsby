import React, { Component } from "react";
import PropTypes from "prop-types";
import CheckYourAnswer from "../components/layouts/CheckYourAnswer";
import Checkboxes from "../components/layouts/Checkboxes";
import Content from "../components/layouts/Content";
import Links from "../components/layouts/Links";

class CaseTemplate extends Component {
  render() {
    const page = this.props.data.wordpressWpCases;

    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        {page.acf.layouts_cases.map((acf_type, index) => {
          switch (acf_type.__typename) {
            case "WordPressAcf_check_your_answer":
              return (
                <CheckYourAnswer
                  key={`layout-${index}-${acf_type.__typename}`}
                  acf={acf_type}
                />
              );
              break;
            case "WordPressAcf_checkboxes":
              return (
                <Checkboxes
                  key={`layout-${index}-${acf_type.__typename}`}
                  acf={acf_type}
                />
              );
              break;
            case "WordPressAcf_content":
              return (
                <Content
                  key={`layout-${index}-${acf_type.__typename}`}
                  acf={acf_type}
                />
              );
              break;
            case "WordPressAcf_links":
              return (
                <Links
                  key={`layout-${index}-${acf_type.__typename}`}
                  acf={acf_type}
                />
              );
              break;
          }
        })}
      </div>
    );
  }
}

export default CaseTemplate;

export const caseQuery = graphql`
  query currentCaseQuery($slug: String!) {
    wordpressWpCases(slug: { eq: $slug }) {
      title
      acf {
        layouts_cases {
          __typename
          ... on WordPressAcf_checkboxes {
            question
            checkboxes_or_radio_buttons
            choices {
              choice
              is_correct
            }
          }
          ... on WordPressAcf_check_your_answer {
            context
          }
          ... on WordPressAcf_content {
            content
          }
          ... on WordPressAcf_links {
            context
            links {
              button_text
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
