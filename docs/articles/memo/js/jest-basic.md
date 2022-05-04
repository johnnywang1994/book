# Jest 測試工具 - 基礎篇

<SocialBlock hashtags="javascript,test,jest" />

Hello 我是 Johnny，Jest 是一款很讚的測試工具，許多 framework 也都有使用 jest 建立相關官方的測試工具，本文撰寫時 jest 版本為 `v28.0`，本篇是個人學習文檔時的隨手筆記，此篇主要紀錄基礎使用，Mock 部分會在另一篇進行介紹


## 安裝
可以選擇全局安裝或是本地安裝

```bash
$ npm install --save-dev jest
```


## 使用範例
一個測試最重要就幾個東西需準備
  - 測試對象(sum.js)
  - 測試內容(sum.test.js)
  - 指令執行(package.json)

```js
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```js
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### Cli options
Cli 指令工具可以參考 [jest command line](https://jestjs.io/docs/cli)

```bash
$ jest --init
```

```bash
$ jest my-test --notify --config=config.json
```

### Babel

Babel 的理想配置將取決於您的項目，若項目本身沒有 babel 配置，則需要手動安裝如下

```bash
$ npm install --save-dev babel-jest @babel/core @babel/preset-env
```

```js
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

### 指定測試環境 Babel
若項目中已經有配置，則可以運用下方方式進行調整，區分不同環境下的配置，詳情可參考[官方說明](https://babeljs.io/docs/en/)

```js
// babel.config.js
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.

  return {
    // ...
  };
};
```

> babel-jest 在安裝 Jest 時會自動安裝，如果項目中存在 babel 配置，它會自動轉換文件。 為避免此行為，您可以顯式重置轉換配置選項：
```js
// jest.config.js
module.exports = {
  transform: {},
};
```


## Matchers
本篇介紹幾種常見的 matcher，詳細可參考[官方文件 matcher 清單](https://jestjs.io/docs/expect)

### Common Matchers
- .toBe(): 嚴格相等
- .toEqual(): 物件值相等
- .not.xxx(): 反向 matcher

```js
// toBe and toEqual are equivalent for numbers
expect(value).toBe(4);
expect(value).toEqual(4);
// opposite
expect(a + b).not.toBe(0);
```

### Truthiness
- .toBeNull()
- .toBeDefined()
- .toBeUndefined()
- .toBeTruthy(): 檢驗是否通過 if 條件
- .toBeFalsy()

### Number
- .toBeGreaterThan(number)
- .toBeGreaterThanOrEqual(number)
- .toBeLessThan(number)
- .toBeLessThanOrEqual(number)
- .toBeCloseTo(number): 趨近於

```js
const value = 0.1 + 0.2;
//expect(value).toBe(0.3);           This won't work because of rounding error
expect(value).toBeCloseTo(0.3); // This works.
```

### Strings
- .toMatch(regexp)

```js
expect('Christoph').toMatch(/stop/);
```

### Array
- .toContain()

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

expect(shoppingList).toContain('milk');
```

### Exceptions
- .toThrow()

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

expect(() => compileAndroidCode()).toThrow(Error);
```

> 拋出異常的函數需要在包裝函數中調用，否則 toThrow 斷言將失敗


## Test Asynchronous
非同步的測試是一個很重要的環節，具體可分成三種方式實踐，推薦使用 `async`, `await`
  - promise
  - async, await
  - callback(不推薦)

### Promises
test function 回傳 promise，若 promise rejected 則 test case 將失敗

```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

### Async/Await

```js
test('the fetch fails with an error', async () => {
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
```

### Callback
不 推 薦，請參考[官方文件](https://jestjs.io/docs/asynchronous#callbacks)


## Setup and Teardown
通常在編寫測試時，需要在測試運行之前進行一些配置工作，並且在測試運行之後需要進行一些整理工作

### Repeat
- beforeEach(fn)
- afterEach(fn)

```js
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

### One Time
- beforeAll(fn)
- afterAll(fn)

### Scoping
- describe(): 分類測試 case

`describe` 內的 `beforeAll`, `afterAll` 等等僅套用在該 scoped 內的 test，不影響外部，但外層會影響 describe 內的 test

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

### describe and test order
多層 nested 的 describe 與 test 執行順序是 describe 優先，test 統一在所有 describe 結束後調用

```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

### Only
當有測試 case 失敗時，可以使用 `test.only` 進行精準調整，僅執行該 test case 藉此確認問題原因

```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

<SocialBlock hashtags="javascript,test,jest" />

## 結論
基礎大概先到這邊，若有興趣繼續學習 mock 相關知識，歡迎前往下一篇 - 進階篇
