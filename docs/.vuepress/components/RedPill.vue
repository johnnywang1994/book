<template>
  <div class="red-pill-roller">
    <a href="http://jw-mashu.ezyro.com/red-pill.html" target="_blank">
      <div class="deep-truth">TRUTH</div>
    </a>
    <div class="virus">
      <img
        v-for="num in 3"
        :key="`red-pill-virus-${num}`"
        src="https://johnnywang1994.github.io/assets/myblog/virus.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedPill',
};
</script>

<style lang="scss">
@keyframes circular-spin {
  from {
    transform: rotate(0turn) translateY(-150px) rotate(1turn);
  }
  to {
    transform: rotate(1turn) translateY(-150px) rotate(0turn);
  }
}

.red-pill-roller {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 50%;
  .deep-truth {
    padding: 12px 20px;
    font-weight: bold;
    color: #fff;
    background: red;
    border-radius: 12px;
    opacity: 0;
  }
  .virus {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    > img {
      position: absolute;
      width: 50px;
      animation: circular-spin 6s linear infinite;
      &:nth-child(2) {
        animation-delay: -2s;
      }
      &:nth-child(3) {
        animation-delay: -4s;
      }
    }
  }
  @media (max-width: 576px) {
    &:active {
      .deep-truth {
        opacity: 1;
        transition: opacity 0.5s;
      }
    }
  }
  @media (min-width: 577px) {
    &:hover {
      .deep-truth {
        opacity: 1;
        transition: opacity 0.5s;
      }
    }
  }
}
</style>