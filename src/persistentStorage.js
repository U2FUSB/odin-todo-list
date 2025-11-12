import * as pubsub from "./pubsub.js";

function saveTodo(savingArray) {
    const [key, properties] = savingArray;
    localStorage.setItem(key, JSON.stringify(properties));
}
function loadTodos() {
    for (let index = 0; index < localStorage.length; index++) {
        const todo = JSON.parse(localStorage.getItem(localStorage.key(index)));
        if (todo) {
            pubsub.publish("todoCreated", todo);
        }
    }
}
function deleteTodo(title) {
    localStorage.removeItem(title);
}
pubsub.subscribe("todoAddedPersistently", saveTodo);
pubsub.subscribe("todosLoaded", loadTodos);
pubsub.subscribe("todoRemovedPersistently", deleteTodo);
