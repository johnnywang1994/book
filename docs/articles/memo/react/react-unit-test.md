# React Unit Test

這篇記錄學習基本 React Unit Test 的相關心得筆記


## 安裝

先安裝最基本的依賴套件

- `jest-transform-stub`: 這個套件就只是讓不需要處理的模組忽略的轉換器

```bash
$ npm install --save-dev jest ts-jest babel-jest jest-environment-jsdom jest-transform-stub
```

另外如果環境沒有設定 babel 也需要安裝相關套件

```bash
$ npm install --save-dev @babel/preset-env @babel/preset-react
```

```json
// babel.config.json
{
  "env": {
    "test": {
      "presets": [
        "@babel/preset-env",
        ["@babel/preset-react", {
          "runtime": "automatic"
        }]
      ]
    }
  }
}
```

## 配置

這裡要注意，有兩種情況必須處理，第一種是非 js 檔案處理，第二種是 `@` 開頭的 alias 檔案處理，如果沒有在這邊設定，跑測試時會噴錯 `Can not find module`，另外因為 `moduleNameMapper` 是由上往下比對設定，非 js 檔要記得先放前面，放 `alias` 後面就還是會噴錯!!

- [testing-with-jest-and-webpack-aliases](https://stackoverflow.com/questions/42629925/testing-with-jest-and-webpack-aliases)

```js
// jest.config.js
module.exports = {
  // if use typescript
  // preset: 'ts-jest',
  // transform: {
  //   "^.+\\js$": "babel-jest"
  // },
  globals: {},
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // test these unresolved extension first
    ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    // test for alias in the end
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node']
}
```


## 寫測試

```tsx
// MyButton.tsx
import { PropsWithChildren } from 'react'

type Props = {
  label: string
}

function MyButton({ label }: PropsWithChildren<Props>) {
  return <button data-testid="btn">{label}</button>
}

export default MyButton
```

```js
// MyButton.test.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import MyButton from '../MyButton'

describe('MyButton render', () => {
  it('render without error', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<MyButton />)
    root.unmount(div)
  })
})
```


## @testing-library/react

安裝 `@testing-library/react`
- [官方文件](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Playground](https://testing-playground.com/)

```bash
$ npm install --save-dev @testing-library/react
```

改寫剛剛的測試如下

```js
// MyButton.test.js
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import MyButton from '../MyButton'

describe('MyButton render', () => {
  // this is implements automatically
  // cleanup each rendered components
  afterEach(cleanup)

  it('render without error', () => {
    render(<MyButton label="Hello World" />)
    expect(screen.getByText('Hello World')).toBeTruthy()
  })

  it('render element currect', () => {
    render(<MyButton label="Hello World" />)
    expect(screen.getByTestId('btn')).toBeTruthy()
  })
})
```


## react-test-renderer
用這個套件搭配 jest 可進行 snapshot 測試，針對整個組件渲染結果細部比對，第一次執行測試時會將結果儲存在 `__snapshots__` 資料夾內，之後都會從這裡進行比對，當測試結果不吻合時就會針對改動處標註並噴錯提示

- [Jest Snapshot 官方文件](https://jestjs.io/docs/snapshot-testing)

```bash
$ npm install --save-dev react-test-renderer
```

```js
// MyButton.test.js
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import MyButton from '../MyButton'

describe('MyButton render', () => {
  // cleanup each rendered components
  afterEach(cleanup)

  it('render without error', () => {
    render(<MyButton label="Hello World" />)
    expect(screen.getByText('Hello World')).toBeTruthy()
  })

  it('render element currect', () => {
    render(<MyButton label="Hello World" />)
    expect(screen.getByTestId('btn')).toBeTruthy()
  })

  it('matches snapshot', () => {
    const tree = renderer.create(<MyButton label="Hello World" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```