# Compound Pattern

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Compound Pattern`


## 介紹
`Compound Pattern` 是透過組合多個組件、元件來完成一個整體功能，常常在 select, dropdown, menu 等功能看到這個 pattern 的應用，底下以一個 React Dropdown 功能當作範例


## React Dropdown
使用 `useContext` 來製作跨組件之間的局部狀態共享，把狀態封裝在局部組件當中，相關組件拿取共同的狀態，但組件邏輯又可獨立進行編寫

```javascript
import React, { useState, useContext } from 'react';

const DropdownContext = React.createContext();

const Dropdown = (props) => {
  const [open, toggle] = useState(false);

  return (
    <DropdownContext.Provider value={{ open, toggle }}>
      {props.children}
    </DropdownContext.Provider>
  );
};

const Toggle = (props) => {
  const { open, toggle } = useContext(DropdownContext);

  return (
    <div onClick={() => toggle(!open)}>
      {props.children}
    </div>
  );
};

const Content = (props) => {
  const { open } = useContext(DropdownContext);

  return open && props.children;
};

Dropdown.Toggle = Toggle;
Dropdown.Content = Content;

export default Dropdown;
```

如上我們構建一個 Compound 的 Dropdown，並可快速調用該功能相關聯的組件，不僅使用方便，且功能狀態完全封裝在 Compound 組件中了，不會污染到使用的組件環境

```javascript
const App = () => {
  return (
    <>
      Hello
      <Dropdown>
        <Dropdown.Toggle>
          toggle
        </Dropdown.Toggle>
        <Dropdown.Content>
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
};
```

## 評價 Compound Components
這麽寫的好處是
  - 功能只需要 import 一個組件，相關的組件已經全部包含在內
  - 不需要另外維護許多功能相關狀態


## React.Children.map
另一個實現方式是透過 `React.Children.map` 結合 `cloneElement`，將我們的功能狀態透過改寫 children 的 props 完成
```javascript
import React, { useState } from 'react';

const Dropdown = (props) => {
  const [open, toggle] = useState(false);

  return (
    <>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { open, toggle })
      )}
    </>
  );
};

const Toggle = ({ open, toggle, children }) => {
  return (
    <div onClick={() => toggle(!open)}>
      {children}
    </div>
  );
};

const Content = ({ open, toggle, children }) => {
  return open && children;
};

Dropdown.Toggle = Toggle;
Dropdown.Content = Content;

export default Dropdown;
```

寫法上雖然避免掉了使用 `useContext` 以及 `Provider`，變得更為精簡，但也有一個缺點，因為是直接傳遞 props 給 children，狀態只會傳遞到 `Dropdown` 組件內的第一層，如下用法就會出現問題，並且 props 是 shallow merge，如果出現名稱衝突將會被覆蓋導致問題

```javascript
const App = () => {
  return (
    <>
      Hello
      <Dropdown>
        {/* This breaks */}
        <div>
          <Dropdown.Toggle>
            toggle
          </Dropdown.Toggle>
          <Dropdown.Content>
            <ul>
              <li>item 1</li>
              <li>item 2</li>
            </ul>
          </Dropdown.Content>
        </div>
      </Dropdown>
    </>
  );
};
```


## 結論
總結 Compound Pattern 有下列優點
- 功能狀態的隔離封裝
- 功能組件的完整性，同一功能的相關組件可以明確定位劃分
- 使用方便，減少重複撰寫類似功能的邏輯
缺點如下
- 狀態、邏輯被封裝，無法快速看出具體組件內做了什麼

綜合評斷下來，Compound Pattern 適用在目標明確、單一的功能上，避免將過多不相關的邏輯狀態全部放在一個 Compound 中，使用上就較不容易造成功能模糊不清、開發者難以理解的狀況

感謝收看，下一篇見拉～