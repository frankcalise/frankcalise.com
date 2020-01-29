import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Link from "../components/Link"
import SEO from "../components/SEO"

const Blog = ({
  data: { allMdx },
  pageContext: { pagination, categories },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const posts = page.map(id => allMdx.edges.find(edge => edge.node.id === id))

  return (
    <Layout>
      <SEO title={`Blog`} />
      {posts.map(({ node: post }) => (
        <div key={post.id}>
          <h2>
            <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
          </h2>

          <p>{post.excerpt}</p>

          <Link to={post.frontmatter.slug}>Continue Reading</Link>
        </div>
      ))}

      <hr />

      <div>
        <ul>
          {nextPagePath && (
            <li>
              <Link to={nextPagePath}>Next</Link>
            </li>
          )}

          {previousPagePath && (
            <li>
              <Link to={previousPagePath}>Previous</Link>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allMdx {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
