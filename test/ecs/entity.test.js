const assert = require('assert');
const {types} = require("../../src/core/utils/Types");
const ECS = require("../../src/core/ecs/ecs")

describe('Entity', function() {
    const CountEntities = 10
    const ecs = new ECS(CountEntities);

    const A = ecs.CreateComponent(types.uint32);
    const B = ecs.CreateComponent(types.int8);
    const C = ecs.CreateComponent({
        X: types.uint16,
        Y: types.float32,
    });

    const group = ecs.CreateGroup(A, B, C);

    const parent = ecs.CreateGroup(A);
    const children = ecs.CreateGroup(B, C).Extends(parent);

    it("add entities in group", () => {
        for (let i = 0; i < CountEntities; i++) {
            ecs.CreateEntity(group)
        };
        assert.equal(
            group._set._packed.length,
            CountEntities
        );
    });
    it("remove entities in group", () => {
        for (let i = 0; i < CountEntities; i++) {
            ecs.RemoveEntity(i, group)
        }
        assert.equal(
            group._set._packed.length,
            0
        );
    });
    it("add entities in extends groups", () => {
        for (let i = 0; i < CountEntities; i++) {
            ecs.CreateEntity(children)
        }
        assert.equal(
            parent._set._packed.length,
            CountEntities
        );
    });
    it("remove entities in extends groups", () => {
        for (let i = 0; i < CountEntities; i++) {
            ecs.RemoveEntity(i, children)
        }
        assert.equal(
            parent._set._packed.length,
            0
        );
    });
});