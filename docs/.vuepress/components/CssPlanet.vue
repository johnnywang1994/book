<template>
  <!-- 主場景 -->
  <div class="scene">
    <!-- 星星群 -->
    <div class="star small"></div>
    <div class="star big"></div>

    <!-- 星球群 -->
    <div class="planet">
      <!-- 地球軌道 -->
      <div class="road earth">
        <div class="ball"></div>
      </div>
      <!-- 地球軌道 -->
      <div class="road jupiter">
        <div class="ball"></div>
      </div>
    </div>

    <!-- 太陽本人 -->
    <div class="sun"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";

@function randomNum($max, $min: 0, $u: 1) {
	@return ($min + random($max)) * $u;
}

@function shadowSet($n, $size, $w: 500, $h: 500) {
  $shadow : 0 0 0 0 #fff;

  @for $i from 0 through $n {
    $x: randomNum($w);
    $y: randomNum($h);
    $scale: math.div(randomNum($size), 10);

    $shadow: $shadow, #{$x}px #{$y}px 0 #{$scale}px rgba(255, 255, 255, 0.8);
  }

  @return $shadow;
}

@keyframes planet-rotate {
  0% {
    // 執行順序：右到左，先旋轉，再壓縮
    transform: rotateZ(30deg) scaleY(0.5) rotateZ(0);
  }
  100% {
    transform: rotateZ(30deg) scaleY(0.5) rotateZ(360deg);
  }
}

@keyframes self-rotate {
  0% {
    // 相反解鎖：先拉長，抵銷旋轉
    transform: rotateZ(0) scaleY(2) rotateZ(-30deg);
  }
  100% {
    transform: rotateZ(-360deg) scaleY(2) rotateZ(-30deg);
  }
}

@keyframes sun-shine {
  0% {
    filter: brightness(0.9);
  }
  50% {
    filter: brightness(1.1) drop-shadow(0 0 30px #ffc200);
  }
  100% {
    filter: brightness(0.9);
  }
}

@keyframes star-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-500px);
  }
}

.scene {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: black;
  overflow: hidden;
  perspective: 600px;
  .star {
    background: white;
    border-radius: 9999px;
    &.small {
      width: 1px;
      height: 1px;
      box-shadow: shadowSet(500, 10, 2000, 1000);
      animation: star-move 60s linear infinite;
    }
    &.big {
      width: 2px;
      height: 2px;
      box-shadow: shadowSet(200, 10, 2000, 1000);
      animation: star-move 80s linear infinite;
    }
  }
}

.planet {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
}

.road {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  color: #888;
  &.earth {
    width: 60%;
    height: 60%;
    border: 1px solid currentColor;
    border-radius: 9999px;
    animation: planet-rotate 6s linear infinite;
    .ball {
      position: absolute;
      left: calc(50% - 15px);
      top: -15px;
      width: 30px;
      height: 30px;
      background: linear-gradient(to top, #6fa8ea 10%, #008cff 50%, #6fa8ea 90%);
      border-radius: 9999px;
      animation: self-rotate 6s linear infinite;
    }
  }
  &.jupiter {
    width: 100%;
    height: 100%;
    border: 1px solid currentColor;
    border-radius: 9999px;
    animation: planet-rotate 72s linear infinite;
    .ball {
      position: absolute;
      left: calc(50% - 30px);
      top: -30px;
      width: 60px;
      height: 60px;
      background: linear-gradient(to top, #ff6f00 10%, #d43100 50%, #ff6f00 90%);
      border-radius: 9999px;
      animation: self-rotate 72s linear infinite;
    }
  }
}

.sun {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 120px;
  height: 120px;
  border-radius: 9999px;
  background: #ffc200;
  animation: sun-shine 8s linear infinite;
}
</style>