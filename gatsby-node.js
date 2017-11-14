const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`);

    resolve(
      graphql(`
        {
          allWordpressWpCases {
            edges {
              node {
                id
                wordpress_id
                slug
                status
                template
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        result.data.allWordpressWpCases.edges.forEach(({ node }) => {
          const slug = node.slug;
          if (node.status === `publish`) {
            createPage({
              path: node.slug,
              component: pageTemplate,
              context: {
                slug: node.slug
              }
            });
          }
        });
      })
    );
  });
};
