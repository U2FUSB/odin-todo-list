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
        console.log(`Is Done: ${todo.getIsDone()}`);
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
    publishIfArrayNotEmptyOrUndefined("todoCreated", todo, [title, project]);
}
function getTodo(title) {
    publishIfArrayNotEmptyOrUndefined("todoQueried", title, [title]);
}
function updateTodoProperty(title, propertyToUpdate, newValueForProperty) {
    const todoUpdateObject = [title, propertyToUpdate, newValueForProperty];
    if (
        (propertyToUpdate === "description" &&
            typeof newValueForProperty === "string") ||
        (propertyToUpdate === "isDone" &&
            typeof newValueForProperty === "boolean")
    ) {
        publishIfArrayNotEmptyOrUndefined("todoUpdated", todoUpdateObject, [
            title,
            propertyToUpdate,
        ]);
    }
}
function deleteTodo(title) {
    publishIfArrayNotEmptyOrUndefined("todoDeleted", title, [title]);
}
// Utility
function publishIfArrayNotEmptyOrUndefined(eventName, data, arrayToCheck) {
    const elementsAreNotUndefinedOrEmpty = arrayToCheck.every(
        (elementToCheck) => {
            return elementToCheck !== undefined && elementToCheck !== "";
        }
    );
    if (elementsAreNotUndefinedOrEmpty) {
        pubsub.publish(eventName, data);
    }
}
pubsub.subscribe("todoDisplayed", displayTodo);
console.log(typeof true)
