import * as domHandler from "./domHandler.js";

// domHandler.loadTodos();
// domHandler.loadTodos();
domHandler.createTodo("title6", "project1");
domHandler.createTodo("title2", "default");
domHandler.createTodo("title3", "project1");

// domHandler.updateProject("project1", "true");
domHandler.updateTodoProperty("title1", "description", "My new description");

domHandler.getProject("project1");
// console.log(localStorage.key(3));

// console.log(localStorage.length);
