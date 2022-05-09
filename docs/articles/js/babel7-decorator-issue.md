# Babel 7 Decorator 的神奇小問題

<SocialBlock hashtags="javascript,typescript,babel,decorator" />

Hi 各位朋友們大家好，我是 Johnny，最近在調整優化我的開源套件[script-custom-module](https://www.npmjs.com/package/script-custom-module)時踩到了一個很神奇的 Decorator 小坑，覺得有必要把這記錄下來。

## 背景故事
整個事件背景是：我在幫我的開源工具添加 Typescript loader 後，順便測試使用 Property Decorator 時，發現無論我怎麼在 Decorator 中使用 `defineProperty` 對 target 進行調整，最後都會作用到 prototype 中而不是我的 instance，參考如下範例

### 相關配置

- @babel/standalone: `v7.17.11`

```js
module.exports = {
  presets: [availablePresets.typescript],
  plugins: [
    [availablePlugins['proposal-decorators'], {
      version: 'legacy'
    }],
    availablePlugins['proposal-class-properties']
  ]
}
```

### Property Decorator 範例
```ts
// 首先定義一個 decorator
function logDec(target, propName) {
  let value = target[propName];
  Object.defineProperty(target, propName, {
    get: () => value,
    set: (newVal) => {
      console.log('gocha');
      value = newVal;
    }
  })
}

// 套用到目標類上
class User {
  @logDec name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

### 在線上 TS Playground 中編譯的結果
- [TS Playground](https://www.typescriptlang.org/pt/play)

```js
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  // ...
};
var __metadata = (this && this.__metadata) || function (k, v) {
  // ...
};
function logDec(target, propName) {
    let value = target[propName];
    Object.defineProperty(target, propName, {
        get: () => value,
        set: (newVal) => {
            console.log('gocha');
            value = newVal;
        }
    });
}
class User {
    constructor(name) {
        this.name = name;
    }
}
__decorate([
    logDec,
    __metadata("design:type", String)
], User.prototype, "name", void 0);
const johnny = new User('johnny');
console.log(johnny);
```

### 在 Babel v7 編譯後

```js
var _class, _descriptor;

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _defineProperty(obj, key, value) {
  // ...
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  // ...
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.');
}

function logDec(target, propName) {
  let value = target[propName];
  Object.defineProperty(target, propName, {
    get: () => value,
    set: newVal => {
      console.log('gocha');
      value = newVal;
    }
  });
}

let User = (_class = class User {
  constructor(name) {
    // 這邊被 Babel 包了一層 _initializerDefineProperty
    _initializerDefineProperty(this, "name", _descriptor, this);

    this.name = name;
  }

}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "name", [logDec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);
const johnny = new User('johnny');
console.log(johnny);
```

在一般 ts 本地編譯環境似乎這麼寫沒有問題，而 Babel v7 以後，似乎 Babel 對 class constructor 內部的一些 property 進行了改寫重組，導致原本 Decorator 的 getter/setter 無法正確被調用

我們在觀察 `_initializerDefineProperty` 的實現後發現，如果在我們的 decorator 函數中沒有返回任何 `descriptor`，那 Babel 就會自動協助產生一個 descriptor 來構建對應的 property，而我們的 decorator 將只作用在 prototype 上

以這個情況而言，就必須明確將我們的 `descriptor` 從 decorator 中返回，如此 Babel 在編譯時就會以我們返回的 `descriptor` 來進行構建，修改後如下

```ts
// 返回一個 descriptor
function logDec(target, propName) {
  let value = target[propName];

  const descriptor = {
    get: () => value,
    set: (newVal) => {
      console.log('gocha');
      value = newVal;
    }
  })

  return descriptor;
}

class User {
  @logDec name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

## 結論
只能說 `decorator` 這概念目前在 Javascript 中的實現還沒有一個定論，導致 Babel, Typescript 的一些實現不太一致，大家在使用的時候要多多注意環境，避免像我這樣無意間掉進這種可怕的無解陷阱當中，找了好久才找到一個相關的[討論串](https://github.com/lit/lit-element/issues/234#issuecomment-425739431)

今天的分享就到這了，感謝大家收看，掰掰~

<SocialBlock hashtags="javascript,typescript,babel,decorator" />
