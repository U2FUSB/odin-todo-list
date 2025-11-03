import * as todo from "./todo.js";

export function createTodo(title, project) {
    return todo.createTodo(title, "", false, project);
}
