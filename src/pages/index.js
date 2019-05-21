import React from "react"
import Layout from "../components/Layout"
import Link from '../components/Link'

export default function Index() {
  return (
    <Layout>
      <p>
        Hey, welcome! My site is still very much in the works, but the{" "}
        <Link to="/blog">Blog</Link> and <Link to="/about">About</Link> pages
        are live.
      </p>
      <p>
        If I was to wait on getting the layout the way I like it, I'd never
        launch and produce actual content.
      </p>
    </Layout>
  )
}
