<template>
  <div class="matter-johnny__view-demo-15">
    <div id="matter-johnny__demo-15"></div>
  </div>
</template>

<script>
// 參考 https://blog.techbridge.cc/2020/11/07/matterjs-intro/
let Engine, Runner, Render, Body, Bodies, Composite, Composites, Mouse, MouseConstraint, Constraint, Common, Events;

let engine, runner, render, isPC, canvasConfig;

class MouseAction {
  constructor(el) {
    const mouse = this.mouse = Mouse.create(el);
    this.body = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        // https://brm.io/matter-js/docs/classes/Constraint.html#property_render.type
        render: {
          visible: false,
        },
      },
    });
    Composite.add(engine.world, this.body);
  }
}

class Box {
  constructor(x, y, w, h, options) {
    this.size = { w, h };
    this.body = Bodies.rectangle(x, y, w, h, options);
    Composite.add(engine.world, this.body);
  }
}

class Ground extends Box {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.body.isStatic = true;
    this.body.render.fillStyle = 'brown';
  }
}

class NameBlocks {
  constructor(xx, yy, size) {
    const colors = ['#161b22', '#0d4428', '#006d31'];
    const J = ['1,2','2,2','3,2','4,2','5,2','4,2','4,3','4,4','4,5','4,6','3,7','2,7','1,6'];
    const O = ['7,3','7,4','7,5','7,6','8,2','9,2','10,2','11,3','11,4','11,5','11,6','10,7','9,7','8,7'];
    const H = ['13,2','13,3','13,4','13,5','13,6','13,7','14,4','15,4','16,4','17,5','17,2','17,3','17,4','17,6','17,7'];
    const N1 = ['19,2','19,3','19,4','19,5','19,6','19,7','20,4','21,5','22,6','23,7','23,2','23,3','23,4','23,5','23,6'];
    const N2 = ['25,2','25,3','25,4','25,5','25,6','25,7','26,4','27,5','28,6','29,7','29,2','29,3','29,4','29,5','29,6'];
    const Y = ['31,2','32,3','33,4','34,3','35,2','33,5','33,6','33,7'];
    const alphabets = [].concat(J, O, H, N1, N2, Y);
    
    this.body = Composites.stack(xx,yy,37,10,0,0,function(x,y){
      const indexX = (x - xx) / size;
      const indexY = (y - yy) / size;
      const isAlphabet = alphabets.includes(`${indexX},${indexY}`);
      const child = Bodies.rectangle(x,y,size,size,{
        label: isAlphabet ? 'AlphabetBox' : 'CommitBox',
        frictionAir: 0.03,
        render: {
          fillStyle: isAlphabet ? '#39d353' : Common.choose(colors),
          strokeStyle: '#0e1117',
          lineWidth: 3,
        },
      });

      if (isAlphabet) {
        setTimeout(() => Body.setStatic(child, true), 250);
      } else {
        setTimeout(
          () => Body.setVelocity(child, {
            x: Common.random(-3, 3),
            y: Common.random(-5, -10),
          }),
          350,
        );
      }

      return child;
    });
    Composite.add(engine.world, this.body);
  }
}

function injectMatter() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.id = 'matter-js';
    script.onload = () => resolve();
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.17.1/matter.min.js';
    document.head.appendChild(script);
  });
}

function removeMatter() {
  const matterScript = document.getElementById('matter-js');
  matterScript.parentNode.removeChild(matterScript);
}

function onPageMounted() {
  engine = Engine.create();
  runner = Runner.create();
  render = Render.create({
    element: document.getElementById(canvasConfig.container),
    engine,
    options: {
      width: canvasConfig.width,
      height: canvasConfig.height,
      background: '#0e1117',
      showVelocity: false, // speed indicator
      showAngleIndicator: false, // angle indicator
      showCollisions: false, // collision indicator
      wireframes: false,
    },
  });

  // fit the render viewport to the scene
  // Render.lookAt(render, Composite.allBodies(engine.world));
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: canvasConfig.width, y: canvasConfig.height }
  });

  new MouseAction(render.canvas);

  Runner.run(runner, engine);
  Render.run(render);
}

export default {
  methods: {
    createItems() {
      new Ground(
        canvasConfig.width / 2,
        canvasConfig.height - 10,
        canvasConfig.width,
        20,
      );

      new Ground(canvasConfig.width / 2, -10, canvasConfig.height, 20);

      new Ground(canvasConfig.width+10, canvasConfig.height/2, 20, canvasConfig.height);

      new Ground(-10, canvasConfig.height/2, 20, canvasConfig.height);

      if (isPC) {
        new NameBlocks(120, 100, 15);
      } else {
        new NameBlocks(0, 40, 9);
      }
    },
  },
  beforeUnmount() {
    removeMatter();
    Composite.clear(engine.world);
    Engine.clear(engine);
    Render.stop(render);
    Runner.stop(runner);
  },
  async mounted() {
    // global variable
    isPC = window.innerWidth > 1300;
    canvasConfig = {
      container: 'matter-johnny__demo-15',
      width: isPC ? 800 : 330,
      height: isPC ? 500 : 300,
    };
    // matter
    await injectMatter();
    Engine = Matter.Engine;
    Runner = Matter.Runner;
    Render = Matter.Render;
    Body = Matter.Body;
    Bodies = Matter.Bodies;
    Composite = Matter.Composite;
    Composites = Matter.Composites;
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;
    Constraint = Matter.Constraint;
    Common = Matter.Common;
    Events = Matter.Events;
    onPageMounted();
    this.createItems();
  },
};
</script>

<style lang="scss">
.matter-johnny__view-demo-15 {
  canvas {
    display: block;
    margin: auto;
  }
}
</style>
