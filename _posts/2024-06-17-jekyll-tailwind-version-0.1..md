---
layout: post
title:  Jekyll-Tailwind Version 0.1.
date:   2024-06-17 00:00:58
categories: jekyll tailwind
---
I did it! I created a site using Jekyll and tailwind! Without `node.js`{:.javascript}!

I even made a helper script to make a new Jekyll post file with some basic front
matter (more on that later).

To my future self, or anyone else who would like to know, the following should be
a nice guide for how to get started on something similar.

## How did I do it?

Firstly, I installed Ruby. I have a MacBook for when I am sat anywhere but my desk,
and a PC running Arch (btw) for when I *am* at my desk (*and* when Arch is behaving
itself and not broken for whatever reason it is this week).

### A Mini-Installation Guide For Jekyll

For anyone running MacOS, I recommend reading the
[Jekyll installation guide](https://jekyllrb.com/docs/installation/macos/),
as it covers how to install a compatible version of Ruby that differs to the system
one. That said, Apple might stop packing together a system-Ruby soon, so it might
be worth using the actual

Install a new(er) version of Ruby:

```sh
brew install chruby ruby-install
ruby-install ruby 3.1.3
```

And add the following to your `.zshrc` (or it's equivalent when using a different
shell):

```sh
if [[ "$(uname -s)" == "Darwin" ]]; then
        source /usr/local/opt/chruby/share/chruby/chruby.sh
        source /usr/local/opt/chruby/share/chruby/auto.sh
        chruby ruby-3.1.3
fi
```

Otherwise, simply install the latest Jekyll and Bundler gems (make sure that the
gem binaries are in your `$PATH`{:.sh}):

```sh
gem install jekyll bundler
```

### An Even Shorter One For Tailwind

Also, install the tailwind CLI:

```sh
brew install tailwindcss  # if you're on macos
paru -S tailwindcss-bin   # e.g. on arch linux
```

### The Actual Problem Solving and Hair Pulling

In hindsight, it's actually *really* simple. I can say that now because I'm now
a front-end developer (btw). The issues I was facing were phantom and made up,
because they went away in the end.

Firstly, I got rid of all the **bloat** from the initial Jekyll structure (I say,
using tailwind) and got to work.

I created a tailwind config, using:

```sh
tailwind init
```

I know. I even added some extra lines to the config! This tells tailwind which
files to scan so it knows the necessary CSS to produce, as well as activating
the typography plugin, which let's me use the `prose` feature.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/*.html',
    './_layouts/*.html',
    './_posts/*.md',
    './*.md',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
```

But that is not all. I did not want to have a separate window simply for spawing
a tailwind process, so I did a little bit of automating. In `_plugins/`, I
created a `build_css.rb` script:

```ruby
Jekyll::Hooks.register :site, :post_write do |site|
  system('tailwindcss -i ./_sass/_base.scss -o ./assets/css/index.css --minify')
end
```

Note: I must admit, this time I actually experimented with the little DuckDuckGo
chat feature -- the above script was 'created' by Claude A.I. Maybe I should give
these LLMs some credit -- are they more useful than I've thought? I did have to
change some file names around -- I refuse to use `input.css` and `output.css`!

I made some layouts too:

* 'Default' for home and about, which purely displays the relavent markdown content.
* 'Post-Feed' for a list of all the posts, because this was special.
* 'Post' for (guess).

These layouts all rely on the header and footer includes. It's a small bit of separation
of concerns.

One last thing -- Jekyll knows how to add code blocks, but does not ship the CSS
automagically, so I took a
[native CSS](https://jwarby.github.io/jekyll-pygments-themes/languages/javascript.html#)
theme compatible with Jekyll's engine, Rogue, and included it as an asset.

Hopefully this project is easy to maintain and there isn't any breaking change that
will wipe away this milestone...

## Why?

There were a couple guides out there for getting started with Jekyll, however:

1. I like to makes things difficult for myself apparently and wanted to how to
   set up a Jekyll site and blog on my own.
2. Their templates were quite robust and I did not want to fork their site, try
   to change something and have it break in my face.
3. Mine is therefore nice and simple.
4. I did not want to litter the repo's root directory with 10 different
   configurations for `node.js`, webpack, etc.
5. Also I did not want to have yet another dependency on `node_modules/`! It's everywhere
   when it should not be!

That is all. Blog done.
