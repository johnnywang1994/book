# 差點錯過的 Tailwindcss 入門學習筆記
###### tags: `CSS` `tailwindcss` `2024`

<SocialBlock hashtags="css,tailwindcss,2024" />

本篇主要只記載一些我個人覺得比較特殊需要筆記的內容～並不是整份文件喔！

## Start

### Install

```bash
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init [--ts|--esm]
```

### Configure

```js
// for TS
import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
```

```js
// postcss.config
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// use with preprocessor
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Import

```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
/* entrypoint of your js file */
import './global.css'
```


## Core Concepts

### States

#### Pseudo-classes
- `hover`, `active`, `focus`
- `first`, `last`, `odd`, `even`
- `focus`, `disabled`, `invalid`, `checked`
- [`has`, `group-has-*`, `peer-has-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-descendants)
- [`group`, `group-hover`...](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state)
- [`peer`, `peer-invalid`...](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state)

```html
<li class="first:pt-0 last:pb-0"></li>

<label class="has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 ..">
  Google Pay
  <input type="radio" class="checked:border-indigo-500 ..." />
</label>

<!-- 可以藉由 group 搭配 group-has-* 做到，當同 group 內達成特定條件後套用樣式 -->
<div class="group ...">
  <img src="..." />
  <h4>Spencer Sharp</h4>
  <div class="hidden group-has-[a]:block ...">
    <img src="my-icon.svg" />
  </div>
  <p>Product Designer at <a href="...">planeteria.tech</a></p>
</div>
```

#### Pseudo-elements
- `before`, `after`
- `placeholder`
- [`file`](https://tailwindcss.com/docs/hover-focus-and-other-states#file-input-buttons)
- [`marker`](https://tailwindcss.com/docs/hover-focus-and-other-states#list-markers)
- [`selection`](https://tailwindcss.com/docs/hover-focus-and-other-states#highlighted-text)

#### Media queries
- `md`, `lg`...
- [`dark`](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-color-scheme)
- [`motion-reduce`, `motion-safe`](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)
- `portrait`, `landscape`
- `print`


### Responsive Design

- [Ref](https://tailwindcss.com/docs/responsive-design)

| Breakpoint prefix | Minimum width |
| -- | -- |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |


### Dark Mode

By default this uses the `prefers-color-scheme` CSS media feature, but you can also build sites that support toggling dark mode manually using the `class` strategy.

- [Ref](https://tailwindcss.com/docs/dark-mode)

```js
module.exports = {
  darkMode: 'class',
  // ...
}
```

```html
<!-- Dark mode not enabled -->
<html>
<body>
  <!-- Will be white -->
  <div class="bg-white dark:bg-black">
    <!-- ... -->
  </div>
</body>
</html>

<!-- Dark mode enabled -->
<html class="dark">
<body>
  <!-- Will be black -->
  <div class="bg-white dark:bg-black">
    <!-- ... -->
  </div>
</body>
</html>
```


### Reusing Styles

Extracting classes with `@apply`

```html
<!-- Before extracting a custom class -->
<button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
  Save changes
</button>

<!-- After extracting a custom class -->
<button class="btn-primary">
  Save changes
</button>
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

#### CSS Variable without var()
```html
<!-- old -->
<div class="bg-[var(--brand-color)] hover:bg-[var(--brand-hover-color)]"><div>
<!-- now -->
<div class="bg-[--brand-color] hover:bg-[--brand-hover-color]"></div>
```


### Custom Styles

- [Ref](https://tailwindcss.com/docs/adding-custom-styles)

#### Using arbitrary values

```html
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>

<div class="bg-[url('/what_a_rush.png')]">
  <!-- ... -->
</div>

<!-- white space -->
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>
```

> What is Layer?
> - `base`: for things like reset rules or default styles applied to plain HTML elements.
> - `components`: for class-based styles that you want to be able to override with utilities.
> - `utilities`: for small, single-purpose classes that should always take precedence over any other styles.


#### Removing unused custom CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* This won't be included in your compiled CSS unless you actually use it */
  .card {
    /* ... */
  }
}

/* This will always be included in your compiled CSS */
.card {
  /* ... */
}
```

> In under-the-hood, frameworks like Vue and Svelte are processing every single `<style>` block independently, and running your PostCSS plugin chain against each one in isolation.
> That means if you have 10 components that each have a `<style>` block, Tailwind is being run 10 separate times, and each run has zero knowledge about the other runs. Because of this, Tailwind can’t take the styles you define in a `@layer` and move them to the corresponding `@tailwind` directive


### Functions & Directives

#### Directives
- `@tailwind`
- `@layer`
- `@apply`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
}

@layer components {
  .btn-blue {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}

@layer utilities {
  .filter-none {
    filter: none;
  }
  .filter-grayscale {
    filter: grayscale(100%);
  }
}
```

> Any rules inlined with @apply will have !important removed by default to avoid specificity issues:

```css
/* Input */
.foo {
  color: blue !important;
}

.bar {
  @apply foo;
}

/* Output */
.foo {
  color: blue !important;
}

.bar {
  color: blue;
}
```

#### Functions
- `theme`, `screen`

```css
/* use dot in number */
.content-area {
  height: calc(100vh - theme('spacing[2.5]'));
}

.btn-blue {
  background-color: theme('colors.blue.500');
}

@media screen(sm) {
  /* ... */
}
/* equal to */
@media (min-width: 640px) {
  /* ... */
}
```

如果我們一邊在用 sass 又需要使用 `screen` 這種功能的話，可以像下面這樣結合 sass mixin 處理

```scss
@mixin rwd($size) {
  @media (min-width: theme("screens.#{$size}")) {
    @content;
  }
}

// 這樣我們就可以在 nested 結構下使用 tailwind 的變數了
h1 {
  @include rwd(sm) {
    color: red;
  }
}
```

<SocialBlock hashtags="css,tailwindcss,2022" />
