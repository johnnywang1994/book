# Command Component

<SocialBlock hashtags="design,pattern,command" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Command Pattern`


## 介紹
`Command Pattern` 是一種讓我們能夠「解構」一個對象上的功能，而不直接寫死在對象上，以下是一個食物輸送的模組範例
```js
class OrderManager() {
  constructor() {
    this.orders = []
  }

  placeOrder(order, id) {
    this.orders.push(id)
    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id) {
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id)
    return `You have canceled your order ${id}`
  }
}
```
當我們要下單時直接呼叫如下
```js
const manager = new OrderManager();

manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");
```
但這麼做的話，當我們要調整 method 名稱時，必須在整個 codebase 上尋找呼叫的地方一個一個修改，造成維護上的麻煩，也因此可以改寫如下
```js
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}
```
對應我們建立一個 command 對象
```js
class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command((orders) => {
    orders.push(id);
    return `You have successfully ordered ${order} (${id})`;
  });
}

function CancelOrderCommand(id) {
  return new Command((orders) => {
    orders = orders.filter((order) => order.id !== id);
    return `You have canceled your order ${id}`;
  });
}

function TrackOrderCommand(id) {
  return new Command(() => `Your order ${id} will arrive in 20 minutes.`);
}
```
接著我們在呼叫時只需要這樣使用，往後新增一個 order 時就再也不需要去動 OrderManager 了，也符合了基本的 SOLID 原則
```js
const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

<SocialBlock hashtags="design,pattern,command" />

## 結論
### 優點
- 能夠避免掉擴充時，需要每次再去修改原本模組的問題
- 減輕、降低維護時的修改麻煩
### 缺點
- 無法直接從模組中看到 order 具體做了什麼，需要特別注意抽象出去的依賴模組安全性

今天就分享到這拉，下篇見摟 =V=