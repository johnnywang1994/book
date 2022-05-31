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