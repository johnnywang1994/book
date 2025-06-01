<template>
  <div class="maju">
    <img class="mouse" src="./assets/maju-mouse.svg">
    <MajuBody />
    <img class="hand left-hand" src="./assets/maju-hand.svg">
    <div class="hand right-hand">
      <img src="./assets/maju-hand.svg">
      <img class="food" src="./assets/maju-food.svg">
    </div>
    <div class="word">
      歡迎光臨～
    </div>
  </div>
</template>

<script>
import MajuBody from './MajuBody.vue';

export default {
  name: 'App',
  components: {
    MajuBody,
  }
};
</script>

<style lang="scss">
@keyframes maju-shake {
  0% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-8deg);
  }
  60% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes mouse-toggle {
  0% {
    transform: scaleY(0.5);
  }
  33% {
    transform: scaleY(0.8);
  }
  50% {
    transform: scaleY(0.6);
  }
  67% {
    transform: scaleY(1);
  }
  76% {
    transform: scaleY(0.7);
  }
  88% {
    transform: scaleY(0.85);
  }
  100% {
    transform: scaleY(0.5);
  }
}

@keyframes left-hand {
  0% {
    transform: rotate(25deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(25deg);
  }
}

@keyframes right-hand {
  0% {
    transform: translateY(0) rotate(0deg) scaleX(-1);
  }
  5% {
    transform: translateY(-100%) rotate(-100deg) scaleX(-1);
  }
  25% {
    transform: translateY(-100%) rotate(-90deg) scaleX(-1);
  }
  45% {
    transform: translateY(-100%) rotate(-100deg) scaleX(-1);
  }
  60% {
    transform: translateY(-100%) rotate(-80deg) scaleX(-1);
  }
  85% {
    transform: translateY(-100%) rotate(-100deg) scaleX(-1);
  }
  100% {
    transform: translateY(0) rotate(0deg) scaleX(-1);
  }
}

.maju {
  position: relative;
  width: 300px;
  margin-top: 120px;
  margin-right: auto;
  margin-left: auto;
  animation: maju-shake 3s ease infinite;
  > .mouse {
    position: absolute;
    width: 5%;
    top: 45%;
    left: 47%;
    z-index: -1;
    transform-origin: 50% 0;
    animation: mouse-toggle 2.5s linear infinite;
  }
  > .hand {
    position: absolute;
    bottom: 15%;
    &.left-hand {
      left: 0;
      transform-origin: 100% 0;
      animation: left-hand 2.7s linear infinite;
    }
    &.right-hand {
      right: 5%;
      transform-origin: 50% 0;
      transform: scaleX(-1);
      animation: right-hand 3s linear infinite;
      > .food {
        position: absolute;
        bottom: 0;
        right: 50%;
        transform: rotate(-90deg);
      }
    }
  }

  > .word {
    position: absolute;
    bottom: 100%;
    width: 200px;
    height: 100px;
    color: #da6429;
    font-size: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('./assets/maju-word.svg') center / cover no-repeat;
  }
}
</style>
