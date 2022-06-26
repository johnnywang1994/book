# 一起動手用 Socket.io 和 Peerjs 打造 WebRTC 即時視訊

<SocialBlock hashtags="javascript,typescript,webrtc,peerjs,socket.io" />

Hi 大家好，我是 Johnny。

最近這個月剛轉換工作，花了幾個週末假日的時間在研究工作相關的技術，最近學到差不多一個段落了（其實還很多要學ＱＱ），覺得有必要重拾自己的部落格更新拉～，這次的主題是一直以來都很想嘗試看看的 - 打造「即時視訊」功能

在這之前已經有使用過 `socket.io` 打造過即時文字聊天室，算是對基礎的 `socket.io` 有基本的認識跟使用經驗，這次希望能建立在這之上打造出一款人人都能使用完全免費的即時視訊功能

開始之前先給大家看看成果 [Maju Meet](https://maju-express.herokuapp.com/meet/)，實現了常見的靜音、視訊開關功能，希望大家會喜歡拉～

本篇礙於篇幅關係，不會把全部細節都一一解釋，僅把最核心的視訊技術做一個範例方便大家理解


## 初步學習
首先我們要製作一款工具最必要的就是先了解這個領域相關的技術知識，以及其他開發者對於這個領域的一些實踐範例等等，在參考之後我們能更容易的掌握一些基礎的開發想法思路，並以此為基礎去打造屬於自己的工具！

這次我主要參考了這部影片的內容 [How To Create A Video Chat App With WebRTC](https://www.youtube.com/watch?v=DvlyzDZDEq4)，我覺得他講解的非常好，很多細節聽過一次就能很快理解

唯一美中不足的地方是，影片中雖然有提到在 peerjs 主動 call 之後監聽 `call.on('close')` 來移除離線者的 video，但卻忘了在 `peer.on('call')` 當中的 call 移除，導致一點小問題，聽不懂沒關係！本篇會將這部分加入一起解釋～

開始動手！


## 建立 Socket/Peer Server

### 基礎設施
安裝依賴
```bash
$ npm install nodemon express socket.io peer
```
設定 package.json
```json
{
  "scripts": {
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.1",
    "nodemon": "^2.0.18",
    "peer": "^0.6.1",
    "socket.io": "^4.5.1"
  }
}
```
建立畫面 `template/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Chat</title>
  <style>
    #video-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  </style>
</head>
<body>
  <div id="video-grid"></div>
</body>
</html>
```
開發 index.js
```js
const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const peerServer = require('peer').ExpressPeerServer
const io = require('socket.io')(server)

app.set('port', process.env.PORT || 8080);

io.on('connection', (socket) => {
  const url = socket.request.headers.referer
  console.log('A user has connected from: ' + url, socket.id)
})

// 掛載 peer 在這裡，讓同一個 server 可以提供 socket.io, peer 服務
app.use('/peer', peerServer(server, { debug: true }));

app.use(express.static(path.resolve(__dirname, './template')))

server.listen(app.get('port'), function(){
  console.log('Express Server listening on port: ' + app.get('port'));
});
```
嘗試啟動可以在 localhost:8080 看到我們的 index.html


### 建立連線
正常視訊會議以 uuid 套件隨機產一組序號後當作 roomId，這邊為求簡單，直接以 `public` 當作 roomId 省略這個步驟～

```js
// 定義 socket server 事件
io.on('connection', (socket) => {
  socket.on('join-room', (userId) => {
    // join room named public
    socket.join('public')
    // broadcast to public room
    socket.to('public').emit('user-connected', userId)
  })
})
```

- 加入 `socket.io-client`
> 注意！socket client 和 socket server 版本需要一致！

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.js"></script>
```

```html
<body>
  <div id="video-grid"></div>

  <script>
    const socket = io('/')
    // 發送事件到 server
    socket.emit('join-room', 369)
    // 接收 server 事件
    socket.on('user-connected', (userId) => {
      console.log('new user id', userId)
    })
  </script>
</body>
```

到這邊我們打開兩個分頁會看到 console.log 訊息不斷疊加，這是因為我們只在加入時 join，但沒有在離開斷線時 leave 用戶，加入下面這段

```js
io.on('connection', (socket) => {
  socket.on('join-room', (userId) => {
    socket.join('public')
    // broadcast to room
    socket.to('public').emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.leave('public')
      socket.to('public').emit('user-disconnected', userId)
    })
  })
})
```

```html
<script>
  const socket = io('/')
  socket.emit('join-room', 369)

  socket.on('user-connected', (userId) => {
    console.log('new user id', userId)
  })

  socket.on('user-disconnected', (userId) => {
    console.log('new user id', userId)
  })
</script>
```

## 建立 WebRTC Peer 連線
加入 peerjs 到 html 中
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.4.6/peerjs.min.js"></script>
```
把寫死的 id 換成 peer 提供的 id
```html
<script>
  const socket = io('/')
  const peer = new Peer({
    host: '/',
    post: '8080',
    path: '/peer' // we mount the peerServer on path /peer
  })

  peer.on('open', (id) => {
    // new user id ec436d21-abae-4ee8-90de-2fc52bdab76d
    socket.emit('join-room', id)
  })

  socket.on('user-connected', (userId) => {
    console.log('new user id', userId)
  })

  socket.on('user-disconnected', (userId) => {
    console.log('new user id', userId)
  })
</script>
```

## 加入 Video!!
video 分成兩部分，一個是我們自己的，另一個是其他所有人的，底下這段是整個視訊串流的精華，為了保持整體性，直接把整段貼出，請細細觀看每一行做的事情！
```html
<div id="video-grid"></div>

<script>
  const videoGrid = document.getElementById('video-grid')
  const socket = io('/')
  const peer = new Peer({
    host: '/',
    port: '8080',
    path: '/peer' // 掛載到 peer server 的位置
  })
  const peerCalls = {}
  let myStream; // 儲存我的視訊

  peer.on('open', (id) => {
    // new user id ec436d21-abae-4ee8-90de-2fc52bdab76d
    socket.emit('join-room', id)
  })

  // 當被其他用戶 call 的時候
  peer.on('call', (call) => {
    // 回傳我的視訊
    call.answer(myStream)
    // 當收到 call 時，我們也需要把打給我們的人的視訊顯示出來
    const video = document.createElement('video')
    call.on('stream', (callerStream) => {
      addVideoStream(video, callerStream)
    })
    // 當 caller 離線時把他的視訊移除
    call.on('close', () => video.remove())
    // 注意！！這一步是影片中沒有提到的關鍵點，被 call 的人也必須把 caller 的 id 存起來
    // caller id 在 call.peer 當中
    // 如果沒有這一步，新加入的用戶在舊用戶離開時視訊就會卡在那，因為新用戶的 peerCalls 裡面並不存在舊用戶的 userId，也就不會觸發 call.close 導致視訊停住
    peerCalls[call.peer] = call
  })

  // 初始化
  ;(async () => {
    const myVideo = document.createElement('video')
    myVideo.muted = true // 我們自己不需要聽到自己的 video 聲音
    // 取得本地視訊 stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    myStream = stream
    addVideoStream(myVideo, stream)

    // 被通知有新用戶時，對新用戶發起連線 call，並將自己的視訊傳給新用戶
    socket.on('user-connected', (userId) => {
      const call = peer.call(userId, stream)
      const video = document.createElement('video')
      // 當對方（這邊是該新連線用戶）回傳他的 stream 給我們時
      call.on('stream', (remoteStream) => {
        addVideoStream(video, remoteStream)
      })
      // 當新用戶離線時
      call.on('close', () => video.remove())
      // 儲存新用戶的 call
      peerCalls[userId] = call
    })

    // detect when a user leave, close the call with
    socket.on('user-disconnected', (userId) => {
      const leaveCall = peerCalls[userId]
      leaveCall && leaveCall.close()
    })
  })()

  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.onloadedmetadata = () => video.play()
    videoGrid.append(video)
  }
</script>
```


## 大功告成！
恭喜你！如果你順利把整個過程完成那真的是太棒了，希望這篇文章有幫助到大家理解即時視訊的大概開發樣貌，實際開發上會考慮到更多複雜的思路，感謝大家閱讀！我們下次見拉～掰掰（可能下個月？=V=，繼續去修 issue 拉～

原碼放在這邊[Simple Realtime WebRTC Stream](https://github.com/jwlearn1994/simple-webrtc-stream)，歡迎有興趣實際下載來玩玩看的童鞋們拉～

<SocialBlock hashtags="javascript,typescript,webrtc,peerjs,socket.io" />

## 參考
- [How To Create A Video Chat App With WebRTC](https://www.youtube.com/watch?v=DvlyzDZDEq4)
- [Peer issue - switch from video/audio streaming](https://github.com/peers/peerjs/issues/672)
- [WebRTC: Add audio later or disable microphone using peerJS](https://stackoverflow.com/questions/22783682/webrtc-add-audio-later-or-disable-microphone-using-peerjs)
- [WebRTC: How to replace tracks](https://stackoverflow.com/a/52622032)
- [Peerjs not sending stream between Android and IOS WebRTC](https://github.com/peers/peerjs/issues/962)