const shader1 = require("./shader1.glsl");
const shader2 = require("./shader2.glsl");
const Rect    = require("./CSM/Rect");
const Manager = require("./CSM/Manager");
const {EaseOutElastic, EaseInOutBounce, EaseOutBounce }     = require("./CSM/Easle");

const resize = canvas => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
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

const CreateResize = (obj, x, y, w, h, t) => {
    const   turnX = (x - obj.x) / (t * 60),
            turnY = (y - obj.y) / (t * 60),
            turnW = (w - obj.w) / (t * 60),
            turnH = (h - obj.w) / (t * 60);



    const loop = setInterval(() => {
        obj.x += turnX;
        obj.y += turnY;
        obj.w += turnW;
        obj.h += turnH;
    }, 1000 / 60);

    setTimeout(() => {
        clearInterval(loop);
        const   canvas = document.querySelector("#root"),
                nX = randomInt(canvas.width),
                nY = randomInt(canvas.height),
                nW = randomInt(canvas.width - x),
                nH = randomInt(canvas.height - y);
        CreateResize(obj, nX, nY, nW, nH, t);
    }, t * 1000);
}

const main = () => {
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
        const   x = randomInt(canvas.width),
                y = randomInt(canvas.height),
                w = randomInt(canvas.width - x),
                h = randomInt(canvas.height - y);
        rects.push(new Rect(x, y, w, h, obj=>{
            obj.SetColor(
                EaseOutBounce(obj.x/canvas.width),
                EaseOutElastic(obj.y/canvas.height),
                EaseInOutBounce((obj.x+obj.y)/(canvas.width+canvas.height)),
            );
        }));
        
        CreateResize(rects[ii], x, y, w, h, 1);
    }

    const manager = new Manager(gl, color);
    manager.AddFigures(...rects);
    let fps;
    const animation = () =>{
        window.requestAnimationFrame(()=>{
            let t = performance.now();
            manager.DrawAll();
            animation();
            fps = performance.now() - t;
        });
    }
    animation();
    window.addEventListener("click", ()=>console.log(fps))
};
main();