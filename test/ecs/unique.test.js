const {types} = require("../../src/core/utils/Types");
const ECS = require("../../src/core/ecs/ecs");
const { Unique } = require('../../src/core/ecs/group');

describe('Unique', () => {
    const CountEntities = 10;
    const ecs = new ECS(CountEntities);

    const A = ecs.CreateComponent(types.uint32);
    const B = ecs.CreateComponent(types.int8);
    const C = ecs.CreateComponent({
        X: types.uint16,
        Y: types.float32,
    });

    test('type', () => {
        expect(ecs.CreateUniqueEntity(A, B, C)).toStrictEqual(new Unique(0, [A, B, C]));
    });

    describe('Extends', () => {
        test('add components', () => {
            const parent = ecs.CreateGroup(A);
            const reference = new Unique(1, [B, C, A]);
            reference._parents.push(parent);
            expect(ecs.CreateUniqueEntity(B, C).Extends(parent)).toStrictEqual(reference);
        });
    });
});