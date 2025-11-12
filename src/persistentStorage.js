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

pubsub.subscribe("todoSaved", saveTodo);
pubsub.subscribe("loadTodosFromStorage", loadTodos);
