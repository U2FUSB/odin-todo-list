import * as domHandler from "./domHandler.js";

domHandler.createTodo("title1", "project1");
domHandler.createTodo("title2", "default");
domHandler.createTodo("title3", "project1");

domHandler.updateTodoProperty("title1", "description", "My new description");
