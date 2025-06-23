# 從 Mock Service Worker 源碼中學習

<SocialBlock hashtags="javascript,typescript,msw,serviceWorker,mock" />

## 前言
嗨大家好，我是 Johnny，最近閒暇時我在想，到底 msw 是如何做到 web 與 service worker 之間的溝通，一直以為 msw 只是單純發個請求給 service worker 後，service worker 再直接把配對到的內容丟回給 web 這樣，但看完 msw 的源碼後才發現，我還是太嫩了ＱＱ，人家根本不只是這麼單純的丟過去丟回來而已...


## Mock 操作種類
相信各位前端開發者們，都有用過各種 Mock 服務來進行測試與開發，但其中的原理，根據不同工具其底層的架構跟作法都不太一樣，舉例來說，常見有以下幾種 mock 的原理作法

- 套件內部攔截：像是 `axios` 內建有 Request `interceptor` 讓開發者在使用 axios 工具實際送出 request 之前就攔截返回預先訂制的 response content，好處是不改動任何原生底層的 api，壞處是除了 axios 以外，無法攔截直接調用原生 api 的場景
- 底層替換攔截：這類以 `mock.js` 為代表，直接替換最底層的 XHR 物件，藉此在不改動第三方套件的情況下攔截所有請求，好處是不論使用何種第三方套件，只要底層是使用 XHR 發出請求就都可以攔截到，但缺點是 XHR 物件在 server 端並不存在，要使用的話必須對 server 端進行相容處理
- 獨立 mock server：這類以 `mockoon` 等為代表（雖然 mockoon 有 serverless 工具，但畢竟還是要部署在一個地方比如 amazon, vercel 等才能使用），或是其他直接啟動一個 server 來回應請求，這種方式比較不算在單純前端 mock 的範圍內，畢竟已經是直接啟動一個 server 了...，那就不單單只是所謂純前端的事了，好處是可以拿到最真實的 api 請求的 request, response 物件，壞處是你要為此多啟動一個 server
- mock service worker：以 `msw` 為代表，透過啟動一個 `service worker` 為中間層，攔截所有從當前網頁發出的請求並返回，優點是除了可以模擬到真實 api 請求的 request, response 物件，同時不需要額外多啟動一台 server，缺點是如果網頁本身已經有其他的 service worker 可能會需要想辦法合併兩者，這種作法相對前三者較為新


## MSW 2.0
看完以上四種 mock 原理，前面三個相信已經有很多大神們解釋過了，今天我們要來透過瀏覽 `msw` 的源碼來了解這種相對新的作法究竟如何做到的？

正式理解源碼前，我們首先來對整個 `msw` 的使用有個基本概念，撰寫此文時剛好 `msw 2.0` released 了，就直接看最新的內容

### 安裝
安裝省略直接看官網...

### 產生 msw 的 mockServiceWorker.js
安裝完成後，透過 msw 提供的 cli 指令在指定位置產生 service worker file，產生的這個 sw file 是給 msw 使用，後面會來仔細看裡面究竟寫了啥
```bash
$ npx msw init ./public --save
```

### 定義 msw interceptor
```js
// handler.js
// 1. Import the "HttpResponse" class from the library.
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/resource', () => {
    // 2. Return a mocked "Response" instance from the handler.
    return HttpResponse.json({
      msg: 'Hello world!'
    })
  }),
]
```

### 在 Browser 端使用
雖然 msw 也相容直接在 nodejs 端使用，但這邊先以 Browser 端做介紹
```js
// mock.js
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

const worker = setupWorker(...handlers)
worker.start() // 實際可根據環境自由選擇是否引入與執行啟動
```

### 在網頁中啟動
接著在瀏覽器上開啟網頁，如果有看到 data 內容就表示 mock 成功摟
```js
// main.js(entrypoint of you web app)
import './mock';

(async () => {
  const res = await fetch('/resource');
  const data = await res.json();
  console.log(data);
})();
```


## mockServiceWorker.js
- [File](https://github.com/mswjs/msw/blob/main/src/mockServiceWorker.js)

msw 直接從源碼本身著手會稍微有難度，因為牽涉到 nodejs, browser 端的處理，畢竟這邊主要是想理解 service worker 的部分處理機制，而 service worker 本身只存在於 browser 端，所以這邊單純以瀏覽 browser 相關的 code 為主，以下只是部分節錄

```js
// 用來儲存 active 的 clientId
const activeClientIds = new Set()

// 定義 service worker 收到 message
self.addEventListener('message', async function (event) {
  const clientId = event.source.id
  const client = await self.clients.get(clientId)
  const allClients = await self.clients.matchAll({
    type: 'window',
  })
  switch (event.data) {
    // keepAlive 避免 service worker 休眠去了
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }
    // 當 web 載入 service worker 時添加 active client
    // （可能同時開很多個 web page 連上同一個 service worker）
    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)
      // 通知 web 端載入並紀錄 clientId 完成
      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: true,
      })
      break
    }
    // 當 web 端中斷連線時須移除 active clientId
    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      // Unregister itself when there are no more clients
      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }
  }
})

self.addEventListener('fetch', function (event) {
  const { request } = event
  // 省略一大段...
  const requestId = crypto.randomUUID()
  event.respondWith(handleRequest(event, requestId))
})

async function handleRequest(event, requestId) {
  const client = await resolveMainClient(event)
  const response = await getResponse(event, client, requestId)
  // 省略一小段...
  return response
}

// 取得主要的 client
// 發出請求的 client 並不一定就是註冊 worker 的那個 client
// 在回應請求時應該使用後者（註冊 worker 的那個 client）
async function resolveMainClient(event) {
  const client = await self.clients.get(event.clientId)

  if (client?.frameType === 'top-level') {
    return client
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  return allClients
    .filter((client) => {
      return client.visibilityState === 'visible'
    })
    .find((client) => {
      return activeClientIds.has(client.id)
    })
}

async function getResponse(event, client, requestId) {
  const { request } = event

  // 複製 request，因為可能已經被使用
  // (i.e. 比如 body 可能已經被送到 client）
  const requestClone = request.clone()

  function passthrough() {
    const headers = Object.fromEntries(requestClone.headers.entries())
    return fetch(requestClone, { headers })
  }

  // 省略一大段 passthrough 判斷...

  // 通知 main client 端請求已被攔截
  // 這裡會等到 client 端處理好整個 response 後繼續執行
  // 主要是透過 sendToClient 中的 MessageChannel 雙向 sync 溝通
  const requestBuffer = await request.arrayBuffer()
  const clientMessage = await sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: requestId,
        url: request.url,
        mode: request.mode,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
        cache: request.cache,
        credentials: request.credentials,
        destination: request.destination,
        integrity: request.integrity,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        body: requestBuffer,
        keepalive: request.keepalive,
      },
    },
    [requestBuffer],
  )
  // 根據 main client 端回傳的 message 決定是 intercept 或 passthrough
  // respondWithMock 會實際產生一個 HTTP Response object 並丟回給發出請求的 client
  switch (clientMessage.type) {
    case 'MOCK_RESPONSE': {
      return respondWithMock(clientMessage.data)
    }

    case 'MOCK_NOT_FOUND': {
      return passthrough()
    }
  }

  return passthrough()
}

// 透過 MessageChannel 與 client 端進行 sync 雙向溝通
// 把 port2 丟給 client，讓 client 可透過 port2 與 port1(當前 worker) 溝通
// 透過 MessageChannel 可以藉由 promise 讓 function 等待 client 回傳結果
// 而不是讓 client 透過 postMessage 回傳，因為 postMessage 無法讓 worker 直接 await 等待結果
function sendToClient(client, message, transferrables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error)
      }
      resolve(event.data)
    }

    client.postMessage(
      message,
      [channel.port2].concat(transferrables.filter(Boolean)),
    )
  })
}

async function respondWithMock(response) {
  // Setting response status code to 0 is a no-op.
  // However, when responding with a "Response.error()", the produced Response
  // instance will have status code set to 0. Since it's not possible to create
  // a Response instance with status code 0, handle that use-case separately.
  if (response.status === 0) {
    return Response.error()
  }
  const mockedResponse = new Response(response.body, response)
  Reflect.defineProperty(mockedResponse, IS_MOCKED_RESPONSE, {
    value: true,
    enumerable: true,
  })
  return mockedResponse
}
```
這個檔案就是在前面透過 msw cli 產生的 service worker，其主要作用是處理整個 service worker 的初始化與後續 message, fetch 請求的攔截，在收到 client 端發來的請求時，透過 MessageChannel 與 main client 溝通獲得對應的 response message content，最後再傳回給 client


## setupWorker.ts
- [File](https://github.com/mswjs/msw/blob/main/src/browser/setupWorker/setupWorker.ts)

這個檔案是在 client 初始化整個 service worker 的入口，可以找到這個 `start` method
```ts
export class SetupWorkerApi {
  // 省略一大坨...
  private createWorkerContext(): SetupWorkerInternalContext {
    const context: SetupWorkerInternalContext = {
      // 省略一大坨...
    };
    this.startHandler = context.supports.serviceWorkerApi
      ? createFallbackStart(context)
      : createStartHandler(context) // 下一個關鍵入口在這～

    return context
  }

  public async start(options: StartOptions = {}): StartReturnType {
    this.context.startOptions = mergeRight(
      DEFAULT_START_OPTIONS,
      options,
    ) as SetupWorkerInternalContext['startOptions']

    return await this.startHandler(this.context.startOptions, options)
  }
}
```
透過這個 start method，循線找到 `createStartHandler`

### createStartHandler.ts
- [File](https://github.com/mswjs/msw/blob/main/src/browser/setupWorker/start/createStartHandler.ts)
```ts
export const createStartHandler = (
  context: SetupWorkerInternalContext,
): StartHandler => {
  return function start(options, customOptions) {
    // 處理來自 service worker 名叫 `REQUEST` 的 message
    // 這裡就對應上了上面的 getResponse 裡的 sendToClient "REQUEST"
    context.workerChannel.on(
      'REQUEST',
      createRequestListener(context, options), // 下一個關鍵入口在這～
    )

    const instance = await getWorkerInstance(
      options.serviceWorker.url,
      options.serviceWorker.options,
      options.findWorker,
    )
    const [worker, registration] = instance
    context.worker = worker
    context.registration = registration

    context.events.addListener(window, 'beforeunload', () => {
      if (worker.state !== 'redundant') {
        // 通知 Service Worker 當前 client 將關閉
        context.workerChannel.send('CLIENT_CLOSED')
      }
      // 確保 keepAlive interval 關閉，避免 memory leaks
      window.clearInterval(context.keepAliveInterval)
    })

    // 啟動 keepAlive interval
    context.keepAliveInterval = window.setInterval(
      () => context.workerChannel.send('KEEPALIVE_REQUEST'),
      5000,
    )
  }
}
```
createStartHandler 主要會掛載處理 message `REQUEST`，並啟動 keepAlive 機制，接著進入到 `createRequestListener` 看看具體是怎麼處理 request 的吧

### createRequestListener.ts
- [File](https://github.com/mswjs/msw/blob/main/src/browser/setupWorker/start/createRequestListener.ts)
- [class WorkerChannel](https://github.com/mswjs/msw/blob/main/src/browser/setupWorker/start/utils/createMessageChannel.ts)

```ts
export const createRequestListener = (
  context: SetupWorkerInternalContext,
  options: RequiredDeep<StartOptions>,
) => {
  return async (
    event: MessageEvent,
    message: ServiceWorkerMessage<
      'REQUEST',
      ServiceWorkerIncomingEventsMap['REQUEST']
    >,
  ) => {
    // WorkerChannel 為 msw 另外定義的一個 class ，傳入一個 port，可透過該 port 傳送 message 給對應的 port（這兩個 ports 是透過 MessageChannel 產生的一對 port）
    const messageChannel = new WorkerChannel(event.ports[0])

    const requestId = message.payload.id
    const request = parseWorkerRequest(message.payload)
    const requestCloneForLogs = request.clone()

    try {
      // 下一個進階入口在這～處理 request 並產生對應 response 丟回 onMockedResponse
      await handleRequest(
        request,
        requestId,
        context.requestHandlers,
        options,
        context.emitter,
        {
          async onMockedResponse(response, { handler, parsedResult }) {
            // 複製 mocked Response 讓 body 可被讀取為 buffer 並傳送給 worker
            const responseClone = response.clone()
            const responseInit = toResponseInit(response)

            /**
             * @note Safari doesn't support transferring a "ReadableStream".
             * Check that the browser supports that before sending it to the worker.
             */
            if (context.supports.readableStreamTransfer) {
              const responseStream = response.body
              messageChannel.postMessage(
                'MOCK_RESPONSE',
                {
                  ...responseInit,
                  body: responseStream,
                },
                responseStream ? [responseStream] : undefined,
              )
            } else {
              // As a fallback, send the response body buffer to the worker.
              const responseBuffer = await responseClone.arrayBuffer()
              messageChannel.postMessage('MOCK_RESPONSE', {
                ...responseInit,
                body: responseBuffer,
              })
            }
          },
        },
      )
    } catch (error) {
      if (error instanceof Error) {
        // 處理任何未知錯誤
        messageChannel.postMessage('MOCK_RESPONSE', {
          status: 500,
          statusText: 'Request Handler Error',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: error.name,
            message: error.message,
            stack: error.stack,
          }),
        })
      }
    }
  }
}
```
createRequestListener 主要會使用 worker 傳來的 payload 創建一個 Request object，接著透過 `handleRequest` 把 request 拿去比對取得對應的 response，最後再透過 messageChannel 把 response 傳遞回 worker，到此整個 msw 的 Service Worker 訊息交換機制算是理解完成了


## 流程總結
簡單總結下流程，整個訊息交換過程從 client 端開始
- client 發出 activate 請求，把自己註冊進 service worker 中
- 當某個 client 端發出 request 後，service worker 攔截請求並把 request 詳細資料傳回給 main client 同時帶著一個 MessageChannel 的 port2
- main client 收到 service worker 傳送的 message `REQUEST` 後，在本地查找對應的 response
- 不論有無找到，最後 main client 都會將結果透過 MessageChannel 的 port2 把 response 內容傳回 service worker
- service worker 收到 main client 的 response 內容，構建成一個 HTTP Response object 後傳回給發出請求的 client


<SocialBlock hashtags="javascript,typescript,msw,serviceWorker,mock" />

## 感想
這次心血來潮跑去閱讀 msw 關於 browser side 的 service worker 用法，真的是獲益良多，看完後甚至都可以（已經）直接自幹一個簡易版本的 msw 了...，除了 service worker 的一些特性外，最重要的是之前完全沒聽過 `MessageChannel` 這東西，透過這次學習總算學到了這東西，雖然不知道實際開發中還可以用在哪些地方，後續再來研究看看，能在日後的開發上實際使用上的場景

那這次技術分享就到這拉，感謝各位的收看，如果喜歡我的分享文章也歡迎分享給更多人看看摟，下篇見拉，掰掰～=V=
