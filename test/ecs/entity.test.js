const {types} = require("../../src/core/utils/Types");
const ECS = require("../../src/core/ecs/ecs");

describe('Entity', () => {
    const CountEntities = 10;
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

    test('add entities in group', () => {
        for (let i = 0; i < CountEntities; i++) {
            ecs.CreateEntity(group);
        }
        expect(group._set._packed).toHaveLength(CountEntities);
    });
    test('remove entities in group', () => {
        for (let i = 0; i < CountEntities; i++) {
            ecs.RemoveEntity(i, group);
        }
        expect(group._set._packed).toHaveLength(0);
    });

    test('add entities in extends groups', () => {
        for (let i = 0; i < CountEntities; i++) {
            ecs.CreateEntity(children);
        }
        expect(parent._set._packed).toHaveLength(CountEntities);
    });
    test('remove entities in extends groups', () => {
        for (let i = 0; i < CountEntities; i++) {
            ecs.RemoveEntity(i, children);
        }
        expect(parent._set._packed).toHaveLength(0);
    });
});