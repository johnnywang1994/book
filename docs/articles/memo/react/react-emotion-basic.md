# React Emotion Basic

這篇是紀錄使用 Vite 配置 `@emotion` 基礎安裝與使用方式的筆記


## Install
- [安裝介紹](https://emotion.sh/docs/install)
@emotion 有很多使用的方式，需要安裝的依賴也不完全相同，主要根據是否使用 `React` 框架，如果使用則安裝 `@emotion/react`，若沒有則安裝 `@emotion/css`，前者針對 react 設計，後者可跨框架使用

這邊以使用 react 為主~

```bash
$ npm install --save @emotion/react
```


## CSS Prop 使用
- [說明](https://emotion.sh/docs/css-prop)
```js
import { css } from '@emotion/react'

const style = css`
  color: hotpink;
`

const SomeComponent = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
)
```

## Styled Component
- [說明](https://emotion.sh/docs/styled)
另外安裝 `@emotion/styled` 可以使用近似於 `Styled-components` 的組件式用法
```js
import styled from '@emotion/styled'

const Button = styled.button`
  color: hotpink;
`
```

### Targeting another emotion component
- [說明](https://emotion.sh/docs/styled#targeting-another-emotion-component)

使用下面這種特殊方式可以在一個 Emotion styled 組件內引入另一個，但需要安裝並配置 `@emotion/babel-plugin`

```json
{
  "plugins": ["@emotion"]
}
```

```js
import styled from '@emotion/styled'

const Child = styled.div`
  color: red;
`

const Parent = styled.div`
  ${Child} {
    color: green;
  }
`
```

### Composing dynamic styles
- [說明](https://emotion.sh/docs/styled#composing-dynamic-styles)
使用下面方式可以使用動態 style 注入 props
```js
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const dynamicStyle = props =>
  css`
    color: ${props.color};
  `

const Container = styled.div`
  ${dynamicStyle};
`
```

### Nested components
styled 寫法內建可以使用類似 SASS 中的 `&` parent selector
```js
import styled from '@emotion/styled'

const Example = styled('span')`
  color: lightgreen;
  & > a {
    color: hotpink;
  }
`
```


## Composition
- [說明](https://emotion.sh/docs/composition)
Emotion 的一個強大功能，可以自由透過 `css` 定義 style 組合互相套用
```js
import { css } from '@emotion/react'

const base = css`
  color: hotpink;
`

render(
  <div
    css={css`
      ${base};
      background-color: #eee;
    `}
  >
    This is hotpink.
  </div>
)
```

### 1. 直接套用
`直接套用` 雖然很方便，但就像下方一般 CSS 一樣容易因為套用順序，而出現樣式 override 的問題，導致必須調整 className 順序或是加入 `important`

```js
render(
  <div>
    <style>
      {`
        .danger {
          color: red;
        }
        .base {
          background-color: lightgray;
          color: turquoise;
        }
      `}
      >
    </style>
    {/* turquoise */}
    <p className="base danger">What color will this be?</p>
  </div>
)
```

### 2. 合併套用
為了避免樣式套用時順序影響樣式，可以用下面的方式引入 css 組合，這樣 css 順序可以在需要時視情況給予套用順序

```js
import { css } from '@emotion/react'

const danger = css`
  color: red;
`

const base = css`
  background-color: darkgreen;
  color: turquoise;
`

render(
  <div>
    <div css={base}>This will be turquoise</div>
    <div css={[danger, base]}>
      This will be also be turquoise since the base styles overwrite the danger
      styles.
    </div>
    <div css={[base, danger]}>This will be red</div>
  </div>
)
```


## Media Queries
可以像 SASS 一樣在當前 selector 內直接套用
```js
import { css } from '@emotion/react'

render(
  <p
    css={css`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    `}
  >
    Some text!
  </p>
)
```

或是可以像這樣把 breakpoints 設定好方便使用
```js
import { css } from '@emotion/react'

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

const mq = (bp) => `@media (min-width: ${breakpoints[bp]}px)`

render(
  <div>
    <p
      css={css`
        color: green;
        ${mq('sm')} {
          color: gray;
        }
        ${mq('md')} {
          color: hotpink;
        }
      `}
    >
      Some other text!
    </p>
  </div>
)
```


## Global Styles
使用 `<Global>` 組件套用全局的樣式，這些樣式會在樣式改變或隨著組件卸載時移除
```js
import { Global, css } from '@emotion/react'

render(
  <div>
    <Global
      styles={css`
        .some-class {
          color: hotpink !important;
        }
      `}
    />
    <div className="some-class">This is hotpink now!</div>
  </div>
)
```

## 相關套件清單
- [Emotion Package 清單](https://emotion.sh/docs/package-summary)