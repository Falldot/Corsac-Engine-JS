const {Group, Unique} = require("./group.js");

//utils
const IdCounter = require("../utils/IdCounter");
const {TypeContainer} = require('../utils/Types');

module.exports = class ECS {
    constructor(max = 1e4) {
        this._entities = new IdCounter(max);
    }

    CreateComponent(type) {
        return TypeContainer(type, this._entities.Size());
    }

    CreateGroup(...components) {
        return new Group(components);
    }

    CreateUniqueEntity(...components) {
        return new Unique(this._entities.Pop(), ...components);
    }

    CreateEntity(...groups) {
        const id = this._entities.Pop();
        for (let i = 0; i < groups.length; i++) {
            groups[i]._add(id);
        }
        return this;
    }

    RemoveEntity(id, ...groups) {
        for (let i = 0; i < groups.length; i++) {
            groups[i]._remove(id);
        }
        this._entities.Put(id);
        return this;
    }

    CreateSystem(group, callback) {
        return () => {
            callback(group._set._packed, ...group._components);
        };
    }
};