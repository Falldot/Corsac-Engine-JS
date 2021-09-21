/* eslint-disable no-undef */
//const {ECS, types} = require("./ECS");

const shader1 = require("./shader1.glsl");
const shader2 = require("./shader2.glsl");

const resize = canvas => {
    const displayWidth = document.body.clientWidth;
    const displayHeight = document.body.clientHeight;

    if (canvas.width != displayWidth ||
        canvas.height != displayHeight) {

      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
};

window.addEventListener(`resize`, () => {
    resize(document.getElementById("root"));
}, false);

const createShader = (gl, type, source) => {
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

const createProgram = (gl, vertexShader, fragmentShader) => {
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

const randomInt = range => Math.floor(Math.random() * range);

const CreateRect = (gl, colorUniform, positions, color) => {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    //gl.uniform4f(colorUniform, color[0], color[1], color[2], color[3]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const CreateColor = (r, g, b, a) => [
    r / 255,
    g / 255,
    b / 255,
    a / 255
];

const CreatePositon = (x, y, w, h) => [
    x,      y,
    x + w,    y,
    x,      y + h,
    x,      y + h,
    x + w,    y,
    x + w,    y + h,
];

const main = () => {
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

    for (let ii = 0; ii < 50; ++ii) {
        const pos  = CreatePositon(randomInt(300), randomInt(300), randomInt(300), randomInt(300));
        const color = CreateColor(randomInt(255), randomInt(255), randomInt(255), 255);
        CreateRect(gl, colorUniformLocation, pos, color);
    }
};
main();





// const ecs = new ECS();

// const Position = ecs.CreateComponent(types.uint32);
// const Direction = ecs.CreateComponent(types.uint32);

// const Translate = ecs.CreateGroup(Position, Direction);

// const Transform = ecs.CreateSystem(Translate, (entities, Pos) => {
//     entities.forEach(element => {
//         console.log(Pos[element]);
//     });
// });

// ecs.CreateEntity(Translate);

// transform();
