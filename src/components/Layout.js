import React from "react"
import Helmet from "react-helmet"
import { graphql, StaticQuery } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Global, css } from "@emotion/core"
import Header from "./Header"
import mdxComponents from "./mdx"
import { fonts } from "../utils/typography"

import '../fonts/fonts.css'
import "../themes/material-darker-theme.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

export const globalStyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: #EFEFEF;
  }
  pre {
    border-radius: 4px;
    font-size: 14px;
  }
  pre,
  code {
    font-family: ${fonts.regular}, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
  }
  a {
    color: #448aff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

function Layout({ data, frontmatter = {}, children }) {
  const {
    site: {
      siteMetadata,
      siteMetadata: { description: siteDescription, keywords: siteKeywords },
    },
  } = data

  const {
    keywords = siteKeywords,
    description = siteDescription,
    title = siteMetadata.title,
  } = frontmatter

  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      <Global styles={globalStyles} />
      <Helmet
        title={title}
        meta={[
          { name: "description", content: description },
          { name: "keywords", content: keywords.join() },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <div>
        <Header />
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </div>
    </div>
  )
}

export default function LayoutWithSiteData(props) {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              description
              keywords
            }
          }
        }
      `}
      render={data => <Layout data={data} {...props} />}
    />
  )
}
