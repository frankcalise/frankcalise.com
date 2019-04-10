---
slug: "/an-intro-to-the-blog"
date: "2018-04-09"
title: "First Post"
description: "An Intro to the Blog"
keywords: ["blog", "javascript", "intro"]
banner: "./images/banner.jpg"
---

import Link from "$components/Link";

The beginnings of a new blog.

Testing what code rendering looks like:

```jsx
import React from "react"
import PropTypes from "prop-types"
import Icon from "react-fa/lib/Icon"
import FormControl from "react-bootstrap/lib/FormControl"
import InputGroup from "react-bootstrap/lib/InputGroup"
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger"
import Tooltip from "react-bootstrap/lib/Tooltip"
import './Input.css'

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  onPressEnter: PropTypes.func,
  onKeyDown: PropTypes.func,
  tooltip: PropTypes.string,
  beforeIcon: PropTypes.string,
}

const defaultProps = {
  type: "text",
}

const fixControlledValue = value => {
  if (typeof value === "undefined" || value === null) {
    return ""
  }

  return value
}

class Input extends React.Component {
  constructor(props) {
    super(props)

    const value =
      typeof props.value === "undefined" ? props.defaultValue : props.value

    this.state = { value }
  }

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        value: nextProps.value,
      }
    }

    return null
  }

  setValue = (value, e, callback = null) => {
    if (!("value" in this.props)) {
      this.setState({ value }, callback)
    }

    const { onChange } = this.props
    if (onChange) {
      onChange(e)
    }
  }

  handleChange = e => {
    // let event = e;
    this.setValue(e.target.value, e)
  }

  handleKeyDown = e => {
    const { onPressEnter, onKeyDown } = this.props

    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e)
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  render() {
    const { beforeIcon, type, id, tooltip } = this.props
    const { value } = this.state
    const input = (
      <FormControl
        type={type}
        className="vit-input"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        value={fixControlledValue(value)}
      />
    )

    let wrappedInput = input

    // Handle possible tooltip
    if (tooltip) {
      const tipElement = <Tooltip id={`input-tooltip-${id}`}>{tooltip}</Tooltip>
      wrappedInput = (
        <OverlayTrigger placement="top" overlay={tipElement}>
          {input}
        </OverlayTrigger>
      )
    }

    return (
      <InputGroup>
        {beforeIcon && (
          <span className="input-addon-before">
            <Icon name={beforeIcon} />
          </span>
        )}

        {wrappedInput}
      </InputGroup>
    )
  }
}
```
