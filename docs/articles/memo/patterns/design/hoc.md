# HOC Pattern

<SocialBlock hashtags="design,pattern,hoc,higher-order-component" />


## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `HOC Pattern`


## 介紹
`HOC` 全名 `Higher Order Component`，是一種把邏輯抽象後，讓我們可以將該段邏輯重複應用在許多組件上的技術，簡而言之，HOC 就是一個把其他組件當作參數傳入的組件，在 HOC 組件中，我們把想要套用的邏輯加在目標上之後返回它，套用的邏輯可以是 styles, authorization 等等多種應用方式，以下是一個套用樣式的 HOC 範例

```jsx
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

我們把 Button, Text 作為目標，並透過 withStyles HOC 的方式加上了樣式，最終得到添加完成樣式的 StyledButton, StyledText 組件

> 有個叫做 `recompose` 的有名 HOC 套件，但目前由於大部分 HOC 都可以直接由 hook 取代，故現在 recompose 已經停止維護了


## Hooks
在許多情況下，我們可以用 hooks 取代 HOC，雖然我們無法在 hooks 中直接像 HOC 中那樣調用目標元素，但我們可以透過 ref 來間接控制調整，比如像下面是一個添加 hover 功能的 hook

```js
import { useState, useRef, useEffect } from "react";

export default function useHover() {
  const [hovering, setHover] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, hovering];
}
```

我們就可以不必透過 hoc 包裹目標，而是直接在需要使用到 hover 邏輯的組件直接引用 useHover hook

```js
import React from "react";
import useHover from "./useHover";

function DogImages(props) {
  const [hoverRef, hovering] = useHover();

  return (
    <div ref={hoverRef} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}

export default DogImages
```


## 討論
總體而言，Hooks 並沒有取代 HOC，而是減少許多不必要的 Nested 層級關係，過度依賴 HOC 將導致元素階層過深的問題，而過度使用 hooks 也一樣可以導致依賴問題，以下進行兩者比較

- 適合使用 HOC 的時機
  - 在應用程式中，許多組件必須套用`相同`、`非客製化`的行為
  - 組件本身可以完全獨立使用，與 HOC 中的邏輯較無關
  - 其他特殊場合，無法在目標組件中透過 hooks 使用，而是希望在目標組件初始化前就預先完成的行為
- 適合使用 Hooks 的時機
  - 行爲必須依照組件進行客製化調整
  - 行為僅套用在部分、少數組件上
  - 在目標組件中添加許多 properties 的場合


<SocialBlock hashtags="design,pattern,hoc,higher-order-component" />

## 結論

### 優點
`HOC Pattern` 讓我們能過把相同的邏輯統一整合到一個地方，減少重複撰寫同樣邏輯，分散在各地可能導致的問題，藉由此達到程式碼 `DRY`、`關注點分離` 的效果

### 缺點
- 參數名稱覆蓋：在我們的 HOC 組件參數中，可能導致參數名稱被覆蓋的問題，比如常見的 `style` 屬性，使用時需確保參數名稱沒有衝突，以避免發生預期外的錯誤
- 除錯困難：因為 HOC 將組件包裹在內並透過 props 傳遞資料，但當包裹的層數上升時，內部 props 的屬性來源將變得難以定位查找，出錯時也較難以確認出錯的位置、層級

今天介紹就到這邊拉，希望大家都有學習到東西，下篇見拉～=V=

