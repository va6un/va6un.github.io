---
layout: post
title: "some React-ions!"
thumbnail: https://picsum.photos/200
categories: technology
---

The best way to start a rect app is by using the `create-react-app` module. The installation steps are from react [doumentation](https://facebook.github.io/create-react-app/docs/getting-started). So to install the module

```shell
npm install create-react-app
```

To create an app

```shell
npx create-react-app <app-name>
```

To start the app, from the project folder run the `npm start`, which servers the app in `localhost:3000`

```shell
npm start
```

As a starter the `src/App.js` is the place to start. 
```shell
├── node_modules
├── package.json
├── package-lock.json
├── public
├── README.md
└── src
```

For creating a new component, say `<Home /> within `App.js`

```jsx
const Home = () => {
  return <div>Home component!</div>;
};
```

We will create a component `<Example/>` with class [Hooks](https://reactjs.org/docs/hooks-effect.html) and without using a `class`.

continue...









