CSS.registerProperty({
  name: '--art-color',
  syntax: '<color>',
  inherits: false,
  initialValue: 'white',
});

CSS.registerProperty({
  name: '--art-steps',
  syntax: '<number>',
  inherits: false,
  initialValue: 40,
});

CSS.registerProperty({
  name: '--art-alpha',
  syntax: '<number>',
  inherits: false,
  initialValue: 1,
});

const drawing = () => {

  const canvasElem = document.getElementsByTagName('canvas')[0];

  canvasElem.classList.add('canvas')

  const styleEl = document.createElement('style');

  styleEl.innerHTML = `
/* @property --art-color {
    syntax: '<color>',
    inherits: false,
    initialValue: 'white',
  }
  @property --art-steps {
    syntax: '<number>',
    inherits: false,
    initialValue: 40,
  }
  @property --art-alpha {
    syntax: '<number>',
    inherits: false,
    initialValue: 1,
  } */
    .canvas {
      --art-color: rgba(0, 0, 0, 1);
      /* Setting --art-steps below 20 will slow this to a crawl */
      --art-steps: 90;
      background-image: paint(art);
    }
  `

  document.head.appendChild(styleEl);

}

// this is horrible
CSS.paintWorklet.addModule(`data:application/javascript;charset=utf8,${encodeURIComponent(`
class Painter {
  static get inputProperties() {
    return [
      '--art-color',
      '--art-steps',
      '--art-alpha'
    ];
  }


  draw(ctx, x, y, width, height) {
    const leftToRight = Math.random() >= 0.5;

    if( leftToRight ) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y + height);
    } else {
      ctx.moveTo(x + width, y);
      ctx.lineTo(x, y + height);
    }

    ctx.stroke();
  }

  paint(ctx, size, props) {
    const color = props.get('--art-color');
    const step = props.get('--art-steps');
    const alpha = props.get('--art-alpha');

    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    const xsteps = Math.ceil(size.width / step.value);
    const ysteps = Math.ceil(size.height / step.value);

    const length = xsteps * ysteps;

    let height = 0;

    for (let x = 0; x < length; x++) {
      let xc = x;
      let y = height;
      if (x >= xsteps) {
        xc = x % xsteps;

        if (xc === 0) {
          height++;
          y = height;
        }
      }

      xc *= step.value;
      y *= step.value;

      this.draw(ctx, xc, y, step.value, step.value);
    }
  }
};

registerPaint('art', Painter);
`)}`);

export default drawing


// // Based on the amazing work by Tim Holman (@twholman)
// // https://www.youtube.com/watch?v=4Se0_w0ISYk&list=PLZriQCloF6GDuXF8RRPd1mIl9W2QXF-sQ&index=11


