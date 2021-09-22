/* eslint-disable no-extra-parens */
/* eslint-disable sort-vars */
const randomInt = range => Math.floor(Math.random() * range);
const easeOutBounce = x => {
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
}

const easeInOutBounce = x => {
    return x < 0.5
      ? 1-(1 - easeOutBounce(1 - 2 * x)) / 2
      : (1 + easeOutBounce(2 * x - 1)) / 2;
}

const easeOutElastic = x => {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
}
    


module.exports = class Rect {
    r = 1; 
    g = 0.66;
    b = 0.33; 
    a = 1;

    constructor(x, y, w, h, Callback,) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.Callback = Callback;
    }

    SetColor(r, g, b, a = 1){
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
            this.x,             this.y,
            this.x + this.w,    this.y,
            this.x,             this.y + this.h,
            this.x,             this.y + this.h,
            this.x + this.w,    this.y,
            this.x + this.w,    this.y + this.h,
        ];
    }
};