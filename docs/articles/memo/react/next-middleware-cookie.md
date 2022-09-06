# 如何在 Nextjs 中使用 middleware set cookie

在 SSR 情況下，我們時常需要跨 server, client 端傳遞資料，其中 cookie 是必不可少！！

底下是一個官網的範例，如何在 Next middleware 中處理 cookies

```ts
// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

const cookieOpts = {
  httpOnly: false,
  signed: false,
};

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line import/prefer-default-export
export function middleware(req: NextRequest) {
  // 對 response 設定 cookies
  const res = NextResponse.next()
  res.cookies.set('gtmId', process.env.GTM_ID, cookieOpts)

  // 從 request 提取 cookies
  const cookie = request.cookies.get('vercel')
  console.log(cookie) // => 'fast'
  const allCookies = request.cookies.entries()
  console.log(allCookies) // => [{ key: 'vercel', value: 'fast' }]
  const { value, options } = response.cookies.getWithOptions('vercel')
  console.log(value) // => 'fast'
  console.log(options) // => { Path: '/test' }

  // 刪除 cookies
  response.cookies.delete('vercel')
  response.cookies.clear()
  return res;
}
```

很簡單吧～