import * as domHandler from "./domHandler.js";

domHandler.createProject("project1");

domHandler.createTodo("title1", "project1");
domHandler.createTodo("title2", "default");
domHandler.createTodo("title3", "default");

domHandler.getProject("default");
domHandler.getProject("project1");

// domHandler.createTodo("myTodo", "myproject");
// domHandler.updateTodoProperty("myTodo", "isDone", true);
// domHandler.getTodo("myTodo");
