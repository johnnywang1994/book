# 快速上手 NextJS v13 - Data Fetching, Caching, Revalidating 篇

<SocialBlock hashtags="javascript,react,Next.js,Data Fetching,Caching,Revalidating" />

## 前言
Hi 大家好，我是 Johnny，本篇將接續前一篇[快速上手 NextJS v13 - 基礎觀念 AppRouter 篇](./next13-intro-approuter.html)，針對 Next13 `Date Fetching`, `Caching`, `Revalidating` 等部分進行介紹，關於 `Forms and Mutations` 部分屬於實作，建議直接[查看官網範例學習](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)，還沒看過前一篇的同志們，建議先閱讀完前篇之後再來閱讀這篇喔


## Data Fetching, Caching, and Revalidating
這部分算是 Next13 主要核心功能之一，主要有以下四種 data fetching 的方式：
1. 在 Server 端使用 fetch
2. 在 Server 端使用 NPM 依賴
3. 在 Client 端使用 Route Handler(類似舊的 `pages/api`)
4. 在 Client 端使用 NPM 依賴


## 在 Server 端使用 fetch
Next13 在 server 端擴展了原生的 fetch api，讓開發者可以更方便進行 `caching`, `revalidating`，在 `ServerComponent`, `RouteHandler`, `ServerAction` 都能直接透過 `async/await` 使用 fetch：
- [關於 Next13 的 fetch](https://nextjs.org/docs/app/api-reference/functions/fetch)
> React 本身擴展了 fetch，在 react component 中的 request 會被 `memoize`

比如在 `app/page.tsx` 中
```tsx
async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // 這會啟動最近的 `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page() {
  const data = await getData();
  return <main></main>;
}
```
> 注意點 1：Next 提供的 `cookies`, `headers` 在 Server Component 中使用，會因為其包含時間的特性，讓使用的路由被 Dynamic Render

> 注意點 2：Route Handler 中使用的 fetch 因為不在 React component 結構中，故不會被 `memoize`

> 注意點 3：如果需要在 Server Component 中使用 `async/await`，`typescript`版本需高於`5.1.3`，`@types/react` 則需高於 `18.2.8`

### Caching Data
Next13 預設會將 fetch 返回的內容存放在 server 端的 [Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache) 當中，也代表該 request 可以在 build time, request time 觸發，並 cache 資料
```js
// 'force-cache' 為預設值, 可以省略
fetch('https://...', { cache: 'force-cache' })
```
POST fetch 同樣會自動被 cache，除非是在 `Route Handler` 中的 POST 則不會被 cache

### Revalidating Data
`Revalidating` 是一個清除 cache data 並重新獲取最新 data 的過程，當 data 被更新後，而需要獲取其最新狀態時使用。

主要有兩種方式進行：
1. **[Time-based revalidation](https://nextjs.org/docs/app/building-your-application/caching#time-based-revalidation)**: 在固定時間後自動刷新，適用於非關鍵且不會頻繁更新的 data，使用方式如下
- 在單一 fetch 的 option 中設定
```js
fetch('https://...', { next: { revalidate: 3600 } })
```
- 在 route segment 中對該 route 中全部 fetch 設定
```js
/* layout.js/page.js */
export const revalidate = 3600;
// revalidate at most every hour
```
> 在 static render 的頁面中，如果使用了許多設定不同 revalidate time 的 fetch，則所有 fetch 都會套用最短的那個 fetch revalidate time

> 在 dynamic render 的頁面中，每個 fetch 的 revalidate time 都是獨立的


2. **On-demand revalidation**: 手動由事件觸發刷新（比如 form 表單），其中又分為 [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag), [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath) 兩種方式對 data group 一次性刷新，適用於關鍵且可能頻繁被更新的 data，使用於 `Route Handler`, `Server Actions` 中

- 如下對 fetch 加入 `collection` tag，之後只需要透過 `revalidateTag` 就可以刷新標注了特定 tag 的 fetch cache
```tsx
/* app/page.tsx */
export default async function Page() {
  // add tag name
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```
- 如果使用 Route Handler，則建議給 Next.js app 產生一個只有 app 本身知道的 secret token，藉此避免未授權的非法 revalidate 請求，如下範例
```
https://<your-site.com>/api/revalidate?tag=collection&secret=<token>
```
```ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const tag = request.nextUrl.searchParams.get('tag')

  if (secret !== process.env.MY_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!tag) {
    return NextResponse.json({ message: 'Missing tag param' }, { status: 400 })
  }

  revalidateTag(tag)

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
```
或是透過 `revalidatePath` 也可以
```ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')

  if (!path) {
    return NextResponse.json({ message: 'Missing path param' }, { status: 400 })
  }

  revalidatePath(path)

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
```

> 注意點 1：Revalidation 只在 [Nodejs Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes#nodejs-runtime)（預設）中生效

> 注意點 2：若在 revalidate 過程出現 error，則舊的 data 仍將被 cache 繼續使用，並在下一次 request 中再次嘗試進行 revalidate


### 什麼時候不會 cache？
- fetch 的 option 設定為 `cache: 'no-cache'`
- fetch 的 option 設定為 `revalidate: 0`
- Route Handler POST method 中的 fetch
- 在使用 `cookies`, `headers` 後的 fetch
- Route segment option 設定為 `const dynamic = 'force-dynamic'`
- Route segment option 設定 `fetchCache` 為 skip cache
- fetch 中使用 `Authorization`, `Cookie` header，且其前面有一個沒被 cached 的 request 在 component 中

對單一 fetch 設定不要 cache
```js
// layout.js or page.js
fetch('https://...', { cache: 'no-store' })
```


## 在 Server 端使用第三方 NPM 依賴
在 server 端使用第三方套件時，無法直接針對 fetch 進行設定，必須透過 [Route Segment Config Option](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) 或 React 的 `cache` function 設定

> data 是否被 cache 取決於該 route 是 static 或 dynamic rendered

### Example
以下範例中：
- revalidate 被設定為 `3600`
- 使用 React `cache` function 來 memoize request
```ts
/* utils/get-item.ts */
import { cache } from 'react'

export const revalidate = 3600 // revalidate the data at most every hour

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```
雖然在 Layout, Page 中共使用了兩次 getItem，但實際只會送出一個 request
```tsx
/* app/item/layout.tsx */
import { getItem } from '@/utils/get-item'

export default async function Layout({
  params: { id },
}: {
  params: { id: string }
}) {
  const item = await getItem(id)
  // ...
}
```
```tsx
/* app/item/[id]/page.tsx */
import { getItem } from '@/utils/get-item'

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const item = await getItem(id)
  // ...
}
```


## 在 Client 端使用 Route Handlers
如果需要在 client 端 fetch data，可以透過 Route Handler 在 server 端執行後返回 data 到 client 端，適用於不想暴露敏感資料（比如 api token）在 client 端的場景


## 在 Client 端使用第三方 NPM 依賴
也可以在 client 端使用像是 `SWR`, `React Query`，這些套件都有做比如 `memoizing requests`, `caching`, `revalidating`, `mutating data` 等功能

> 未來 [React RFC](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#usepromise) 的 `use` function 不建議在 client component 內包裹 fetch 使用，可能導致 component 多次 rerender



## Data Fetching Patterns
以下是在 React 和 Next.js 中獲取 data 的推薦模式和最佳實踐

### Fetching Data 在 Server 端
只要條件允許，盡量在 server 端 fetch data
- 對後端資源可以直接獲取
- 使 app 更加安全，避免敏感資料外流
- fetch 和 render 在同一環境進行，減少 client, server 溝通成本

### 哪裡使用資料就在哪 fetch
如果需要在多個地方使用相同資料，只需直接在需要使用資料的地方進行 fetch，而不是透過一個 global 狀態管理器或是傳遞 props data，不用擔心會對同樣的資料進行多次的 request（因為有自動 cache 機制）

### Streaming
Streaming 和 Suspense 是 React 的機制，允許開發者在 client side 進行漸進式的 UI render，透過 Server Component，可以讓不需要 data 的區塊內容快速顯示，僅在需要 data 的區塊展示 loading 狀態，讓用戶不需要等待整個頁面都載入完成，就能夠瀏覽到部分的畫面，詳細可參考[Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)、[Streaming 和 Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)相關介紹


### Parallel 及 Sequential Data Fetching
在 React app 中有兩種 data fetching 模式如下：
- **Sequential data fetching**: 在一個 route 中，request 之間彼此依賴，一個接一個執行，通常適用在一個 request 依賴前一個 request 回傳的內容時，但也可能是無心的操作，容易導致多餘不必要的冗長請求時間
- **parallel data fetching**: 在一個 route 中，request 同時並行進行，藉此減少 `client-server waterfalls` 及整體請求完畢的時間


#### Sequential Data Fetching
在 Next13 中，如果在 nested component 中的各組件中進行 data fetching，如果這些 data fetching 的目標內容不相同則這些操作會以 `Sequential` 的方式進行（相同目標內容的 fetch 會自動被 memoized）

比如下面 `Playlists` 中的 request，會等到 `getArtist` 完畢後才執行，因為 `Playlists` 依賴 prop `artistID`
```tsx
async function Playlists({ artistID }: { artistID: string }) {
  // Wait for the playlists
  const playlists = await getArtistPlaylists(artistID)
  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  )
}

export default async function Page({
  params: { username },
}: {
  params: { username: string }
}) {
  // Wait for the artist
  const artist = await getArtist(username)
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  )
}
```
在這種情況下，可以透過 [loading.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)(for route segments) 或是 [React `<Suspense>`](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense) 對請求中的組件進行處理，避免整個畫面被請求阻塞住，導致用戶無法與畫面中的其他部分互動


#### Parallel Data Fetching
若要將請求並行處理，則可以把 request 邏輯抽離 component 放在外部，接著在 component 中並行調用，藉此減少所有請求完成的時間，但這麼做用戶必須等待並行 request 都完成後才看得到畫面

如下範例中，把 `getArtist`, `getArtistAlbums` 定義在組件外部
```tsx
import Albums from './albums'

async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getArtistAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({
  params: { username },
}: {
  params: { username: string }
}) {
  // Initiate both requests in parallel
  const artistData = getArtist(username)
  const albumsData = getArtistAlbums(username)

  // Wait for the promises to resolve
  const [artist, albums] = await Promise.all([artistData, albumsData])
  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums}></Albums>
    </>
  )
}
```
並行使用的方式可以透過 [Suspense Boundary](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)，優化使用者體驗


### Preloading Data
要減少 client-server waterfalls，也可以在組件檔案中定義一個 `preload` function(名稱可以自由命名)，並在使用組件的地方提前並行調用，幫助組件在之後的 render 過程加速

```tsx
/* components/Item.tsx */
import { getItem } from '@/utils/get-item'

export const preload = (id: string) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
  void getItem(id)
}

export default async function Item({ id }: { id: string }) {
  const result = await getItem(id)
  // ...
}
```
```tsx
/* app/item/[id]/page.tsx */
import Item, { preload, checkIsAvailable } from '@/components/Item'

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  // starting loading item data
  preload(id)
  // perform another asynchronous task
  const isAvailable = await checkIsAvailable()
  return isAvailable ? <Item id={id} /> : null
}
```


### 使用 React cache, server-only 和 Preload Pattern
可以透過 React `cache`, `server-only` package, 以及 preload pattern 製作工具如下，確保此 request 能並行執行、cache data、且只在 server 端請求，並在之後由 `layout`, `page`, `component` 引入使用
```ts
import { cache } from 'react'
import 'server-only'

export const preload = (id: string) => {
  void getItem(id)
}

export const getItem = cache(async (id: string) => {
  // ...
})
```

<SocialBlock hashtags="javascript,react,Next.js,Data Fetching,Caching,Revalidating" />

## 結論
本篇主要是閱讀官方文件的筆記轉化後寫成，希望大家不會嫌棄內容太多，下一篇預計會是使用後統整的進階筆記，那就下篇見拉～=V=

