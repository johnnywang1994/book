# Render Props Pattern

<SocialBlock hashtags="render props,pattern,compound" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Render Props Pattern`


## 介紹
`Render Props Pattern` 是一種在 props 中提供回傳 JSX 的函數，提供組件間分享、傳遞組件狀態邏輯樣式的能力，類似前面提過的 `HOC`，以下是一個簡單範例

```javascript
<Title render={() => <h1>I am a render prop!</h1>} />
```

而在 `<Title>` 組件中我們可以定義如下，透過呼叫外部傳進來的 `props.render`，即可產出對應的 jsx 內容：
```javascript
const Title = props => props.render();
```

藉由傳遞 render props 我們可以根據實際應用場景，提供不同的樣式、設定的 props 給予子組件，這種方式最常應用在第三方組件庫、客製化工具組件中，比如你可以在 `Ant Design` 的 `Select` 組件中看到類似的應用，透過提供一個 render props，我們可以讓工具組件更加靈活地去產生我們需求的組件內容，詳情[請參考這邊](https://ant.design/components/select#components-select-demo-custom-tag-render)

```javascript
<Select tagRender={(props) => <div>{props.label}</div>} />
```


## 狀態共享
由於 render props 是一個函數，也就提供了從外部獲取子組件狀態的能力，通過把子組件狀態傳遞進 render props 函數中，我們可以如下面這樣使用取代傳統的 `state lifting`

```javascript
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}
```

```html
<Input
  render={value => (
    <>
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </>
  )}
/>
```

### 把 children 直接當作 render props 使用
```javascript
function Input(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}
```
用起來變這樣
```html
<Input>
  {value => (
    <>
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </>
  )}
</Input>
```
這種寫法在 React 的動畫特效套件 `react-transition-group` 中也有所應用，有興趣的朋友可以[點這邊看看](https://reactcommunity.org/react-transition-group/transition)



## Pros & Cons

### 優點
- 限制組件 re-render 範圍，因為 render props 本身就是一個函數，具備其內部狀態 scoped，當 render props 內的狀態更新時，排除一些特殊狀態操作的場合（比如使用在 render props 中的狀態也同時被用在同一個組件中其他地方），只會觸發它自己刷新，導致整個子組件 re-render 而影響效能
- 解決 HOC 的 props 名稱衝突問題，我們可以在子組件中明確看到 props 有哪些，不會導致隱性的命名衝突

### 缺點
- 破壞了 JSX 的一些語法習慣，雖然提供了一定的狀態傳遞能力，但也增加了程式碼的複雜度，並降低了可讀性，在應用上避免過度使用，否則在爽爽寫程式的同時，也容易導致其他後續維護問題
- 組件深度擴增，為了使用 render props 我們往往會在 children 中提供函數渲染，但這種寫法套多層以後就會長得想下面這樣...

```html
<!-- 這邊我們以 Apollo Client 中提供的 `Mutation` 組件為例 -->
<Mutation mutation={FIRST_MUTATION}>
  {firstMutation => (
    <Mutation mutation={SECOND_MUTATION}>
      {secondMutation => (
        <Mutation mutation={THIRD_MUTATION}>
          {thirdMutation => (
            <Element
              firstMutation={firstMutation}
              secondMutation={secondMutation}
              thirdMutation={thirdMutation}
            />
          )}
        </Mutation>
      )}
    </Mutation>
  )}
</Mutation>
```

### 可使用 Hooks 取代
與 HOC 一樣，其實目前僅剩餘少數場景使用 render props patterns，現代開發大部分場景都能透過 hooks 來取代，同樣以 Apollo Client 為例，下面是使用 hooks `useMutation` 的範例
```javascript
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_MESSAGE } from "./resolvers";

export default function Input() {
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE, {
    variables: { message }
  });

  return (
    <div className="input-row">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type something..."
      />
      <button onClick={addMessage}>Add</button>
    </div>
  );
}
```

<SocialBlock hashtags="render props,pattern,compound" />

## 結論
實際這種模式的使用時機，個人認為還是必須根據開發場景來採取最適合你的方式，畢竟沒有技術是絕對得好或壞，隨著時代技術的推進，每種技術、概念都會各有其優缺點，只看你當下的取捨摟

那今天分享就到這拉～感謝大家收看，下篇見摟！=V=