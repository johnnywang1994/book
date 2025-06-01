# 用 Web Container 打造自己的線上 NodeJS 開發環境

<SocialBlock hashtags="javascript,webcontainer,indexedDB,Xterm" />


Hi 大家好，好久不見了，我是 Johnny，距離撰寫上一篇文章 「[來試用看看原生 Web Popover API](/book/articles/js/popover-api.html) 」大概已經過了快半年了，作為一個專業的前端救火隊隊長（專案爆炸時在做什麼？有沒有空？可以來拯救嗎？），一直想找機會寫點東西但下班後累到完全不想碰程式相關的東西...

廢話講完了，進入正題，因為最近看到論壇關於 [StackBlitz](stackblitz.com) 與 [CodeSandbox](https://codesandbox.io/) 技術底層比較的討論串，CodeSandbox 不用我說，大家應該都很熟悉，背後就是傳統的虛擬機器執行環境，這次深入瞭解了下 StackBlitz 團隊背後使用的 Magic 技術 [Web Container](https://webcontainers.io/)，正是這個技術讓 StackBlitz 的專案啟動速度如此之快

如果懶得看相關技術介紹，也歡迎直接跳到 [成果分享](#成果分享) 看看這技術究竟可以做到什麼喔！


## 什麼是 Web Container?
Web Container 是由 StackBlitz 團隊用 Web Assembly 技術打造的一款 browser-based runtime，顧名思義就是在`瀏覽器內的 Node.js 執行環境`，能夠直接在瀏覽器當中操作系統指令，過去我們的瀏覽器網頁本身是無法直接操作系統指令的，使用這個技術直接無腦解放這個限制


## 使用方式
### Install 安裝
作為一個 NPM library 直接安裝
```bash
$ npm i @webcontainer/api
```

### 設定 header
因為 CORS 政策緣故，我們需要將 dev server 加上以下 header 才能讓我們的 web container 啟動後的畫面能夠正確引入我們的頁面

```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```
如果是使用 Vitejs 開發的可以在 `vite.config.js` 加上：

```js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
})
```

### 設定檔案內容
```js
const projectFiles = {
  // 此為檔案，key 為檔案的名稱
  'package.json': {
    // 檔案內需要 file key
    file: {
      // 檔案內容
      contents: `
        {
          "name": "vite-starter",
          "private": true,
         // ...
          },
          "devDependencies": {
            "vite": "^4.0.4"
          }
        }`,
    },
  },
  // 這是資料夾
  src: {
    // 資料夾需要 directory key
    directory: {
      // 資料夾中包含的檔案或資料夾
      'main.js': {
        file: {
          contents: `
            console.log('Hello from WebContainers!')
          `,
        },
      },
    },
  },
};
```

或是可以透過 server 使用 [@webcontainer/snapshot](https://www.npmjs.com/package/@webcontainer/snapshot) 直接提供現有資料夾檔案 snapshot

```js
// server side
import { snapshot } from '@webcontainer/snapshot';

// snapshot 格式為 `Buffer`
const folderSnapshot = await snapshot(SOURCE_CODE_FOLDER);

// 範例 express-based 程式
app.get('/snapshot', (req, res) => {
  res
    .setHeader('content-type', 'application/octet-stream')
    .send(snapshot);
});
```

```js
// client side
import { WebContainer } from '@webcontainer/api';

const webcontainer = await WebContainer.boot();

const snapshotResponse = await fetch('/snapshot');
const snapshot = await snapshotResponse.arrayBuffer();

await webcontainer.mount(snapshot);
```


### 創建 Instance
注意這個 instance 只能初始化一次，因為 web container 的 instance 一次只能存在一個，多次呼叫 boot 會導致 Proxy Error
```js
import { WebContainer } from '@webcontainer/api';

// Call only once
const webcontainerInstance = await WebContainer.boot();
```

### 掛載檔案
把剛剛定義好的檔案 files object 掛載到 web container 中
```js
await webcontainerInstance.mount(projectFiles);
```

### 啟動專案
就像在本地開發一樣，我們需要先安裝 NPM dependency 後再啟動我們的 server
```js
async function startDevServer() {
  // 安裝
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);

  // 等待 npm install 指令完成
  const installExitCode = await installProcess.exit;

  if (installExitCode !== 0) {
    throw new Error('Unable to run npm install');
  }

  // 啟動 dev server `npm run dev`
  await webcontainerInstance.spawn('npm', ['run', 'dev']);
}
```

### Preview 結果
Web Container 在啟動專案後，會提供一個 url 給我們，這個 url 只在本地有效，提供給其他人是看不到的，web container 在內部會透過 service worker 針對該 url 進行處理

```js
const iframeEl = document.getElementById('my-web-container');

webcontainerInstance.on('server-ready', (port, url) => (iframeEl.src = url));
```


## 操作 File system
這邊的 file system，是 web container 在記憶體中建構的虛擬檔案空間，在我們 mount 掛載完檔案後，我們可以透過以下指令與 fs 進行互動

### readFile 讀取單一檔案
```js
const fileContent = await webcontainerInstance.fs.readFile('/package.json');
```

### readdir 讀取資料夾
```js
const files = await webcontainerInstance.fs.readdir('/src');
// 檔案名稱字串
// ['main.js', 'App.vue']
```

### rm 刪除檔案
```js
await webcontainerInstance.fs.rm('/src/main.js');
```

### writeFile 建立/覆蓋檔案
如果檔案不存在，會直接建立新檔案，若已經存在則直接覆蓋
```js
await webcontainerInstance.fs.writeFile('/src/main.js', 'console.log("Hello from WebContainers!")');
```

### mkdir 建立資料夾
```js
await webcontainerInstance.fs.mkdir('src');
```
如果需要遞迴建立深度資料夾，可以加上 `recursive` 選項
```js
await webcontainerInstance.fs.mkdir('this/is/my/nested/folder', { recursive: true });
```


## 執行指令
在 Web Container 中透過 `spawn` 執行指令
```js
// example 1. npm install
webcontainerInstance.spawn('npm', ['install']);
// example 2. ls src -l
webcontainerInstance.spawn('ls', ['src', '-l']);
```

### Process output
每次執行 spawn 後會返回一個 process，可以對該 process 監聽 output 並進行處理，比如打印輸出到 Xterm 之類的，底下是一個完整建立 web container、掛載檔案、安裝依賴、啟動的範例

```js
import { WebContainer } from '@webcontainer/api';
import { Terminal } from "@xterm/xterm";

async function mountFiles(webcontainer) {
  const files = {
    // ...
  };
  await webcontainer.mount(files);
}

async function installDependency(webcontainer) {
  const xterm = new Terminal();

  const installProcess = await webcontainer.spawn('npm', ['install']);

  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      xterm.write(data)
    }
  }));
}

async function startDevServer(webcontainer) {
  await webcontainer.spawn('npm', ['run', 'start']);

  webcontainer.on('server-ready', (port, url) => {
    const iframeEl = document.getElementById('my-web-container');
    iframeEl.src = url;
  });
}

async function main() {
  const webcontainerInstance = await WebContainer.boot();
  await mountFiles(webcontainerInstance);
  await installDependency(webcontainerInstance);
  await startDevServer(webcontainerInstance);
}
```


## 成果分享
都學到這了，怎麼有不動手實作的道理？歷時兩個週末，花費重金 6個便當打造的 [Maju Web Container](https://pen.maju-web.club/webcontainer/) 線上編輯器隆重推出！！！（好拉，其實就是照抄 StackBlitz 的基本功能，嘗試還原整個編輯器環境，功能非常陽春但還堪用），這專案使用的是 IndexedDB 來儲存你的寶貝專案於本地裝置中，不用擔心你的絕密資料被儲存在我的 DB，喜歡的話不要忘記分享給你的朋友也玩玩看吧～:>

> 因為 Web Container 官方的授權方式是不可用於商用，為了避免公開源碼後被濫用於商業用途，在此就不公開我的爛爛源碼給大家見笑了，還請大家見諒，覺得這技術很棒的話，不要忘記直接去使用 StackBlitz 支持一下摟


<SocialBlock hashtags="javascript,webcontainer,indexedDB,Xterm" />

## 結論
這次透過實作把整個 Web Container 工具玩了一遍，覺得技術迭代真的太快了！！想想不到 8年前，前端還在用 RequireJS 動態定義模組化，現在都直接原生支持 ES Module，甚至連執行環境都可以透過 Web Assembly 技術模擬實現了，未來技術會怎麼發展還是讓人非常期待！今天分享就到這拉，覺得文章不錯也歡迎分享給更多人看看摟，下篇文章見～=V=
