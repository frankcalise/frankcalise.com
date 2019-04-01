import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import Layout from "../components/Layout"

const MarkdownPage = ({ data: { site }, children, frontmatter }) => {
  console.log(data)
  console.log(site)
  console.log(children)
  return (
    <Layout site={site} frontmatter={frontmatter}>
      <MDXRenderer>{children}</MDXRenderer>
    </Layout>
  )
}

export default MarkdownPage

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`;

