# 如何把 Video 畫在 Canvas 上

<SocialBlock hashtags="javascript,canvas,video,fullpage" />

Hi 大家好，我是 Johnny，今天這篇來介紹個小玩意，如標題，該怎麼把 Video 畫在 Canvas 上呢？



## 背景

把 Video 畫在 Canvas 上可以有很多用處，比如我們可以對影像背景進行即時改變，或是給予其他更大的創意操作彈性，但...創意部份就留給大家發想了，本篇會專注在如何轉換的過程上摟~


## 實際效果

本篇會以 Vue 來實作，不過不會涉及太複雜的使用，只需要大概懂基礎就好

實作前，先實際展示 Canvas 影片效果給大家看~

試著把手機打橫、放直看看效果吧!

<div id="canvas-draw-video--wrapper">
  <button style="margin-right: 12px" @click="playVideo">Play</button>
  <button @click="pauseVideo">Pause</button>
  <video ref="bgVideoRef" style="display: none" crossorigin="anonymous" loop>
    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
  </video>
  <div class="canvas-container">
    <canvas ref="videoBg"></canvas>
  </div>
</div>

<script>
export default {
  methods: {
    playVideo() {
      this.$refs.bgVideoRef.play();
    },
    pauseVideo() {
      this.$refs.bgVideoRef.pause();
    },
    initCanvas() {
      const vm = this
      var canvas = this._canvas = this.$refs.videoBg;
      this._ctx = canvas.getContext('2d');
    },
    initVideo() {
      const canvas = this._canvas;
      const ctx = this._ctx;
      const videoEl = this.$refs.bgVideoRef;
      const _display = videoEl.style.display;
      let ratio = 1;

      videoEl.style.display = 'block';
      videoEl.addEventListener('loadeddata', () => {
        // set canvas pixel resolution
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;
        // get video ratio
        ratio = videoEl.videoHeight / videoEl.videoWidth;
        // recover videoEl display
        videoEl.style.display = _display;
        // create fabric image
        drawVideo();
      });

      function drawVideo() {
        ctx.drawImage(
          videoEl,
          0,
          0,
          canvas.width,
          canvas.width * ratio
        );
        requestAnimationFrame(drawVideo);
      }
    },
  },
  mounted() {
    const vm = this
    vm.initCanvas()
    vm.initVideo()
  }
}
</script>

<style lang="scss">
#canvas-draw-video--wrapper {
  .canvas-container {
    max-width: 100%;
    height: 50vh;
    canvas {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>


## 實作

首先我們把 video 先正確顯示在網頁上面，如下範例:

```html
<div id="app">
  <video loop>
    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
  </video>
</div>
```

應該就能看到我們帥氣的影片出現拉~

接著我們將影片隱藏起來，並添加我們的目標 Canvas，預留兩個 ref 待後續使用

```css
#app {
  video {
    display: none;
  }
  canvas {
    width: 100%;
  }
}
```

```html
<div id="app">
  <video ref="bgVideoRef" crossorigin="anonymous" loop>
    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
  </video>
  <canvas ref="videoBg"></canvas>
</div>
```

接著處理我們的主要邏輯，透過監聽影片 `loadeddata` 事件，取得影片的實際寬高比例，並將 canvas 的 pixel resolution 設為影片寬高，透過這個方式才能維持原影片的畫質正確，否則預設 canvas 的 pixel 比例會是 300x150

> canvas 元素上的 width, height 並不單單只影響 DOM 寬高，而是真正影響畫布的 pixel resolution，用 css style 影響的才是顯示的寬高，所以即使你用 css 去設定 canvas，如果沒有明確去定義 width, height 屬性，那麼內容的 pixel resolution 就仍然是預設的配置

```js
// 為求方便直接用 option API 撰寫瞜~
Vue.createApp({
  mounted() {
    const vm = this
    vm.initCanvas()
    vm.initVideo()
  },
  methods: {
    initCanvas() {
      const vm = this
      var canvas = this._canvas = this.$refs.videoBg;
      this._ctx = canvas.getContext('2d');
    },
    initVideo() {
      const canvas = this._canvas;
      const ctx = this._ctx;
      const videoEl = this.$refs.bgVideoRef;
      const _display = videoEl.style.display;
      let ratio = 1;

      videoEl.style.display = 'block';
      videoEl.addEventListener('loadeddata', () => {
        // set canvas pixel resolution
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;
        // get video ratio
        ratio = videoEl.videoHeight / videoEl.videoWidth;
        // recover videoEl display
        videoEl.style.display = _display;
        // create fabric image
        drawVideo();
        // start
        videoEl.play();
      });

      function drawVideo() {
        ctx.drawImage(
          videoEl,
          0,
          0,
          canvas.width,
          canvas.width * ratio
        );
        requestAnimationFrame(drawVideo);
      }
    },
  },
}).mount('#app')
```

如果這時我們希望讓影片能夠自適應，並且始終填滿畫面，而將 CSS 改為如下

```css
#app {
  video {
    display: none;
  }
  canvas {
    width: 100vw;
    height: 100vh;
  }
}
```

這樣寫你會發現，我們的 Canvas 就被拉伸了~NO~~!! 影片內容是有填滿畫面沒錯，但是比例整個跑掉啦~

大家猜猜能怎麼解，5,4,3,2,1...



沒錯，直接在 Canvas 外面再包一層 `.canvas-container` 並且將內部的 Canvas 設為 `object-fit` ，搞定!!

```css
#app {
  video {
    display: none;
  }
  .canvas-container {
    width: 100vw;
    height: 100vh;
    canvas {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
```

那今天的分享就到這邊摟，希望大家會喜歡，也歡迎大家分享給更多人看看玩玩瞜，謝謝大家 =V=~


<SocialBlock hashtags="javascript,canvas,video,fullpage" />


## 參考
- [MDN Web Doc](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas)
- [Fabricjs Demo](http://fabricjs.com/video-element)
