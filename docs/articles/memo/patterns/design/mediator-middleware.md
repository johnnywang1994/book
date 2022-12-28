# Mediator/Middleware Pattern

<SocialBlock hashtags="design,pattern,mediator,middleware" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Mediator/Middleware Pattern`


## 介紹
- Mediator 模式指採用單一核心來取代組件多對多的複雜交互機制
- Middleware 指程式中處理 request, response 的管道模式
- Middleware Pattern 指微服務架構中描述請求路由(message routing)處理方式的模式，類似中央處理器決定哪個微服務將接收請求


## 比喻案例
想像成機長與塔台的關係，比起機長與機長彼此溝通，透過塔台統一整理所有機長的資訊並共享，最大化消除機長間溝通的效率與複雜度，所有機長只需要跟塔台溝通即可，不需個別維護與其他機長間的溝通

## Mediator 範例
```js
class User {
  constructor(name) {
    this.name = name;
    this.chatroom = null;
  }

  send(message, to) {
    this.chatroom.send(message, this, to);
  }

  receive(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

class ChatRoom {
  constructor() {
    this.members = {};
  }

  register(newMember) {
    newMember.chatroom = this;
    this.members[newMember.name] = newMember;
  }

  send(message, from, to) {
    if (to instanceof User) { // single
      to.receive(message, from);
    } else { // broadcast
      const { members } = this;
      for (let name in members) {
        if (members[name] !== from) { // exclude sender
          members[name].receive(message, from);
        }
      }
    }
  }
}

const chatroom = new ChatRoom();
const johnny = new User('johnny');
const kevin = new User('kevin');
const chris = new User('chris');

chatroom.register(johnny);
chatroom.register(kevin);
chatroom.register(chris);

johnny.send('Hello Kevin!', kevin);
johnny.send('Hello everyone!');
chris.send('When is meeting?', johnny);
// johnny to kevin: Hello Kevin!
// johnny to kevin: Hello everyone!
// johnny to chris: Hello everyone!
// chris to johnny: When is meeting?
```

## Middleware 範例
- [middleware demo](https://gist.github.com/darrenscerri/5c3b3dcbe4d370435cfa)
```js
class Middleware {
  constructor() {
    this.go = {};
  }

  use(name, fn) {
    let stack = this.go[name] || ((next) => next());
    this.go[name] = (next) => stack(() => fn(next));
    return this;
  }
}

const app = new Middleware();

function logCurrentTime(next) {
  console.log('log process', new Date());
  next();
}

function app1(next) {
  console.log('my app 1 executed');
  next();
}

function app2(next) {
  console.log('my app 2 executed');
  next();
}

app
  .use('app1', logCurrentTime)
  .use('app1', app1);

app
  .use('app2', logCurrentTime)
  .use('app2', app2);

app
  .use('combined', logCurrentTime)
  .use('combined', app1)
  .use('combined', app2);

app.go.combined(() => {
  console.log('process end');
});
// log process 2023-xx-xxTxx:xx:xx.xxxZ
// my app 1 executed
// my app 2 executed
// process end
```

<SocialBlock hashtags="design,pattern,mediator,middleware" />

## 結論
|Pattern|Pros|Cons|
|--|--|--|
|Mediator|<ul><li>編寫簡單</li><li>程式解耦</li><li>減少深層子類</li></ul>|Mediator 通常為了與所有的類保持緊密，自身結構將變得更複雜|
|Middleware|<ul><li>簡化業務邏輯</li><li>保持跨系統訊息的完整性</li><li>應用範圍廣泛</li></ul>|<ul><li>開發成本高</li><li>特定情形下的效能問題</li></ul>|


感謝大家觀看，我們下一篇見拉～～