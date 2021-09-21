const assert = require('assert');
const {types} = require("../../src/core/utils/Types");
const ECS = require("../../src/core/ecs/ecs")
const { Group } = require('../../src/core/ecs/group');


describe('Group', function() {
    const CountEntities = 10
    const ecs = new ECS(CountEntities);

    const A = ecs.CreateComponent(types.uint32)
    const B = ecs.CreateComponent(types.int8)
    const C = ecs.CreateComponent({
        X: types.uint16,
        Y: types.float32,
    });

    test('type', () => {
        expect(ecs.CreateGroup()).toStrictEqual(new Group([]));
    });

    test('components', () => {
        expect(ecs.CreateGroup(A, B, C)).toStrictEqual(new Group([A, B, C]));
    });

    describe('Extends', function() {
        test('add components', () => {
            const parent = ecs.CreateGroup(A);
            expect(ecs.CreateGroup(B, C).Extends(parent)._components).toStrictEqual(new Group([B, C, A])._components);
        }); 
        test('add parent', () => {
            const parent = ecs.CreateGroup(A);
            const reference = new Group([]);
            reference._parents.push(parent)
            expect(ecs.CreateGroup().Extends(parent)._parents).toStrictEqual(reference._parents);
        })
        
    });
});