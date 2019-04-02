import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"

function MobileNav({ color = "white" }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mobile-nav">
      <button
        onClick={toggleOpen}
        aria-label={`${isOpen ? "Close nav menu" : "Open nav menu"}`}
        css={css`
          z-index: 30;
          top: -5px;
          position: relative;
          background: transparent;
          border: none;
          :hover:not(.touch),
          :focus {
            background: transparent;
            border: none;
            outline: none;
          }
        `}
      >
        <div
          css={css`
            width: 24px;
            height: 2px;
            background: ${color};
            position: absolute;
            left: 0;
            ${isOpen ? "background: transparent" : `background: ${color}`};
            transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
            ::before {
              content: "";
              top: -8px;
              width: 24px;
              height: 2px;
              background: ${isOpen ? "white" : `${color}`};
              position: absolute;
              left: 0;
              ${isOpen
                ? "transform: rotate(45deg); top: 0; "
                : "transform: rotate(0)"};
              transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
            }
            ::after {
              top: 8px;
              content: "";
              width: 24px;
              height: 2px;
              background: ${isOpen ? "white" : `${color}`};
              position: absolute;
              left: 0;
              ${isOpen
                ? "transform: rotate(-45deg); top: 0;"
                : "transform: rotate(0)"};
              transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
            }
          `}
        />
      </button>
      {toggleOpen && (
        <div
          css={css`
            position: absolute;
            z-index: 20;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            background: #448aff;
          `}
        >
          <Link
            css={css`
              color: white;
              text-decoration: none;
              padding: 5px;
              &:hover {
                color: white;
                background: rgba(0, 0, 0, 0.2);
              }
            `}
            to="/about"
          >
            About
          </Link>
          <Link
            css={css`
              color: white;
              text-decoration: none;
              padding: 5px;
              &:hover {
                color: white;
                background: rgba(0, 0, 0, 0.2);
              }
            `}
            to="/blog"
          >
            Blog
          </Link>
        </div>
      )}
    </div>
  )
}

export default MobileNav
