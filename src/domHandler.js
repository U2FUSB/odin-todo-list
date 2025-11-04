import * as pubsub from "./pubsub.js";
export { getTodo, createTodo, updateTodo };

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
function updateTodo(title, propertyToUpdate, newValueForProperty) {
    const todoUpdateObject = [title, propertyToUpdate, newValueForProperty];
    pubsub.publish("todoUpdated", todoUpdateObject);
}
function deleteTodo(title) {}

pubsub.subscribe("todoDisplayed", displayTodo);
