import * as pubsub from "./pubsub.js";
export { getTodo, createTodo };

function displayTodo(todo) {
    console.log("------");
    console.log(`Title: ${todo.getTitle()}`);
    console.log(`Description: ${todo.getDescription()}`);
    console.log(`Assigned to: ${todo.getProject()}`);
    console.log("------");
}
function getTodo(title) {
    pubsub.publish("todoQueried", title);
}
function createTodo(title, project) {
    const todo = {
        title,
        description: "",
        isDone: false,
        project,
    };
    pubsub.publish("todoCreated", todo);
}

pubsub.subscribe("todoDisplayed", displayTodo);
