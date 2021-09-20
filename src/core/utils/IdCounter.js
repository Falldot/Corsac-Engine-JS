module.exports = class IdCounter {
    constructor(maxIdCount) {
        this._count = 0;
        this._pool = new Array();
        this._max = maxIdCount;
    }

    Size() {
        return this._max;
    }

    Put(id) {
        this._pool.push(id);
    }

    Pop() {
        return this._pool.length === 0 ? this._create() : this._pool.pop();
    }

    _create() {
        if (this._max <= this._count) throw new Error('Been hitting the limit! => ' + this._max);
            return this._count++;
    }
};