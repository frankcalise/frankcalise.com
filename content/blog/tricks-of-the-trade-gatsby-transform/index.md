---
slug: "/tricks-of-the-trade-gatsby-transform"
date: "2020-01-23"
title: "Tricks of the Trade: Gatsby + HTML Transforms"
description: "_I wanted to leverage Gatsby's <Link> component from markdown source, a lightweight HTML string to React element conversion library helps us achieve just that._"
keywords: ["gatsby", "javascript", "react", "transform", "conversion"]
banner: "./images/banner.jpg"
bannerCredit: "Photo by [Carrie Friesen](http://carriefriesenphotography.com/)"
---

## Overview

I help develop and maintain my girlfriend's online fitness program website over at [KristieLengel.com](https://kristielengel.com). It's a [Gatsby](https://www.gatsbyjs.org) generated site, hosted on [Netlify](https://www.netlify.com), using [Firebase](https://firebase.google.com/) as a backend. She uses [Netlify CMS](https://www.netlifycms.org/) to manage the content through different forms (but uses [Markdown](https://en.wikipedia.org/wiki/Markdown) under the hood) which works out pretty nicely (although, it can be buggy at times, I probably need to update the packages).

## The Problem

We wanted to make members' quality of life better by reducing some of the navigation they may have encountered when viewing a workout routine. The workout routine is rather simple, instructions of exercises, repetitions or interval timing formatted on the page however the text was provided via the CMS (which is a user friendly markdown editor). Each exercise or warm-up routine has a video associated with it so a member can get an idea of what s/he should do if unfamiliar with the movement.

At first implementation, the exercise nameswere just relative links to the exercise library within the site. You would click the exercise name (navigating away from the workout you're trying to do), read the title and description and/or play the video demonstration. Then the user has to press back and so forth.

To make this a better experience, if the user clicked on an exercise name (or any relative link that doesn't leave the site in this case), we wanted to just overlay the video on top of the workout routine. The only issue being my Gatsby template just passes me HTML converted from author's Markdown entered in the CMS. So how was I supposed to wire this up to launch in a modal or some overlay to get the desired behavior? The content was rendered with our scary named attribute, `dangerouslySetInnerHTML`.

So I asked Twitter:

https://twitter.com/frankcalise/status/1219745050298650630

But I didn't get any replies, because who wants to launch modals anyway?

## The Solution

I knew I wanted to leverage the [modal-routing Gatsby plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-modal-routing/) seeing as it added support for viewing other Gatsby routes within a modal view. I figured I had to somehow replace the standard anchor elements for the `<Link>` component, but how, I had a string of HTML elements to pass into a div:

```javascript
export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)
```

Then I stumbled upon this simple, yet perfect library, [htmr](https://github.com/pveyes/htmr), which takes an HTML string and converts it to valid React elements. You can give it as many transform options as you like along with the original string and out comes your React elements for rendering. For example, from the library's [documentation](https://github.com/pveyes/htmr/blob/master/README.md):

```javascript
const transform = {
  p: Paragraph,
  // you can also pass string for native DOM node
  a: 'span'
}

// will return <Paragraph><span>{'Custom component'}</span></Paragraph>
convert('<p><a>Custom component</a></p>', { transform });
```

So I wrote my transform to utilize the `<Link>` component along with the `asModal` attribute to get my desired output.

```javascript
// Transform to leave external links unchanged
// but send internal links to be viewed within a modal
const transform = {
  a: node => {
    const { href } = node;

    if (href.substr(0, 4) === "http") {
      return node;
    }

    return (
      <Link to={href} asModal>
        {node.children}
      </Link>
    );
  }
};

// <a href="/exercise-library/triangle-push-up/">Triangle Push-up</a>
// transforms to
// <Link to="/exercise-library/triangle-push-up/" asModal>Triangle Push-up</Link>
const newHtml = convert(workoutHtml, { transform });
```

We leave the external links alone, because I'd still want them to navigate to the site it is pointing to. But we transform the internal ones so they are viewed within a modal. Now the user can just click close or off to the side of the screen and be viewing the rest of the workout much more quickly.

## Summary

I was extremely happy to come up with such a simple solution to this. Shout out to [Fatih Kalifa](https://fatihkalifa.com/) for his fantastic conversion library. I'm sure there could be a more Gatsby-like way of solving this issue, so if you have any knowledge on writing Gatsby plugins and think I could have done this differently, I'd love to discuss it with you.