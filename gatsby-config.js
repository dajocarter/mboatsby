module.exports = {
  siteMetadata: {
    title: `My Brain on Anatomy`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `mboa.tribestaging.com`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: true
      }
    }
  ]
};
