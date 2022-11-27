# Mediator/Middleware Pattern
Mediator 模式指採用單一核心來取代組件多對多的複雜交互機制

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
  go = next => next();

  use(fn) {
    const stack = this.go;
    this.go = (next) => stack(() => fn(next));
    return this;
  }
}

const app = new Middleware();

app
  .use((next) => {
    console.log('middleware 1.');
    next();
  })
  .use((next) => {
    console.log('middleware 2.');
    next();
  });

app.go(() => {
  console.log('start application');
});
```

