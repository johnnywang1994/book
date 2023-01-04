# Observer Pattern

<SocialBlock hashtags="design,pattern,observer" />


## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Observer Pattern`


## 介紹
Observer 使我們能夠對物件進行訂閱，當 observable 目標被訂閱物件出現任何事件，能夠對其對應的所有訂閱者 observer 傳遞通知，一個經典的案例就是，當你訂閱的網紅今天發布了最新影片，其所有訂閱者都將馬上收到通知訊息

一個 Observable 物件通常包含以下 3個重要部分：
- `observers`: 訂閱者清單
- `subscribe()`: 訂閱
- `unsubscribe()`: 取消訂閱
- `notify()`: 通知所有訂閱者

根據以上，我們來實際動手試試

```js
class Observable() {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter(observer => observer !== func);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}
```