# Provider Component

<SocialBlock hashtags="design,pattern,provider" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Provider Pattern`


## 介紹
`Provider Pattern` 是一種讓我們能以 props 以外的方式去傳遞狀態，並且具備跨組件層級傳遞能力的一種開發模式，這邊主要以前端框架 React 為例說明

### Props 傳遞狀態
底下是一個經典的 props 傳遞狀態方式，當 component 數量不多時可能還好，但如果狀態數量開始多起來後，我們傳遞的東西可能越來越複雜，容易出現問題，影響直觀
```js
function App() {
  const data = { ... }

  return (
    <div>
      <SideBar data={data} />
      <Content data={data} />
    </div>
  )
}

const SideBar = ({ data }) => <List data={data} />
const List = ({ data }) => <ListItem data={data} />
const ListItem = ({ data }) => <span>{data.listItem}</span>

const Content = ({ data }) => (
  <div>
    <Header data={data} />
    <Block data={data} />
  </div>
)
const Header = ({ data }) => <div>{data.title}</div>
const Block = ({ data }) => <Text data={data} />
const Text = ({ data }) => <h1>{data.text}</h1>
```

### Provider 傳遞
在 React 中我們可以透過 `React.createContext` 建立一個 context，並且從其中使用 `Provider` 包裹

```js
const DataContext = React.createContext()

function App() {
  const data = { ... }

  return (
    <div>
      <DataContext.Provider value={data}>
        <SideBar />
        <Content />
      </DataContext.Provider>
    </div>
  )
}
```
藉由 `Provider` 包裹原本需要 consume 共用狀態的 component，我們可以將上面範例改寫如下
```js
const DataContext = React.createContext();

function App() {
  const data = { ... }

  return (
    <div>
      <SideBar />
      <Content />
    </div>
  )
}

const SideBar = () => <List />
const List = () => <ListItem />
const Content = () => <div><Header /><Block /></div>

function ListItem() {
  const { data } = React.useContext(DataContext);
  return <span>{data.listItem}</span>;
}

function Text() {
  const { data } = React.useContext(DataContext);
  return <h1>{data.text}</h1>;
}

function Header() {
  const { data } = React.useContext(DataContext);
  return <div>{data.title}</div>;
}
```
如此一來我們就不需要在一個一個 component 傳遞狀態，避免掉狀態傳遞失誤或是漏掉的問題！～


## 使用注意
雖然 Provider 看似非常好用，但實際情況必須謹慎使用，由於跨層級的狀態傳遞，當狀態更新時，容易讓其所有依賴的 component 都重新渲染，一個沒注意就容易導致嚴重效能問題，使用時我個人推薦先用兩個情境進行評估後，再決定是否使用
1. 當前情境是否真的「必須」跨多層組件在全局使用這些狀態？
2. 當前情境的狀態是否不必要在組件外部使用，僅限於某幾個相關功能的組件使用？

<SocialBlock hashtags="design,pattern,provider" />

## 結論
### 優點
- 不需要一層層傳遞狀態而導致直觀性降低、複雜度提升
### 缺點
- 若使用不當，容易使得組件不斷的重複渲染，而導致效能問題

今天就分享到這拉，下篇見摟～=V=