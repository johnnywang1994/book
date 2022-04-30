# Vue 單元測試學習筆記


## 安裝

除了透過 VueCli 內建的自動配置安裝，也可參考[這個專案]的一些架構跟依賴進行手動安裝

> 這裡要特別注意相依套件的版本必須相同，如果直接安裝 jest 最新版本將有可能導致錯誤，因為 vue3-jest 可能還沒相應升級版本，可以[參考這個討論](https://stackoverflow.com/questions/68065635/vue-test-utils-typeerror-cannot-destructure-property-config-of-undefined-or)

```bash
$ yarn add @vue/test-utils vue3-jest@27 jest@27 ts-jest@27 babel-jest@27 jest-environment-jsdom@27 -D
```

### Babel

另外因為會需要用到 `babel`，如果專案中原本沒有配置 babel 也要安裝下面這些套件

```bash
$ yarn add @babel/core @babel/preset-env -D
```

新增 `babel.config.js`(這邊是範例，如果本來已經有配置可忽略這裡)

```js
module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
}
```


## 配置

接下來要配置 `package.json` 以及 `jest.config.js` 如下

- package.json
```json
{
  "scripts": {
    "test": "yarn jest"
  }
}
```

- jest.config.js
```js
module.exports = {
  preset: 'ts-jest',
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.vue$": "vue3-jest",
    "^.+\\js$": "babel-jest"
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}
```

### 測試檔案路徑
預設會自動在專案資料夾下尋找 `__test__` 資料夾內的測試檔案進行處理


## Jest 內建測試函數

### describe
定義測試集

### test/it
定義測試項目

### beforeEach
定義每次測試項目之前執行的動作

```js
describe('Test Task', () => {
  let wrapper
  const minLength = 6

  // 在每一個 test() 執行前運行的一個函式，常會用來初始化 wrapper
  beforeEach(() => {
    wrapper = mount(Component)
  })

  it('Test Case', () => {
    // ...
  })
})
```


## 測試範例

### 初始化 Vue 組件
```js
describe('TodoApp Test', () => {
  const wrapper = mount(TodoApp, {
    props: {
      msg: 'Hello World'
    },
    data() {
      return {
        exist: false
      }
    }
  })
})
```

### 取值, 查找元素, 檢查
```js
// get: 查找，沒找到噴錯，通常用於必須存在時
// toBe: 檢查等於
expect(wrapper.get('[data-test="todo"]').text()).toBe('Profile');
// find: 查找，沒找到不噴錯，通常用於檢查是否存在時
// exists: 檢查存在
expect(wrapper.find('#admin').exists()).toBe(false);
// html: 獲取渲染的 html
// toContain: 檢查包含
expect(wrapper.html()).toContain('Hello World');
// isVisible: 檢查可視(display: none, opacity: 0, visibility: hidden)
expect(wrapper.get('#visible').isVisible()).toBe(false);
```

### 取得、修改狀態值
```js
it('render admin link', async () => {
  expect(wrapper.find('#admin').exists()).toBe(false);
  // setData: 修改狀態
  await wrapper.setData({ admin: true });
  expect(wrapper.find('#admin').exists()).toBe(true);
})
```

```js
it('check data value', async () => {
  // vm: 取得 vue instance
  expect(wrapper.vm.email).toBe(TEST_VALUE)
})
```

```js
it('not render error if prop showError is false', async () => {
  await wrapper.get('[data-test="password"]').setValue('abcde');
  // setProps: 修改 props 資料
  await wrapper.setProps({ showError: false });
  expect(wrapper.find('[data-test="errorMsg"]').exists()).toBe(false);
})
```

### 取得、修改 DOM 值
```js
it('check input value', async () => {
  // setValue: 修改表單元素值
  await emailInput.setValue(TEST_VALUE);
  // element: 取得 DOM 元素
  expect(emailInput.element.value).toBe(TEST_VALUE)
})
```

> 呼叫 setValue 的對象為 OPTION、CHECKBOX 或 RADIO 時， 如果沒有傳參數給 setValue 則表示為 checked

### 觸發 DOM Event
```js
it('count became 1 after clicked once', async () => {
  // trigger: 觸發 DOM 事件
  await wrapper.get('[data-test="button"]').trigger('click');
  expect(wrapper.get('[data-test="count"]').text()).toBe('1');
})
```

### 檢查、觸發 Emit Event
```js
it('check emit triggered', async () => {
  const count = wrapper.find('[data-test="count"]');
  // 觸發事件
  await count.trigger('click');
  // 檢查觸發事件中包含 greet emit 事件
  // emitted: 回傳一個紀錄元件發出的所有事件的物件，也可取得指定事件內容
  // toHaveProperty: jest 檢查物件中是否存在某屬性
  expect(wrapper.emitted()).toHaveProperty('greet');
  const greetEvent = wrapper.emitted('greet');
  // toEqual: 比較物件的所有屬性或陣列的所有元素是否相等
  expect(greetEvent[0]).toEqual([1]);
})
```

```js
// emitted 觸發兩次回傳結構
const emittedResponse = {
  increment: [ [1], [2] ]
}
```

```js
it('uses shallowMount', async () => {
  const wrapper = shallowMount(App)
  await wrapper.findComponent(Hello).vm.$emit('greet')
})
```


### Pinia Test

[參考 Pinia 官方說明](https://pinia.vuejs.org/cookbook/testing.html)