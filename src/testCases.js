import * as pubsub from "./pubsub.js";
import * as domHandler from "./domHandler.js";

pubsub.publish("todoCreated", {
    title: "title",
    description: "description",
    isDone: false,
    project: "project",
});
pubsub.publish("todoCreated", {
    title: "title2",
    description: "description",
    isDone: false,
    project: "project",
});
pubsub.publish("todoCreated", {
    title: "title3",
    description: "description",
    isDone: false,
    project: "project",
});
pubsub.publish("todoQueried", "title");
pubsub.publish("todoQueried", "title2");