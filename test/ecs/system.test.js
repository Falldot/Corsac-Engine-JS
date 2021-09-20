const assert = require('assert');
const {types} = require("../../src/core/utils/Types");
const ECS = require("../../src/core/ecs/ecs")

describe('System', () => {
    const CountEntities = 11
    const CountEntitiesInChildrenGroup = 10

    const ecs = new ECS(CountEntities);

    const A = ecs.CreateComponent(types.uint32)
    const B = ecs.CreateComponent(types.int8)
    const C = ecs.CreateComponent({
        X: types.uint16,
        Y: types.float32,
    })

    const parent = ecs.CreateGroup(A);
    const children = ecs.CreateGroup(B, C).Extends(parent);

    const unique = ecs.CreateUniqueEntity(B, C).Extends(parent);

    for (let i = 0; i < CountEntitiesInChildrenGroup; i++) {
        ecs.CreateEntity(children)
    }

    it("type", () => {
        assert.equal(
            typeof ecs.CreateSystem(children, () => {}),
            "function"
        );
    });
    describe('Group', () => {
        it("entities", () => {
            let size = 0;
            ecs.CreateSystem(children, entities => {
                size = entities.length;
            })();
            assert.equal(
                size,
                CountEntitiesInChildrenGroup
            );
        });
        it("components", () => {
            let existComponents;
            ecs.CreateSystem(children, (entities, b, c, a) => {
                existComponents = a === A && b === B && c === C;
            })();
            assert.equal(
                existComponents,
                true
            );
        });
    });
    describe('Unique', () => {
        it("entities", () => {
            let type;
            ecs.CreateSystem(unique, entity => {
                type = typeof entity;
            })();
            assert.equal(
                type,
                "number"
            );
        });
        it("components", () => {
            let existComponents;
            ecs.CreateSystem(unique, (entities, b, c, a) => {
                existComponents = a === A && b === B && c === C;
            })();
            assert.equal(
                existComponents,
                true
            );
        });
    });
});