# MVVM 簡單模擬框架實作
###### tags: `JavaScript`, `Vuejs`, `MVVM`

<SocialBlock hashtags="javascript,vuejs,mvvm" />

### 背景

某天閒來無事時，剛好搜尋到一篇介紹 MVVM 的好文，仔細閱讀後覺得收穫頗多，決定將一些想法跟理解記錄下來所誕生。



### 概要

將該篇文章所講的主要概念轉為我自己的理解並記錄實作步驟。話不多說，動手開始吧。



### 何謂 MVVM？

在實作之前，先簡單提一下什麼是 `MVVM`，它是一種軟體設計架構的模式，會在 Model 及 View 之間建立一層 ViewModel，來幫助 Model 及 View 之間的交互操作，可以簡化開發的一些繁瑣重複的動作。



### Front End 與 MVVM 有何關係？

在 Front End 開發上，撇除 CSS 不談，最主要的工作就是將資料數據渲染在畫面上，而在瀏覽器中，也配置有許多這類型的方法，統稱為 `Element Methods`，這些 methods 在 MVC 的架構下，就是負責處理 Model 與 View 的交互，JQuery 主要也就是在做這件事情，但這些 methods 始終都必須要透過人工的操作來完成交互，而 MVVM 的架構下，就是將這些繁瑣的動作都交由 ViewModel 來代勞，我們只需要處理及更新資料，ViewModel 會根據更新的資料去完成更新 View 的動作。



### 實作練習


#### 實作前說明

實現 MVVM 的方式不限於一種，本文採用 Vuejs 的`數據劫持`+`訂閱發布`方式實作，主要專注在 MVVM 概念的理解與實踐，具體功能不會一一仔細去深入研究。

首先，要完成 MVVM 的架構，必須包含五個主要的模組：

- Observer：對數據進行劫持設定
- Dep：訂閱器用來儲存被劫持資料的 watchers 依賴
- Watcher：儲存被劫持資料更新時需執行的動作
- Compiler：編譯模板，對不同類型節點解析並加入 watcher
- MVVM：整合所有模組，提供使用者調用


#### 思路整理

由於所要完成的最終步驟稍顯龐大與複雜，我會分成兩個部分來說明，第一部分是各別模組的實踐，第二部分才會將模組進行整合。

最終實踐上，程式碼會如下順序進行執行：

1. 使用者建立實例，對 MVVM 模組傳入資料
2. MVVM 模組分別將傳入的資料依序傳遞給 Observer 及 Compiler 處理
3. Observer 模組對資料設定劫持機制
4. Compiler 解析元素，根據傳入的資料進行編譯後加入 watcher
5. Watcher 在 Compiler 中被建立時，會自動將自己掛載到對應的資料 Dependency 裡
6. 完成 compile，並在後續資料更新時，調用該資料所有 Dependency 裡掛載的 watchers，執行與編譯該節點時相同的動作。


#### Observer 模組的實踐

首先第一步來看 Observer 是怎麼做到劫持資料的，主要是使用 `defineProperty` 屬性來對物件的所有屬性進行遞回劫持，包括子屬性與新值，初步實踐如下：

```javascript
function observe(data) {
  if (!data || typeof data !== 'object') return;
  Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
}

function DefineReactive(data, key, val) {
  observe(val); // 子屬性遞迴
  Object.defineProperty(data, key, {
    enumerable: true, // 可遍歷
    configurable: false, // 不可再 define
    get() {
      return val;
    },
    set(newValue) {
      console.log(key, '監聽到變化'); // 劫持動作
      val = newValue;
      observe(newValue); // 遞回新值
    }
  });
}
```


#### Dep 模組的實踐

以上已可初步劫持資料的變化了，但一個單一資料可能會被用在多個地方，我們需要一個獨立的地方來儲存每一個資料的 watchers（被用一次必須產生一個新 watcher 去處理），因此我們需要一個訂閱器來儲存 watchers，訂閱器代碼如下：

```javascript
function Dep() {
  this.subs = [];
}

Dep.prototype = {
  // 添加 watcher
  addSub(watcher) {
    this.subs.push(watcher);
  },
  // 通知執行所有相依 watchers
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}
```

接著，因為每個資料都必須創建一個新的訂閱器來儲存屬於他自己的所有 watchers，所以具體在剛剛 `defineReactive` 方法中使用如下：

```javascript
// 上略...

function DefineReactive(data, key, val) {
  const dep = new Dep(); // 創建屬於它自己的訂閱器
  observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    // 暫略...
    set(newValue) {
      console.log(key, '監聽到變化');
      val = newValue;
      observe(newValue);
      dep.notify(); // 通知所有 watchers
    }
  });
}
```

完成通知的設定後，還剩下一個問題，==怎麼添加 watchers 給 dep？==，剛剛有提到，每個資料都有屬於自己的訂閱器實例，訂閱器是在 `defineReactive` 方法中創建的，也就是說加入 watcher 的動作必定是在閉包內進行，因此，我們先假設後續會透過在 `Dep.target`屬性中掛載 watcher 實例，此時就把它加入進去 dep 中。

```javascript
function DefineReactive(data, key, val) {
  const dep = new Dep(); // 訂閱器
  observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get() {
      Dep.target && dep.addSub(Dep.target); // 將掛載的 watcher 加入實例
      return val;
    },
    // 略...
  });
}
```

此時我們須先記著，待會在 Watcher 的模組中，我們必須將 watcher 實例掛載到 `Dep.target` 這個地方後，強制拿取一次對應的資料，才能觸發他的 get 來加入 watcher。


#### Compiler 模組的實踐

為什麼先跳過 Watcher 模組呢？因為 Watcher 模組中有許多實作的概念必須先講到 Compiler 之後才能夠理解為什麼要寫那樣，所以我覺得先講 Compiler 比較有助於理解喔～

在 Compiler 中，我們主要會需要知道編譯的對象，以及拿來編譯的資料，再根據節點類型做對應的編譯方式，另外由於初次編譯會大量操作到 DOM 節點，我們會先將需要編譯的元素轉為文檔碎片 Fragment 的形式處理，待最後解析編譯完成後再一次塞回原來的元素中，具體實踐如下：

```javascript
function Compiler(el, data) {
  this.$el = el;
  this.$data = data;
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}

Compiler.prototype = {
  init() {
    // 解析的對象是文檔碎片
    this.compileElement(this.$frament);
  },
  node2Fragment(el) {
    const fg = document.createDocumentFragment();
    let child = null;
    while (child = el.firstChild) {
      fg.appendChild(child);
    }
    return fg;
  }
}
```

接著，來完成解析節點的 `compileElement` 方法，其中 `_getDataVal`用來取得屬性內容裡寫的物件路徑，並返回該路徑的資料：

```javascript
Compiler.prototype = {
  // 上略...
  // 第一步：分析節點類型
  compileElement(el) {
    const childNodes = el.childNodes, self = this;
    childNodes.forEach((node) => {
      if (self.isElementNode(node)) {
        self.compile(node);
      } else if (self.isTextNode(node)) {
        self.compileText(node);
      }
      // 若節點中還有子節點，遞迴此步驟
      if (self.hasChildNodes(node)) {
        self.compileElement(node);
      }
    });
  },
  // 第二步：編譯不同類型的節點
  // 1. 編譯標籤：比對屬性指令，並調用對應的指令函數後
  compile(node) {
    const attrs = node.attributes, self = this;
    [...attrs].forEach((attr) => {
      const attrName = attr.name;
      // 判斷是否為 v- 開頭的屬性
      if (self.isDirective(attrName)) {
        const dir = attrName.substring(2); // 指令名稱
        const exp = attr.value; // 指令內容
        // 事件屬性
        if (self.isEventDirective(dir)) {
          self.directives['eventHandler'](node, self._getDataVal(exp), dir, self.$data);
        // 一般
        } else {
          self.directives[dir](node, self._getDataVal(exp));
        }
        // 移除專用屬性
        node.removeAttribute(attrName);
      }
    });
  },
  /* -- 工具方法 -- */
  isElementNode(node) {
    return node.nodeType === 1;
  },
  isTextNode(node) {
    return node.nodeType === 3;
  },
  hasChildNodes(node) {
    return node.childNodes && node.childNodes.length;
  },
  isDirective(attrName) {
    return attrName.indexOf('v-') == 0;
  },
  isEventDirective(dir) {
    return dir.indexOf('on') === 0;
  },
  _getDataVal(exp) {
    let val = this.$data;
    exp = exp.split('.');
    exp.forEach((k) => {
      val = val[k];
    });
    return val;
  },
  /* 指令清單 */
  directives: {
    text(node, value) {
      node.textContent = value;
    },
    html(node, value) {
      node.innerHTML = value;
    },
    show(node, value) {
      node.style.display = Boolean(value) ? null : 'none';
    },
    eventHandler(node, value, dir, data) {
      const eventType = dir.split(':')[1];
      const fn = value;
      if (eventType && fn) {
        node.addEventListener(eventType, fn.bind(data), false);
      }
    }
  }
}
```

以上只完成了一般標籤節點的編譯，我們還剩文字節點的編譯須完成，此部分因為牽涉到標籤模板的概念，必須岔開來説明，請見諒～

#### 題外話：標籤模板編譯

標籤模板編譯的實踐方式也有很多，常見的像是直接比對法，或是正則比對法等等，我們這次使用的是 new Function 的方式，用正則比對並將字串替換後放入 new Function 來幫助我們編譯字串中的所有變數，render 方法代碼如下：

```javascript
function removeWrapper(arr) {
  let ret = [];
  arr.forEach((exp) => {
    ret.push(exp.replace(/[\{|\}]/g, '').trim());
  });
  return ret;
}

function render(str, data) {
  const self = this;
  let exps = null;
  str = String(str);
  const t = function(str) {
    const re = /\{\{\s*([^\}]+)?\s*\}\}/g;
    exps = self.removeWrapper(str.match(re));
    str = str.replace(re, '" + data.$1 + "');
    return new Function('data', 'return "'+ str +'";');
  };
  let r = t(str);
  return {
    exps,
    value: r(data)
  };
}
```

具體實踐的原理不是本篇的重點，就不深入討論了，此簡單的 `render` 函數會返回編譯完成的字串，以及所有使用到的 `exps`，之所以要得到 `exps` 是因為後續加入 `watchers` 時必須用到。

#### 回歸正題：Compiler 模組的實踐

我們將剛剛上面的 render 函數加入 prototype 中，並繼續完成 `compileText` 方法：

```javascript
Compiler.prototype = {
  // 上略...
  // 第一步：分析節點類型
  compileElement(el) {
    const childNodes = el.childNodes, self = this;
    childNodes.forEach((node) => {
      if (self.isElementNode(node)) {
        self.compile(node);
      } else if (self.isTextNode(node)) {
        self.compileText(node);
      }
      // 若節點中還有子節點，遞迴此步驟
      if (self.hasChildNodes(node)) {
        self.compileElement(node);
      }
    });
  },
  // 第二步：編譯不同類型的節點
  // 1. 編譯標籤：比對屬性指令，並調用對應的指令函數
  // 略...
  // 2. 字串編譯：比對字串中所有用到的 exp
  compileText(node) {
    const text = node.textContent,
          self = this,
          reg = /\{\{(.*)\}\}/;
    if (reg.test(text)) {
      const { exps, value } = self.render(text.trim(), self.$data);
      self.directives.text(node, value);
    }
  },
  render(str, data) {
    const self = this;
    let exps = null;
    str = String(str);
    const t = function(str) {
      const re = /\{\{\s*([^\}]+)?\s*\}\}/g;
      exps = self.removeWrapper(str.match(re));
      str = str.replace(re, '" + data.$1 + "');
      return new Function('data', 'return "'+ str +'";');
    };
    let r = t(str);
    return {
      exps,
      value: r(data)
    };
  },
  removeWrapper(arr) {
    let ret = [];
    arr.forEach((exp) => {
      ret.push(exp.replace(/[\{|\}]/g, '').trim());
    });
    return ret;
  },
  // 略...
  /* 指令清單 */
  directives: {
    text(node, value) {
      node.textContent = value;
    },
    html(node, value) {
      node.innerHTML = value;
    },
    show(node, value) {
      node.style.display = Boolean(value) ? null : 'none';
    },
    eventHandler(node, value, dir, data) {
      const eventType = dir.split(':')[1];
      const fn = value;
      if (eventType && fn) {
        node.addEventListener(eventType, fn.bind(data), false);
      }
    }
  }
}
```

以上我們已經完成了基本的初次編譯了，接下來要在每個編譯動作完成時，都加入一個 watcher 來幫助我們之後更新資料時，能夠再次進行局部編譯的動作，因此我們將 `compile` 及 `compileText` 方法做點修改如下：

```javascript
Compiler.prototype = {
  // 上略...
  compile(node) {
    const attrs = node.attributes, self = this;
    [...attrs].forEach((attr) => {
      const attrName = attr.name;

      if (self.isDirective(attrName)) {
        const dir = attrName.substring(2);
        const exp = attr.value;
        // 事件屬性
        if (self.isEventDirective(dir)) {
          self.directives['eventHandler'](node, self._getDataVal(exp), dir, self.$vm);
        // 一般
        } else {
          self.directives[dir](node, self._getDataVal(exp));
          new Watcher(this.$data, exp, function(value) {
            self.directives[dir](node, value);
          });
        }
        node.removeAttribute(attrName);
      }
    });
  },
  compileText(node) {
    const text = node.textContent,
          self = this,
          reg = /\{\{(.*)\}\}/;
    if (reg.test(text)) {
      const { exps, value } = self.render(text.trim(), self.$data);
      self.directives.text(node, value);
      // 字串節點中，所有用到的 exp 都需依序加入監聽器
      exps.forEach((exp) => {
        new Watcher(this.$data, exp, function() {
          const { value } = self.render(text.trim(), self.$data);
          self.directives.text(node, value);
        });
      });
    }
  },
  // 下略...
}
```

到此為止，我們完成了基本的 Compiler 了，接著繼續講到 Watcher 模組～！！加油加油！


#### Watcher 模組的實踐

經過 Compiler 的實作後，接下來最重要的 Watcher 扮演著串起 Compiler 及 Observer 溝通的橋樑，也是整個 MVVM 的靈魂，前面最開頭我們提到了在 `Dep.target` 上掛載 watcher 實例，接著必須在創建 watcher 實例時，對指定的資料進行一次 get 的動作，才能強制將 watcher 加入訂閱器中，具體實現如下：

```javascript
function Watcher(data, exp, cb) {
  this.$data = data;
  this.$exp = exp;
  this.$cb = cb;
  this.init();
}

Watcher.prototype = {
  update() {
    this.run();
  },
  init() {
    this._hasInit = false;
    this.value = this.get(); // 初始化同時自動調用
    this._hasInit = true;
  },
  run() {
    const value = this.get();
    const oldValue = this.value;
    if (value !== oldValue) {
      this.value = value;
      this.$cb.call(this.$data, value, oldValue); // 調用綁定的 compile 動作
    }
  },
  get() {
    !this._hasInit && (Dep.target = this); // 掛載 watcher(只可在初始化時掛載，避免重複掛載)
    const value = this._getDataVal(this.$exp); // 強制調用一次目標的 get 觸發劫持動作
    Dep.target = null; // 加入完成，必須移除暫存的 watcher
    return value;
  },
  /* 工具方法 */
  _getDataVal(exp) {
    let val = this.$data;
    exp = exp.split('.');
    exp.forEach((k) => {
      val = val[k];
    });
    return val;
  }
}
```

恭喜你！！看到這邊您已經掌握了整個架構的主要核心模組了，最後只剩下 MVVM 構造器，也就是使用者調用的模組摟～


#### MVVM 模組的實踐（第二部分）

MVVM 的角色就是，將前面所有模組組合起來，使用 Observer 劫持資料變化，透過 Compiler 解析編譯模板，透過 Watcher 完成 Observer 對 Compiler 的聯繫，另外最重要的就是將所有資料綁定到 MVVM 的實例上，方便使用者輕鬆使用，具體構造器代碼如下：

```javascript
function MVVM(options) {
  this.$options;
  this.$data = this.$options.data;
  this.$computed = this.$options.computed;
  this.$methods = this.$options.methods;
  
  // 先將所有資料綁定到 MVVM 實例上
  this.walk(this.$data, (key) => this._proxyData(key));
  this.walk(this.$computed, (key) => this._proxyComputed(key));
  this.walk(this.$methods, (key) => this._proxyMethods(key));
  
  // 再進行初始化，因為 Compiler 必須用到所有的 computed 跟 methods
  this.$el = this.$options.el || document.body;
  this.init();
}

MVVM.prototype = {
  init() {
    new Observer(this.$data);
    new Compiler(this.$el, this);
  },
  walk(data, fn) {
    return Object.keys(data).forEach(fn);
  },
  /* Proxys */
  _proxyData(key) {
    const self = this;
    Object.defineProperty(self, key, {
      enumerable: true,
      configurable: false,
      get() {
        return self.$data[key];
      },
      set(nV) {
        self.$data[key] = nV;
      }
    });
  },
  _proxyComputed(key) {
    const self = this;
    const computed = this.$computed;
    if (typeof computed === 'object') {
      Object.defineProperty(self, key, {
        get: typeof computed[key] === 'function' 
                ? computed[key]
                : computed[key].get,
        set: typeof computed[key] !== 'function'
                ? computed[key].set
                : function() {}
      });
    }
  },
  _proxyMethods(key) {
    const self = this;
    const methods = this.$methods;
    if (typeof methods === 'object') {
      Object.defineProperty(self, key, {
        get: typeof methods[key] === 'function' 
                ? () => methods[key] 
                : function() {},
        set: function() {}
      });
    }
  }
}
```

到此，一個簡單的 MVVM 架構算是完成了，實際已可簡單編譯模板以及加入事件了，使用範例如下：

```html
<div id="app">
  Hello World
  <h3>Title</h3>
  <p>{{ info }}</p>

  <div>
    <button v-on:click="toggleName">Toggle</button>
    <p v-show="showName">{{ name }}</p>
  </div>
</div>
```

```javascript
const vm = new MVVM({
  el: '#app',
  data: {
    name: 'Johnny',
    age: 100,
    showName: true
  },
  computed: {
    info() {
      return this.name + ' ' + this.age;
    }
  },
  methods: {
    toggleName() {
      this.showName = !this.showName;
    }
  }
});
```

以上，就是基本 MVVM 的概念流程實作，當然文中有許多地方一定還可以改善寫法或不夠周全的部分，也請各路高手多多包涵，本文僅作為 MVVM 加深理解以及筆記的方式存在，再次感謝您的閱讀～

參考文獻：
  - [Model-View-ViewModel](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)

  - [剖析Vue实现原理 - 如何实现双向绑定mvvm](https://github.com/DMQ/mvvm)

  - [js 模板编译的实现](https://www.yukapril.com/2017/01/09/js-template-compile.html)

<SocialBlock hashtags="javascript,vuejs,mvvm" />