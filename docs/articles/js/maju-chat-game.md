# 用 Socket.io 搭配 Matterjs 製作一款 Real-Time Canvas 聊天室（文長慎入）

<SocialBlock hashtags="typescript,websocket,socket.io,matterjs,canvas" />

hi 大家好，我是 Johnny，由於工作的關係，這幾個月下班都只想躺平耍廢，導致好久沒有寫技術分享的文章了，這一次想來分享最近突發奇想製作的一款迷你 Real-Time Canvas 聊天室，透過 Socket.io 結合 Matterjs 看看能碰撞出什麼新火花～


## 前言
這次使用的技術包含之前製作[文字聊天室](https://maju-chatter.onrender.com/login?roomId=public)(username: public, password: 0000)時使用的 `Socket.io`，還有製作[馬力歐遊戲](https://johnnywang1994.github.io/p5-game/#/matter-mario)時的 `MatterJS`，本次目標是製作出一款能讓用戶加入聊天室，並建立 2D 人物角色在聊天室中能夠自由走動，並最終在角色頭上顯示文字的小遊戲

> 警告！本篇涉及稍微偏應用層面的 MatterJS 使用，若對於 MatterJS 不是很有興趣建議跳過這篇ＸＤ


## 成果
為避免文長內容過於單調，先把成果放在這邊，不想看一堆程式碼的可以直接[點我看成果](https://majuchat.maju-web.club/)，由於本人經濟拮据，租不起效能比較好的 server 來跑，畫面可能會稍微卡頓還請各位看官們見諒 XD...


## Backend Part.
首先我們從後端的 Socket server 開始著手，事先規劃好我們的 socket events 流程，有助於後續開發前端時的串接

### 建立 server
安裝 `express`, `socket.io`，建立一個 server
```js
// src/index.js
const express = require('express');
const { Server } = require('socket.io');
const path = require('path');
const { isProd } = require('./config');

const app = express();
const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// socket events 註冊在這裡
require('./controllers/socket').config(io);

server.listen(port, () => console.log(`NodeJS server on port: ${port}`));
```

### 註冊 socket events
由於邏輯都跟程式碼嚴重綁定，直接在 source code 裡添加說明～
```js
// src/controllers/socket.js
// 假的 user
const getAnonymousUser = (socket) => ({
  id: '',
  username: `Anonymous-${socket.id}`,
});

// 偷懶，隨便先暫存 player 資料在記憶體裡，乖小孩不要學喔
const cachedPlayers = new Map();

const config = (io) => {
  // socket 連線
  io.on('connection', async (socket) => {
    // 取得指定 room 裡的所有連線
    const getRoomSet = async (room) => socket.in(room).allSockets();
    // 初始化 user data
    const initUser = async (data) => {
      socket.user = getAnonymousUser(socket);
      socket.room = data.room;
    };

    console.log('a user connected');

    // 用戶離開、斷線時
    socket.on('disconnect', async () => {
      if (!!socket.room) {
        const room = socket.room;
        // leave room
        socket.leave(room);
        // delete cached data in room
        delete cachedPlayers.get(room)[socket.user.id];
        const { size } = (await getRoomSet(room));
        // broadcast someone had leave
        socket.to(room).emit('get-leave', {
          size,
          id: socket.user.id,
        });
      }
    });

    // 用戶第一次進入畫面連線成功後，加入對應房間
    // 1. 通知房內所有人，人數改變
    // 2. 通知新加入的用戶，server 準備完成，可以開始進一步初始化本地的 player data
    socket.on('join', async (data) => {
      if (data.room) {
        if (!cachedPlayers.get(data.room)) {
          cachedPlayers.set(data.room, {});
        }

        socket.join(data.room);
        const { size } = (await getRoomSet(data.room));
        // init and cache user data for socket
        initUser(data);
        // broadcast room size to everyone in same room
        io.to(data.room).emit('new-join', { size });
        // send join ok message to new joined user in order to init it's App
        socket.emit('join-ok', { roomPlayers: cachedPlayers.get(data.room) });
      }
    });

    // 用戶本地 canvas 初始化後，會將 player data 送上來，並透過 socket 傳給房間裡的所有人
    socket.on('push-player', async (data) => {
      console.log('push-player', data);
      if (cachedPlayers.get(data.room)) {
        cachedPlayers.get(socket.room)[data.id] = data;
        socket.user.id = data.id;
      }
      socket.to(socket.room).emit('get-player', data);
    });

    // 用戶更新人物位置時，將相關資料送上來並發送給房內所有人
    socket.on('update-player', async (data) => {
      console.log('update-player', data);
      if (cachedPlayers.get(socket.room)) {
        cachedPlayers.get(socket.room)[data.player.id] = data.player;
        socket.user.id = data.player.id;
      }
      socket.to(socket.room).emit('get-update-player', data);
    });

    // 用戶發出訊息給房內所有人
    socket.on('push-message', async (data) => {
      console.log('push-message', data);
      socket.to(socket.room).emit('get-message', data);
    });
  });
};

module.exports = { config };
```

到此就完成後端 socket events 的相關設定了！其實說多不多，說少也不少，接下來就開始處理最麻煩的前端部分吧


## Frontend Part.
由於前端的部分真的有點複雜，我這邊只把部分源碼放上來說明

### useSocket 濃縮精華
```ts
import { useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Body } from 'matter-js';
import Player from '@/lib/matter-js/player';
import setPlayerAnimation from '@/lib/players/setPlayerAnimation';
import useCreation from './useCreation';
import { socketEndpoint } from '../config';
import { items } from '../lib/matter-js/playground';

// Player 物件的結構
export interface PlayerItem {
  id: string;
  username: string;
  imageKey: string;
  pos: {
    x: number;
    y: number;
  };
  size: {
    w: number;
    h: number;
  };
  status: string;
  moving: boolean;
}

// 建立 player 物件
export function createPlayerItem(player: any): PlayerItem {
  return {
    id: player.id,
    username: player.username,
    imageKey: player.imageKey,
    size: player.size,
    pos: player.body.position,
    status: player.status,
    moving: player.moving,
  }
}

// 本體！
function useSocket() {
  // 透過 useCreation 讓 socket 連線始終保持唯一
  const socket = useCreation(() => io(socketEndpoint), []);
  // 保存連線狀態
  const [isConnected, setIsConnected] = useState(socket.connected);
  // 房間人數
  const [roomSize, setRoomSize] = useState(0);
  // 房內其他 player 的物件列表（純傳遞的資料）
  const [roomPlayers, setRoomPlayers] = useState<Record<string, PlayerItem>>();
  // 用於 MatterJS 渲染的真實 render 物件（真實渲染物件）不包含當前 player 本人
  const renderPlayersRef = useRef<Player[]>([]); // not include self
  const [delay, setDelay] = useState(0);
  // 工具狀態
  const querys = new URLSearchParams(window.location.search);
  const roomId = querys.get('room') ?? 'default';

  // 初始化 roomPlayers，必須在 loader(載入圖片)後呼叫
  const initRoomPlayers = () => {
    // 本地第一次初始化（剛加入房間，還沒渲染其他用戶資料）
    if (roomPlayers && renderPlayersRef.current.length < 1) {
      Object.values(roomPlayers).forEach((player) => {
        // 檢查是否為用戶本人 id，避免渲染自己第二次
        if (player.id !== items.player.id) {
          onGetPlayer(player);
        }
      });
    }
  };
  // 初次連線上 socket，呼叫 join，初始化 server 端用戶資料
  const onConnect = () => {
    console.log(socket);
    setIsConnected(true);
    socket.emit('join', {
      room: roomId,
    });
  };
  // 斷線
  const onDisconnect = () => {
    setIsConnected(false);
  };
  // 由外部傳入 initApp 的操作，回傳為 socket event "join-ok"
  // 會在 server 初始化完成當前用戶資料時被呼叫
  // 此步驟 server 會把目前 room 裡面的所有用戶資料傳給新加入的此用戶
  const initJoinOk = (initApp: any) => ({ roomPlayers: rp }: { roomPlayers: Record<string, PlayerItem> }) => {
    console.log('room cache', rp);
    setRoomPlayers(rp);
    initApp();
  };
  // 當有其他新的用戶加入觸發 join 事件後，更新本地顯示的房內人數
  const onNewJoin = ({ size }: { size: number }) => {
    setRoomSize(size);
  };
  // 當有用戶離開房間時，更新房間人數，並將該用戶對應的 render 資料銷毀（從畫面上移除人物）
  const onGetLeave = ({ size, id }: { size: number, id: string }) => {
    setRoomSize(size);
    const renderPlayers = renderPlayersRef.current;
    const targetIndex = renderPlayers.findIndex((player) => player.id == id);
    const [targetPlayer] = renderPlayers.splice(targetIndex, 1);
    if (targetPlayer) targetPlayer.destroy();
    renderPlayersRef.current = renderPlayers;
  };
  // 當有新用戶加入房間成功，並推送其 player 資料到房間
  // 初始化並加入新的 render player 物件（把人物加入到 canvas 中）
  const onGetPlayer = (newPlayer: PlayerItem) => {
    console.log('new player', newPlayer);
    const player = new Player(
      newPlayer.username,
      newPlayer.pos.x,
      newPlayer.pos.y,
      newPlayer.size.w,
      newPlayer.size.h,
    );
    player.id = newPlayer.id;
    player.status = newPlayer.status;
    player.moving = newPlayer.moving;
    setPlayerAnimation(player, newPlayer.imageKey);

    player.mount().render();
    // save player
    renderPlayersRef.current = [...renderPlayersRef.current, player];
  };
  // 當其他用戶更新他們的 player 資料時，會同時帶著該用戶操作的時間戳記
  // 1. 若用戶切換 moving 狀態為 true，紀錄該用戶實際開始操作的時間距離現在的時間差為 delayTime
  // 2. 若用戶切換 moving 狀態為 false，紀錄用戶實際停止操作的時間距離現在的時間差，並將剛剛紀錄的時間相減，得到真實 delay 時間，避免人物移動距離偏差
  const onGetUpdatePlayer = ({ player: updatePlayer, time }: { player: PlayerItem, time: number }) => {
    console.log('update-player');
    const renderPlayers = renderPlayersRef.current;
    const targetIndex = renderPlayers.findIndex((player) => {
      return player.id === updatePlayer.id;
    });
    const targetPlayer = renderPlayers[targetIndex];
    if (targetPlayer) {
      // other player start moving
      if (updatePlayer.moving == true) {
        // start delay time(+delay)
        setDelay(Date.now() - time);
        targetPlayer.status = updatePlayer.status;
        targetPlayer.moving = updatePlayer.moving;
      } else {
        // end delay time(-delay)
        const realDelay = delay - (Date.now() - time);
        setTimeout(() => {
          targetPlayer.status = updatePlayer.status;
          targetPlayer.moving = updatePlayer.moving;
          Body.setPosition(targetPlayer.body, updatePlayer.pos);
        }, realDelay);
      }
    }
    renderPlayersRef.current = renderPlayers;
  };
  // 當接收到用戶發送的 message
  const onGetMessage = ({ id, message }: { id: string, message: string }) => {
    const [targetPlayer] = renderPlayersRef.current.filter((player) => {
      return player.id === id;
    });
    if (targetPlayer) {
      targetPlayer.say(message);
    }
  };

  return {
    socket,
    isConnected,
    roomSize,
    roomPlayers,
    renderPlayersRef,
    delay,
    initRoomPlayers,
    onConnect,
    onDisconnect,
    onNewJoin,
    initJoinOk,
    onGetLeave,
    onGetPlayer,
    onGetUpdatePlayer,
    onGetMessage,
  };
}

export default useSocket;
```

### Player 物件
```js
import { Events, Body, Composite } from 'matter-js';
import { randomId } from '@/lib/random';
import Box from './box';
import engine from './engine';
import { render } from './render';
import CustomRender from './customRender';
import { ctx, canvasConfig } from './config';
import drawTextBG, { drawText } from '../drawTextBg';

class Player extends Box {
  constructor(username, x, y, w, h) {
    super(x, y, w, h, {
      // 設定人物在 Matterjs 中碰撞的 group
      collisionFilter: {
        category: canvasConfig.categories.player,
        mask: canvasConfig.categories.default,
      },
      render: {
        fillStyle: 'transparent',
      }
    });
    this.id = randomId();
    this.username = username;
    this.status = 'moveDown'; // 人物狀態，透過 render 方法會根據當前 status 挑選對應的狀態渲染
    this.moving = false;
    this.animation = {};
    // --
    this.messageTimer = null;
    this.message = '';
    // --
    this.onKeyDown = () => {};
    this.onKeyUp = () => {};
  }

  listenKeyDown(handlerDown, handlerUp) {
    window.addEventListener('keydown', handlerDown);
    window.addEventListener('keyup', handlerUp);
    return () => {
      window.removeEventListener('keydown', handlerDown);
      window.removeEventListener('keyup', handlerUp);
    }
  }

  listen() {
    const self = this;
    const handlerDown = (event) => {
      const { body } = self;
      if (self.moving) return;
      if (event.keyCode > 36 && event.keyCode < 41) {
        self.moving = true;
      }
      switch (event.keyCode) {
        case 37:
          self.status = 'moveLeft';
          break;
        case 38:
          self.status = 'moveUp';
          break;
        case 39:
          self.status = 'moveRight';
          break;
        case 40:
          self.status = 'moveDown';
          break;
      }
      self.onKeyDown(event); // 外部傳入
    };
    const handlerUp = (event) => {
      const { animation } = self;
      self.moving = false;
      switch (event.keyCode) {
        case 37:
          animation.moveLeft.reset();
          break;
        case 38:
          animation.moveUp.reset();
          break;
        case 39:
          animation.moveRight.reset();
          break;
        case 40:
          animation.moveDown.reset();
          break;
      }
      self.onKeyUp(event); // 外部傳入
    };
    return this.listenKeyDown(handlerDown, handlerUp);
  }

  moveLeft(allow) {
    const { body, animation, moving } = this;
    animation.moveLeft.loop();
    if (!moving || !allow) return;
    Body.translate(body, { x: -3, y: 0 });
    animation.moveLeft.play();
  }

  moveUp(allow) {
    const { body, animation, moving } = this;
    animation.moveUp.loop();
    if (!moving || !allow) return;
    Body.translate(body, { x: 0, y: -3 });
    animation.moveUp.play();
  }

  moveRight(allow) {
    const { body, animation, moving } = this;
    animation.moveRight.loop();
    if (!moving || !allow) return;
    Body.translate(body, { x: 3, y: 0 });
    animation.moveRight.play();
  }

  moveDown(allow) {
    const { body, animation, moving } = this;
    animation.moveDown.loop();
    if (!moving || !allow) return;
    Body.translate(body, { x: 0, y: 3 });
    animation.moveDown.play();
  }

  drawUsername() {
    const { body: { position: pos }, size, username } = this;
    const textWidth = ctx.measureText(username).width;
    drawText(ctx, username.slice(0, 12), '14px arial', pos.x - textWidth/2, pos.y + size.h/2, 'black');
  }

  saying() {
    const { body: { position: pos }, size, message } = this;
    const textWidth = ctx.measureText(message).width;
    drawTextBG(ctx, message, '16px arial', pos.x - textWidth/2 - 6, pos.y - size.h, 12);
  }

  say(newMessage) {
    if (!!newMessage) {
      clearTimeout(this.messageTimer);
      this.message = newMessage;
      this.messageTimer = setTimeout(() => {
        this.message = '';
      }, 6000);
    }
  }

  destroy() {
    console.log('destroy');
    Composite.remove(engine.world, this.body);
    this.customRender.draw = () => {};
    Events.off(render, 'afterRender', this.customRender.step);
  }

  render() {
    const box = this;
    // use custom render to fix frame rate
    // in order to let movement matched in each devices
    const customRender = new CustomRender();
    box.customRender = customRender
    customRender.draw = (allow) => {
      // username
      box.drawUsername();
      // status
      if (typeof box[box.status] === 'function') {
        box[box.status](allow);
      }
      // saying
      if (!!box.message) {
        box.saying();
      }
    };
    Events.on(render, 'afterRender', customRender.step);
    return box;
  }
}

export default Player;
```

### 初始化 playground
這段主要是初始化整個 MatterJS 的初次渲染畫面及相關物件
```ts
import { Engine, Render, Runner, Composite } from 'matter-js';
import { createPlayerItem } from '@/hooks/useSocket';
import engine from './engine';
import runner from './runner';
import { keepWatch, render } from './render';
import Player from './player';
import Joystick from './joystick';
import Box from './box';
import { canvasConfig } from './config';
import setPlayerAnimation from '../players/setPlayerAnimation';

export const items: Record<string, any> = {};

const boundOptions = () => ({
  render: {
    fillStyle: 'brown',
  }
})

// 初始化邊界
function initEdgeBounds() {
  // top
  new Box(
    canvasConfig.width / 2,
    -20,
    canvasConfig.width,
    50,
    boundOptions(),
  ).setStatic().mount();
  // bottom
  new Box(
    canvasConfig.width / 2,
    canvasConfig.height + 20,
    canvasConfig.width,
    50,
    boundOptions(),
  ).setStatic().mount();
  // left
  new Box(
    -20,
    canvasConfig.height / 2,
    50,
    canvasConfig.height,
    boundOptions(),
  ).setStatic().mount();
  // right
  new Box(
    canvasConfig.width + 20,
    canvasConfig.height / 2,
    50,
    canvasConfig.height,
    boundOptions(),
  ).setStatic().mount();
}

// 初始化本地用戶
export function initPlayer(socket: any, username: string, imageKey: string) {
  const player = new Player(
    username,
    canvasConfig.width / 2,
    canvasConfig.height / 2,
    48,
    64,
  );
  // set animation
  const querys = new URLSearchParams(window.location.search);
  const playerImageKey = Math.ceil(Math.random() * canvasConfig.playerCount);
  setPlayerAnimation(player, imageKey ?? `player${playerImageKey}`);
  // mount & render
  player.mount().render();
  items.player = player;
  // watch player
  keepWatch(player);
  // set socket events
  const onKeyDown = () => {
    socket.emit('update-player', {
      player: createPlayerItem(player),
      time: Date.now(),
    });
  };
  const onKeyUp = () => {
    socket.emit('update-player', {
      player: createPlayerItem(player),
      time: Date.now()
    });
  };
  player.onKeyDown = onKeyDown;
  player.onKeyUp = onKeyUp;
  // 把本地 player data 發送給其他房內的人
  socket.emit('push-player', createPlayerItem(player));
  // joystick 手機版觸控控制器
  const joystick = new Joystick(160, canvasConfig.height - 160, {
    size: 80
  });
  joystick.detectPress({
    onKeyDown,
    onKeyUp,
    up: () => {
      player.status = 'moveUp';
      player.moving = true;
    },
    down: () => {
      player.status = 'moveDown';
      player.moving = true;
    },
    left: () => {
      player.status = 'moveLeft';
      player.moving = true;
    },
    right: () => {
      player.status = 'moveRight';
      player.moving = true;
    },
    reset: () => {
      player.moving = false;
    },
  })
  joystick.render();

  const clearUserListen = player.listen();
  return clearUserListen;
}

function initPlayground() {
  // 初始化邊界
  initEdgeBounds();
  return {
    items,
    clear() {
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
      render.canvas.remove();
      render.textures = {};
    },
  };
}

export default initPlayground;
```

### React Page
終於到真正的 page 主體了...
```tsx
import { Runner, Render } from 'matter-js';
import { useRef, useState, useEffect } from 'react';
import { Input, Button, Modal } from 'antd';
import clsx from 'clsx';
import useSocket from '@/hooks/useSocket';
import useKeyDown from '@/hooks/useKeyDown';
import engine from '@/lib/matter-js/engine';
import runner from '@/lib/matter-js/runner';
import createRender from '@/lib/matter-js/render';
import initPlayground, { items, initPlayer } from '@/lib/matter-js/playground';
import Loader from '@/lib/loader';
import initConfig, { canvasConfig } from '@/lib/matter-js/config';

// 初始化圖片載入的 loader
const loader = new Loader();
Array(canvasConfig.playerCount).fill('').forEach((_, index) => {
  loader.add(`player${index + 1}`, `/game/player${index + 1}.png`);
});

// 頁面本體！！
function Home() {
  // socket config
  const { socket, isConnected, roomSize, roomPlayers, delay, initRoomPlayers, onConnect, onDisconnect, initJoinOk, onNewJoin, onGetLeave, onGetPlayer, onGetUpdatePlayer, onGetMessage } = useSocket();
  // util
  const [isInitialized, setIsInitialized] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  // states
  const renderRef = useRef<Render>();
  const containerRef = useRef(null);
  const [username, setUsername] = useState('');
  const [imageKey, setImageKey] = useState('');
  const [message, setMessage] = useState('');
  const [Items, setItems] = useState<any>(); // for local objects

  // 送出 message
  const handleSendMessage = () => {
    if (message) {
      socket.emit('push-message', {
        id: Items.player.id,
        message,
      });
      // 在人物頭上放文字～
      Items.player.say(message);
      setMessage('');
    }
  };
  // 初始化 Matter render
  const initializeMatter = async () => {
    if (!containerRef.current) return;
    const render = renderRef.current = createRender(containerRef.current);
    render.canvas.width = canvasConfig.width;
    render.canvas.height = canvasConfig.height;
    initConfig({
      canvas: render.canvas,
      loader,
    });

    Runner.run(runner, engine);
    Render.run(render);

    const { items, clear: clearPlayground } = initPlayground();
    setItems(items);
    return () => {
      clearPlayground();
    };
  };
  // 初始化 App，這個 function 必須在 Socket join-ok 後才能調用，所以會傳進去 `initJoinOK` 裡面
  const initApp = async () => {
    await loader.load();
    await initializeMatter();
  };

  // 不重要，按下 enter 自動送出 message 而已
  useKeyDown((e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  });

  // 等待 socket 拿到 roomPlayer，並且 Matter 初始化完畢才能把其他用戶渲染到畫布上！
  useEffect(() => {
    if (!!roomPlayers && isInitialized) {
      initRoomPlayers();
    }
  }, [isInitialized, roomPlayers]);

  // 初始化 socket events
  useEffect(() => {
    // initApp executed after socket "join ok"(init server user information)
    const onJoinOk = initJoinOk(initApp);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('new-join', onNewJoin);
    socket.on('join-ok', onJoinOk);
    socket.on('get-leave', onGetLeave);
    socket.on('get-player', onGetPlayer);
    socket.on('get-update-player', onGetUpdatePlayer);
    socket.on('get-message', onGetMessage);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('new-join', onNewJoin);
      socket.on('join-ok', onJoinOk);
      socket.off('get-leave', onGetLeave);
      socket.off('get-player', onGetPlayer);
      socket.off('get-update-player', onGetUpdatePlayer);
      socket.off('get-message', onGetMessage);
    };
  }, [delay]);

  // 入口彈窗，給用戶選角色、填寫名子
  return (
    <div className="max-w-3xl mx-auto">
      <Modal
        open={openModal}
        onOk={() => {
          initPlayer(socket, username, imageKey);
          setItems(items);
          setOpenModal(false);
          setIsInitialized(true);
        }}
        okButtonProps={{
          disabled: !username || !imageKey
        }}
      >
        <div>
          What's your name?
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mt-4">
          Choose Character below:
          <div className="h-[250px] grid grid-cols-4 gap-4 mt-2 overflow-auto">
            {
              Array(canvasConfig.playerCount).fill('').map((_, index) => (
                <div
                  key={`image${index + 1}`}
                  className={clsx(['w-16 h-16 overflow-hidden rounded', {
                    'bg-blue-500': `player${index + 1}` === imageKey,
                  }])}
                  onClick={() => setImageKey(`player${index + 1}`)}
                >
                  <img src={`/game/player${index + 1}.png`} />
                </div>
              ))
            }
          </div>
        </div>
      </Modal>

      online: {roomSize}
      <p className="text-sm text-red-500">
        *如果沒有看到其他聊天室的人出現在畫面中，請嘗試重新進入頁面一次
      </p>
      {isConnected
        ? <div ref={containerRef} className="[&>canvas]:w-full"></div>
        : <div>socket disconnected, please reload page</div>
      }
      <div className="flex my-2">
        <Input
          value={message}
          placeholder="Press Enter to send message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage} className="ml-2">Send</Button>
      </div>
    </div>
  )
}

export default Home;
```

到此我們的主體就完成拉！！抱歉我省略了很多部分，因為內容實在太多了...，但大致上的流程跟細節就只有這樣而已

<SocialBlock hashtags="typescript,websocket,socket.io,matterjs,canvas" />


## 結語
這次心血來潮開發這個 Side Project，主要是想透過練習，把一些不這麼常在工作上用到的技術做一次稍微深度的整合應用，單獨開發 Socket 沒問題，單獨開發 MatterJS 沒問題，那把兩個加在一起搞看還能不能一樣淡定（本人這次一點都不淡定ＱＱ）

這次在開發過程中好幾次不淡定，舉凡在 MatterJS, SocketJS 的初始化順序、時機上撞牆了好幾次，也在這次練習經驗中學到很多細節，如果時間允許而你也有興趣的話，誠心推薦也動手實做看看～

那這次分享就到這邊拉，下次分享不知道是何時，但總會再出現 =V=，下篇文章見拉大家！

