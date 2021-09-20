module.exports = class SparseSet {
    constructor() {
        this._packed = new Array();
        this._sparse = new Array();
    }

    Has(x) {
        return this._sparse[x] < this._packed.length && this._packed[this._sparse[x]] == x;
    }

    Add(x) {
        if (this.Has(x)) return; //throw new Error('This number is already contained! =>  ' + x);
            this._sparse[x] = this._packed.length;
            this._packed.push(x);
    }

    Remove(x) {
        if (!this.Has(x)) return; //throw new Error('This number is not contained! =>' + x);
            const last = this._packed.pop();
            if (x === last) return;
                this._sparse[last] = this._sparse[x];
                this._packed[this._sparse[x]] = last;
    }
};