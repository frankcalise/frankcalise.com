import React from "react"
import { css } from "@emotion/core"
import GatsbyLink from "gatsby-link"

const Link = ({ children, to, ...other }) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink
        css={css`
          color: #448aff;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        `}
        to={to}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a
      css={css`
        color: #448aff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      `}
      href={to}
      {...other}
    >
      {children}
    </a>
  )
}

export default Link
