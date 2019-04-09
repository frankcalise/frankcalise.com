import React from "react"
import { css } from "@emotion/core"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

import Layout from "../components/Layout"
import Link from "../components/Link"

export default function Post({ data: { mdx }, pageContext: { next, prev } }) {
  const { title, date, banner } = mdx.frontmatter
  return (
    <Layout frontmatter={mdx.frontmatter}>
      <h1
        css={css`
          text-align: center;
          margin-bottom: 20px;
          margin-top: 0;
        `}
      >
        {title}
      </h1>
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          h3,
          span {
            text-align: center;
            font-size: 15px;
            opacity: 0.6;
            font-family: sans-serif;
            font-weight: normal;
            margin: 0 5px;
          }
        `}
      >
        {date && <h3>{date}</h3>}
      </div>
      {banner && <Img sizes={banner.childImageSharp.sizes} alt={``} />}

      <MDXRenderer>{mdx.code.body}</MDXRenderer>

      <div>
        {prev && (
          <span>
            Previous <Link to={prev.fields.slug}>{prev.fields.title}</Link>
          </span>
        )}
        {next && (
          <span>
            Next <Link to={next.fields.slug}>{next.fields.title}</Link>
          </span>
        )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        slug
        keywords
      }
      code {
        body
      }
    }
  }
`
