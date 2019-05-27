---
slug: "/authentication-in-react-with-aut0"
date: "2019-05-25"
title: "Authentication in React with Auth0"
description: "_How to implement authentication with Auth0 in React 16.8+ (hooks/context)._"
keywords: ["react", "javascript", "context", "auth0", "hooks", "authentication"]
# banner: "./images/banner.jpg"
# bannerCredit: "Photo by [Carrie Friesen](http://carriefriesenphotography.com/)"
---

## Overview

Let's face it, when you're creating an application today, you may very well need a way
for the user to sign up and login to get to more content. It might be you have free content until the user registers or maybe account specific data not to be shared with
other users. Of course there are simple ways to roll your own, but who wants to reinvent the wheel? I know I'm not actually interested in knowing all the details of OAuth. Maybe your required to use enterprise level identity providers via SAML, social identity providers (Facebook, Google, Twitter) or just want to get on with writing your actual application.

There are several services out there from which you can choose to implement access control to your web applications. [Auth0](https://auth0.com), [Firebase](https://firebase.google.com/), and [Amazon Cognito](https://aws.amazon.com/cognito/). At my company, [Vitralogy](https://vitralogy.com), we chose Auth0 as our way to handle authentication in our React applications. Their pricing scales with the amount of users your application needs, so you don't have to pay big early on in development. They also offer a [Startup Plan](https://auth0.com/blog/auth0-startup-plan/) for new companies. This post will cover a solution with Auth0 in a React app using the Context API and Hooks.

## Prerequisites

Before jumping into this solution, you should read [Kent C. Dodds'](https://kentcdodds.com) excellent blog post [Authentication in React Applications](http://https://kentcdodds.com/blog/authentication-in-react-applications) as this example leverages the app structure used there. Coming from the Auth0 provided exa,[;e] (and using it in production for quite some time now), I can say Kent's implementation offers a much clearer solution.

You should also be familiar with React's [Context API](https://reactjs.org/docs/context.html), [Hooks](https://reactjs.org/docs/hooks-intro.html) and [React Router](https://github.com/ReactTraining/react-router). If you're writing any new code (or planning on refactoring a feature you have in place already), you'll definitely want to utilize these React features going forward.

> Note, you can use a different router, such as [Reach Router](https://reach.tech/router).
> Recently on [Twitter](https://twitter.com/ReactTraining/status/1129431499424423936) they mentioned the two are converging in features
> and React Router will live on going forward.

[Sign up](https://auth0.com/signup) via GitHub or email to Auth0 so you can get your application key to begin adding auth to your project. You'll also want to add the dependency to your project via `npm install --save auth0-js`.

## Auth0 Basics

Using the [example application](https://github.com/auth0-samples/auth0-react-samples/tree/master/01-Login) provided by Auth0, let's first write an outline of what needs to occur:

1. Display some component the user may see when not authenticated
2. Initiate a login (or sign up) by displaying a form
3. Enter credentials
4. Auth0 will verify credentials and
    * Return an error if login was unsuccessful
    * If successful, callback to some specified route with the web token
5. Upon successful authentication, display protected content

The structure in their example is to setup a new `Auth` object, a class they have defined to provider a wrapper around the auth-js `WebAuth` class. 

```jsx
// src/Auth/Auth.js
// Full source at https://github.com/auth0-samples/auth0-react-samples/blob/master/01-Login/src/Auth/Auth.js
// ...
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }
// ...
}
```

Then declare your routes providing this object as a prop to each component.

```jsx
// src/routes.js
import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
```

As you can see, the auth prop is passed in to all routes. If you dive into the Home component, you'll see there is a check to see whether or not the user has logged in, conditionally rendering the protected data or not. When Auth0 calls back into your application via the `/callback` route, the app will test the hash from `window.location` and set the token to localStorage in this example.

And this works just fine. But we don't really want to conditionally render in every component whether the user is logged in or not. As your app scales, you'll have more routes and passing the Auth instance everywhere seems like we could just lift it up into a Context, letting the children consume if they need. Wouldn't it be better if we were able to structure the app so it shows a set of screens if not authenticated and a different set when the user is actually logged in?

## Modern React Approach



## Summary