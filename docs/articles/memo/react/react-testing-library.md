# React Testing Library

這篇記錄 `@testing-library/react` 的一些學習筆記，主要來源於[官網](https://testing-library.com/docs/react-testing-library/api)


## Install
其他必須安裝的東西在另一篇中已紀錄，這邊不再多寫一次~

- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom): 可以使用一些特殊 matcher `toBeVisible`, `toBeInTheDocument`

```bash
$ npm install --save-dev @testing-library/react @testing-library/jest-dom
```


## Query
查找元素

### 三種方式
- getBy: 尋找目標，不存在時噴錯
- queryBy: 尋找目標，不存在時為 null
- findBy: 等到目標到超時為止

### 推薦使用順序
- getByLabelText
- getByText
- getByDisplayValue
- getByTitle
- getByTestId

```js
import {screen, getByLabelText} from '@testing-library/dom'

// With screen:
const inputNode1 = screen.getByLabelText('Username')

// Without screen, you need to provide a container:
const container = document.querySelector('#app')
const inputNode2 = getByLabelText(container, 'Username')
```

### Match
```js
screen.getByText('Hello World') // full string match
screen.getByText('llo Worl', {exact: false}) // substring match
screen.getByText('hello world', {exact: false}) // ignore case
```

### Debug
打印出像是 console.log(prettyDOM(element)) 的效果

> `prettyDOM` 是一個內建的[打印元素工具函數](https://testing-library.com/docs/dom-testing-library/api-debugging)

```js
// debug document
screen.debug()
// debug single element
screen.debug(screen.getByText('test'))
// debug multiple elements
screen.debug(screen.getAllByText('multi-test'))
```

### Manual
```js
const {container} = render(<MyComponent />)
const foo = container.querySelector('[data-foo="bar"]')
```


## User Actions

### fireEvent
透過 `fireEvent` 對指定元素進行事件觸發
```js
import { render, screen, fireEvent } from '@testing-library/react'

const Button = ({onClick, children}) => (
  <button onClick={onClick}>{children}</button>
)

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click Me</Button>)
  fireEvent.click(screen.getByText(/click me/i))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Async methods
- [說明](https://testing-library.com/docs/dom-testing-library/api-async)

#### findBy
實際上就是 getBy 查詢和 waitFor 的組合，當您期望一個元素出現但對 DOM 的更改可能不會立即發生時，請使用 findBy 查詢

```js
const button = screen.getByRole('button', {name: 'Click Me'})
fireEvent.click(button)
await screen.findByText('Clicked once')
fireEvent.click(button)
await screen.findByText('Clicked twice')
```

#### waitFor
任何時候需要等待一段時間時，使用 `waitFor`

> 注意，`waitFor` 可能會多次運行回調，直到達到超時

```js
// 等到 mockAPI 被執行一次後
await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
```

#### waitForElementToBeRemoved
`waitForElementToBeRemoved` 是以 `waitFor` 為基礎製作，用來等待從 DOM 中移除元素

```js
const el = document.querySelector('div.getOuttaHere')
waitForElementToBeRemoved(document.querySelector('div.getOuttaHere')).then(() =>
  console.log('Element no longer in DOM'),
)
el.setAttribute('data-neat', true)
// other mutations are ignored...
el.parentElement.removeChild(el)
// logs 'Element no longer in DOM'
```

### Appearance & Disappearance
- [說明](https://testing-library.com/docs/guide-disappearance)

```bash
$ npm install --save-dev @testing-library/jest-dom
```

```js
test('movie title appears', async () => {
  // element is initially not present...
  // wait for appearance and return the element
  const movie = await findByText('the lion king')
})

test('movie title appears', async () => {
  // element is initially not present...

  // wait for appearance inside an assertion
  await waitFor(() => {
    expect(getByText('the lion king')).toBeInTheDocument()
  })
})
```

```js
const submitButton = screen.queryByText('submit')
expect(submitButton).toBeNull() // it doesn't exist

const submitButtons = screen.queryAllByText('submit')
expect(submitButtons).toHaveLength(0) // expect no elements
```

### Fake Timer
- [說明](https://testing-library.com/docs/using-fake-timers)
```js
// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})
```

### Querying Within Elements
使用 `within` 函數包裹元素，可直接在其內進行 querying，不用給予 container
```js
import {render, within} from '@testing-library/react'

const {getByText} = render(<MyComponent />)
const messages = getByText('messages')
const helloMessage = within(messages).getByText('hello')
```


## Configuration
- [說明](https://testing-library.com/docs/dom-testing-library/api-configuration)
`configure` 設定會自動合併到預設的設定中
```js
import { configure } from '@testing-library/react'

configure({testIdAttribute: 'data-my-test-id'})
```


## Redux Testing
- [說明](https://redux.js.org/usage/writing-tests)

### Reducers
透過呼叫 `reducer` 我們可以給予相應的 `state`, `action` 對 store 進行測試操作
- [範例](https://redux.js.org/usage/writing-tests#reducers)

### Redux in Components
撰寫一個客製化 `render` 函數如下
```js
import { Provider as StoreProvider } from 'react-redux'
import { store } from '@/store'
import { render } from '@testing-library/react'

const AllTheProviders = ({children}) => {
  return (
    <StoreProvider store={store}>
      {children}
    </StoreProvider>
  )
}

const customRender = (
  ui,
  options
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
```