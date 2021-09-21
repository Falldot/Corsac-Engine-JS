const {types} = require("../../src/core/utils/Types");
const ECS = require("../../src/core/ecs/ecs");

describe('System', () => {
    const CountEntities = 11;
    const CountEntitiesInChildrenGroup = 10;

    const ecs = new ECS(CountEntities);

    const A = ecs.CreateComponent(types.uint32);
    const B = ecs.CreateComponent(types.int8);
    const C = ecs.CreateComponent({
        X: types.uint16,
        Y: types.float32,
    });

    const parent = ecs.CreateGroup(A);
    const children = ecs.CreateGroup(B, C).Extends(parent);

    const unique = ecs.CreateUniqueEntity(B, C).Extends(parent);

    for (let i = 0; i < CountEntitiesInChildrenGroup; i++) {
        ecs.CreateEntity(children);
    }

    test('type', () => {
        expect(typeof ecs.CreateSystem(children, () => {})).toBe("function");
    });

    describe('Group', () => {
        test("entities", () => {
            ecs.CreateSystem(children, entities => expect(entities).toHaveLength(CountEntitiesInChildrenGroup))();
        });
        test('components', () => {
            ecs.CreateSystem(children, (entities, b, c, a) => expect({a, b, c}).toStrictEqual({A, B, C}));
        });
    });
    describe('Unique', () => {
        test('entities ', () => {
            ecs.CreateSystem(unique, entity => expect(typeof entity).toBe("number"))();
        });

        test('components ', () => {
            ecs.CreateSystem(unique, (_, b, c, a) => {
                expect(a === A && b === B && c === C).toBeTruthy();
            })();
        });
    });
});