<template>
  <div id="wedding-box" @click="openSpread = !openSpread">
    <div class="scene">
      <div
        :class="['cube-1', `pos-${currentFace}`, { spread: openSpread }]"
      >
        <div
          v-for="(img, i) in images"
          :class="['face', `face-${i+1}`]"
          @click="onChangeFace(i+1)"
        >
          <img :src="img" />
        </div>
        <div class="cube-2">
          <div v-for="(img, i) in images" :class="['face', `face-${i+1}`]">
            <img :src="img" />
          </div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <div class="btn" @click="onChangeFace('prev')">Prev</div>
      <div class="btn" @click="onChangeFace('next')">Next</div>
    </div>
  </div>
</template>

<script>
// 3368 3101 3086 3009 2987 2981
export default {
  data() {
    return {
      openSpread: false,
      currentFace: 1,
      images: [
        'https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/IMG_3368.jpg',
        'https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/IMG_3101.jpg',
        'https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/IMG_3086.jpg',
        'https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/IMG_3009.jpg',
        'https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/IMG_2987.jpg',
        'https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/IMG_2981.jpg',
      ]
    }
  },
  methods: {
    onChangeFace(direction) {
      if (typeof direction === 'number') {
        this.currentFace = direction;
      } else {
        switch (direction) {
          case 'next':
            if (this.currentFace === 6) this.currentFace = 1;
            else this.currentFace++;
            break;
          case 'prev':
            if (this.currentFace === 1) this.currentFace = 6;
            else this.currentFace--;
            break;
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
@mixin cube3d($size) {
  user-select: none;
  transform-origin: 50% 50% calc(-#{$size}/2);
  transform-style: preserve-3d;
  > .face {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;
    background: blue;
    > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &.face-2 {
      transform-origin: right;
      transform: rotateY(90deg) translateX($size);
      background: red;
    }
    &.face-3 {
      transform-origin: left;
      transform: rotateY(-90deg) translateX(-$size);
      background: yellow;
    }
    &.face-4 {
      transform-origin: top;
      transform: rotateX(90deg) translateY(-$size);
      background: green;
    }
    &.face-5 {
      transform-origin: bottom;
      transform: rotateX(-90deg) translateY($size);
      background: pink;
    }
    &.face-6 {
      transform-origin: center;
      transform: rotateX(180deg) translateZ($size);
      background: purple;
    }
  }

  &.spread > .face {
    &.face-1 {
      transform: translateZ($size);
    }
    &.face-2 {
      transform: rotateY(90deg) translateX($size) translateZ($size);
    }
    &.face-3 {
      transform: rotateY(-90deg) translateX(-$size) translateZ($size);
    }
    &.face-4 {
      transform: rotateX(90deg) translateY(-$size) translateZ($size);
    }
    &.face-5 {
      transform: rotateX(-90deg) translateY($size) translateZ($size);
    }
    &.face-6 {
      transform: rotateX(180deg) translateZ(calc(#{$size}*2));
    }
  }
}

#wedding-box {
  position: relative;
  max-width: 800px;
  height: 600px;
  background: #000 url('https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/wedding-bg.jpg') center / cover no-repeat;
  cursor: pointer;
}

.scene {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 200px;
  height: 200px;
  perspective: 600px;
  margin: auto;
  .cube-1 {
    @include cube3d(200px);
    position: relative;
    width: 200px;
    height: 200px;
    transition: transform 0.8s cubic-bezier(0.32, 0.05, 0.35, 1.6);
    &.pos-2 {
      transform: rotateY(-90deg);
    }
    &.pos-3 {
      transform: rotateY(90deg);
    }
    &.pos-4 {
      transform: rotateX(-90deg);
    }
    &.pos-5 {
      transform: rotateX(90deg);
    }
    &.pos-6 {
      transform: rotateX(180deg);
    }
    > .face {
      transition: all .6s;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      touch-action: pan-x pan-y;
      user-select: none;
    }

    .cube-2 {
      @include cube3d(100px);
      position: absolute;
      left: 100px;
      top: 100px;
      transform: translate(-50%, -50%) translateZ(-50px);
      margin: auto;
      width: 100px;
      height: 100px;
    }
  }
}

.control-panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40px;
  width: 200px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  > .btn {
    background: #fff;
    padding: 6px 14px;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
  }
}
</style>
