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

function Layout({ site, frontmatter = {}, children }) {
  const {
    siteMetadata: { description: siteDescription, keywords: siteKeywords },
  } = site

  console.log(site)

  const {
    keywords = siteKeywords,
    description = siteDescription,
    title = "Frank Calise",
  } = frontmatter

  return (
    <Fragment>
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
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </div>
    </Fragment>
  )
}

export default Layout

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
