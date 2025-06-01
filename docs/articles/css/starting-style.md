# 如何不用 setTimeout 幫 display: none 的 DOM 加動畫

<SocialBlock hashtags="css,allow-discrete,transition,starting-style,tailwindcss,2024" />

嗨大家好，我是 Johnny，所謂前端，除了 JS 基本功外，更重要的是對於 CSS 切版扎實的能力，不然前端就改名叫「串接 api 工程師」就好了=V=


## 前言
display none 還在用 setTimeout 加動畫？對於 css 當中 display none 大家都習慣性使用 setTimeout 幫元素加上動畫，因為當 DOM 元素加上 css display none後，會立即從畫面中消失，也導致 transition 的 property 無法發揮效果，這解法本身沒問題，但技術總是推陳出新，如果你`不考慮 IE 相容性`的問題，可以試試下面這方法


## transition-behavior: allow-discrete
allow-discrete 定義是：「這個屬性允許在過度中使用離散屬性，其對於初始值、最終值為 `display: none`, `content-visibility: hidden` 的過度，允許其 visible 值在整個過渡中可用」，聽不懂吧=V=，簡單說就是：「允許 display, content-visibility 做出動畫過渡效果」，怎麼用呢？

- 假設今天在 react 使用 tailwindCSS 中，我們有個按鈕可以 toggle 隱藏顯示文字如下，想要加入效果讓文字內容淡入淡出，我們會寫下面這樣
```jsx
const App = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <p
        className={`transition-all duration-500 ${
          show ? 'opacity-1' : 'opacity-0 hidden'
        }`}
      >
        Hello World
      </p>
    </>
  );
};
```
然後就會發現沒屁用，因為 display: none 並不會觸發 transition 過渡效果，此時可以使用 transition-behavior: allow-discrete 如下
```jsx
const App = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <p
        style={{
          transition: 'opacity 0.5s, display 0.5s allow-discrete'
        }}
        className={`${
          show ? 'opacity-1' : 'opacity-0 hidden'
        }`}
      >
        Hello World
      </p>
    </>
  );
};
```
加上後會發現，關閉的 opacity 是正常作動了沒錯，但開啟時仍然是瞬間出現，這問題主要是因為 `CSS 為了避免未預期的問題，預設不會在 DOM 元素初次渲染到畫面中時套用 CSS Transition 過渡`，詳細可以[參考這裡的解釋](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style#description)，也就是說，我們的 `Hello World` 在初次渲染時並不會套用 opacity-0 並過渡到 opacity-1，而是直接跳到最終狀態 opacity-1


## @starting-style
為了解決元素初次渲染時無法套用 CSS Transition 的問題，這裡再介紹一個 css at function [@starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)，它可以讓你指定元素在初次渲染進入 DOM 中時的樣式套用

把剛剛的範例改一下：
```jsx
const App = () => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <p
        style={{
          transition: 'opacity 0.5s, display 0.5s allow-discrete'
        }}
        className={`[@starting-style]:opacity-0 ${
          show ? 'opacity-1' : 'opacity-0 hidden'
        }`}
      >
        Hello World
      </p>
    </div>
  );
};
```
大功告成！！現在開關狀態的動畫都正常作動了～可以發現我用 tailwindCSS 寫，甚至連一行 css 都不用寫...，但如果不懂這用法，就準備寫一大串 css 外加一大串 setTimeout JS，還要搞個 timer debounce 取消動畫，妥妥地把 code 寫成一坨屎 XD

<SocialBlock hashtags="css,allow-discrete,transition,starting-style,tailwindcss,2024" />

## 結論
雖然我遇過很多人看不起切版這件事，總覺得切版「不就那樣」、「換換圖」？？？，但以我切版多年做過一堆 CSS 動畫的經驗，我可以很肯定地跟抱持這種想法的人說：「CSS 遠遠不如你想得簡單！！」，凡事話別說太滿，當然前端把 JS、演算法優化學好也很重要，但一個優良的切版能力（不止基本 layout，還包含 2d, 3d css animation、曲線動畫、css 底層 render 機制），絕對能讓你在眾多前端中脫穎而出，JS 只要有達及格線基本概念沒問題就行、當然越強越好，但比起 JS 我更重視一位前端工程師的切版能力，好的切版能力除了可以讓你更容易找到版面的 bug，JS 寫起來也會輕鬆非常多，我看過太多 JS 能力普通，切版能力爛到掉渣的前端...，遇到切不出來的版就直接拿 JS 硬尻硬改畫面，拜託誒...你是叫「前端」，切版能力不行我誠心建議你轉行比較快

抱歉跑題了ＸＤ，總之今天介紹給大家的這個方法用得好的話，可以顯著減少引入的 library 量，不然連個簡單的 overlay 遮罩 opacity 過渡都要 import 個 library 來搞，還要鑽牛角尖去優化 JS 效能就太逗了...趕緊分享給身邊的前端朋友吧，前提要他真的是「前端」=V=

