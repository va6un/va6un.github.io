---
layout: post
title:	"how to react!"
date:	2019-05-30 12:00:00
categories:
    - blog
tags:
    - frontend
    - react
---



The best way to start a rect app is by using the `create-react-app` module. The installation steps are from react [documentation](https://facebook.github.io/create-react-app/docs/getting-started). So to install the module

~~~sh
npm install create-react-app
~~~

To create an app

~~~sh
npx create-react-app <app-name>
~~~

To start the app, from the project folder run the `npm start`, which servers the app in `localhost:3000`

~~~sh
npm start
~~~

As a starter the `src/App.js` is the place to start.

~~~sh
├── node_modules
├── package.json
├── package-lock.json
├── public
├── README.md
└── src
~~~

I have a github repo [react-boilerplate](https://github.com/va6un/react-boilerplate) which is having some of the boilerplate code which I have compiled to learn React. Also created a `gist` for the components.

<script src="https://gist.github.com/va6un/72721dadc51010f787232ad290c2b56d.js"></script>

Redux, formik, protected-route gist

<script src="https://gist.github.com/va6un/29d3419d6b8104e7b9cd234eb7528222.js"></script>

Hope this might help. Also point out issues and improvements. Will keep updating.
