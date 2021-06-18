# Clean Code Javascript 學習

本篇記錄學習 clean code 的一些注意要點，屬於我個人需要注意的地方，本身已經會使用的寫法就不另外贅述。



## 注意要點


### 變量

#### 以具意義變數名取代魔術常量

```js
// bad
setTime(86400000);

// good
const MILLISECONDS_IN_A_DAY = 86400000;
setTime(MILLISECONDS_IN_A_DAY);
```

#### 使用解釋性變量

```js
const arr = ['apple', 'banana'];

// bad
console.log(arr[0]);

// good
const [apple] = arr;
console.log(apple);
```

#### 減少物件中屬性變量重複名稱

```js
// bad
const Car = {
  carName: 'Toyoda',
  carWeight: 100,
};

// good
const Car = {
  name: '',
  weight: '',
};
```


### 函數

#### 單一函數參數量 2 個以下

避免排列組合爆炸，若需要多個，可考慮統一為一個整體傳入。

#### 單一職責（很重要）

一個函數**只做一件事！！**，隔離每個函數的職責，可以大幅提升可讀性，且更易於重構。

#### 函數名應當說明其做什麼

與其額外使用註解說明，直接將函數名以其內部做什麼命名最為簡潔

#### 參數不應包含標記位

標記位是告訴使用者此函數做不只一件事，如果函數內部代碼因為一個參數而不出多個不同路徑，請拆分他們為個別的獨立函數

#### Functional Programming First

#### 減少負面條件

```js
// bad
if (!isValid) {}
// good
if (inValid) {}
```


### 物件與資料結構

#### 使用 getter / setter

使用 getter / setter 來訪問物件中的屬性物件中的屬性比直接查找好的多，當你需要在每次訪問數據時做事，可不必在每次訪問都重複一次代碼，且繼承類後可重寫默認功能。

#### 使用方法鏈

如同知名的 JQuery 或 lodash 等等方法庫，使用方法鏈提升代碼簡潔性。

#### 組合優先繼承


### SOLID

1. 單一職責原則(SRP)

每個類、每個函數只負責單一業務，避免讓一個類裡面包含太多功能，如此會造成太多需要修改類的理由。

2. 開閉原則(OCP)

類、模組、函數應該為擴展開放，修改封閉，允許使用者擴展功能，而不必修改既有代碼。

3. 接口隔離原則(ISP)

讓大部分的設置成為可選的，簡化客戶端的配置。


### 開發

#### 使用 Promise 取代回調

#### Async/Await 比 Promise 更簡潔

#### 只對包含複雜業務邏輯的代碼進行註釋

好的代碼本身就是註釋


### 錯誤處理

#### 不要忽略捕捉到的錯誤



## 參考文章

[代碼整潔的 Javascript](https://github.com/beginor/clean-code-javascript)