# 用 Nodejs 寫個 FTP command line 工具

懶得每次上傳東西到 ftp server 都要打開 filezilla 工具嗎？一起來動手做個簡單的 ftp command line tool 吧！

今天這篇主要是紀錄使用 npm package [ftp](https://www.npmjs.com/package/ftp) 製作的 command line tool，結合之前學到的 minisist 解析 process.argv 處理指令列命令

那就開始動手摟！


## 安裝依賴

主要依賴如下
  - ftp: ftp script tool
  - minimist: 解析 command line 參數

```bash
$ npm init -y
$ npm install ftp minimist
```


## FTP 連線

首先我們來完成基本的 ftp 套件設定連上我們的 FTP server，建立一個 `ftp-utils.js`

**ftp-utils.js**
```js
const ftp = require('ftp');

// 連線啟動
function initFtp() {
  // 連線設定
  // [ftp package config](https://www.npmjs.com/package/ftp)
  const config = {
    host: 'myftp-server.net',
    port: 21,
    user: 'johnny',
    password: '12345678',
    keepalive: 10000,
  };

  const client = new ftp();

  client.on('ready', async function() {
    await onClientReady(client);
    // 完成指令後結束
    client.end();
    spinner.stop();
  });

  client.on('error', function(err) {
    client.end();
    spinner.stop();
  });

  // 啟動
  client.connect(config);
}

// 連線成功
function onClientReady(client) {
  return new Promise((resolve) => {
    // 取得列表，預設取得根目錄
    client.list(function(err, list) {
      if (err) throw err;
      // print result
      console.dir(list);
      // finish
      resolve();
    });
  })
}

module.exports = {
  initFtp,
}
```

此時我們就可以直接呼叫 initFtp 看看結果摟～


## 提取 command 動作

但現在指令是寫死的，我們希望可以依照指令來達到指定動作，首先需要提取出動作的部分為一個一個的動作函數，動作我們就按照 ftp 套件的 method 來切割吧～

另外由於原本的 ftp 方法是使用傳統 callback 方式，我們幫它都包上一層 promise 方便後續調用

提取 cwd 切換目錄動作
```js
function cwd(client, dirpath){
  return new Promise((resolve)=>{
    client.cwd(dirpath, (err, dir) => {
      resolve({ err, dir });
    });
  });
}
```

提取 list 列表動作
```js
async function listFiles(client, dirpath) {
  await cwd(client, dirpath);
  return new Promise((resolve) => {
    client.list((err, files) => {
      resolve({ err, files });
    });
  });
}
```

接著改一下 `ftp-utils.js`，讓 config 連線設定以及 ready 動作從外部注入，提升覆用能力

```js
const ftp = require('ftp');

function cwd(client, dirpath){
  // ...
}

async function listFiles(client, dirpath) {
  // ...
}

function initFtp(options) {
  const { config, ready: onClientReady } = options;

  const client = new ftp();

  client.on('ready', async function() {
    await onClientReady(client);
    // 完成指令後結束
    client.end();
    spinner.stop();
  });

  client.on('error', function(err) {
    client.end();
    spinner.stop();
  });

  // 啟動
  client.connect(config);
}

module.exports = {
  cwd,
  listFiles,
  initFtp,
}
```

好，我們先提取到這就好，config 之後會從指令執行處提取，ready 則是我們指令的動作，接著來完成解析指令的步驟～


## 解析指令

建立一支 `cli.js`處理指令動作，並調用剛剛抽象化的 `initFtp`，記得在最上方加入這句喔 `#!/usr/bin/env node`

**cli.js**
```js
#!/usr/bin/env node
const path = require('path');
const minimist = require('minimist');
const { listFiles, initFtp } = require('./ftp-utils');

// 提取參數
const argv = minimist(process.argv.slice(2));

const ftpOptions = {
  // 提取 --config 參數路徑為連線設定來源，預設為指令執行位置的 ftp.config.js
  config: require(path.resolve(
    process.cwd(),
    argv.config || 'ftp.config.js',
  )),
  ready: onClientReady,
};

// client 從 initFtp 給入
async function onClientReady(client) {
  // --list [remotepath]
  if (argv.list) {
    console.log('Fetching file list...\n');
    const { files } = await listFiles(client, argv.list);
    console.dir(files.map((file) => file.name));
  }
}

// 啟動
initFtp(ftpOptions);
```


## 綁定 bin 命令

最後別忘了綁定我們的指令到 package.json 的 bin 裡面，然後再終端機輸入 `npm link` 就能把這個 bin 指令給綁定到全局中使用摟

```json
{
  "bin": {
    "myftp": "cli.js"
  }
}
```

趕緊在隨便一處試試，首先加入連線設定

```js
module.exports = {
  host: 'myftp-server.net',
  port: 21,
  user: 'johnny',
  password: '12345678',
  keepalive: 10000,
};
```

接著執行，大功告成拉～

```bash
$ myftp --list /htdocs
```


## 結論

這篇誕生於參考自網路大大文章以及自己的一些修修改改，做點小工具幫助日常開發，詳細完整源碼已開源在 npm 上摟[node-cli-ftp](https://www.npmjs.com/package/node-ftp-cli)，希望本文也能讓大家對一些指令列工具更熟悉摟～我是 Johnny，我們下篇分享見～^_^



## Reference
  - [npm ftp](https://www.npmjs.com/package/ftp)
  - [使用nodejs連接ftp上傳下載](https://juejin.cn/post/6844903907001368583)
