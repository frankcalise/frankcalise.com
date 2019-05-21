import React from "react"
import { css } from "@emotion/core"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import Markdown from "react-markdown"
import { screenSmallMax } from "../utils/media"
import Layout from "../components/Layout"
import Share from "components/share"

export default function Post({ data: { mdx } }) {
  const {
    title,
    date,
    banner,
    bannerCredit,
    slug,
    description,
  } = mdx.frontmatter

  const blogPostUrl = `https://www.frankcalise.com${slug}`

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
      {banner && (
        <div
          css={css`
            text-align: center;
            p {
              margin-bottom: 0;
            }
            ${screenSmallMax} {
              padding: 0;
            }
          `}
        >
          <Img sizes={banner.childImageSharp.sizes} alt={``} />
          {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}
        </div>
      )}
      <br />
      {description ? <Markdown>{description}</Markdown> : null}
      <MDXRenderer>{mdx.code.body}</MDXRenderer>

      <div>
        <p css={{ textAlign: "right" }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // using mobile.twitter.com because if people haven't upgraded
            // to the new experience, the regular URL wont work for them
            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
              blogPostUrl,
            )}`}
          >
            Discuss on Twitter
          </a>
        </p>
      </div>
      <div>
        <p css={{ textAlign: "right" }}>
          <Share
            url={blogPostUrl}
            title={title}
            twitterHandle={"@frankcalise"}
          />
        </p>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        bannerCredit
        slug
        keywords
      }
      code {
        body
      }
    }
  }
`
