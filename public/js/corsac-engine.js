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
      module.exports = "precision mediump float;uniform vec4 u_color;void main(){gl_FragColor=u_color;}";
    }
  });

  // src/corsac-engine.js
  var shader1 = require_shader1();
  var shader2 = require_shader2();
  var resize = (canvas) => {
    const displayWidth = document.body.clientWidth;
    const displayHeight = document.body.clientHeight;
    if (canvas.width != displayWidth || canvas.height != displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
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
  var main = () => {
    const canvas = document.querySelector("#root");
    const gl = canvas.getContext("webgl");
    resize(canvas);
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, shader1);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shader2);
    const program = createProgram(gl, vertexShader, fragmentShader);
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const colorUniformLocation = gl.getUniformLocation(program, "u_color");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const xstart = 0;
    const ystart = 0;
    const xend = canvas.width;
    const yend = canvas.height;
    const positions = [
      xstart,
      ystart,
      xend,
      ystart,
      xstart,
      yend,
      xstart,
      yend,
      xend,
      ystart,
      xend,
      yend
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform4f(colorUniformLocation, 1, 1, 0, 1);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    const primitiveType = gl.TRIANGLES;
    const count = 6;
    gl.drawArrays(primitiveType, offset, count);
  };
  main();
})();
//# sourceMappingURL=corsac-engine.js.map
