const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`);
    const caseTemplate = path.resolve(`src/templates/case.js`);

    resolve(
      graphql(`
        {
          pages: allWordpressPage {
            edges {
              node {
                id
                wordpress_id
                wordpress_parent
                slug
                status
                template
              }
            }
          }
          cases: allWordpressWpCases {
            edges {
              node {
                id
                slug
                status
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
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        result.data.pages.edges.forEach(edge => {
          const slug = edge.node.slug;
          if (edge.node.status === `publish`) {
            if (edge.node.wordpress_parent) {
              const parentID = edge.node.wordpress_parent;
              const parent = result.data.pages.edges.filter(
                ({ node }) => node.wordpress_id === parentID
              )[0];
              createPage({
                path: `${parent.node.slug}/${edge.node.slug}`,
                component: pageTemplate,
                context: {
                  id: edge.node.id
                }
              });
            } else {
              createPage({
                path: edge.node.slug,
                component: pageTemplate,
                context: {
                  id: edge.node.id
                }
              });
            }
          }
        });

        result.data.cases.edges.forEach(edge => {
          const slug = edge.node.slug;
          const catID = edge.node.categories[0];
          const cat = result.data.categories.edges.filter(
            ({ node }) => node.wordpress_id === catID
          )[0];

          if (edge.node.status === `publish`) {
            createPage({
              path: `${cat.node.slug}/${edge.node.slug}`,
              component: caseTemplate,
              context: {
                id: edge.node.id
              }
            });
          }
        });
      })
    );
  });
};
