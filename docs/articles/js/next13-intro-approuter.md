# 快速上手 NextJS v13 - 基礎觀念 AppRouter 篇

<SocialBlock hashtags="javascript,webpack,vue,react,module-federation" />

## 前言
Hi 大家好，我是 Johnny，這陣子公司同事開始接觸到 Next13 相關的開發，覺得我也是時候來研究下，索性花了幾個小時快速體驗了一下，並將一些我覺得比較重要的特點記錄下來，這篇是我速讀 Next13 官方文件後整理的一個隨性筆記！主要包含 `基礎觀念`, `AppRouter` 的規則等等，`Data Fetching` 會再出一篇介紹，本篇主要專注在 Next13 的新功能、觀念上面。

> 筆者撰寫文章時 NextJS 版本為 `v13.4.4`


## 首先 NextJS v13 究竟做了啥？
先簡單總結幾個最大的特點
- `初始化 0 配置`，讓新手也能專注在理解 NextJS 的資料夾結構、概念，而不是浪費時間在一堆非必要的初始設定、配置
- 新的 `App Router 模式`，提供高度客製化 Routing 的能力
- `Server Component 模式`及相關好用 API，提供開發前端程式時的資料處理安全性、SEO 優化能力、以及盡可能地減少 client side 消耗的處理效能
- `Server-Centric routing` 快速反應路由切換，Router 內建 `in-memory client-side cache` 機制，避免不必要的頁面內容 reload 影響效能

以上是我目前對於 NextJS v13 的一點理解，下面就來實際看看程式碼吧！


## 初始化 0 配置
透過 `yarn create next-app` 快速建立新的 NextApp，點開 `next.config.js` 只有下面這樣，對於新用戶來說可以完全忽略這個 config 設定部分！雖然後期開發一定會需要調整，但在初期建立專案或新手來說非常方便。
```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
```


## Server Component VS Client Component
預設為 `Server Component`，可透過在檔案最上方定義 `use client`, `use server` 明確設定
```tsx
// 預設其實就是...，除了 error handling component
'use server';

import Image from 'next/image'

export default function Home() {
  return (<div>Hello Home</div>);
}
```

如果在 server component 中使用像是 `useEffect`, `useState` 等 client side only 的 hook 將會報錯
```
ReactServerComponentsError:
You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
```

想要像原本 `Pages Router` 方式撰寫 client side component 可以這樣寫
```tsx
'use client';

import Image from 'next/image';

// 下面就是 Pages Router 方式的原本寫法，這裡省略 =V=
```


## 什麼是 App Router？
`App Router` 是 v13 新介紹的一種 routing 方式，與之相對過去的方式被稱作 `Pages Router`，可以在官方網站左側按鈕切換兩種路由模式的 Documentation

> 為求說明方便，底下內容皆以 Typescript 進行說明，`App Router`簡稱`A.R`，`Pages Router`簡稱`P.R`

首先了解一下一個概念，比較好理解後面提到的東西：
- `P.R`: 以 `File` 為單位定義頁面，該頁面相關設定必須放在外部管理、引入，較難客製化
- `A.R`: 以 `Folder` 為單位定義頁面，該頁面所有相關設定可直接放在 folder 層級中，可高度客製化


### app 資料夾裡都裝什麼？
`A.R` 方式在 `app` 資料夾中主要可以使用以下幾種 NextJS 會進行處理的文件
- `page.tsx`: 定義當前層級頁面(與 `route.tsx` 不可同時存在同一層中)
  - `route.tsx`: 定義當前層級 route handler(類似`P.R`方式時的`pages/api/xxx.tsx`)
- `layout.tsx`: 定義當前層級與子層共享的 UI 版型(若父層有 layout，會被父層 layout 包裹起來)
  - `template.tsx`: 與 `layout` 類似，但在路由切換時會 remount 新的 instance（`layout` 若路由切換前後一樣，則相同部分不會被 remount 新 instance）
- `loading.tsx`: 定義當前層級頁面與子層的 loading UI
- `error.tsx`: 定義當前層級頁面與子層的 error UI（不會 catch 同一層的 `layout.tsx` 錯誤，需要 catch `layout.tsx` 錯誤需要在上一層級的 `error.tsx` 中處理，若為 `rootLayout`，則請在 `global-error.tsx` 中處理）
  - `global-error.tsx`: 與 `error.tsx` 基本相同，但主要用來定義處理 `rootLayout` 的錯誤
- `not-found.tsx`: 定義當 component 中呼叫 `notFound` 方法或是匹配不到任何頁面時的 UI

> 以上檔案在各層中會反覆出現，並不是只有一層喔！～除了以上基本的檔案名稱外，可以[參考這邊](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions)查看其他會被 NextJS 處理的檔案名稱，除了這些檔案名稱外的檔案可以安心放在裡面自由運用

## Page 定義基本頁面
以下兩種模式分別建立路徑 `/`, `/about` 的頁面，Dynamic Routing 機制可[參考這邊](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- `P.R`: `pages/index.tsx`, `pages/about.tsx`
- `A.R`: `app/page.tsx`, `app/about/page.tsx`
```tsx
// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <h1>Hello, Home page!</h1>;
}
```

**下圖是 Nested Routing 範例**
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fdefining-routes.png&w=3840&q=75)

### Page 的特點
- page 永遠是路由 Tree 的最末端葉片部分
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fterminology-component-tree.png&w=3840&q=75)
- 如果要讓該層路由可被 public 訪問，必須建立 page
- page 預設為 `Server Component`，但可以手動設定為 `Client Component`
- page 可以進行 Fetch Data 操作，[詳情請見這裡](https://nextjs.org/docs/app/building-your-application/data-fetching)


## Layout 定義共享版型
以下兩種模式分別建立路徑 `/`, `/about` 頁面的 layout，其中 `/` 的 layout 會將 `/about` 的 layout 包裹在其中
- `P.R`: 沒有內建，需手動處理完成需求
- `A.R`: `app/layout.tsx`, `app/about/layout.tsx`

> Layout 必須明確接收 prop `children`，並將其返回

```tsx
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav></nav>

      {children}
    </section>
  );
}
```

**下圖是 Nested Layout 範例**
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ffile-conventions-component-hierarchy.png&w=3840&q=75)
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fnested-file-conventions-component-hierarchy.png&w=3840&q=75)

### Layout 的特點
- `app` 資料夾中，最上層的 `layout.tsx` 被稱為 `RootLayout`
- 路由中的 `layout` 可以 nested，透過 `children` 層層包裹
- 透過 [`Route Groups`](https://nextjs.org/docs/app/building-your-application/routing/route-groups) 可以選擇性讓路由套用不同的 layout
- `layout` 預設為 `Server Component`，除了 `RootLayout` 外，可以手動設為 `Client Component`

### 關於 RootLayout
基本上是用來取代 `P.R` 方式中的 `_app`, `_document`
- 必須存在且為 `Server Component`，將套用到整個應用程式頁面當中
- 必須在其中包含 `<html> and <body>` tag，因為 NextJS 並沒有為用戶定義
- 透過 [`Route Groups`](https://nextjs.org/docs/app/building-your-application/routing/route-groups) 可以建立 `multiple root layout`


## Head（頭?）去哪了？
過去我們常用 `<Head>` component 幫助我們在頁面中客製化 SEO meta，現在我們可以直接透過 [`metadata object`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#the-metadata-object) 或 [`generateMetadata function`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function) 定義

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js',
};

export default function Page() {
  return '...';
}
```

> **官方良心建議**：盡量使用 `Metadata API`，不要手動在 `RootLayout` 使用 `<head>` 加入 `<title>`, `<meta>`等，前者會自動處理套用 `streaming`, `de-duplicating` `<head>` 標籤的功能



## 連結、路由切換 - Linking and Navigating

### Link
連結切換同樣使用 NextJS 提供的 `<Link>` 就行～詳細文件可以[參考這邊](https://nextjs.org/docs/app/api-reference/components/link)

### Navigating 流程機制
- route transition 被 `<Link>` or `router.push()` 觸發
- router 更新 browser 網址列 URL
- router 透過重複利用未改變的 `client-side cache`(e.g. shared layouts) 避免不必要的更新工作，也稱作 `partial rendering`
- 如果符合 `soft navigate` 條件，則直接從 cache 返回內容，不會再去 server 拿一次，不符合則進行 `hard navigate` 從 server 獲取 `Server Component payload`
- created 後，當從 server 獲取 payload 時顯示 Loading UI
- router 將 cache 或更新的 payload 渲染在 client

> 關於 `client-side cache` 的[詳細解釋請看這裡](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#client-side-caching-of-rendered-server-components)

> 關於 `soft/hard navigate` 的[詳細解釋請看這裡](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#soft-navigation)



## 路由群組 - Route Group
簡單來說，route group 就是一種讓我們在 `A.R` 方式的 `app` 資料夾下，將 routes 分門別類拆分開來，卻又不影響原來 route 的解析流程的一種技術

啥意思勒？看圖看圖～
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-organisation.png&w=3840&q=75)

透過 `(group-name)` 的方式，我們將屬於同一類型的頁面集中放在其中，命名為 `(marketing)`，透過這方式我們可以很輕易的把 route 進行分類管理，大幅提升開發體驗

### 同層級 Multiple Layout
另一個 route group 的好用之處在於，我們可以在不同 group 中定義只屬於該 group 的 layout，且不影響其外部的其他頁面
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-opt-in-layouts.png&w=3840&q=75)

### Multiple Root Layout
如果把最上層的 `app/layout.tsx` 刪掉，並在其中的 group 中各自定義 `layout.tsx`，就可以讓同一應用程式套用完全兩套獨立的 `Root Layout`，對於需要在同一系統中顯示完全不互相影響的 layout 進行開發非常有幫助
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-multiple-root-layouts.png&w=3840&q=75)

### Route Group 的特點
- group 的命名完全不影響 route 解析
- 請勿在 group 中重複使用相同的 URL path，將會報錯(`(marketing)/about/page.js`, `(shop)/about/page.js` 兩者會衝突)
- 在 multiple root layouts 頁面間切換路由將觸發 `full page load` 整頁刷新（相對於原本的 client-side load）


## 載入畫面 - Loading UI
`loading.tsx` 基本上是以下圖結構的方式，將頁面內容包裹在 `Suspense` 當中，詳細可[參考這裡](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Floading-overview.png&w=3840&q=75)
```tsx
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}
```


## 錯誤處理 - Error Handling
`error.tsx` 基本上是以下圖結構的方式，將頁面內容包裹在 `ErrorBoundary` 當中，詳細可[參考這裡](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ferror-overview.png&w=3840&q=75)
```tsx
// Error components 必須為 Client Components
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    // 嘗試透過 re-render 恢復 segment
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
```

### 錯誤恢復機制 - Recovering From Errors
`error.tsx` 提供一套錯誤恢復機制，透過呼叫 `reset` function，可以讓 page 重新進行嘗試載入，詳細可[參考這裡](https://nextjs.org/docs/app/building-your-application/routing/error-handling#recovering-from-errors)

> **注意**：`error.tsx` 並不 catch 同層 layout 中的 error，若要 catch layout 請在上一層中的 `error.tsx` 或是 root 的 `global-error.tsx`處理。
```tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```


## 路由處理 - Route Handler
`route.tsx` 讓開發者能透過 web api `request`, `response` 對請求進行處理（API...），與 `layout.tsx`一樣可以在 app 的任意子層中出現，但不可與 `page.tsx` 出現在同一層中，將會報錯

```tsx
// app/my-api/route.tsx
import { NextResponse } from 'next/server';

export const GET = async (equest: Request) => {
  return NextResponse.json({
    msg: 'Johnny Good Good',
  })
}
```

### Behaviors
- 靜態路由處理：預設 `GET` 為靜態處理
- 動態路由處理：符合以下條件將為動態處理
  - 在 `GET` 中使用到 `Request` object
  - 使用到任何 `GET` 以外的 HTTP methods
  - 使用到任何 dynamic function，比如 `cookies`, `headers`，詳細可[參考這裡](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-functions)
  - 手動設定 `Segment Config Options` 為 dynamic mode

```tsx
// app/my-api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  });
  const product = await res.json();

  return NextResponse.json({ product });
}
```

<SocialBlock hashtags="javascript,webpack,vue,react,module-federation" />


## 結論
這篇不知不覺又打了有點長，但這次 v13 真的很多新觀念，篇幅上稍微變得很長還請大家諒解，不過其實這樣還沒講完 XD，還有 `Data Fetching` 的部分就留待下一篇紀錄拉～

對我來說，對於 v13 的第一印象是「這是啥！？」，沒錯ＸＤ，相信有寫過 NextJS 一段時間的讀者應該都是差不多這感覺，不過細細看完 Documentation 後發覺，確實這次 v13 很多改版的內容解決了許多之前遇到的痛點，比如 layout 客製化彈性、server side 與 client side 互動模式、loading UI 套用等等在之前的版本都需要相當的精力去自己實作，雖然也很好玩能學到東西，但有些地方確實有重複造輪子的感覺，v13 更多的是在架構層面上引入了 Server Component 的理念，並將其真正融入到了原有的開發體驗中，相信之後 Next 的團隊還會再推出更多讓人耳目一新的概念與想法，推動社群繼續成長！

今天就先記錄到這邊拉，如果覺得文章對你有幫助的話，歡迎幫我分享給更多人看看喔～謝謝大家 =V=~~ 掰掰～

