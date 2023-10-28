<template>
  <main class="project-page">
    <h1>Project</h1>
    <div class="demo-list">
      <div
        v-for="(demo, index) in creations"
        :key="`demo_${demo.id || index}`"
        class="demo-item"
      >
        <a :href="demo.link" :title="demo.name" target="_blank" ontouchstart="">
          <div class="photo-wrap">
            <div class="photofix">
              <img :src="demo.image" />
            </div>
          </div>
          <div class="demo-content">
            <h3>{{ demo.name }}</h3>
            <p class="des">{{ demo.des }}</p>
            <p class="tech">{{ demo.tech }}</p>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script>
const cdn = (path) => `https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/others/myblog${path}`;

export default {
  name: 'MyProject',
  data() {
    return {
      creations: [{
        "des" : "LINE Invoice Production",
        "id" : "line-invoice",
        "image" : cdn("/websites/line-invoice.png"),
        "link" : "https://invoice.line.me/",
        "name" : "LINE 發票管家",
        "tech" : "Secret..."
      }, {
        "des" : "MajuChatGame is a real-time 2D chat game created by Reactjs, MatterJS",
        "id" : "majuchatgame",
        "image" : cdn("/websites/majuchatgame.png"),
        "link" : "https://majuchat.maju-web.club",
        "name" : "MajuChatGame - 2D chat game",
        "tech" : "React.js, Typescript, MatterJS, Socket.io"
      }, {
        "des" : "用 2D 物理引擎 Matterjs+Vue3 製作的馬力歐1-1",
        "id" : "vue-matter-mario",
        "image" : cdn("/websites/matter-mario.png"),
        "link" : "https://johnnywang1994.github.io/p5-game/#/matter-mario",
        "name" : "Matter Mario Bro",
        "tech" : "Vue.js3.x, Matterjs"
      }, {
        "des" : "React Eat Snake Game 復古小遊戲 貪吃蛇",
        "id" : "react-eat-snake",
        "image" : cdn("/websites/eat-snake-game.png"),
        "link" : "https://maju-express.onrender.com/eat-snake",
        "name" : "React Eat Snake Game",
        "tech" : "React.js18, Typescript, Canvas"
      }, {
        "des" : "React WebRTC realtime chatroom",
        "id" : "react-webrtc-chatroom",
        "image" : cdn("/websites/react-webrtc-chatroom.png"),
        "link" : "https://maju-express.onrender.com/meet",
        "name" : "React WebRTC Realtime Chatroom",
        "tech" : "React.js18, Typescript, Socket.io, Peer.js"
      }, {
        "des" : "An client side online editor for frontend prototyping",
        "id" : "react-esmodule-maju-editor-react",
        "image" : cdn("/websites/majupen-plus-react.png"),
        "link" : "https://pen.maju-web.club/plus?cacheId=react&template=react",
        "name" : "MajuPen Plus - React18",
        "tech" : "Next.js, Typescript, ScriptCustomModule"
      }, {
        "des" : "An client side online editor for frontend prototyping",
        "id" : "react-esmodule-maju-editor-vue",
        "image" : cdn("/websites/majupen-plus-vue.png"),
        "link" : "https://pen.maju-web.club/plus?cacheId=default",
        "name" : "MajuPen Plus - Vue3",
        "tech" : "Next.js, Typescript, ScriptCustomModule"
      }, {
        "des" : "An client side online editor for frontend prototyping",
        "id" : "react-maju-pen",
        "image" : cdn("/websites/majupen.png"),
        "link" : "https://pen.maju-web.club/local",
        "name" : "MajuPen",
        "tech" : "Reactjs, StyledComponent, @reduxjs/toolkit"
      }, {
        "des" : "Client Side 圖片壓縮器，純客戶端壓縮，無需上傳至 Server，自動 HEIC 轉 JPG，支援整包資料夾壓縮",
        "id" : "image-compress",
        "image" : cdn("/websites/browser-image-compress.png"),
        "link" : "https://nodejs-koa-proxy.onrender.com/image-compress.html",
        "name" : "Browser Image Compressor",
        "tech" : "heic2any, browser-image-compression, jszip, FileSaver, Vue.js"
      }, {
        "des" : "網頁掃描文字翻譯器，透過 Google Translate 翻譯文字內容",
        "id" : "react-web-scan-translator",
        "image" : cdn("/websites/web-scan-translator.png"),
        "link" : "https://nodejs-koa-proxy.onrender.com/scan-translator",
        "name" : "Web Scan Translator",
        "tech" : "React.js18, WebStream, Tesseract.js, Google Translate"
      }, {
        "des" : "MajuMD is a real-time Markdown Editor created by Reactjs, Koajs, Prisma",
        "id" : "koa-majumd",
        "image" : cdn("/websites/majumd.png"),
        "link" : "https://majumd.maju-web.club",
        "name" : "MajuMD - Markdown Editor",
        "tech" : "React.js, Typescript, Koa.js, Socket.io, Prisma, CodeMirror"
      }, {
        "des" : "A tiny social platform created by Nextjs, Koajs, Prisma",
        "id" : "koa-next-prisma-majubook",
        "image" : cdn("/websites/majubook.png"),
        "link" : "https://majubook.maju-web.club/",
        "name" : "MajuBook",
        "tech" : "Next.js, Typescript, Koa.js, Prisma"
      }, {
        "des" : "React Matter Clock",
        "id" : "react-matter-clock",
        "image" : cdn("/websites/react-matter-clock.png"),
        "link" : "https://maju-express.onrender.com/matter-clock",
        "name" : "React Matter Clock",
        "tech" : "React.js18, Typescript, Matter-js"
      }, {
        "des" : "React Sudoku Game",
        "id" : "react-sudoku",
        "image" : cdn("/websites/react-sudoku.png"),
        "link" : "https://maju-express.onrender.com/sudoku",
        "name" : "React Sudoku Game",
        "tech" : "React.js18, Typescript"
      }, {
        "des" : "React Web3Storage Web UI",
        "id" : "react-web3-storage",
        "image" : cdn("/websites/react-web3-storage.jpg"),
        "link" : "https://react-web3-storage.onrender.com/",
        "name" : "React Web3 Storage",
        "tech" : "React.js18, Javascript, Web3 Storage Client API"
      }, {
        "des" : "Javascript 打造 Pokemon Game 原型",
        "id" : "vue-pokemon-game",
        "image" : cdn("/websites/vue-pokemon-game.jpg"),
        "link" : "https://johnnywang1994.github.io/vue-pokemon-game",
        "name" : "Vue Pokemon Game",
        "tech" : "Vue.js3.x, Javascript, Tiled Map Editor"
      }, {
        "des" : "空閒時做的單頁聊天室窗，暱稱隨便取，開始來聊天八~帳號:public，密碼:0000",
        "id" : "maju-chatter",
        "image" : cdn("/websites/nodechatter.jpg"),
        "link" : "https://maju-chatter.onrender.com/",
        "name" : "Single Page Chatroom",
        "tech" : "Node.js, Express.js, Socket.io, BootStrap4"
      }, {
        "des" : "用 2D 物理引擎 Matterjs+Vue3 製作的小遊戲",
        "id" : "vue-angrybird",
        "image" : cdn("/websites/angry-bird.png"),
        "link" : "https://johnnywang1994.github.io/p5-game/#/angry-bird",
        "name" : "Vue Angry Bird",
        "tech" : "Vue.js3.x, Matterjs"
      }, {
        "des" : "用 vue3 製作的小遊戲",
        "id" : "vue-2048",
        "image" : cdn("/websites/vue-2048.png"),
        "link" : "https://johnnywang1994.github.io/vue-2048/",
        "name" : "Vue Game 2048",
        "tech" : "Vue.js3.x"
      }, {
        "des" : "天涯明月刀預登頁~",
        "id" : "garena-mbm-preregist",
        "image" : cdn("/websites/mbm-preregist.png"),
        "link" : "https://mbm.garena.tw/",
        "name" : "Garena MBM Preregister Website",
        "tech" : "Nuxt.js, Axios, Swiper, SSR"
      }, {
        "des" : "魔導少年官網，歡迎各位下載遊戲一起玩喔～(已下線)",
        "id" : "garena-fairy-tail",
        "image" : cdn("/websites/fairy-tail-web.png"),
        "link" : "https://ftm.garena.tw/",
        "name" : "Garena Fairy Tail Official Website",
        "tech" : "Nuxt.js, Axios, Swiper, SSR"
      }, {
        "des" : "上聯國際展覽公司的官網，歡迎各位參觀逛逛~",
        "id" : "toplink-official",
        "image" : cdn("/websites/toplinkofficial.jpg"),
        "link" : "https://www.top-link.com.tw/",
        "name" : "TopLink Official Website",
        "tech" : "Vue-Cli 3.0, PHP, Bootstrap4-grid, Axios, ld+json"
      }, {
        "des" : "用 vue, p5js 製作的小遊戲",
        "id" : "vue-p5-game",
        "image" : cdn("/websites/vue-p5-game.png"),
        "link" : "https://johnnywang1994.github.io/p5-game/",
        "name" : "Vue P5js Game",
        "tech" : "Vue.js3.x, P5js, Canvas"
      }, {
        "des" : "用 vue, canvas 製作的簡單畫布功能",
        "id" : "vue-paint-board",
        "image" : cdn("/websites/vue-paint-board.png"),
        "link" : "https://johnnywang1994.github.io/paint-board/",
        "name" : "Vue Canvas Paint Board",
        "tech" : "Vue.js, Canvas, Color Selector"
      }, {
        "des" : "用 vue, 原生 js 製作的消方塊！來玩看看啊！",
        "id" : "vue-crush-puzzle",
        "image" : cdn("/websites/vue-crush-puzzle.png"),
        "link" : "https://johnnywang1994.github.io/crush-puzzle/",
        "name" : "Vue Crush Puzzle",
        "tech" : "Vue.js, JavaScript"
      }, {
        "des" : "用 vue, 原生 js 製作的滑動拼圖！來玩看看啊！",
        "id" : "vue-slide-puzzle",
        "image" : cdn("/websites/vue-slide-puzzle.png"),
        "link" : "https://johnnywang1994.github.io/slide-puzzle/",
        "name" : "Vue Slide Puzzle",
        "tech" : "Vue.js, JavaScript"
      }, {
        "des" : "簡易匯率換算功能的單頁應用，可以換算現金匯率及即時匯率，資料來源為台灣銀行的官方匯率",
        "id" : "maju-rate",
        "image" : cdn("/websites/noderate.jpg"),
        "link" : "https://maju-express.onrender.com/rate/#/rate",
        "name" : "Taiwan Bank Dollar Rate",
        "tech" : "Node.js, Express.js"
      }, {
        "des" : "台灣股市即時交易資訊爬蟲查詢小工具",
        "id" : "maju-stock",
        "image" : cdn("/websites/nodestock.png"),
        "link" : "https://maju-express.onrender.com/rate/#/stock",
        "name" : "Taiwan Stock Tool",
        "tech" : "Vue.js, Express.js, Axios"
      }, {
        "des" : "一個簡單的QRcode讀取器，掃描QRcode...",
        "id" : "qrcode-reader",
        "image" : cdn("/websites/qrcodereader.jpg"),
        "link" : "https://johnnywang1994.github.io/qrcode-reader/",
        "name" : "QRcode Reader",
        "tech" : "Instascan, Vue.js"
      }],
    }
  }
}
</script>

<style lang="scss">
$border-color: #eaecef;
$dark-border-color: #777;

@mixin card-hover($color) {
  transform: translateY(-6px) translateZ(10px);
  box-shadow: 2px 2px 6px $color;
  transition: all 0.2s;
}

@mixin ellipsis($line: 1) {
  overflow: hidden;
  @if ($line >= 2) {
    display: -webkit-box;
    -webkit-line-clamp: $line;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow-wrap: break-word;
  } @else {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.project-page {
  padding: 4.6rem 2rem 0;
  max-width: 1300px;
  margin: 0 auto;
  display: block;

  h1 {
    text-align: center;
    margin: 1em 0;
    padding-bottom: 0.5em;
    border-bottom: 1px solid $border-color;
  }

  .demo-list {
    display: flex;
    flex-wrap: wrap;
    .demo-item {
      position: relative;
      padding: 20px;
      width: 25%;
      box-sizing: border-box;
      @media (max-width: 1170px) {
        width: 33.33334%;
      }
      @media (max-width: 951px) {
        width: 50%;
      }
      @media (max-width: 719px) {
        width: 100%;
        padding: 0;
        margin-bottom: 12px;
      }
      > a {
        display: block;
        text-decoration: none;
        color: black;
        border: 1px solid $border-color;
        border-radius: 5px;
        overflow: hidden;
        background: #fff;
        transform: translateZ(0);
        transition: all 0.4s;
        @media (min-width: 720px) {
          &:hover {
            @include card-hover(#888);
          }
        }
        @media (max-width: 719px) {
          &:active {
            @include card-hover(#888);
          }
        }
      }
      .photo-wrap {
        height: 180px;
        border-bottom: 1px solid $border-color;
        > .photofix {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          > img {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .demo-content {
        padding: 0.6em 1em;
        h3 {
          font-size: 1rem;
          margin: 0.4em 0;
          @include ellipsis(1);
        }
        p {
          font-size: 14px;
          &.des {
            line-height: 1.3;
            letter-spacing: 1.4px;
            height: 3.9em;
            @include ellipsis(3);
          }
          &.tech {
            line-height: 1.3;
            padding-top: 0.2em;
            height: 2.8em;
            color: #aaa;
            border-top: 1px solid $border-color;
          }
        }
      }
    }
  }
}

html.dark {
  .project-page {
    h1 {
      border-color: $dark-border-color;
    }

    .demo-list .demo-item > a {
      color: #eee;
      background: #000;
    }
  }
}
</style>
