---
permalink: /
title: Home
layout: default
---

## what does this project do?

`jekyll-tailwind` is simply a boilerplate for myself (and others) to create
jekyll sites, taking advantage of tailwind (and it's pretty typography
plugin), that seamlessly and easily work on GitHub Pages.

the best part? there is no reliance on node.js!

## are there any requirements?

a couple. on macos you will need to do the following (because the system ruby
version is out-of-date):

```sh
brew install chruby ruby-install
ruby-install ruby 3.1.3
```

and add the following to your `.zshrc` (or it's equivilant if
using a different shell):

```sh
if [[ "$(uname -s)" == "Darwin" ]]; then
        source /usr/local/opt/chruby/share/chruby/chruby.sh
        source /usr/local/opt/chruby/share/chruby/auto.sh
        chruby ruby-3.1.3
fi
```

regardless of your os, you will also need jekyll and bundler:

```sh
gem install jekyll bundler
```

and finally, tailwind itself:

```sh
brew install tailwindcss  # if you're on macos
paru -S tailwindcss-bin   # e.g. on arch linux
```
