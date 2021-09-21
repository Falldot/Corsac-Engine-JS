const {ECS, types} = require("./ECS");

const ecs = new ECS();

const Position = ecs.CreateComponent(types.uint32);
const Direction = ecs.CreateComponent(types.uint32);

const Translate = ecs.CreateGroup(Position, Direction);

const Transform = ecs.CreateSystem(Translate, (entities, Pos) => {
    entities.forEach(element => {
        console.log(Pos[element]);
    });
});

ecs.CreateEntity(Translate);

Transform();
