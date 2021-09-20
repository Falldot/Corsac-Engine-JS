const assert = require('assert');
const {types} = require("core/utils/Types");
const ECS = require("core/ecs/ecs");

describe('Component', () => {
    const CountEntities = 10;
    const ecs = new ECS(CountEntities);

    describe("float64", () => {
        it("type", () => {
            assert.equal(
                ecs.CreateComponent(types.float64).constructor,
                new Float64Array(CountEntities).constructor
            );
        });
        it("lenght", () => {
            assert.equal(
                ecs.CreateComponent(types.float64).lenght,
                new Float64Array(CountEntities).lenght
            );
        });
    });


    describe("float32", () => {
        it("type", () => {
            assert.equal(
                ecs.CreateComponent(types.float32).constructor,
                new Float32Array(CountEntities).constructor
            );
        });
        it("lenght", () => {
            assert.equal(
                ecs.CreateComponent(types.float32).lenght,
                new Float32Array(CountEntities).lenght
            );
        });
    });

    describe("uint32", () => {
        it("type", () => {
            assert.equal(
                ecs.CreateComponent(types.uint32).constructor,
                new Uint32Array(CountEntities).constructor
            );
        });
        it("lenght", () => {
            assert.equal(
                ecs.CreateComponent(types.uint32).lenght,
                new Uint32Array(CountEntities).lenght
            );
        });
    });

    describe("int32", () => {
        it("type", () => {
            assert.equal(
                ecs.CreateComponent(types.int32).constructor,
                new Int32Array(CountEntities).constructor
            );
        });
        it("lenght", () => {
        assert.equal(
                ecs.CreateComponent(types.int32).lenght,
                new Int32Array(CountEntities).lenght
            );
        });
    });

    describe("int16", () => {
        it("type", () => {
            assert.equal(
                ecs.CreateComponent(types.int16).constructor,
                new Int16Array(CountEntities).constructor
            );
        });
        it("lenght", () => {
        assert.equal(
                ecs.CreateComponent(types.int16).lenght,
                new Int16Array(CountEntities).lenght
            );
        });
    });

    describe("uint16", () => {
        it("type", () => {
            assert.equal(
                ecs.CreateComponent(types.uint16).constructor,
                new Uint16Array(CountEntities).constructor
            );
        });
        it("lenght", () => {
        assert.equal(
                ecs.CreateComponent(types.uint16).lenght,
                new Uint16Array(CountEntities).lenght
            );
        });
    });

    describe("int8", () => {
        it("type", () => {
            assert.equal(
            ecs.CreateComponent(types.int8).constructor,
            new Int8Array(CountEntities).constructor
            );
        });
        it("lenght", () => {
        assert.equal(
            ecs.CreateComponent(types.int8).lenght,
            new Int8Array(CountEntities).lenght
            );
        });
    });

    describe("uint8", () => {
        it("type", () => {
            assert.equal(
            ecs.CreateComponent(types.uint8).constructor,
            new Uint8Array(CountEntities).constructor
            );
        });
        it("lenght", () => {
        assert.equal(
            ecs.CreateComponent(types.uint8).lenght,
            new Uint8Array(CountEntities).lenght
            );
        });
    });

    describe("object", () => {
        const newobj = () => ({
                x: types.int8,
                y: types.float32
            });
        it("equal", () => {
            assert.equal(
                Object.keys(ecs.CreateComponent(newobj())).filter(i => i === "x" || i === "y").length,
                2
            );
        });
        it("lenght", () => {
            assert.equal(
                Object.keys(ecs.CreateComponent(newobj())).length,
                2
            );
        });
        it("fields types", () => {
            assert.equal(
                ecs.CreateComponent(newobj()).x.constructor,
                new Int8Array().constructor
            );
            assert.equal(
                ecs.CreateComponent(newobj()).y.constructor,
                new Float32Array().constructor
            );
        });
    });
});