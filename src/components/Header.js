import React from "react"
import Link from './Link'
import { css } from "@emotion/core"
import MobileNav from "./MobileNav"
import { screenSmallMax } from "../utils/media"

const NAVIGATION = [
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
]

// const StyledLink = props => (
//   <Link
//     css={css`
//       color: black;
//       text-decoration: none;
//       &:hover {
//         text-decoration: underline;
//       }
//     `}
//     to={props.to}
//   >
//     {props.children}
//   </Link>
// )

const ListLink = props => (
  <Link
    css={css`
      color: black;
      padding-bottom: 6px;
      margin-right: 40px;
      border-bottom: solid 4px rgba(255, 255, 255, 0);
      transition: all 175ms cubic-bezier(0.65, 0.05, 0.36, 1);
      text-decoration: none;
      &:hover {
        text-decoration: none;
        padding-bottom: 4px;
        border-bottom: 4px solid #448aff;
      }
      &:last-child {
        margin-right: 0px;
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
      <Link to="/">
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
