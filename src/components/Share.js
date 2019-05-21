import React from "react"
import { css } from "@emotion/core"
import { TwitterShareButton } from "react-share"

const Share = ({ url, title, twitterHandle }) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div {
        margin-right: 20px;
        cursor: pointer;
        :hover {
          color: #448aff;
        }
      }
      span {
        margin-right: 20px;
        font-size: 70%;
        text-transform: uppercase;
        line-height: 2.5;
        opacity: 0.7;
      }
    `}
  >
    <div
      css={css`
        flex-grow: 1;
        border-top: 1px solid #448aff;
      `}
    />
    <span>Share article</span>
    <TwitterShareButton
      url={url}
      title={title}
      via={twitterHandle.split("@").join("")}
    >
      Twitter
    </TwitterShareButton>
  </div>
)

export default Share
