const assert = require('assert');
const {types} = require("../../src/core/utils/Types");
const ECS = require("../../src/core/ecs/ecs")
const { Unique } = require('../../src/core/ecs/group');

describe('Unique', function() {
    const CountEntities = 10
    const ecs = new ECS(CountEntities);

    const A = ecs.CreateComponent(types.uint32)
    const B = ecs.CreateComponent(types.int8)
    const C = ecs.CreateComponent({
        X: types.uint16,
        Y: types.float32,
    })

    it("type", () => {
        assert.equal(
            ecs.CreateUniqueEntity(A, B, C).constructor,
            new Unique(0, A, B, C).constructor
        );
    });
    it("components", () => {
        assert.equal(
            ecs.CreateUniqueEntity(A, B, C)._components.length,
            3
        );
    });
    it("components equal", () => {
        assert.equal(
            ecs.CreateUniqueEntity(A, B, C)._components.filter(e => e === A || e === B || e === C).length,
            3
        );
    });
    describe('Extends', function() {
        it("add components", () => {
            const parent = ecs.CreateGroup(A)
            assert.equal(
                ecs.CreateUniqueEntity(B, C).Extends(parent)._components.length,
                3
            );
        });
        it("equal components", () => {
            const parent = ecs.CreateGroup(A)
            assert.equal(
                ecs.CreateUniqueEntity(B, C).Extends(parent)._components.filter(e => e === A || e === B || e === C).length,
                3
            );
        });
    });
});