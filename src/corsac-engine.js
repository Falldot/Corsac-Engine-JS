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

const main = () => {
    const canvas = document.querySelector("#root");
    const gl = canvas.getContext("webgl");
    resize(canvas);

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, shader1);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shader2);

    const program = createProgram(gl, vertexShader, fragmentShader);
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const xstart = 0;
    const ystart = 0;
    const xend = canvas.width;
    const yend = canvas.height;

    const positions = [
        xstart, ystart,
        xend,   ystart,
        xstart, yend,
        xstart, yend,
        xend,   ystart,
        xend,   yend,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

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
