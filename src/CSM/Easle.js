
const EaseOutBounce = x => {
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

const EaseInOutBounce = x => {
    return x < 0.5
      ? 1-(1 - EaseOutBounce(1 - 2 * x)) / 2
      : (1 + EaseOutBounce(2 * x - 1)) / 2;
}

const EaseOutElastic = x => {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
}
    

module.exports = {
    EaseOutBounce,
    EaseInOutBounce,
    EaseOutElastic
}