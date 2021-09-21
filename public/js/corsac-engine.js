(() => {
  var __require = typeof require !== "undefined" ? require : (x) => {
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/core/utils/SparseSet.js
  var require_SparseSet = __commonJS({
    "src/core/utils/SparseSet.js"(exports, module) {
      module.exports = class SparseSet {
        constructor() {
          this._packed = new Array();
          this._sparse = new Array();
        }
        Has(x) {
          return this._sparse[x] < this._packed.length && this._packed[this._sparse[x]] == x;
        }
        Add(x) {
          if (this.Has(x))
            return;
          this._sparse[x] = this._packed.length;
          this._packed.push(x);
        }
        Remove(x) {
          if (!this.Has(x))
            return;
          const last = this._packed.pop();
          if (x === last)
            return;
          this._sparse[last] = this._sparse[x];
          this._packed[this._sparse[x]] = last;
        }
      };
    }
  });

  // src/core/ecs/group.js
  var require_group = __commonJS({
    "src/core/ecs/group.js"(exports, module) {
      var SparseSet = require_SparseSet();
      var Group = class {
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
                if (groups[i]._components[a] === this._components[c])
                  equel = false;
              }
              if (equel)
                this._components.push(groups[i]._components[a]);
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
      };
      var Unique = class {
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
                if (groups[i]._components[a] === this._components[c])
                  equel = false;
              }
              if (equel)
                this._components.push(groups[i]._components[a]);
            }
          }
          return this;
        }
      };
      module.exports = {
        Group,
        Unique
      };
    }
  });

  // src/core/utils/IdCounter.js
  var require_IdCounter = __commonJS({
    "src/core/utils/IdCounter.js"(exports, module) {
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
          if (this._max <= this._count)
            throw new Error("Been hitting the limit! => " + this._max);
          return this._count++;
        }
      };
    }
  });

  // src/core/utils/Types.js
  var require_Types = __commonJS({
    "src/core/utils/Types.js"(exports, module) {
      var types2 = {
        any: Array,
        int8: Int8Array,
        uint8: Uint8Array,
        int16: Int16Array,
        uint16: Uint16Array,
        int32: Int32Array,
        uint32: Uint32Array,
        float32: Float32Array,
        float64: Float64Array
      };
      var TypeContainer = (type, size) => {
        if (typeof type === "object") {
          for (const key in type)
            type[key] = new type[key](size);
          return type;
        } else if (typeof type === "function") {
          return new type(size);
        } else {
          throw new Error("Invalid type format! => " + type);
        }
      };
      module.exports = {
        types: types2,
        TypeContainer
      };
    }
  });

  // src/core/ecs/ecs.js
  var require_ecs = __commonJS({
    "src/core/ecs/ecs.js"(exports, module) {
      var { Group, Unique } = require_group();
      var IdCounter = require_IdCounter();
      var { TypeContainer } = require_Types();
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
    }
  });

  // src/ECS/index.js
  var require_ECS = __commonJS({
    "src/ECS/index.js"(exports, module) {
      var ECS2 = require_ecs();
      var { types: types2 } = require_Types();
      module.exports = {
        ECS: ECS2,
        types: types2
      };
    }
  });

  // src/corsac-engine.js
  var { ECS, types } = require_ECS();
  var ecs = new ECS();
  var Position = ecs.CreateComponent(types.uint32);
  var Direction = ecs.CreateComponent(types.uint32);
  var Translate = ecs.CreateGroup(Position, Direction);
  var Transform = ecs.CreateSystem(Translate, (entities, Pos) => {
    entities.forEach((element) => {
      console.log(Pos[element]);
    });
  });
  ecs.CreateEntity(Translate);
  Transform();
})();
//# sourceMappingURL=corsac-engine.js.map
