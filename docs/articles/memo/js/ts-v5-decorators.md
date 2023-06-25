# Typescript v5 Decorator 學習筆記

## 參考文章
- [Official Basic](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)
- [Official Advanced](https://2ality.com/2022/10/javascript-decorators.html)
- [Article](https://blog.logrocket.com/practical-guide-typescript-decorators/)


## Introduction
TS v5 版本的 decorator 在寫法上有更新，以下是相關介紹筆記

主要分為以下幾種:
- [Class decorators](https://2ality.com/2022/10/javascript-decorators.html#class-decorators)
- [Class method decorators](https://2ality.com/2022/10/javascript-decorators.html#class-method-decorators)
- [Class getter decorators, class setter decorators](https://2ality.com/2022/10/javascript-decorators.html#class-getter-decorators%2C-class-setter-decorators)
- [Class field decorators](https://2ality.com/2022/10/javascript-decorators.html#class-field-decorators)
```ts
type Decorator =
  | ClassDecorator
  | ClassMethodDecorator
  | ClassGetterDecorator
  | ClassSetterDecorator
  | ClassFieldDecorator
  | ClassAutoAccessorDecorator;
```


## 1. Class decorators
類型
```ts
type ClassDecorator = (
  value: Function,
  context: {
    kind: 'class';
    name: string | undefined;
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```
範例
```ts
class InstanceCollector {
  instances = new Set();
  install = (value, {kind}) => {
    if (kind === 'class') {
      const _this = this;
      return function (...args) { // (A)
        const inst = new value(...args); // (B)
        _this.instances.add(inst);
        return inst;
      };
    }
  };
}

const collector = new InstanceCollector();

@collector.install
class MyClass {}

const inst1 = new MyClass();
const inst2 = new MyClass();
const inst3 = new MyClass();

console.log(collector.instances);
```

## 2. Class method decorators
類型
```ts
type ClassMethodDecorator = (
  value: Function,
  context: {
    kind: 'method';
    name: string | symbol;
    static: boolean;
    private: boolean;
    access: { get: () => unknown };
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```
範例
```ts
function deprecatedMethod(target: Function, context: ClassMethodDecoratorContext) {
  if (context.kind === 'method') {
    const methodName = String(context.name);
    return function (...args: any[]) {
      console.log(`${methodName} is deprecated and will be removed in a future version.`)
      return target.apply(this, args);
    }
  }
}

class Person {
  @deprecatedMethod
  greet() {
    console.log('Hello, my name is');
  }
}
```


## 3. Class getter decorators, class setter decorators
類型
```ts
type ClassGetterDecorator = (
  value: Function,
  context: {
    kind: 'getter';
    name: string | symbol;
    static: boolean;
    private: boolean;
    access: { get: () => unknown };
    addInitializer(initializer: () => void): void;
  }
) => Function | void;

type ClassSetterDecorator = (
  value: Function,
  context: {
    kind: 'setter';
    name: string | symbol;
    static: boolean;
    private: boolean;
    access: { set: (value: unknown) => void };
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```
範例
```ts
function lazy(getter: Function, { kind, name }: ClassGetterDecoratorContext) {
  if (kind === 'getter') {
    return function () {
      const result = getter.call(this);
      Object.defineProperty(this, name, {
        value: result,
        writable: false,
      });
      return result;
    };
  }
}

class C {
  @lazy
  get value() {
    console.log('COMPUTING');
    return 'Result of computation';
  }
}

const inst = new C();
console.log('1 inst.value', inst.value);
console.log('2 inst.value', inst.value);
console.log('3 end');

// COMPUTING
// 1 inst.value Result of computation
// 2 inst.value Result of computation
// 3 end
```

## 4. Class field decorators
類型
```ts
type ClassFieldDecorator = (
  value: undefined,
  context: {
    kind: 'field';
    name: string | symbol;
    static: boolean;
    private: boolean;
    access: { get: () => unknown, set: (value: unknown) => void };
    addInitializer(initializer: () => void): void;
  }
) => (initialValue: unknown) => unknown | void;
```
範例
```ts
function twice(_: undefined, { kind }: ClassFieldDecoratorContext) {
  if (kind === 'field') {
    return (initialValue) => initialValue * 2;
  }
}

class C {
  @twice
  double = 3;
}

const inst = new C();
console.log(inst.double);
// 6
```


## 5. Auto-accessors: a new member of class definitions
在 class 欄位前加上 `accessor` 即可宣告，與普通欄位的差別如下：
- A field creates either:
  - Properties (static or instance)
  - Private slots (static or instance)
- An auto-accessor creates a `private` slot (static or instance) for the data and
  - A public getter-setter pair (static or prototype)
  - A private getter-setter pair (static or instance)
    - Private slots are not inherited and therefore never located in prototypes.

假設如下範例：
```ts
class C {
  accessor str = 'abc';
}
const inst = new C();
console.log(inst.str); // abc
inst.str = 'def';
console.log(inst.str); // def
```
等同於下方
```ts
class C {
  #str = 'abc';
  get str() {
    return this.#str;
  }
  set str(value) {
    this.#str = value;
  }
}
```

使用範例
```ts
const UNINITIALIZED = Symbol('UNINITIALIZED');

function readOnly({get,set}, {name, kind}) {
  if (kind === 'accessor') {
    return {
      init() {
        return UNINITIALIZED;
      },
      get() {
        const value = get.call(this);
        if (value === UNINITIALIZED) {
          throw new TypeError(
            `Accessor ${name} hasn’t been initialized yet`
          );
        }
        return value;
      },
      set(newValue) {
        const oldValue = get.call(this);
        if (oldValue !== UNINITIALIZED) {
          throw new TypeError(
            `Accessor ${name} can only be set once`
          );
        }
        set.call(this, newValue);
      },
    };
  }
}

class Color {
  @readOnly
  accessor name;
  constructor(name) {
    this.name = name;
  }
}
```
可以明顯看出與前面 field `@readonly` decorator的差別，這邊不需要在 class 外包裹一層