# Vue/Vitejs 部分源碼解析

本篇是作為自己閱讀 Vite 部分源碼後的一點筆記，並且簡單實現一個基於 ESM 的模組解析 server。

因為小弟本人只會用 express...，所以本篇是以 express 來搭建，Vite 官方是使用 Koa 實現。但應該概念上是差不多的。

那就開始動手準備 get dirty 拉～


## 前言

因為有關 ESM 相關技術的詳細說明，應該已經有許多強大的技術大大們分享過了，這裡就不贅述了，只簡單提一下概念。

以往在使用 webpack 等構件工具時，我們會使用像是 Babel 等轉譯的工具將新的 es6^ 語法轉為 es5 的 Node cjs 寫法，讓 nodejs 幫助我們完成模塊化的需求，但其實現代瀏覽器中，多數已經具備直接讀取 es6^ 語法的能力，其中也包括了新的模組化技術 ESM，因此，像是 Vite, Snowpack(前身為 @pika/web) 等等工具就是以瀏覽器自身的編譯能力來完成開發環境的使用

使用 webpack 時必須在本機先等編譯完成後再打開瀏覽器，而透過伺服器直接編譯的方式，會在打開瀏覽器後才開始編譯，差別在於，當伺服器編譯完成後，可以直接交給瀏覽器讀取並解析，而透過本地編譯的方式則必須在打開瀏覽器後再進行一次 webpack 本身的 map 依賴處理環節，故效率上會有一定的差距。

廢話就不多說拉ＸＤ～，有興趣的可以看一下社群 Huli 大佬的這篇--[Vite 怎麼能那麼快？從 ES modules 開始談起](https://blog.techbridge.cc/2020/08/07/vite-and-esmodules-snowpack/)，我們趕快開始寫 code！


## 第一步：Server 構建

首先安裝相關工具：

```bash
$ yarn init
$ yarn add express nodemon socket.io
```

目錄結構：

```bash
--public
--server
  --import
    --path
      --vue.js
      --react.js
    --reader
      --readIndex.js
      --readESInit.js
      --readModule.js
      --readNodeModules.js
      --readStyle.js
      --readUrl.js
      --readVueComponent.js
    --index.js
    --utils.js
  --app.js
  --www.js
  --config.js
```

建立 app.js

```js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { CONFIGS, resolveRoot } = require('./config');

// static files
app.use(express.static(resolveRoot(CONFIGS.static || './public')));

// hot reload watch
io.on('connection', (socket) => {
  socket.emit('init',{ msg: 'ES module hot-reload on watching...' });
});

function listen(port) {
  http.listen(port, () => {
    console.log('Server on port: ' + port);
  });
};

module.exports = { app, io, listen };
```

建立 config.js

```js
const path = require('path');
const __ROOT = process.cwd();
const __NODE_MODULES = 'node_modules';
const __MODULE = '/@modules/';
const CONFIGS = require(resolveRoot('./es.config'));

// resolve path from root
function resolveRoot(p) { return path.resolve(__ROOT, p); }

// resolve path from node_modules
function resolveModules(p) { return path.resolve(__ROOT, __NODE_MODULES, p); }

module.exports = {
  __ROOT,
  __MODULE,
  CONFIGS,
  resolveRoot,
  resolveModules,
};
```

建立 www.js(nodejs 啟動檔)

```js
const express = require('express');
const { app, listen } = require('./app');
const importMiddleware = require('./import');
const { resolveRoot } = require('./config');

const port = process.env.PORT || 8080;
app.set('port', port);

// import middleware 中設定所有檔案讀取的規則
app.use(importMiddleware);

// 這裡可以讓後續對 /src 開頭的圖片請求順利拿到檔案
app.use('/src', express.static(resolveRoot('./src')));

listen(port);
```


## 第二步：import middleware 構建

這裡主要是以類似 webpack 的 rules 的處理方式來定義所有 import 檔案的請求處理：

```js
const testRules = [
  // ...rules
];

async function importFile(req, res, next) {
  const { url } = req;
  for (let i=0;i<testRules.length;i++) {
    const { test: rule, loader } = testRules[i];
    // match string
    if (typeof rule === 'string' && url === rule) {
      return await loader(req, res, next);
    }
    // match regexp
    if (typeof rule === 'object' && rule.test(url)) {
      return await loader(req, res, next);
    }
  }
  if (!/[^.]\.{1}[\w+\.]/.test(url) || /\.js$/.test(url)) {
    // default use .js file
    return await readModule(req, res, next);
  }
}

async function importMiddleware(req, res, next) {
  let data;
  // handle file
  data = await importFile(req, res, next);
  // return content
  if (data) {
    res.end(data);
  } else {
    // pass to native browser
    next();
  }
}

module.exports = importMiddleware;
```


## 第三步：Rules 處理

在 index.js 中依序添加如下處理規則

```js
const testRules = [
  // 處理 index.html
  {
    test: '/',
    loader: readIndex,
  },
  // 處理 js 中的 import images
  {
    test: /^\/@url/,
    loader: readUrl,
  },
  // 處理 js 初始化文件
  {
    test: /^\/esinit$/,
    loader: readESInit,
  },
  // 處理 node_modules
  {
    test: /^\/@modules/,
    loader: readNodeModules,
  },
  // 處理 styles
  {
    test: /\.s?css$/,
    loader: readStyle,
  },
  // 處理 vue single file
  {
    test: /\.vue/,
    loader: readVueComponent,
  },
];
```

### readIndex

首先要處理首頁入口讀取，這是全部的起始點！必須將一些周邊設定在這階段注入，

```js
const fs = require('fs');
const { watchFile, fileExists } = require('../utils');

/**
 * Read entry file
 * @param {*} req 
 * @param {*} res 
 */
function readIndex(req, res) {
  res.set('Content-Type', 'text/html');
  const filePath = './index.html';
  // check file exist
  if (fileExists(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    // watch file, if file change will trigger socket to client reloading
    watchFile(filePath);
    // inject socket into template
    let code = '<script crossorigin src="https://cdn.socket.io/socket.io-2.3.0.js"></script>';
    // inject init script as module
    code += `\n<script type="module" src="/esinit"></script>`;
    code += '\n<script ';
    // set process for browser
    return data.replace('<script ', code);
  }
}

module.exports = readIndex;
```

### readESInit

這裡處理自定義的路徑 `/esinit` 來進行 socket.io 的初始化及後續處理等等，這邊為求方便就只直接 reload page，實際 Vite 在這裡下很多工夫，可以參考 [Vite: How HMR works](https://github.com/vitejs/vite/blob/master/src/node/server/serverPluginHmr.ts)

因為 Vue 內部需要用到 process.env，這裡只簡單插入到 window 中

```js
const { CONFIGS } = require('../../config');

/**
 * Init ES settings
 */
function readESInit(req, res) {
  res.set('Content-Type', 'application/javascript');
  // Vue will need process.env
  let code = 'window.process = {env:{ NODE_ENV: "dev"}};';
  // check if need hotreload
  if (CONFIGS.hmr) {
    code += '\nconst socket = io();';
    code += '\nsocket.on("init", (msg) => console.log(msg));';
    code += '\nsocket.on("update", () => window.location.reload());';
  }
  return code;
}

module.exports = readESInit;
```

### readModule

接著來處理最基本的 `.js` 檔案，這裡主要必須做幾件事，除了將基本的檔案讀取之外，要另外處理像是 `import Vue from 'vue'` 這種寫法，因為原生 ESM 是只能處理路徑像是 `./`, `/` 這種，這裡我們用正則來替換這種寫法，將其導引至我們定義的 `/@modules/` 開頭，並在後續處理他

> 這裡如果直接把他轉成 /node_modules 開頭而不另外處理的話會有資料夾路徑等等更複雜的問題，透過轉成我們自定義的路徑，可以更方便的處理。

這裡需要安裝 `@babel/core @babel/plugin-transform-react-jsx` 來處理 react 的 jsx。

```js
const fs = require('fs');
const { CONFIGS, resolveRoot } = require('../../config');
const {
  watchFile,
  fileExists,
  rewriteImport
} = require('../utils');
let babelCore;

/**
 * Import Local Module
 * @param {*} req 
 * @param {*} res 
 */
function readModule({ url }, res) {
  res.set('Content-Type', 'application/javascript');
  const filePath = resolveRoot(
    // use .js by default
    (/[^.]\.{1}[\w+\.]/.test(url) ? url : `${url}.js`).slice(1)
  );
  if (fileExists(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    watchFile(filePath);
    // here we only compile user module for jsx
    if (CONFIGS.jsx) {
      babelCore = babelCore || require('@babel/core');
      let { code } = babelCore.transform(data, {
        plugins: ["@babel/plugin-transform-react-jsx"],
      });
      // match & rewrite import path
      return rewriteImport(code, url);
    }
    return rewriteImport(data, url);
  }
}

module.exports = readModule;
```

`rewriteImport` 長的大概像這樣：

```js
const {
  __MODULE,
} = require('../../config');

// rewrite matched path to /@modules/
function rewriteImport(content, filePath){
  return content.replace(/from ['"]([^'"]+)['"]/g, function(s0, s1){
    // . ../ /
    if (s1[0] !== '.' && s1[1] !== '/'){
      return `from '${__MODULE + s1}'`;
    } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(s1)){
      // 取代 import image
      const base = path.posix.dirname(filePath);
      return `from '/@url?path=${path.resolve(base, s1)}';`;
    } else {
      return s0;
    }
  });
}
```

### readNodeModules

這個 rule 主要負責對 `node_modules` 的依賴處理，也就是上一步被改寫成 `/@modules/` 開頭的路徑處理。這一步會遇到個問題，就是各個 package 對於自己 esm 模組的引入位置都是不一定的，可能會需要個別處理，例如 Vue2 的原生瀏覽器 esm 模組路徑並不是在 `package.json` 的 `module` 路徑下，這裡我們另外用 `handleModulePath` 處理模組真實路徑，針對個別套件去判斷（當然前提是如果有需要），我們給他預設情況下使用 `module` 或是 `main` 的模組。

另外因為許多 node_modules 中的套件是經過編譯的 es5 格式，在引入時會噴錯，這裡使用 `lebab` 套件來將 es5 的模組寫法轉為 es6，讓瀏覽器可以理解。

> 這裡要安裝 `lebab`

```js
const fs = require('fs');
const { transform } = require('lebab');
const {
  __MODULE,
  CONFIGS,
  resolveModules,
} = require('../../config');
const {
  fileExists,
  rewriteImport,
  handleModulePath,
} = require('../utils');

/**
 * Import Modules from node_modules
 * @param {*} req 
 * @param {*} res 
 */
function readNodeModules({ url }, res) {
  res.set('Content-Type', 'application/javascript');
  const prefix = resolveModules(url.replace(__MODULE, ''));
  // get filepath
  const filePath = handleModulePath(prefix);
  if (fileExists(filePath)) {
    let data = fs.readFileSync(filePath, 'utf-8');
    // auto es5 => es6 by lebab
    if (CONFIGS.autoTransform) {
      data = transform(data, ['commonjs']).code;
    }
    // node_modules dep import
    return rewriteImport(data);
  }
}

module.exports = readNodeModules;
```

處理 filePath

```js
function handleModulePath(prefix) {
  const pkg = require(prefix + '/package.json');
  let modulePath;
  if (pkg) {
    const isVuePath = checkVuePath(pkg);
    const isReactPath = checkReactPath(pkg);
    if (isVuePath) { modulePath = isVuePath; }
    if (isReactPath) { modulePath = isReactPath; }
    if (typeof CONFIGS.checkModulePath === 'function') {
      const customPath = CONFIGS.checkModulePath(pkg);
      if (customPath) modulePath = customPath;
    }
    // 預設給他 pkg.module or pkg.main
    return path.resolve(prefix, modulePath || pkg.module || pkg.main);
  }
}
```

### readStyle

接著要處理下 styles 等 css 的引入，這裡僅示意使用 scss 作為預處理器。

需要安裝 `node-sass`

```js
const fs = require('fs');
const sass = require('node-sass');
const { resolveRoot } = require('../../config');
const {
  watchFile,
  fileExists,
} = require('../utils');

/**
 * Import Styles
 * @param {*} param0 
 * @param {*} res 
 */
function readStyle({ url }, res) {
  res.set('Content-Type', 'application/javascript');
  const filePath = resolveRoot(url.slice(1));
  if (fileExists(filePath)) {
    let data = fs.readFileSync(filePath, 'utf-8');
    watchFile(filePath);
    // sass compile
    data = sass.renderSync({ data }).css.toString().replace(/\n/g, '').replace(/\s{2,}/g, ' ');
    // inject
    let code = `const cssText = "${data}";`;
    code += '\nconst head = document.head;';
    code += '\nconst style = document.createElement("style");';
    code += '\nstyle.setAttribute("type", "text/css");';
    code += '\nstyle.innerHTML = cssText;';
    code += '\nhead.insertBefore(style, head.querySelector("style"));';
    code += '\nexport default cssText;';
    return code;
  }
}

module.exports = readStyle;
```

### readUrl

這裡處理 import image，也就是被我們以 `/@url?path=XXX` 取代的格式，這裡會將真實路徑透過 /src 開頭返回，也就能做到以相對路徑引入。

> 注意喔！！這裡另外以 `/@url` 處理是為了與原來的請求區別開來，這樣就可以完成像是 `react` 在 js 中進行 image 的引入與注入。

```js
function readUrl({ query }, res) {
  res.set('Content-Type', 'application/javascript');
  return `export default '${query.path}';`;
}

module.exports = readUrl;
```

其實到這邊已經可以使用 react 了～～，只是要記得安裝 `@pika/react @pika/react-dom`

react path處理如下

```js
const __REACT = 'react';
const __REACT_DOM = 'react-dom';

const isReact = (pkg) => pkg.name === __REACT;
const isReactDom = (pkg) => pkg.name === __REACT_DOM;

function checkReactPath(pkg) {
  if (isReact(pkg)) {
    return '../@pika/react/source.development.js';
  } else if (isReactDom(pkg)) {
    return '../@pika/react-dom/source.development.js';
  }
  // give default path
  // first get .module, then .main
  return false;
}

module.exports = checkReactPath;
```

### readVueComponent

前面都還算好理解，接下來的反而是整個部分最麻煩的ＸＤ，因為 Ｖue 本身有獨特的 Single File Component，也就必須用到 Vue 自身提供的編譯工具來進行，好在 Vue 的相關編譯工具都有很充分的使用說明，讓懶人如我也能快速使用。這裡源碼分別參考自 [Vite: serverPluginVue](https://github.com/vitejs/vite/blob/master/src/node/server/serverPluginVue.ts)、[Vue Loader: templateLoader](https://github.com/vuejs/vue-loader/blob/master/lib/loaders/templateLoader.js)以及[Vue Loader: Parser](https://github.com/vuejs/vue-loader/blob/master/lib/index.js)

#### Vue3 Compile

這裡我們先處理 Vue-next 版本的編譯吧～

這裡需安裝使用 `hash-sum lru-cache` 來製作 scoped 的 hash 與 Cache。

看一下 utils～

```js
// utils
const fs = require('fs');
const path = require('path');
const LRUCache = require('lru-cache');
const { io } = require('../app');
const {
  __MODULE,
  CONFIGS,
  resolveRoot,
} = require('../config');

const VueCache = new LRUCache({
  max: 65535,
});
const watchedFileMap = new Set(); // cache watched file's name

// watch config file
if (CONFIGS.hmr) {
  watchFile(resolveRoot('./es.config'));
}

// watch file change
function watchFile(p, localP) {
  if (!CONFIGS.hmr) return;
  if (watchedFileMap.has(p)) return;
  watchedFileMap.add(p);
  fs.watchFile(p, {
    interval: CONFIGS.hmr.interval || 2000,
  }, () => {
    if (p.includes('.vue')) {
      VueCache.del(localP);
    }
    io.emit('update');
  });
}
```

接者處理正文

```js
const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const hash_sum = require('hash-sum');

const {
  resolveRoot,
  resolveModules,
} = require('../../config');
const {
  VueCache,
  watchFile,
  fileExists,
  rewriteImport,
} = require('../utils');

let Vue3CompilerSfc;

/**
 * Import Vue Single File
 * @param {*} req
 * @param {*} res 
 */
function readVueComponent({ url, query }, res, next) {
  res.set('Content-Type', 'application/javascript');
  const filePath = resolveRoot(url.split('?')[0].slice(1));
  if (!fileExists(filePath)) return false;
  const data = fs.readFileSync(filePath, 'utf-8');
  watchFile(filePath, url.split('?')[0]);
  
  // compile for different version of Vue
  let code;
  if (checkVueVersion() === 2) {
    code = compileVue2({ data, query, url });
  } else if (checkVueVersion() === 3) {
    code = compileVue3({ data, query, url });
  }
  return code;
}

/**
 * Compile for Vue-next
 */
async function compileVue3({ data, query, url }) {
  let filePath = getVueFilePath(url);
  // parseSFC => get descriptor
  const descriptor = parseSFC(filePath, data);
  // normal
  if (!query.type) {
    // get main file of .vue
    // import render function then inject to scripts
    const { code } = compileSFCMain(descriptor, filePath);
    return code;
  }
  // template
  if (query.type === 'template') {
    // get cached
    const cached = VueCache.get(filePath);
    // get bindings to compile template
    const bindingMetadata = cached && cached.script && cached.script.bindings;
    const { code } = compileSFCTemplate(
      descriptor.template,
      filePath,
      descriptor.styles.some((s) => s.scoped), // scoped or not
      bindingMetadata, // bindings will indicate the data type
    );
    return code;
  }
  // style
  if (query.type === 'style') {
    const index = Number(query.index);
    const styleRaw = descriptor.styles[index];
    const data = styleRaw.content.replace(/\n/g, '');
    const style = await compileSFCStyle(data, filePath, styleRaw.scoped, index);
    return vueStyle(
      style.replace(/\n/g, ''),
      styleRaw.attrs.lang,
    );
  }
}

// parse for descriptor
function parseSFC(filePath, data) {
  // get cached
  let cached = VueCache.get(filePath);
  if (cached && cached.descriptor) {
    return cached.descriptor;
  }
  // no cache, then compile
  if (!Vue3CompilerSfc) {
    Vue3CompilerSfc = require('@vue/compiler-sfc');
  }
  const { parse } = Vue3CompilerSfc;
  const { descriptor } = parse(data, {
    filename: filePath,
    sourceMap: true
  });
  // set cache
  cached = cached || { styles: [], customs: [] };
  cached.descriptor = descriptor;
  VueCache.set(filePath, cached);
  return descriptor;
}

function compileSFCMain(descriptor, filePath) {
  let cached = VueCache.get(filePath);
  if (cached && cached.script) {
    return cached.script;
  }
  // hash id
  const id = hash_sum(filePath);
  let code = '';
  let content = '', map;
  let script = descriptor.script;
  if (descriptor.script || descriptor.scriptSetup) {
    // compile for script
    script = Vue3CompilerSfc.compileScript(descriptor);
  }
  if (script) {
    content = script.content;
    map = script.map;
  }
  // rewrite import path
  code += rewriteImport(
    content.replace('export default ', 'const __script = '),
    filePath,
  );
  let hasScoped = false;
  // import styles
  if (descriptor.styles) {
    descriptor.styles.forEach((s, i) => {
      code += `\nimport "${filePath}?type=style&index=${i}";`;
      if (s.scoped) hasScoped = true;
    });
    if (hasScoped) {
      code += `\n__script.__scopeId = "data-v-${id}";`;
    }
  }
  // import template
  if (descriptor.template) {
    code += `\nimport { render as __render } from '${filePath}?type=template';`;
    code += '\n__script.render = __render;';
  }
  code += '\nexport default __script;';
  // result
  const result = {
    code,
    map,
    bindings: script ? script.bindings : null,
  };
  cached = cached || { styles: [], customs: [] };
  cached.script = result;
  VueCache.set(filePath, cached);
  return result;
}

function compileSFCTemplate(template, filePath, scoped, bindings) {
  let cached = VueCache.get(filePath);
  if (cached && cached.template) {
    return cached.template;
  }
  const { compileTemplate } = Vue3CompilerSfc;
  // hash id
  const id = hash_sum(filePath);
  // compile template to render function
  const { code, map } = compileTemplate({
    source: template.content,
    filename: filePath,
    inMap: template.map,
    transformAssetUrls: {
      base: path.posix.dirname(filePath), // assetsUrl handling
    },
    compilerOptions: {
      scopeId: scoped ? `data-v-${id}` : null, // scoped id format
      bindingMetadata: bindings, // bindings for setup data
    }
  });
  // result
  const result = {
    code: rewriteImport(code, filePath),
    map,
  };
  cached = cached || { styles: [], customs: [] };
  cached.template = result;
  VueCache.set(filePath, cached);
  return result;
}

async function compileSFCStyle(style, filePath, scoped, index) {
  let cached = VueCache.get(filePath);
  if (cached && cached.styles && cached.styles[index]) {
    return cached.styles[index];
  }
  const { compileStyleAsync } = Vue3CompilerSfc;
  const id = hash_sum(filePath);
  // compile for style code (with scoped id)
  const { code } = await compileStyleAsync({
    source: style,
    id: `data-v-${id}`,
    scoped,
  });
  const result = code;
  cached = cached || { styles: [], customs: [] };
  cached.styles[index] = result;
  VueCache.set(filePath, cached);
  return result;
}


// check Vue's version from node_modules
function checkVueVersion() {
  const prefix = resolveModules('./vue');
  const pkg = require(prefix + '/package.json');
  if (pkg.version.startsWith('2.')) {
    return 2;
  } else if (pkg.version.startsWith('3.')) {
    return 3;
  }
}

function getVueFilePath(url) {
  return url.split('?')[0];
}

function vueStyle(content, preprocess) {
  let code = '';
  if (preprocess === 'scss') {
    content = sass.renderSync({ data: content }).css.toString().replace(/\n/g, '').replace(/\s{2,}/g, ' ');
  }
  code += `const css = "${content}";`;
  if (content) {
    code += '\nconst __style = document.createElement("style");';
    code += '\n__style.setAttribute("type", "text/css");';
    code += `\n__style.innerHTML = "${content}";`;
    code += '\ndocument.head.appendChild(__style);';
  }
  code += '\nexport default css;';
  return code;
}
```

好的，看到這裡的你真 d 很棒ＸＤ，以上只是從源碼中抽取必要的過程而已，實際源碼還有處理很多 features，這裡僅將主要的流程呈現出來。

你以為這樣就結束了嗎？我們還有 Vue2 需要處理...，這部分因為目前 Vite 本身沒有特別向下相容處理他，以下部分僅屬於本人腦洞版本，也就是以目前 Vite 的處理方式，結合 Vue-Loader 的源碼拼湊而成。

如果你對 Vue2 的實現也有興趣的話，也歡迎讓我們繼續看下去...

#### Vue2 Compile

其實主要構建流程是非常相似的，只是部分地方有點不同，這部分需要再安裝兩個主要工具 `vue-template-compiler`, `@vue/component-compiler-utils` 這兩樣，其中主要以後者進行使用，而前者僅作為後者的編譯器部分使用，這部分是因為 Vue2 的 Compiler 是可以自定義處理的，也因此將其作為獨立的模組來引入。

代碼如下：

```js
// 這部分基本跟 Vue3 的一樣
function compileVue2({ data, query, url }) {
  let filePath = getVueFilePath(url);
  // parse for descriptor
  const descriptor = parseVue2SFC(filePath, data);
  // normal
  if (!query.type) {
    const { code } = compileVue2SFCMain(descriptor, filePath);
    return code;
  }
  if (query.type === 'template') {
    const { code } = compileVue2Template(
      descriptor.template,
      filePath,
      descriptor.styles.some((s) => s.scoped),
    );
    return code;
  }
  // style
  if (query.type === 'style') {
    const index = Number(query.index);
    const styleRaw = descriptor.styles[index];
    const data = styleRaw.content.replace(/\n/g, '');
    const style = compileVue2Style(data, filePath, styleRaw.scoped, index);
    return vueStyle(
      style.replace(/\n/g, ''),
      styleRaw.attrs.lang,
    );
  }
}

function parseVue2SFC(filePath, data) {
  let cached = VueCache.get(filePath);
  if (cached && cached.descriptor) {
    return cached.descriptor;
  }
  if (!Vue2Compiler) {
    Vue2Compiler = require('vue-template-compiler');
    Vue2CompilerUtils = require('@vue/component-compiler-utils');
  }
  const { parse } = Vue2CompilerUtils;
  const descriptor = parse({
    source: data,
    filename: filePath,
    compiler: Vue2Compiler, // 這裡需要將 vueCompiler 傳入
    needMap: true,
  });
  cached = cached || { styles: [] };
  cached.descriptor = descriptor;
  VueCache.set(filePath, cached);
  return descriptor;
}

function compileVue2SFCMain(descriptor, filePath) {
  let cached = VueCache.get(filePath);
  if (cached && cached.script) {
    return cached.script;
  }
  // get hash id
  const id = hash_sum(filePath);
  let code;
  let script = descriptor.script.content;
  // code
  if (script) {
    code = rewriteImport(
      script.replace('export default ', 'const __script = '),
      filePath,
    );
  }
  let hasScoped = false;
  // styles
  if (descriptor.styles) {
    descriptor.styles.forEach((s, i) => {
      code += `\nimport "${filePath}?type=style&index=${i}";`;
      if (s.scoped) hasScoped = true;
    });
    if (hasScoped) {
      // here define the scopeId for script
      code += `\n__script._scopeId = "data-v-${id}";`;
    }
  }
  code += `\nimport { __render as render } from "${filePath}?type=template"`;
  code += '\n__script.render = render;';
  code += '\nexport default __script;';
  // result
  const result = {
    code,
  };
  cached = cached || { styles: [] };
  cached.script = result;
  return result;
}

function compileVue2Template(template, filePath, scoped) {
  let cached = VueCache.get(filePath);
  if (cached && cached.template) {
    return cached.template;
  }
  const { compileTemplate } = Vue2CompilerUtils;
  const id = hash_sum(filePath);
  const compiled = compileTemplate({
    source: template.content,
    filename: filePath,
    compiler: Vue2Compiler, // compiler 傳入
    compilerOptions: {
      scopeId: scoped ? `data-v-${id}` : null, // set scopeId
    },
    transformAssetUrls: false, // 這裡需要設為 false，若為 true，會將 asset 編譯為 require 的模組引入，也就無法直接被瀏覽器解析，assetsUrl 下面另外處理
  });
  // result
  const result = {
    ...compiled,
    // 處理 assetsUrl
    code: rewriteVueAssets(compiled.code, filePath) + `\nexport const __render = ${
      compiled.ast.static ? 'staticRenderFns[0]' : 'render'
    };`,
  };
  cached = cached || { styles: [] };
  cached.template = result;
  VueCache.set(filePath, cached);
  return result;
}

function rewriteVueAssets(content, url) {
  // 這裡僅簡單以 src: "" 來進行比對
  const rewrite = function(s0, s1){
    // . ../ /
    const base = path.posix.dirname(url);
    const p = path.resolve(base, s1);
    // 若為絕對或 http 開頭則不處理
    if (s1[0] === '/' || s1.startsWith('http')){
      return s0;
    } else {
      return `"src":"${p}"`;
    }
  };
  return content.replace(/['"]?src['"]?\:{1}\s?['"]([^'"]+)['"]/g, rewrite);
}

function compileVue2Style(style, filePath, scoped, index) {
  let cached = VueCache.get(filePath);
  if (cached && cached.styles && cached.styles[index]) {
    return cached.styles[index];
  }
  const { compileStyle } = Vue2CompilerUtils;
  const id = hash_sum(filePath);
  const { code } = compileStyle({
    source: style,
    id: `data-v-${id}`, // scope id
    scoped, // use scoped or not
    trim: true, // trim code
  });
  const result = code;
  cached = cached || { styles: [] };
  cached.styles[index] = result;
  VueCache.set(filePath, cached);
  return result;
}
```

以上就完成了 Vue2 的編譯處理摟，但我們要記得處理下 vue2 的路徑處理

```js
//-- /server/import/path/vue.js

const __VUE = 'vue';
const __VUE_ROUTER = 'vue-router';

const isVue2 = (pkg) => pkg.name === __VUE && pkg.version.startsWith('2.');
const isVue2Router = (pkg) => pkg.name === __VUE_ROUTER &&
  pkg.version.startsWith('3.');

function checkVuePath(pkg) {
  if (isVue2(pkg)) {
    return 'dist/vue.esm.browser.min.js';
  } else if (isVue2Router(pkg)) {
    return 'dist/vue-router.esm.browser.min.js';
  }
  // give default path
  // first get .module, then .main
  return false;
}

module.exports = checkVuePath;
```



以上就是這次學習 Vite 的一點紀錄跟實作練習，過程中一度很想放棄ＱＱ，看源碼當下實在是一件非常痛苦的事情，但看完的感悟頗深，也才更能體會原來這些工具用起來簡單，實際上是這麼多人的血和淚堆疊出來的，真心感謝所有 Vue 團隊跟社群大佬們的付出，真的是太香啦～～～

本篇練習的源碼在此 [@johnnywang1994/esm-server](https://github.com/johnnywang1994/esm-server)，也歡迎有興趣的朋友們前往看看喔～

希望本篇能夠幫助對於 Vue 的基礎編譯過程能有更深的了解，再次謝謝各位耐心的觀看：）），我們下次見～


本文參考：
1. [蝸牛老濕-大聖--前端新工具--vite从入门到实战](https://juejin.im/post/6844904176988897293)
2. [Vite 怎麼能那麼快？從 ES modules 開始談起](https://blog.techbridge.cc/2020/08/07/vite-and-esmodules-snowpack/)
2. [Vuejs/Vitejs](https://github.com/vitejs/vite)
3. [Vuejs/Vue-Loader](https://github.com/vuejs/vue-loader)
