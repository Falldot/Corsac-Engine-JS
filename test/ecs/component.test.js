const {types} = require("core/utils/Types");
const ECS = require("core/ecs/ecs");

describe('Component', () => {
    const CountEntities = 10;
    const ecs = new ECS(CountEntities);

    describe("float64", () => {
        test('type', () => {
            expect(ecs.CreateComponent(types.float64)).toStrictEqual(new Float64Array(CountEntities));
        });
        test('not type', () => {
            expect(ecs.CreateComponent(types.float64)).not.toStrictEqual(new Float32Array(CountEntities));
        });
    });


    describe("float32", () => {
        test('type', () => {
            expect(ecs.CreateComponent(types.float32)).toStrictEqual(new Float32Array(CountEntities));
        });
        test('not type', () => {
            expect(ecs.CreateComponent(types.float32)).not.toStrictEqual(new Float64Array(CountEntities));
        });
    });

    describe("uint32", () => {
        test('type', () => {
            expect(ecs.CreateComponent(types.uint32)).toStrictEqual(new Uint32Array(CountEntities));
        });
        test('not type', () => {
            expect(ecs.CreateComponent(types.uint32)).not.toStrictEqual(new Float64Array(CountEntities));
        });
    });

    describe("int32", () => {
        test('type', () => {
            expect(ecs.CreateComponent(types.int32)).toStrictEqual(new Int32Array(CountEntities));
        });
        test('not type', () => {
            expect(ecs.CreateComponent(types.int32)).not.toStrictEqual(new Float64Array(CountEntities));
        });
    });

    describe("int16", () => {
        test('type', () => {
            expect(ecs.CreateComponent(types.int16)).toStrictEqual(new Int16Array(CountEntities));
        });
        test('not type', () => {
            expect(ecs.CreateComponent(types.int16)).not.toStrictEqual(new Float64Array(CountEntities));
        });
    });

    describe("uint16", () => {
        test('type', () => {
            expect(ecs.CreateComponent(types.uint16)).toStrictEqual(new Uint16Array(CountEntities));
        });
        test('not type', () => {
            expect(ecs.CreateComponent(types.uint16)).not.toStrictEqual(new Float64Array(CountEntities));
        });
    });

    describe("int8", () => {
        test('type', () => {
            expect(ecs.CreateComponent(types.int8)).toStrictEqual(new Int8Array(CountEntities));
        });
        test('not type', () => {
            expect(ecs.CreateComponent(types.int8)).not.toStrictEqual(new Float64Array(CountEntities));
        });
    });

    describe("uint8", () => {
        test('type', () => {
            expect(ecs.CreateComponent(types.uint8)).toStrictEqual(new Uint8Array(CountEntities));
        });
        test('not type', () => {
            expect(ecs.CreateComponent(types.uint8)).not.toStrictEqual(new Float64Array(CountEntities));
        });
    });

    describe("object", () => {
        const newobj = () => ({
                x: types.int8,
                y: types.float32
            });
        const finalObj = {
            x: new Int8Array(CountEntities),
            y: new Float32Array(CountEntities),
        };

        test('Field exist', () => {
            expect(ecs.CreateComponent(newobj())).toStrictEqual(finalObj);
        });
    });
});