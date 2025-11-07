import * as domHandler from "./domHandler.js";

domHandler.createProject("project1");

domHandler.createTodo("title1", "project1");
domHandler.createTodo("title2", "default");
domHandler.createTodo("title3", "default");

domHandler.updateTodoProperty("title1","description","some new description")

domHandler.getProject("default");
domHandler.getProject("project1");
