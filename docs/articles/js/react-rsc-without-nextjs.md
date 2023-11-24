# Create a React Server Components Project without NextJS - 製作一個不依賴 NextJS 的 React Server Components 專案

<SocialBlock hashtags="javascript,nextjs,rsc,server-components" />

## 前言
Hi, 大家好，我是 Johnny，最近研究了一下 NextJS 14 具體是如何操作處理 Server Component 的渲染機制跟流程，把源碼裡 `server` 的部分原始碼看了個底朝天，花了一整個禮拜的閒暇時間才終於看懂整個流程，完整內容非常的複雜，我會用比較簡單的描述並節錄部分原始碼，把重點流程記錄下來，接下來的內容會比較艱澀難懂一些，推薦有一定的 JS 基礎再來閱讀喔～


## 渲染流程與相關檔案
開始之前，先介紹這次閱讀核心的 NextJS app render 到 html 的流程，包含關鍵函數名稱、細節，從上層往底層順序依序如下:（推薦都先打開相關的原始碼檔案一邊閱讀文章一邊查看原始碼會比較好理解喔）
- `packages/next/src/server/app-render/app-render.tsx`: renderToHTMLOrFlightImpl
  - `packages/next/src/server/app-render/app-render.tsx`: renderToStream, RenderResult
    - `packages/next/src/server/app-render/app-render.tsx`: createServerComponentsRenderer
      - `packages/next/src/server/app-render/create-server-components-renderer.tsx`: useFlightResponse, `React.use()`
        - `packages/next/src/server/app-render/use-flight-response.tsx`: createFromReadableStream, ssrManifest, `ReadableStream.tee()`
    - `packages/next/src/server/app-render/app-render.tsx`: createStaticRenderer
      - `packages/next/src/server/app-render/static/static-renderer.ts`: renderToReadableStream
    - `packages/next/src/server/render-result.ts`: toUnchunkedString
- `packages/next/src/server/stream-utils/node-web-streams-helper.ts`: streamToString


## 使用到的函數介紹
- `renderToHTMLOrFlightImpl`: 接收 server 端 req, res 並查找出對應的 render page 後，根據環境條件返回最終渲染結果
- `renderToStream`: 最終返回 stream 並傳遞給 `RenderResult` class
- `RenderResult`: 接收 stream 實例化，可透過其中的 `toUnchunkedString` 方法將 `createStaticRenderer` 創建實例後 render 出的 ReadableStream 轉為 html string
- `createServerComponentsRenderer`: 此函數內部會透過 `createServerComponentRenderer` 去創建一個 React 組件 `ServerComponentsRenderer`，該組件內部會先用 `react-server-dom-webpack/server.edge` 的 `renderToReadableStream` 得到 ReadableStream(此時為靜態分析物件，非 html stream)，接著用 `react-server-dom-webpack/client.edge` 的 `createFromReadableStream` 轉為提供 `React.use()` 去生成組件的結果
  - `renderToReadableStream`: 接收組件內容，轉為靜態分析用的 readable stream
  - `createFromReadableStream`: 接收靜態分析的 readable stream 並轉換為可提供 `React.use()` 使用的內容
- `streamToString`: 轉換 stream 為 string


## 把原始碼以文字描述（較為冗長，建議搭配源碼閱讀）
核心檔案在 `app-render.ts` 中
1. 首先創建 `ServerComponentsRenderer` 組件
  - 透過 `createServerComponentsRenderer` 拿到 `ServerComponentsRenderer`
  - createServerComponentsRenderer 中透過 `react-server-dom-webpack/server.edge` 方法`renderToReadableStream` 把 `app-render.ts` 內的組件轉為 readableStream（此時為靜態分析）
  - `createServerComponentRenderer` 函數會返回 `ServerComponentWrapper` 組件，其中會呼叫 `useFlightResponse`，透過 `createFromReadableStream` 把 stream 轉為 response
  - 最終透過 `react` 的 `use` 函數，把 response 轉為 react element 回傳
2. `app-render.ts` 中，透過 `createStaticRenderer` 創建 `renderer`
  - renderer 透過 `react-dom/server.edge` 的 `renderToReadableStream` 轉為 readableStream
  - readableStream 傳入 `render-result.ts` 的 `RenderResult` 方法 `toUnchunkedString` 轉為 html 字串


## 直接看原始碼拉～
底下的原始碼已經從不同檔案中整理抽出需要的重點部分，方便一次性閱讀
```tsx
async function renderToHTMLOrFlightImpl(
  req: IncomingMessage,
  res: ServerResponse,
  pagePath: string,
  query: NextParsedUrlQuery,
  renderOpts: RenderOpts,
  baseCtx: AppRenderBaseContext
) {
  // 這一步是為了讓 react-server-dom-webpack 能拿到對應模組而 hack
  // We need to expose the bundled `require` API globally for
  // react-server-dom-webpack. This is a hack until we find a better way.
  if (ComponentMod.__next_app__) {
    // @ts-ignore
    globalThis.__next_require__ = ComponentMod.__next_app__.require

    // @ts-ignore
    globalThis.__next_chunk_load__ = ComponentMod.__next_app__.loadChunk
  }

  // ignore...

  const renderToStream = getTracer().wrap(
    AppRenderSpan.getBodyResult,
    {
      spanName: `render route (app) ${pagePath}`,
      attributes: {
        'next.route': pagePath,
      },
    },
    async ({
      asNotFound,
      tree,
      formState,
    }: {
      /**
       * This option is used to indicate that the page should be rendered as
       * if it was not found. When it's enabled, instead of rendering the
       * page component, it renders the not-found segment.
       *
       */
      asNotFound: boolean
      tree: LoaderTree
      formState: any
    }) => {
      // ignore...

      // 這一步入口在 createServerComponentsRenderer，得到一個經過靜態分析後，渲染用的組件
      const ServerComponentsRenderer = createServerComponentsRenderer(tree, {
        ctx,
        preinitScripts,
        options: serverComponentsRenderOpts,
      })
      // 我們要渲染的目標放進去最裡面了！！
      const children = (
        <HeadManagerContext.Provider
          value={{
            appDir: true,
            nonce,
          }}
        >
          <ServerInsertedHTMLProvider>
            <ServerComponentsRenderer asNotFound={asNotFound} />
          </ServerInsertedHTMLProvider>
        </HeadManagerContext.Provider>
      )

      // 取得 renderer
      const renderer = createStaticRenderer({
        // ignore...
      })

      try {
        // 透過 renderer 把組件轉為 HTML stream
        let { stream, postponed } = await renderer.render(children)
        // ignore...
        return stream;
      } catch {
        // ignore...
      }
    }
  );

  let formState: null | any = null
  if (actionRequestResult) {
    if (actionRequestResult.type === 'not-found') {
      const notFoundLoaderTree = createNotFoundLoaderTree(loaderTree)
      // 最終再透過 toUnchunkedString 就可以轉為 HTML string 摟
      return new RenderResult(
        // 把 html stream 丟給 RenderResult
        await renderToStream({
          asNotFound: true,
          tree: notFoundLoaderTree,
          formState,
        }),
        { ...extraRenderResultMeta }
      )
    }
  }
}

function createServerComponentsRenderer(
  loaderTreeToRender: LoaderTree,
  { ctx, preinitScripts, options }: ServerComponentsRendererOptions
) {
  // 這個函數裡面才是重點，外面這邊接收的 async function 只是一個丟進去渲染的組件
  return createServerComponentRenderer<{
    asNotFound: boolean
  }>(async (props) => {
    // ignore...
  })
}

function createServerComponentRenderer<Props>(
  ComponentToRender: (props: Props) => any,
  {
    ComponentMod,
    clientReferenceManifest,
  }: ServerComponentRendererOptions
): (props: Props) => JSX.Element {
  let flightStream: ReadableStream<Uint8Array>
  const createFlightStream = (props: Props) => {
    if (!flightStream) {
      // 轉換為 flightStream
      flightStream = ComponentMod.renderToReadableStream(
        // 這邊的組件就是剛剛上面的 async 組件
        <ComponentToRender {...(props as any)} />,
        clientReferenceManifest.clientModules,
      )
    }
    return flightStream
  }

  const flightResponseRef: FlightResponseRef = { current: null }

  // 最終回傳一個組件出去
  return function ServerComponentWrapper(props: Props): JSX.Element {
    // 轉換為 response 後丟給 React.use
    const response = useFlightResponse(
      createFlightStream(props),
      clientReferenceManifest,
      // ignore...
    )
    return use(response)
  }
}

class ServerRenderer implements Renderer {
  private readonly renderToReadableStream = require('react-dom/server.edge')
    .renderToReadableStream as typeof import('react-dom/server.edge')['renderToReadableStream']

  constructor(private readonly options: RenderToReadableStreamOptions) {}

  public async render(children: JSX.Element): Promise<RenderResult> {
    const stream = await this.renderToReadableStream(children, this.options)
    return { stream }
  }
}

function createStaticRenderer(): Renderer {
  // ignore...
  return new ServerRenderer({
    // ignore...
  })
}

class RenderResult {
  public toUnchunkedString(stream = false): Promise<string> | string {
    // ignore...
    return streamToString(this.readable)
  }
}

async function streamToString(
  stream: ReadableStream<Uint8Array>
): Promise<string> {
  let buffer = ''

  await stream
    // Decode the streamed chunks to turn them into strings.
    .pipeThrough(createDecodeTransformStream())
    .pipeTo(
      new WritableStream<string>({
        write(chunk) {
          buffer += chunk
        },
      })
    )

  return buffer
}

function createDecodeTransformStream(decoder = new TextDecoder()) {
  return new TransformStream<Uint8Array, string>({
    transform(chunk, controller) {
      return controller.enqueue(decoder.decode(chunk, { stream: true }))
    },
    flush(controller) {
      return controller.enqueue(decoder.decode())
    },
  })
}
```


## 注意！！
這邊會有個重點需要注意，`react-dom/server.edge` 本身就有提供 `renderToReadableStream` 方法，此方法是將組件轉換為 HTML Readable Stream，可以透過轉換取得 HTML string 結果

但是！！`react-server-dom-webpack/server.edge` 也有提供一個 `renderToReadableStream`，這個方法則是把組件透過靜態分析轉為特殊格式的「靜態分析物件」，這個物件不能直接轉為 HTML string，而是一種特殊格式的內容，必須經由 `react-server-dom-webpack/client.edge` 的 `createFromReadableStream`，轉為可提供 `React.use()` 使用的內容後才能轉回組件


## 快速回顧渲染流程
1. 根據 request 判斷要渲染的頁面並引入
2. 用 `react-server-dom-webpack` 的 renderToReadableStream，轉換組件為`靜態分析物件`(這一步需要提供 `react-server-dom-webpack` 套件 Plugin 解析出的 `react-client-manifest.json`)
3. 用 `ReadableStream.tee()` 方法，把靜態分析物件複製成獨立的兩份（這一步很重要，避免後續處理導致 readableStream 鎖死）
4. 透過 `createFromReadableStream` 把靜態分析物件轉為 response，並將該 response 透過 `React.use` 包裹在一個獨立組件中
5. 透過 `streamToString` 方法，把另一份複製的靜態分析物件轉換成靜態字串（特殊格式，為了方便前端直接透過 js 拿到），後面會注入到 render 的 page 當中，這一步的重點是為了讓 client side 能夠在畫面初始化時直接拿到預先產好的靜態分析物件，加速首頁面的載入速度，並減少對 server 產生多餘的 request，NextJS 中是注入像是 `self.__next_f.push([1, "xxxx"])` 的方式傳遞，詳情可點擊[這邊原始碼查看](https://github.com/vercel/next.js/blob/canary/packages/next/src/server/app-render/use-flight-response.tsx#L28C11-L28C11)
6. 透過 `react-dom/server.edge` 的 `renderToReadableStream`(這裡重新命名為 renderToHtmlStream)，把上一步產生的獨立組件，轉換為 HTML Stream，同時使用 `bootstrapScriptContent` 注入前面預先產好的靜態分析物件，以及 `bootstrapScripts` 注入 client side 的 entrypoint
7. 把 HTML stream 轉為 HTML string


### 實作還原流程
不免俗的，都看完了原始碼跟實作流程，就是要來實作拉～，當然不可能從頭做得跟 NextJS 一樣完整細緻，我把 React 官網的範例 [server-components-demo](https://github.com/reactjs/server-components-demo)的架構直接拿來使用修改，大致上脈絡總要可以動吧！？不然豈不是紙上談兵，白學了？（男人千萬不可只出...
```jsx
import React from 'react';
import { renderToReadableStream } from "react-server-dom-webpack/server.edge";
import { createFromReadableStream } from "react-server-dom-webpack/client.edge";
import { renderToReadableStream as renderToHtmlStream } from "react-dom/server.edge";

async function handleRequest() {
  // 1.
  const page = await importPageByName(pageName);
  const manifest = getClientManifest();
  // 2.
  const flightStream = await renderToReadableStream(
    <ComponentToRender />,
    manifest.clientModuleMap
  );
  // 3.
  const [renderStream, dataStream] = flightStream.tee();
  // 4.
  const response = createFromReadableStream(renderStream, {
    ssrManifest: {
      moduleLoading: manifest.moduleLoading,
      moduleMap: manifest.ssrModuleMap,
    },
  });
  function ServerComponentWrapper() {
    return React.use(res);
  }
  // 5.
  const pageData = await streamToString(dataStream);
  // 6.
  const htmlStream = await renderToHtmlStream(<ServerComponentWrapper />, {
    bootstrapScriptContent: `
    const self = window; self.__ssr_f = self.__ssr_f || [];
    ${pageData}
    `,
    bootstrapScripts: ["/main.js"],
  });
  // 7.
  const data = await readStream(htmlStream);
  return data;
}
```

以上只是部分節錄我的實作原始碼，想觀看更多實作細節，歡迎點擊這邊瀏覽 [@johnnywang1994/react-rsc](https://github.com/johnnywang1994/react-rsc)摟，當然實際上 Server Component 還有更多細節需要處理，比如 Cache, Revalidate 等等，所以實際產品開發使用還是推薦直接用 NextJS 喔！這個實作只是一種學習成果的小練習～

<SocialBlock hashtags="javascript,nextjs,rsc,server-components" />

## 結論
老實說這次發想來實作 React Server Component 架構，比我想像中的費力，儘管我在 1年多前也用 vue3 實作過一次 Vue3 的 Server Rendering 架構，這次的源碼研究比單純的 Server Rendering 更加艱澀，花費了比我想像多 3倍的時間才終於弄出一個雛形，最後還是老話一句，感謝各位讀者觀看到最後～也發自內心感謝所有投身於開源專案的大佬們，這些好用的工具、框架真的都是許許多多工程師的血汗結晶啊...，你各位開發的時候請好好珍惜！

歡迎將文章分享給更多朋友摟，我要趕緊去睡了，大家下篇文章見，掰掰～

