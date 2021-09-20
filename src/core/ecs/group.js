const SparseSet = require("../utils/SparseSet");

class Group {
    constructor(components) {
        this._set = new SparseSet();
        this._parents = Array();
        this._components = components;
    }

    _add(id) {
        this._set.Add(id);
        for (let i = 0; i < this._parents.length; i++) {
            this._parents[i]._add(id);
        }
    }

    Extends(...groups) {
        for (let i = 0; i < groups.length; i++) {
            this._parents.push(groups[i]);
            for (let a = 0; a < groups[i]._components.length; a++) {
                let equel = true;
                for (let c = 0; c < this._components.length; c++) {
                    if (groups[i]._components[a] === this._components[c]) equel = false;
                }
                if (equel) this._components.push(groups[i]._components[a]);
            }
        }
        return this;
    }

    _remove(id) {
        this._set.Remove(id);
        for (let i = 0; i < this._parents.length; i++) {
            this._parents[i]._remove(id);
        }
    }
}

class Unique {
    constructor(id, components) {
        this._set = {
            _packed: id
        };
        this._components = components;
        this._parents = Array();
    }

    Extends(...groups) {
        for (let i = 0; i < groups.length; i++) {
            this._parents.push(groups[i]);
            groups[i]._add(this._set._packed);
            for (let a = 0; a < groups[i]._components.length; a++) {
                let equel = true;
                for (let c = 0; c < this._components.length; c++) {
                    if (groups[i]._components[a] === this._components[c]) equel = false;
                }
                if (equel) this._components.push(groups[i]._components[a]);
            }
        }
        return this;
    }
}

module.exports = {
    Group, Unique
};