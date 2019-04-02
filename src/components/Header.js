import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import MobileNav from "./MobileNav"
import { screenSmallMax } from "../utils/media"

const NAVIGATION = [
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
]

const ListLink = props => (
  <Link
    css={css`
      color: black;
      text-decoration: none;
      padding: 5px;
      &:hover {
        color: white;
        background-color: #448aff;
      }
      ${screenSmallMax} {
        display: none;
      }
    `}
    to={props.to}
  >
    {props.children}
  </Link>
)

const Header = () => (
  <header
    css={css`
      margin-bottom: 1.5rem;
      ${screenSmallMax} {
        padding: 35px 0 0 0;
      }
    `}
  >
    <nav
      css={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
        <h3 style={{ display: `inline` }}>Frank Calise</h3>
      </Link>
      <div
        css={css`
          font-size: 16px;
          line-height: 1.25;
          display: flex;
          align-items: right;
          .mobile-nav {
            display: none;
            visibility: hidden;
            ${screenSmallMax} {
              display: block;
              visibility: visible;
            }
          }
        `}
      >
        <MobileNav color={"#4f424c"} />
        {NAVIGATION.map(navigation => (
          <ListLink key={navigation.to} to={navigation.to}>
            {navigation.label}
          </ListLink>
        ))}
      </div>
    </nav>
  </header>
)

export default Header
