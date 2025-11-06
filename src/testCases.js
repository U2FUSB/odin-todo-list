import * as domHandler from "./domHandler.js";

domHandler.createTodo("title1", "project1");
domHandler.createTodo("title2", "project1");
domHandler.createTodo("title3", "project2");

domHandler.createTodo("myTodo", "myproject");
domHandler.updateTodoProperty("myTodo", "isDone", true);
domHandler.getTodo("myTodo");