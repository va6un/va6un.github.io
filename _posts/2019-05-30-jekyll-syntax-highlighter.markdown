---
layout: post
title: "jekyll syntax highlighter"
thumbnail: https://picsum.photos/200
categories: technology
---

[Rouge](http://rouge.jneen.net/) syntax highlighter is used in this webpage. To use it in our pages we need to install it

```shell
gem install rouge
```

To use add the following as build setting in the `_config.yml` file

```yaml
highlighter: rouge
```

For styling, I used `colourful.css` from [pygments-css](https://github.com/richleland/pygments-css). [http://richleland.github.io/pygments-css/](http://richleland.github.io/pygments-css/) has some preview of some the themes. Once you select the theme save it to the `css` folder in project. In the `main.scss` file import the css, in this case `colourful.css` as

```css
@import url("colorful.css");
```

And we are ready to use the highlighter in our posts.
