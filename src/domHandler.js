import * as pubsub from "./pubsub.js";
export { getTodo, createTodo, updateTodoProperty, deleteTodo };

function displayTodo(todo) {
    console.log("------");
    if (todo === undefined) {
        console.log("This todo does not exist");
    } else {
        console.log(`Title: ${todo.getTitle()}`);
        console.log(`Description: ${todo.getDescription()}`);
        console.log(`Assigned to: ${todo.getProject()}`);
    }
    console.log("------");
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
function getTodo(title) {
    pubsub.publish("todoQueried", title);
}
function updateTodoProperty(title, propertyToUpdate, newValueForProperty) {
    const todoUpdateObject = [title, propertyToUpdate, newValueForProperty];
    pubsub.publish("todoUpdated", todoUpdateObject);
}
function deleteTodo(title) {
    pubsub.publish("todoDeleted", title);
}

pubsub.subscribe("todoDisplayed", displayTodo);
