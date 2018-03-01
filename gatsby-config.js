module.exports = {
  siteMetadata: {
    title: `My Brain on Anatomy`,
    description: `My Brain on Anatomy contains interactive flipped classes for embryology and histology developed by Barbie Klein.`,
    author: {
      name: `Barbie Klein`,
      email: `barbieaklein@gmail.com`
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `mboa.tribestaging.com`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true
      }
    },
    `gatsby-transformer-sharp`
  ]
};
