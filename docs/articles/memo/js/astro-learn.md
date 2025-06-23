# Astro 入門學習筆記

這篇是我使用 Astro `v4.0.8` 製作一個 Vuepress-like 的部落格後，整理的一篇學習筆記，供日後使用到的時候可以快速複習使用


## Why Astro?
Astro 是用於建立內容驅動網站（例如部落格、行銷和電子商務）的 Web 框架，與其他框架相比，該架構可減少 JavaScript 開銷和複雜性。


## What's different
- Astro 以內容展示為主要能力，相較於大多數的框架來說，建構複雜的內容呈現時所消耗的性能大幅減少
- 內建集成 React, Vue 及其他前端框架能力
- Route handling 內建路由處理

### Astro Island
Astro 開創並推廣了一種稱為「Islands」的前端架構，幫助您避免單一的 JavaScript 模式並自動從頁面中剝離所有非必要的 JavaScript，從而提高前端效能，透過 `.astro` 的編譯能輕鬆做到在單一頁面中的不同元件，使用多種的渲染方式 `interactive`, `static:html`, `` 等等


## Install
- 新建專案
```bash
$ yarn create astro
```


## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run sync ...`        | Run CLI commands `astro sync` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


## 🚀 Project Structure
- `astro.config.mjs` - Astro configuration 檔案.
- `public/*`: unprocessed assets(fonts, icons, etc.)
- `src/*`: 專案 source code
```text
└── 📁src
    └── 📁components
        └── Image.tsx
        └── Link.astro
        └── Link.tsx
        └── ...
    └── 📁config
        └── ...
    └── 📁containers
        └── 📁articles
            └── ...
        └── 📁base
            └── ...
        └── 📁home
            └── ...
    └── 📁content
        └── 📁articles
            └── 📁css
                └── ...
            └── ...
        └── config.ts
    └── 📁hooks
        └── ...
    └── 📁layouts
        └── ...
    └── 📁lib
        └── ...
    └── 📁pages
        └── 📁articles
            └── [...slug].astro
        └── index.astro
    └── 📁stores
        └── ui.tsx
    └── 📁styles
        └── ...
```

### Astro 會進行特殊處理的 folder
- `src/pages`: Astro 處理 [Pages](https://docs.astro.build/en/core-concepts/astro-pages/) 的地方，會自動把裡面的 `.astro`, `.md`, `.html` 等等根據檔案名稱作為 Route
- `src/content`: Astro 內存放各種 [Content Collections](https://docs.astro.build/en/guides/content-collections/) 的地方，通常是 `.md`, `.json` 等等，存放在這的檔案可透過 `src/content/config.ts` 中透過 `defineCollection` 進行資源的 schema 統一設定，對資源進行檢查，並在任何地方透過內建的 `getCollection` 函數取出對應資源類型，適合用在 dynamic route 處理靜態資源時使用

### 無特殊處理的 folder
- `src/layouts`: 存放 [Layouts](https://docs.astro.build/en/core-concepts/layouts/)，可提供 props 提升彈性
- `src/components`, `src/containers`: 通常用來存放各種 astro, jsx, vue 組件
- `src/config`: 存放各種 config 設定，包含 `tailwindcss/theme`, `site config` 等等
- `src/hooks`: 存放 react hooks
- `src/lib`: 存放 utils
- `src/stores`: 存放跨組件 state，官方推薦使用 [nanostores](https://docs.astro.build/en/core-concepts/sharing-state/#why-nano-stores)


## Routing 處理
- [Link](https://docs.astro.build/en/core-concepts/routing/)
Astro 使用標準 HTML `<a>` 元素在路線之間導覽。沒有提供特定於框架的 `<Link>` 元件
```
# Example: Static routes
src/pages/index.astro        -> mysite.com/
src/pages/about.astro        -> mysite.com/about
src/pages/about/index.astro  -> mysite.com/about
src/pages/about/me.astro     -> mysite.com/about/me
src/pages/posts/1.md         -> mysite.com/posts/1
```

### route base
可以在 [Astro Configuration](https://docs.astro.build/en/reference/configuration-reference/#base) 中使用 `base` 調整 route 的 base 路徑


## Astro 語法
- [Link](https://docs.astro.build/en/core-concepts/astro-syntax/)
基本上 `.astro` 語法與 `jsx` 非常類似，最重要差別在使用 `class` 而不是 `className`，並且綁定事件需使用原生 js 的方式，因為在 `.astro` 的上部 script 中是在 server 端或 build time 執行，添加事件需使用 `<script>` tag 處理

```html
<button id="button">Click Me</button>
<script>
  function handleClick () {
    console.log("button clicked!");
  }
  document.getElementById("button").addEventListener("click", handleClick);
</script>
```

## View Transition
- [Link](https://docs.astro.build/en/tutorials/add-view-transitions/)
添加 Astro page 切換時過場動畫

### Update Script
- [Link](https://docs.astro.build/en/tutorials/add-view-transitions/#update-scripts)
使用 View Transition 時需注意，某些 script 不會像 full reload 再跑一次的問題，需要使用 Astro 提供的兩個 event 來特別處理 `astro:page-load`, `astro:page-swap`
```html
<script>
const loadTheme = () => {
	const lastTheme =
		localStorage.getItem(LocalStorageKeys.Theme) || getDefaultTheme();
	document.documentElement.classList.toggle("dark", lastTheme === 'dark');
	document.getElementById('main-content')?.classList.remove('hidden');
};

document.addEventListener('astro:page-load', loadTheme)
</script>
```


## Typescript
使用 Astro Typescript 時需要注意以下幾種情況

### src/components
雖然 `.astro` 可以處理 ts 語法，但如果在 `reload Astro Project` 或建立新的 ts 內容後，沒有引入使用到的 component，有可能會跳出 tslint error（或根據情況應該要跳出 error 但卻沒有自動 ts 驗證到），解決方式是需要將該 ts 內容（假設是一個組件），引入到一個 page 組件當中並打開該 page 檔案查看，藉此讓 Astro 編譯到該 ts 內容，只要 Astro 編譯到該內容後就會去執行相關的 ts 檢驗

### src/content
另外如果是 `src/content` 的內容，如果之前完全沒有任何內容在 `src/content` 裡，突然新增內容後，需要手動跑 `npx astro sync`，告訴 Astro 去檢驗 content collection 的內容並產出對應的 ts schema type


## UI Frameworks
Astro 集成了非常多常用的 [Frameworks](https://docs.astro.build/en/guides/integrations-guide/)，包含 js, css

### Install Tailwindcss
```bash
$ npx astro add tailwind
```

### Install react
```bash
$ npx astro add react
```

### Install mdx
```bash
$ npx astro add mdx
```
