本篇主要只記載一些我個人覺得比較特殊需要筆記的內容～並不是整份文件喔！

## Start

### Install

```bash
$ npm install -D tailwindcss
$ npx tailwindcss init
```

### Configure

```js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Import

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
import './index.css'
```


## Core Concepts

### States

#### Pseudo-classes
- `hover`, `active`, `focus`
- `first`, `last`, `odd`, `even`
- `focus`, `disabled`, `invalid`, `checked`
- [`group`, `group-hover`...](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state)
- [`peer`, `peer-invalid`...](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state)

```html
<li class="first:pt-0 last:pb-0"></li>
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

#### Advanced topics
- Custom Classes

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

```html
<div class="lg:content-auto">
  <!-- ... -->
</div>
```

#### Creating custom modifiers

```js
let plugin = require('tailwindcss/plugin')

module.exports = {
  // ...
  plugins: [
    plugin(function ({ addVariant }) {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant('third', '&:nth-child(3)')
    })
  ]
}
```

#### Appendix
- [Quick reference](https://tailwindcss.com/docs/hover-focus-and-other-states#quick-reference)



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

#### Writing plugins

```js
const plugin = require('tailwindcss/plugin')

module.exports = {
  // ...
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        'h1': {
          fontSize: theme('fontSize.2xl'),
        },
        'h2': {
          fontSize: theme('fontSize.xl'),
        },
      })
      addComponents({
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.xl'),
        }
      })
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto',
        }
      })
    })
  ]
}
```


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
