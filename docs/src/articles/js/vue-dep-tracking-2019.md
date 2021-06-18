# Vuejs 依賴追蹤 2019 版

本篇主要實現 Vue.js 中的關鍵核心 - 依賴追蹤，將其單獨進行實踐，簡化其他 dom 操作的部分，實際核心代碼中會將其他 dom 的操作指令（directives）一併加入追蹤，這邊先忽略該部分，僅實踐資料面的處理。

我們將從最初步的資料追蹤開始，一步步往下延伸探索，並將 computed, watch 等機制實現



## 物件追蹤 - Observer

在 Vue.js 2.x 版本中主要使用到的是 `Object.defineProperty`，最新的 3.x 版本以改用 `Proxy` 進行實作，本篇主要以 2.x 的版本來實踐，代碼如下：

```js
function Observer(data) {
  this.$data = data;
  this._bindings = {}; // 這個後面會用到，先忽略
  // 追蹤入口
  this._observe(this.$data);
}

Observer.prototype._observe = function(data) {
  if (!data || typeof data !== 'object') return;
  // 遍歷目標對象
  Object.keys(data).forEach((key) => {
    this._defineReactive(data, key, data[key]);
  });
}

Observer.prototype._defineReactive = function(data, key, val) {
  const self = this;
  // 向下遞迴處理子屬性
  self._observe(val);
  // 添加 getter/setter
  Object.defineProperty(data, key, {
    get() {
      return val;
    },
    set(newValue) {
      if (val === newValue) return;
      val = newValue;
      // 對新值進行追蹤
      self._observe(val);
    },
  });
}
```

主要實踐概念如下：
 - 1. 傳入追蹤目標
 - 2. 檢查目標類型
 - 3. 遞迴處理屬性



## Computed

我們知道 computed 主要為一屬性 getter，為簡化步驟強化理解，這裡先不探討 setter 的實踐。

computed 函數中會使用到許多我們的物件屬性，且須追蹤所有用到的屬性，當屬性變化時，需要相應重新計算一次，並觸發其他對應邏輯（Vue.js 中牽涉到 data binding 的 rerender），並且在沒有任何依賴變動的情況下，不會二次取值，也就是必須進行計算的 cache。

依據上述理論，我們知道必須有個東西負責 computed 與 data 之間的溝通調用，我們須建立一個 Dep 物件儲存所有屬性的依賴，並且需要一個 Binding 物件來儲存所有依賴的詳細訊息。

代碼如下：

```js
function Binding(key, callback) {
  this.key = key;
  this.update = callback;
}

function Dep() {
  this.deps = [];
}

Dep.prototype.add = function(binding) {
  // 添加新的 binding 物件
  this.deps.push(binding);
}

Dep.prototype.update = function() {
  this.deps.forEach((binding) => binding.update());
}
```

接著修改 `_defineReactive` 如下，對每個屬性添加依賴集：

```js
Observer.prototype._defineReactive = function(data, key, val) {
  const self = this;
  const deps = self._bindings[key] = new Dep();
  self._observe(val);
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) deps.add(Dep.target); // 用以主動調用添加依賴
      return val;
    },
    set(newValue) {
      if (val === newValue) return;
      val = newValue;
      self._observe(val);
      deps.update();
    },
  });
}

Observer.prototype._defineComputed = function(data, key, computeFn) {
  const self = this;
  let cache; // 多次取值不會再度計算一次，需要 cache 計算結果
  const binding = new Binding(key, function() {
    cache = computeFn.call(self);
    // 這邊還可以追蹤 computed 值修改時要做什麼，例如調用綁定的 directive，本篇先省略
  });
  Dep.target = binding; // 掛載 binding
  cache = computeFn.call(self); // 觸發屬性，對應屬性會把上面掛載的 binding 添加到各自的 Dep 中
  Dep.target = null; // 卸載 binding
  
  // bind reactive key
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        cache = computeFn.call(self);
      }
      return cache;
    },
    set() {}
  });
}
```

這邊是整個部分中比較難以理解的地方，看不懂的話可以多看幾遍，算是 Vue.js 的依賴追蹤核心代碼中很重要的一環，後面會談到 binding 物件的部分，這邊我們可以理解如下：
- 1. 創建一組 binding 物件
- 2. 將 binding 物件掛載到全域物件 `Dep` 中
- 3. 主動調用一次 `computeFn` 觸發其中使用到的所有屬性

以上就完成簡單版本的 `computed` 摟～



## Watch

watch 的實踐部分其實跟 computed 極為類似，但 watch 並不創建新的屬性，僅添加額外的 binding 到對應的屬性中，代碼如下：

```js
Observer.prototype._defineWatcher = function(data, key, callback) {
  const self = this;
  // 建立一組新的 binding
  const binding = new Binding(key, function() {
    // 每次調用都會取其最新值，並交給 callback 進行處理
    const value = data[key];
    callback.call(self, value);
  }, true);
  // 顯性調用掛載 binding 到對應的屬性中
  // 這邊如果 key 本身是一個 computed 屬性也可以，因為 computed 屬性的 getter 在被調用時，也會主動再次執行一次，並再度調用其內部所有用到的屬性
  Dep.target = binding;
  data[key];
  Dep.target = null;
}
```


## 掛載所有方法

這邊將上面完成的所有方法掛載到 Observer 上，代碼如下：

```js
function Observer(data) {
  this.$data = data;
  this._bindings = {};
  this._observe(this.$data);
  
  // bind method to itself
  this.$set = this._defineReactive.bind(this, this.$data);
  this.$computed = this._defineComputed.bind(this, this.$data);
  this.$watch = this._defineWatcher.bind(this, this.$data);
}
```

大功告成拉～實際用一下

```js
const person = new Observer({
  name: 'Johnny',
  age: 30,
});

person.$computed('info', function() {
  return this.$data.name + ' ' + this.$data.age;
});

person.$watch('info', function(newValue) {
  console.log('watched! ' + newValue);
});

// 調用 name, age => 也會觸發 info => 成功
person.$data.name = 'Kevin'; // watched! Kevin 30
person.$data.age = 1000; // watched! Kevin 1000
```

以上，算是自己簡單實踐的一個版本，僅供學習理解參考，實際 Vue.js 實現上考量到的眾多機制並不是這樣簡單幾行程式碼能完成的。

如果覺得有幫助到你的話，歡迎分享文章喔～
