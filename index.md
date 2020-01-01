---
layout: content
---

<!-- # Varun Bhuvanendran

[https://gjuniioor.github.io/clyell](https://gjuniioor.github.io/clyell) -->

<!-- ### About

It's just one more [jekyll](https://github.com/jekyll/jekyll) theme. Maybe it's has some appearance like a linux console. :)

[Bootstrap](http://getbootstrap.com/) was added to turn responsible. Thanks, [@magnunleno](https://github.com/magnunleno). -->

<!-- ### Features

- [x] Google analytics
- [x] Disqus
- [x] Responsible
- [x] Highlights for code -->

<!-- ### Characteristics

- [x] Customized (and nice :P) 404 page
- [x] Simple
- [x] Friendly to read -->

<!-- ### Screenshots

![Screenshot]({{ site.baseurl }}images/screenshot/01.png)

![Screenshot]({{ site.baseurl }}images/screenshot/02.png) -->

<!-- ### Config file example

~~~ yml
# Site settings
title: note book!
email: va6un.b@gmail.com
description: Personal Blog!!!
url: https://va6un.github.io
author: Varun Bhuvanendran
footer: va6un.github.com

# Build settings
markdown: kramdown
permalink: /:categories/:title/
highlighter: rouge
~~~ -->

# Blog
<ul class="posts">
    {% for post in site.categories.blog %}
        <li>
            <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
            ::
            <a class="post-link" href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
            @ {
            {% assign tag = post.tags | sort %}
            {% for category in tag %}<span><a href="{{ site.baseurl }}category/#{{ category }}" class="reserved">{{ category }}</a>{% if forloop.last != true %},{% endif %}</span>{% endfor %}
            {% assign tag = nil %}
            }
        </li>
    {% endfor %}
</ul>