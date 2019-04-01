import React from "react"
import Helmet from "react-helmet"
import { graphql, Link, StaticQuery } from "gatsby"
import { css } from "@emotion/core"
import { MDXProvider } from "@mdx-js/tag"
import { createGlobalStyle } from "styled-components"

import "prismjs/themes/prism-okaidia.css"

// import Link from "./Link"
import mdxComponents from "./mdx"

createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  ${() => {
    /* Override PrismJS Defaults */ return null
  }}

  pre {
    background-color: #2f1e2e !important;
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }
`

const NAVIGATION = [
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
]

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link
      css={css`
        color: black;
        text-decoration: none;
        padding: 5px;
        &:hover {
          color: white;
          background-color: #448aff;
        }
      `}
      to={props.to}
    >
      {props.children}
    </Link>
  </li>
)

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
        <header style={{ marginBottom: `1.5rem` }}>
          <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
            <h3 style={{ display: `inline` }}>Frank Calise</h3>
          </Link>
          <ul style={{ listStyle: `none`, float: `right` }}>
            {NAVIGATION.map(navigation => (
              <ListLink key={navigation.to} to={navigation.to}>
                {navigation.label}
              </ListLink>
            ))}
          </ul>
        </header>
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
