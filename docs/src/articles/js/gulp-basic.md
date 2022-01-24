# Gulp 學習筆記

本篇是在 2018 年左右撰寫，內容記錄一些學習 Gulp 的筆記


## Gulp 介紹

gulp 與webpack不同，僅用以自定義生產自動化指令，並非打包系統，

使用輕便，但相對於webpack來說，不適合用於較為複雜之專案。


## Gulp 基礎

使用時必須先全局安裝gulp-cli，並再local目錄內安裝gulp。

若電腦中已有安裝gulp，可以使用指令 gulp -v 測試，建議先移除舊版gulp 後

再行安裝新版本的gulp-cli。

***安裝 Gulp-Cli***

```bash
$ npm install -g gulp-cli
```

***安裝 Gulp***

```bash
$ npm install --save-dev gulp
```

***建立 gulpfile.js***

gulp 指令讀取此檔案

```js
// gulpfile.js
const gulp = require('gulp');
```

***預設 default 指令***

建構基礎 default 指令模組，使用gulp default可呼叫指令執行

```js
gulp.task('default', done => {
  gulp.src(); // 資料來源
  console.log('Test OK!');
  gulp.dest(); // 資料輸出
  done();
})
```

注意：

上方出現的 done 為 gulp 的 task 預設callback函數，請在指令動作結束後呼叫。

避免造成 gulp 誤認為指令尚未結束，另也可以使用 return 顯性告訴 gulp 指令結束。



## pump 取代 pipe

由於除錯不易的關係，pipe已被pump取代，請安裝 pump 使用。

```bash
$ npm install --save-dev pump
```

***使用方式***

以sass處理為例：

```js
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const sass = require('gulp-sass');

gulp.task('sass', cb => {
  pump([
    // 以數組存放所有指令
    gulp.src(sassInput),
    sass.sync().on('error', sass.logError),
    concat(bundleName),
    autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
    cleanCss(),
    gulp.dest(sassOutput),
  ], cb) // 最後呼叫 cb 結束
})
```

此處的 cb 就是剛剛提到的 done，只是命名變數不同而已。

pump 使用方式比起原生pipe更為簡潔，並且只要指令中途出錯，就會完全停止執行並報錯提醒。



## gulp.watch 監聽文件

gulp 內建可以使用檔案監聽功能，便於開發使用，使用如下：

```js
const gulp = require('gulp');
const sass = require('gulp-sass');

// 先定義監聽變化後需要執行的指令
gulp.task('sass', cb => {
  pump([
    gulp.src(sassInput),
    sass.sync().on('error', sass.logError),
    gulp.dest(sassOutput),
  ], cb)
});

// 定義目標對象監聽
gulp.task('sass:watch', cb => {
  gulp.watch(sassInput, gulp.series('sass'));
  cb();
});
```

注意：

1. 監聽屬性是放在task裡面使用，跟gulp.src, gulp.dest一樣位置

2. watch的第一個參數是監聽的對象，第二個參數請使用 gulp.series(a, b, c) 的方式，

    將欲觸發的指令放入其中。

3. watch 在執行當下，並不會先自動執行一次指令，如果需要在執行 watch 時，先執行一次時，

    請在外部task處事先調用如下：

```js
gulp.task('sass:watch', gulp.series('sass', cb => {
  gulp.watch(sassInput, gulp.series('sass'));
  cb();
}));
```

    將原來task函數的第二個參數換成 gulp.series()，並以此形式將所有指令串接起來執行。



## 文件匹配範例

匹配單一 sass 檔。

```js
const path = './src/sass/index.sass';
```

匹配單個資料夾下的 sass 檔，不包含其子目錄。

```js
const path = './src/sass/*.sass';
```

不匹配 _ 下劃號開頭的檔案，在開頭使用 ! 。

```js
const path = [
  './src/views/*.pug',
  '!./src/views/_*.pug'
];
```

匹配所有 views 目錄下的 pug 檔。

```js
const path = './src/views/**/*.pug';
```



## WINDOWS 系統 路徑匹配問題

在WINDOWS系統中使用 nodejs 的 path 模組時，例如 path.resolve(__dirname, '../')，

這種方式匯回傳為 C:\Users\XXX\XXX ，導致 gulp 模組路徑無法正常運作，

有鑑於此請使用如下模組，將path經由 nodejs 提供的方法 path.sep

提出所有路徑為數組，再手動合成路徑正確可讀取之路徑：

```js
const path = require('path');

module.exports.crossPath = function(a, b) {
  return path.resolve(a, b).split(path.sep).join('/');
}
```