const path = require('path')
const here = (...p) => path.join(__dirname, ...p)

module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    siteUrl: "https://www.frankcalise.com/",
    author: "Frank Cailse",
    title: "The personal website of Frank Calise",
    description:
      "Thoughts on becoming a better software engineer and bodybuilder.",
    keywords: ["Software Engineer", "Bodybuilder"],
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          default: here('./src/templates/markdown-page.js'),
        },
        extensions: [".mdx", ".md", '.markdown'],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-emotion",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "The personal website of Frank Calise",
        short_name: "frankcalise",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#525dce",
        display: "standalone",
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-15936568-1",
      },
    },
    "gatsby-plugin-offline",
  ],
}
