# Tailwindcss 進階學習筆記
###### tags: `CSS` `tailwindcss` `2024`

<SocialBlock hashtags="css,tailwindcss,2024" />

本篇主要只記載一些我個人覺得比較特殊需要筆記的內容～並不是整份文件喔！


## Main Document
### Layout
- [`box-decoration-*`](https://tailwindcss.com/docs/box-decoration-break)
- [`overscroll-*`](https://tailwindcss.com/docs/overscroll-behavior)
- [`grid-flow-*`](https://tailwindcss.com/docs/grid-auto-flow)
- [`space-x-*`, `space-y-*`](https://tailwindcss.com/docs/space)

```html
<!-- 控制屬性如 background, border 等是否要跨行連貫處理 -->
<span class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
  Hello<br />
  World
</span>
<!-- Preventing parent overscrolling -->
<div class="overscroll-contain ...">Well, let me tell you something, ...</div>
<!-- 控制 grid 元素擺放位置 -->
<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
  <div class="col-span-2">01</div>
  <div class="col-span-2">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
<!-- 添加元素間的間距（就不用自己用 margin 判斷最後一個不用加之類的問題） -->
<div class="flex space-x-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Flexbox & Grid
- [`grid-rows-subgrid`](https://tailwindcss.com/docs/grid-template-rows#subgrid)
```html
<!-- Subgrid 會自動偵測內部元素，在需要的時候自動擴展空間使用，不需要時則壓縮為 0px 隱藏區間 -->
<div role="menu" class="grid grid-cols-[auto_1fr]">
  <a href="#" class="grid-cols-subgrid col-span-2">
    <svg class="mr-2">...</svg>
    <span class="col-start-2">Account</span>
  </a>
  <a href="#" class="grid-cols-subgrid col-span-2">
    <svg class="mr-2">...</svg>
    <span class="col-start-2">Settings</span>
  </a>
  <a href="#" class="grid-cols-subgrid col-span-2">
    <span class="col-start-2">Sign out</span>
  </a>
</div>
```
> 關於 Subgrid 的官方說明可[參考這邊](https://tailwindcss.com/blog/tailwindcss-v3-4#subgrid-support)，關於 MDN Web 相關 Subgrid 的原生說明可[參考這邊](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid)

### Sizing
- [`size-*`](https://tailwindcss.com/docs/size)
- [`h-dvh`, `h-lvh`, `h-svh`](https://tailwindcss.com/docs/height#dynamic-viewport-height)
```html
<!-- w-16, h-16 寫起來很煩，直接用 size-16 吧 -->
<div class="size-16 ...">
  <img />
</div>
```

### Typography
- [`line-clamp-3`](https://tailwindcss.com/docs/line-clamp)
- [`list-image-*`](https://tailwindcss.com/docs/list-style-image)
```html
<!-- 可以自定義圖片作為 ul 的 list style -->
<ul class="list-image-[url(carrot.png)] ...">
  <li>5 cups chopped Porcini mushrooms</li>
  <!-- ... -->
</ul>

<!-- all -->
<p class="text-lg leading-7 ...">
<!-- shorthand -->
<p class="text-lg/7 ...">
  So I started to walk into the water. I won't lie to you boys, I was terrified. But
  I pressed on, and as I made my way past the breakers a strange calm came over me.
  I don't know if it was divine intervention or the kinship of all living things but
  I tell you Jerry at that moment, I <em>was</em> a marine biologist.
</p>
```

### Backgrounds
- [`from-inherit`, `from-10%`, `from-[21.56%]`](https://tailwindcss.com/docs/gradient-color-stops)

```html
<!-- 漸層背景斷點 -->
<div class="bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90% ...">
  <!-- ... -->
</div>
```

### Borders
- [`ring-*`](https://tailwindcss.com/docs/ring-width)
```html
<button class="... ring-offset-2 ring-2">Button A</button>
```


### Tables
- [`caption-top`, `caption-down`](https://tailwindcss.com/docs/caption-side)
```html
<table>
  <caption class="caption-bottom">
    Table 3.1: Professional wrestlers and their signature moves.
  </caption>
  <!-- ... -->
</table>
```

### Effects
- [`mix-blend-*`](https://tailwindcss.com/docs/mix-blend-mode)
```html
<!-- 製作圖層疊加效果時的好幫手 -->
<div class="flex justify-center -space-x-14">
  <div class="mix-blend-multiply bg-blue-400 ..."></div>
  <div class="mix-blend-multiply bg-pink-400 ..."></div>
</div>
```

### Interactivity
- [`accent-*`](https://tailwindcss.com/docs/accent-color)
- [`appearance-*`](https://tailwindcss.com/docs/appearance)
- [`scroll-smooth`](https://tailwindcss.com/docs/scroll-behavior)
- [`snap-*`](https://tailwindcss.com/docs/scroll-snap-type)

```html
<!-- 覆蓋原生瀏覽器的 input checkbox 樣式之類 -->
<label>
  <input type="checkbox" checked> Browser default
</label>
<label>
  <input type="checkbox" class="accent-pink-500" checked> Customized
</label>
<!-- 覆蓋原生瀏覽器的 select 樣式之類 -->
<select class="appearance-none row-start-1 col-start-1 bg-slate-50 dark:bg-slate-800 ...">
  <option>Yes</option>
  <option>No</option>
  <option>Maybe</option>
</select>
<!-- 全局平滑滾動效果 -->
<html class="scroll-smooth">
  <!-- ... -->
</html>
<!-- 滾動停頓點效果（類似輪播的效果） -->
<div class="snap-x ...">
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
</div>
```



## Advanced Topics
### Custom Classes
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


### Styling children
- [`*` variant](https://tailwindcss.com/blog/tailwindcss-v3-4#style-children-with-the-variant)
```html
<!--
  從父層選擇下一次的所有元素套用，一般而言推薦直接把樣式寫在子元素上，
  但如果因為一些原因子元素非我們可控制時就可以這樣寫
-->
<ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
  <li>Sales</li>
  <li>Marketing</li>
  <li>SEO</li>
  <!-- ... -->
</ul>
```

### CSS mask-image
```jsx
import StickerBg from '@/assets/sticker_mask.svg';


const StickerItem = () => {
  return (
    <div className="relative w-[89px] h-[107px]">
      <StickerBg />
      <div className="absolute bottom-0 w-full h-[83%] flex items-center justify-center">
        <img
          src="/ania.png"
          className="relative w-full h-full object-contain [mask-image:url('../assets/sticker_mask.svg')] [mask-size:cover]"
        />
      </div>
    </div>
  );
}
```

### Creating custom modifiers
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

### Arbitrary Variants (specify element selector)
- [Link](https://tailwindcss.com/blog/tailwindcss-v3-1#arbitrary-values-but-for-variants)

```html
<div class="[&>*]:p-4">...</>
<div class="[&>p]:mt-0 ">...</div>
<div class="[&:nth-child(3)]:py-0">
  <!-- ... -->
</div>

<!-- reset html input[type=number] style -->
<input type="number" class="focus:outline-none focus:ring-0 border-0 [appearance:none] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

<input type="text" className="[&::placeholder]:text-red-500" />
```

### Appendix
- [Quick reference](https://tailwindcss.com/docs/hover-focus-and-other-states#quick-reference)

### Writing plugins
客製化 TailwindCSS 的 plugin
```js
const plugin = require('tailwindcss/plugin')

module.exports = {
  // ...
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, addVariant, matchVariant, theme }) {
      addBase({
        html: {
          'font-family':
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Microsoft JhengHei, Helvetica Neue, Helvetica, Arial, sans-serif'
        },
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
          // if you have install "postcss-nested"
          '&:hover': {
            boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
          },
          '@media (min-width: 500px)': {
            borderRadius: '.5rem',
          }
        }
      })
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto',
        },
        '.text-primary': {
          '@apply text-gray-800': {},
        }
      })
      addVariant('optional', '&:optional')
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('starting-style', ['@starting-style'])
      matchVariant(
        'nth',
        (value) => {
          return `&:nth-child(${value})`;
        },
        {
          values: {
            1: '1',
            2: '2',
            3: '3',
          }
        }
      );
    })
  ]
}
```



## Customization

### Extend Screens
```js
import type { Config } from "tailwindcss";
import { screens } from 'tailwindcss/defaultTheme';

const config: Config = {
  theme: {
    screens: {
      xs: '441px',
      ...screens
    }
  }
}

export default config;
```


### Content

#### Safelist
雖然最佳狀態下希望根據使用狀況引入所需的最小 bundle class，但某些內容可能是動態產生，以致於 tailwind 沒辦法在掃描時發現他們，這時可以利用 safelist 確保某些 class 被強制引入
```js
module.exports = {
  content: [
    './pages/**/*.{html,js}'
    './components/**/*.{html,js}',
  ],
  safelist: [
    'bg-red-500',
    'text-3xl',
    'lg:text-4xl',
  ]
  // ...
}
```


## Configuration Demo
```js
const tailwindcssSafeArea = require('tailwindcss-safe-area');
const tailwindForms = require('@tailwindcss/forms');
const tailwindAspectRatio = require('@tailwindcss/aspect-ratio');

const defaultFontFamily = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
];

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: defaultFontFamily,
    },
    fontSize: {
      xs: ['0.625rem', '1rem'],
      'title-xs': ['0.75rem', '1rem'],
      28: ['1.75rem', '2.25rem'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      primary: '#06C755',
      positive: '#3CC926',
      negative: '#FF334B',
      disabled: '#E4E4E4',
      warn: '#FF6F37',
      category: 'var(--category-color)',
      gray: {
        100: '#FCFCFC',
        200: '#EFEFEF',
        300: '#DFDFDF',
        350: '#C8C8C8',
        400: '#B7B7B7',
        500: '#949494',
        600: '#777777',
        700: '#555555',
        800: '#303030',
        900: '#111111',
      },
    },
    opacity: {
      0: '0',
      50: '.5',
      100: '1',
    },
    borderRadius: {
      DEFAULT: '3px',
      100: '3px',
      200: '5px',
      300: '7px',
      circle: '9999px',
      none: 'none',
    },
    boxShadow: {
      DEFAULT: '0px 1px 6px rgba(0, 0, 0, 0.12)',
      'on-white-100':
        '0px 0px 2px rgba(0, 0, 0, 0.07), 0px 1px 2px rgba(0, 0, 0, 0.07)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
    extend: {
      borderWidth: {
        0.5: '0.5px',
        3: '3px',
      },
      spacing: {
        13: '3.25rem',
        'fixed-offset': 'var(--fixed-offset)',
        'fixed-offset-top': 'var(--fixed-offset-top)',
      },
      colors: {
        category: 'var(--category-color)',
        test: {
          blue: '#3657BB',
          yellow: '#FFC53D',
        },
      },
      outlineOffset: {
        '-1': '-1px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcssSafeArea, tailwindForms, tailwindAspectRatio],
  // //-- if used with 3rd party UI component library
  // corePlugins: {
  //   preflight: false,
  // },
  // //-- if tailwind is the main custom css system for you in project
  // important: true,
};
```

<SocialBlock hashtags="css,tailwindcss,2024" />