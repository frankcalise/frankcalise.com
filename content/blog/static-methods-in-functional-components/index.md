---
slug: "/static-methods-in-functional-components"
date: "2020-02-09"
title: "Static Methods in Functional Components"
description: "_A quick how-to on how to use static methods with functional components in React._"
keywords:
  [
    "hooks",
    "javascript",
    "react",
    "react-navigation",
    "functional",
    "components",
    "static",
  ]
banner: "./images/banner.jpg"
bannerCredit: "Photo by [Carrie Friesen](http://carriefriesenphotography.com/)"
---

## Overview

Recently, I took on a new position as a [React Native](https://facebook.github.io/react-native/) developer. I've had past experiences with mobile development (both Objective-C for iOS and Java for Android), but this is my first position using React for mobile. I had dabbled with a proof of concept at my last gig, but mainly kept to web for my day to day. While familiarizing myself with the new codebase (a typical [Expo](https://expo.io) build, with [React Navigation](https://reactnavigation.org/)) I realized every component was written with classes. Nothing wrong with that, but knowing the power of [Hooks](https://reactjs.org/docs/hooks-intro.html), I figured I'd take a stab at implementing my new mobile components this way.

## The Problem

Using `react-navigation` before version 5 (this project actually uses a very old, 1.x), the way to configure screen options is to implement the static method `navigationOptions` for your class component. You're probably familiar with seeing something like this:

```javascript
class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const nav = {
      title: "My Dashboard",
      headerTitleStyle: {
        flex: 1,
        textAlign: "center",
        alignSelf: "center",
      },
      backButton: {
        color: "#FFF",
      },
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    //...
  }
}
```

Not being the greatest JavaScript developer in the world, I actually didn't know how I would go about doing this within a functional component (so I could leverage hooks).

## The Solution

Static methods are not called on the instance of the class, but the actual class itself. With a functional component, the syntax looks like this:

```javascript
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

function Dashboard({ navigation }) {
  return (
    <View flex={1}>
      <View>My Functional Component</View>
      <TouchableOpacity
        // You can use the navigation prop passed in above
        // For example, go back on a stack navigator
        onPress={() => navigation.goBack()}
      >
        <Text>Let's go back!</Text>
      </TouchableOpacity>
    </View>
  )
}

// Our static navigationOptions method
Dashboard.navigationOptions = ({ navigation }) => {
  title: 'My Dashboard'
  // Again here the navigation prob can be used to get access
  // to navigation.state.params, etc
}
```

## Summary

That's pretty much all there is to it! Now we can build components that use hooks, get rid of the `this` keyword and have some good ole functional fun. Hopefully this helps if you were wondering on how to accomplish this.