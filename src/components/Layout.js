import React, { Fragment } from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
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
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ site, frontmatter = {}, children }) => {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter

  const keywords = (frontmatterKeywords || siteKeywords).join(", ")
  const description = frontmatterDescription || siteDescription

  return (
    <Fragment>
      <Helmet
        title={title}
        meta={[
          { name: "description", content: description },
          { name: "keywords", content: keywords },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <MDXProvider components={mdxComponents}>
        <Fragment>
          <header style={{ marginBottom: `1.5rem` }}>
            <Link
              to="/"
              style={{ textShadow: `none`, backgroundImage: `none` }}
            >
              <h3 style={{ display: `inline` }}>Frank Cailse</h3>
            </Link>
            <ul style={{ listStyle: `none`, float: `right` }}>
              {NAVIGATION.map(navigation => (
                <ListLink key={navigation.to} to={navigation.to}>
                  {navigation.label}
                </ListLink>
              ))}
            </ul>
          </header>
          {children}
        </Fragment>
      </MDXProvider>
    </Fragment>
  )
}

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
    }
  }
`
