import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default function MarkdownPage({children }) {
  const site = {
    siteMetadata: {
      siteUrl: "https://www.frankcalise.com/",
      author: "Frank Cailse",
      title: "The personal website of Frank Calise",
      description:
        "Thoughts on becoming a better software engineer and bodybuilder.",
      keywords: ["Software Engineer", "Bodybuilder"],
    },
  }
  return <Layout site={site}>{children}</Layout>
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        author
        title
        description
        keywords
      }
    }
  }
`
