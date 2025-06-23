# React Styled-Components 進階篇

本篇是學習 Styled-Components 時閱讀官網的一些筆記跟心得記錄，接續前一篇

- [API 參考](https://styled-components.com/docs/api)

## Theme
- [說明](https://styled-components.com/docs/advanced#theming)

使用 `ThemeProvider` 透過 context 傳遞 theme props 在組件內

```js
// Define our button, but with the use of props.theme this time
const Button = styled.button`
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: "palevioletred"
  }
}

// Define what props.theme will look like
const theme = {
  main: "mediumseagreen"
};

render(
  <div>
    <Button>Normal</Button>

    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
    </ThemeProvider>
  </div>
);
```

### Override with theme prop
或是你也可以透過 `theme` 屬性覆蓋預設的主題樣式設定

```js
render(
  <div>
    <Button theme={{ main: "royalblue" }}>Ad hoc theme</Button>
    <ThemeProvider theme={theme}>
      <div>
        <Button>Themed</Button>
        <Button theme={{ main: "darkorange" }}>Overridden</Button>
      </div>
    </ThemeProvider>
  </div>
);
```

## Style 優先級

如果將全局類與樣式化的組件類一起應用，結果可能不是您所期望的。如果在兩個類中都定義了相同屬性，`styled-components` 將獲勝，這是因為樣式組件默認情況下會在 runtime 時在 `<head>` 末尾處注入其樣式。因此，會優先於其他單一的 class selector

```js
// MyComponent.js
const MyComponent = styled.div`background-color: green;`;

// my-component.css
.red-bg {
  background-color: red;
}

// For some reason this component still has a green background,
// even though you're trying to override it with the "red-bg" class!
<MyComponent className="red-bg" />
```

一種解決方法是將 class selector 重複撰寫提升優先度

```css
/* my-component.css */
.red-bg.red-bg {
  background-color: red;
}
```

## Refer to other component
可以將 styled-components 的組件相互依賴使用如下

> 注意!這種寫法只適用在 styled-components，一般 React.Component 不是一個 Styled Component，可[參考這邊](https://styled-components.com/docs/advanced#caveat)

```js
const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: papayawhip;
  color: palevioletred;
`;

const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 48px;
  height: 48px;

  ${Link}:hover & {
    fill: rebeccapurple;
  }
`;
```

## Server Rendering with Nextjs
SSR 部分其實可以在不同框架下使用，詳細基本教學可以[參考官網](https://styled-components.com/docs/tooling#serverside-rendering)，這邊以 Nextjs 為範例，因為 `.babelrc` 的部分 Nextjs 有先做好基本設定，我們只需要在 `next.config.js` 中添加設定即可

首先我們需要安裝 `babel-plugin-styled-components` 幫我們處理 server 端的編譯

```
$ npm install --save-dev babel-plugin-styled-components
```

接著修改 `next.config.js`，可參考 [Next官方說明](https://nextjs.org/docs/advanced-features/compiler#styled-components)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true
  }
}

module.exports = nextConfig
```

最後參考 [Styled-Components Nextjs範例](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components-babel) 添加 Custom `_document.tsx` 加入如下：

```tsx
// _document.tsx
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }
}
```

大功告成，接著就可以快樂的在 Next 中使用 Styled-Components 摟～

> 那為何我們會需要這麼麻煩處理這些呢？可以參考官網說明如下：`By adding a unique identifier to every styled component, this plugin avoids checksum mismatches due to different class generation on the client and on the server. If you do not use this plugin and try to server-side render styled-components React will complain with an HTML attribute mismatch warning during rehydration.`，另一方面因為 Styled-Components 原本是動態在 Client Side 產生 stylesheet 並插入 head 套用，但在 Server 端渲染時沒有辦法插入到我們的 Document String 當中，也因此會跳出 Render not match 的 Error，所以我們在 `_document.tsx` 當中預先提取 `<App />` 底下的 stylesheets 並插入到 Props 當中，讓 Nextjs 把 styled-components 的樣式設定一併處理就可以瞜