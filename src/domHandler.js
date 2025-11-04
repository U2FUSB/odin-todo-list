import * as pubsub from "./pubsub.js";

function displayTodo (todo) {
    console.log(todo)
}

pubsub.subscribe("todoDisplayed", displayTodo);