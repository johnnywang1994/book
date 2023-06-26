<template>
  <div class="home-background">
    <canvas ref="canvasRef" :style="{ width: '100%' }"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const loadImg = (url, crossOrigin = false) => new Promise((resolve) => {
  const img = document.createElement('img');
  img.src = url;
  img.crossOrigin = crossOrigin ? 'anonymous' : false;
  img.onload = () => resolve(img);
});

const getDistance = (x1, y1, x2, y2) => {
  const distanceFromMouseX = x1 - x2;
  const distanceFromMouseY = y1 - y2;
  const distanceFromMouse = Math.sqrt(
    distanceFromMouseX ** 2 + distanceFromMouseY ** 2
  );
  return {
    x: distanceFromMouseX,
    y: distanceFromMouseY,
    distance: distanceFromMouse,
  };
};

const getAveragePixelByRowCol = (imageData, width, startRow, startCol, DIAMETER = 4) => {
  const endRow = startRow + DIAMETER;
  const endCol = startCol + DIAMETER;
  const len = DIAMETER * DIAMETER;
  let rlist = 0;
  let glist = 0;
  let blist = 0;
  let alist = 0;
  for (let r = startRow; r < endRow; r++) {
    for (let c = startCol; c < endCol; c++) {
      const pixelIndex = (r * width + c) * 4;
      rlist += imageData[pixelIndex];
      glist += imageData[pixelIndex + 1];
      blist += imageData[pixelIndex + 2];
      alist += imageData[pixelIndex + 3];
    }
  }
  const R = rlist / len;
  const G = glist / len;
  const B = blist / len;
  const A = alist / len;
  return {
    x: startCol + DIAMETER / 2,
    y: startRow + DIAMETER / 2,
    originX: startCol + DIAMETER / 2,
    originY: startRow + DIAMETER / 2,
    color: `rgba(${R}, ${G}, ${B}, ${A / 255})`,
  };
};

const canvasRef = ref(null);
const ctxRef = ref(null);
const particlesRef = ref([]);
const mousePositionRef = ref({
  x: Infinity,
  y: Infinity,
});
const ratioRef = ref(1);
const canvasRectRef = ref();

const DIAMETER = 30;
let FORCE_RADIUS;
const FORCE_SPEED = 10;
const RETURN_SPEED = 0.1;

let canvasWidth = canvasRef.value?.width;
let canvasHeight = canvasRef.value?.height;

const convertToParticles = (imageData) => {
  const rowNum = Math.round(canvasHeight / DIAMETER);
  const colNum = Math.round(canvasWidth / DIAMETER);
  const particles = [];
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const pixelRow = row * DIAMETER;
      const pixelCol = col * DIAMETER;
      const particle = getAveragePixelByRowCol(
        imageData,
        canvasWidth,
        pixelRow,
        pixelCol,
        DIAMETER
      );
      particles.push(particle);
    }
  }
  return particles;
};

const drawParticles = () => {
  const ctx = ctxRef.value;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  particlesRef.value.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, DIAMETER / 2, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });
};

const updateParticles = () => {
  const particles = particlesRef.value;
  const mousePosition = mousePositionRef.value;

  const { x: mouseOffsetX, y: mouseOffsetY } = mousePosition;
  particles.forEach((particle) => {
    const {
      x: distanceFromMouseX,
      y: distanceFromMouseY,
      distance: distanceFromMouse,
    } = getDistance(mouseOffsetX, mouseOffsetY, particle.x, particle.y);
    if (distanceFromMouse < FORCE_RADIUS) {
      const force = (FORCE_RADIUS - distanceFromMouse) / FORCE_RADIUS;
      const angle = Math.atan2(distanceFromMouseY, distanceFromMouseX);
      const moveX = Math.cos(angle) * force * FORCE_SPEED;
      const moveY = Math.sin(angle) * force * FORCE_SPEED;
      particle.x -= moveX;
      particle.y -= moveY;
    } else if (
      particle.x !== particle.originX ||
      particle.y !== particle.originY
    ) {
      const {
        x: distanceFromOriginX,
        y: distanceFromOriginY,
        distance: distanceFromOrigin
      } = getDistance(
        particle.originX,
        particle.originY,
        particle.x,
        particle.y
      );
      const angle = Math.atan2(distanceFromOriginY, distanceFromOriginX);
      const moveX = Math.cos(angle) * distanceFromOrigin * RETURN_SPEED;
      const moveY = Math.sin(angle) * distanceFromOrigin * RETURN_SPEED;
      particle.x += moveX;
      particle.y += moveY;
    }
  })
};

const drawCanvas = () => {
  updateParticles();
  drawParticles();
  requestAnimationFrame(drawCanvas);
};

const initCanvas = async (url) => {
  const img = await loadImg(url, true);
  const { width, height } = img;
  const canvas = canvasRef.value;
  canvasRectRef.value = canvas.getBoundingClientRect();
  ratioRef.value = width / canvasRectRef.value.width;
  canvasWidth = canvas.width = width;
  canvasHeight = canvas.height = height;

  const ctx = ctxRef.value;
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  const particles = convertToParticles(imageData.data);
  particlesRef.value = particles;
  drawCanvas();
};

const handleMouseMove = (event) => {
  const ratio = ratioRef.value;
  const touch = event?.touches?.[0];
  const rectTop = canvasRectRef.value.top;
  const rectLeft = canvasRectRef.value.left;
  mousePositionRef.value = {
    x: (touch?.pageX - rectLeft || event.offsetX) * ratio,
    y: (touch?.pageY - rectTop || event.offsetY) * ratio,
  };
};

const handleMouseLeave = () => {
  mousePositionRef.value = {
    x: Infinity,
    y: Infinity,
  };
};

const handleResize = () => {
  const canvas = canvasRef.value;
  canvasRectRef.value = canvas.getBoundingClientRect();
  ratioRef.value = canvasWidth / canvasRectRef.value.width;
};

watch(canvasRef, () => {
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleMouseMove, { passive: true });
    canvas.addEventListener('touchmove', handleMouseMove, { passive: true });
    canvas.addEventListener('touchend', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
  }
});

onBeforeUnmount(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
    canvas.removeEventListener('touchstart', handleMouseMove);
    canvas.removeEventListener('touchmove', handleMouseMove);
    canvas.removeEventListener('touchend', handleMouseLeave);
    window.removeEventListener('resize', handleResize);
  }
});

onMounted(() => {
  FORCE_RADIUS = window.innerWidth < 576 ? 300 : 200;

  const canvas = canvasRef.value;
  if (canvas) {
    ctxRef.value = canvas.getContext('2d');
    initCanvas('https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/others/myblog/me2.jpeg');
  }
});
</script>

<style lang="scss">
.home-background {
  width: 100%;
  canvas {
    width: 100%;
  }
}
</style>