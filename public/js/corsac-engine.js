(() => {
  var __require = typeof require !== "undefined" ? require : (x) => {
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/shader1.glsl
  var require_shader1 = __commonJS({
    "src/shader1.glsl"(exports, module) {
      module.exports = "attribute vec2 a_position;uniform vec2 u_resolution;void main(){vec2 zeroToOne=a_position/u_resolution;vec2 zeroToTwo=zeroToOne*2.0;vec2 clipSpace=zeroToTwo-1.0;gl_Position=vec4(clipSpace,0,1);}";
    }
  });

  // src/shader2.glsl
  var require_shader2 = __commonJS({
    "src/shader2.glsl"(exports, module) {
      module.exports = "precision mediump float;uniform vec4 v_color;void main(){gl_FragColor=v_color;}";
    }
  });

  // src/CSM/Rect.js
  var require_Rect = __commonJS({
    "src/CSM/Rect.js"(exports, module) {
      module.exports = class Rect {
        r = 1;
        g = 0.66;
        b = 0.33;
        a = 1;
        constructor(x, y, w, h, Callback) {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
          this.Callback = Callback;
        }
        SetColor(r, g, b, a = 1) {
          this.r = r;
          this.g = g;
          this.b = b;
          this.a = a;
        }
        Draw(gl) {
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.GetValue()), gl.STATIC_DRAW);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        GetValue() {
          return [
            this.x,
            this.y,
            this.x + this.w,
            this.y,
            this.x,
            this.y + this.h,
            this.x,
            this.y + this.h,
            this.x + this.w,
            this.y,
            this.x + this.w,
            this.y + this.h
          ];
        }
      };
    }
  });

  // src/CSM/Manager.js
  var require_Manager = __commonJS({
    "src/CSM/Manager.js"(exports, module) {
      module.exports = class Manager {
        figures = new Array(100);
        figuresPointer = 0;
        constructor(gl, color) {
          this.gl = gl;
          this.color = color;
        }
        AddFigure(figure) {
          if (this.figures.length === this.figuresPointer) {
            this.figures[this.figures.length * 2] = void 0;
          }
          this.figures[this.figuresPointer] = figure;
          this.figuresPointer++;
        }
        AddFigures(...figures) {
          for (let i = 0; i < figures.length; i++) {
            this.AddFigure(figures[i]);
          }
        }
        DrawAll() {
          for (let i = 0; i < this.figuresPointer; i++) {
            if (this.figures[i].hasOwnProperty("Callback"))
              this.figures[i].Callback(this.figures[i]);
            this.gl.uniform4f(this.color, this.figures[i].r, this.figures[i].g, this.figures[i].b, this.figures[i].a);
            this.figures[i].Draw(this.gl);
          }
        }
      };
    }
  });

  // src/CSM/Easle.js
  var require_Easle = __commonJS({
    "src/CSM/Easle.js"(exports, module) {
      var EaseOutBounce2 = (x) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (x < 1 / d1) {
          return n1 * x * x;
        } else if (x < 2 / d1) {
          return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
          return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
          return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
      };
      var EaseInOutBounce2 = (x) => {
        return x < 0.5 ? 1 - (1 - EaseOutBounce2(1 - 2 * x)) / 2 : (1 + EaseOutBounce2(2 * x - 1)) / 2;
      };
      var EaseOutElastic2 = (x) => {
        return 1 - Math.sqrt(1 - Math.pow(x, 2));
      };
      module.exports = {
        EaseOutBounce: EaseOutBounce2,
        EaseInOutBounce: EaseInOutBounce2,
        EaseOutElastic: EaseOutElastic2
      };
    }
  });

  // src/corsac-engine.js
  var shader1 = require_shader1();
  var shader2 = require_shader2();
  var Rect = require_Rect();
  var Manager = require_Manager();
  var { EaseOutElastic, EaseInOutBounce, EaseOutBounce } = require_Easle();
  var resize = (canvas) => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
  };
  window.addEventListener(`resize`, () => {
    resize(document.getElementById("root"));
  }, false);
  var createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log("error");
    gl.deleteShader(shader);
  };
  var createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log("error");
    gl.deleteProgram(program);
  };
  var randomInt = (range) => Math.floor(Math.random() * range);
  var CreateResize = (obj, x, y, w, h, t) => {
    const turnX = (x - obj.x) / (t * 60), turnY = (y - obj.y) / (t * 60), turnW = (w - obj.w) / (t * 60), turnH = (h - obj.w) / (t * 60);
    const loop = setInterval(() => {
      obj.x += turnX;
      obj.y += turnY;
      obj.w += turnW;
      obj.h += turnH;
    }, 1e3 / 60);
    setTimeout(() => {
      clearInterval(loop);
      const canvas = document.querySelector("#root"), nX = randomInt(canvas.width), nY = randomInt(canvas.height), nW = randomInt(canvas.width - x), nH = randomInt(canvas.height - y);
      CreateResize(obj, nX, nY, nW, nH, t);
    }, t * 1e3);
  };
  var main = () => {
    const canvas = document.querySelector("#root");
    const gl = canvas.getContext("webgl");
    resize(canvas);
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, shader1);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shader2);
    const program = createProgram(gl, vertexShader, fragmentShader);
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const color = gl.getUniformLocation(program, "v_color");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    const rects = [];
    for (let ii = 0; ii < 500; ++ii) {
      const x = randomInt(canvas.width), y = randomInt(canvas.height), w = randomInt(canvas.width - x), h = randomInt(canvas.height - y);
      rects.push(new Rect(x, y, w, h, (obj) => {
        obj.SetColor(EaseOutBounce(obj.x / canvas.width), EaseOutElastic(obj.y / canvas.height), EaseInOutBounce((obj.x + obj.y) / (canvas.width + canvas.height)));
      }));
      CreateResize(rects[ii], x, y, w, h, 1);
    }
    const manager = new Manager(gl, color);
    manager.AddFigures(...rects);
    let fps;
    const animation = () => {
      window.requestAnimationFrame(() => {
        let t = performance.now();
        manager.DrawAll();
        animation();
        fps = performance.now() - t;
      });
    };
    animation();
    window.addEventListener("click", () => console.log(fps));
  };
  main();
})();
//# sourceMappingURL=corsac-engine.js.map
