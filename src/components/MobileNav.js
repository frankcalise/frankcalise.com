import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { FaTwitch, FaTwitter, FaLinkedin, FaGithubAlt } from "react-icons/fa"

const NAVIGATION = [
  { to: "https://twitter.com/frankcalise", label: <FaTwitter /> },
  { to: "https://github.com/frankcalise", label: <FaGithubAlt /> },
  { to: "https://twitch.tv/frankcalise", label: <FaTwitch /> },
  { to: "https://linkedin.com/in/frankcalise", label: <FaLinkedin /> },
]

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
          padding-right: 16px;
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
      {isOpen && (
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
          <div
            css={css`
              font-size: 24px;
              justify-content: space-evenly;
              margin: 0px auto;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
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
              to="/blog"
            >
              Blog
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
              to="/about"
            >
              About
            </Link>
            <div
              css={css`
                font-size: 24px;
                justify-content: space-evenly;
                margin: 25px;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
              `}
            >
              {NAVIGATION.map((item, index) => (
                <a
                  key={index}
                  css={css`
                    color: white;
                    text-decoration: none;
                    padding: 5px;
                    &:hover {
                      color: white;
                      background: rgba(0, 0, 0, 0.2);
                    }
                  `}
                  href={item.to}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNav
