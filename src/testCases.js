import * as domHandler from "./domHandler.js";

domHandler.createTodo("title1", "project1");
domHandler.createTodo("title2", "project1");
domHandler.createTodo("title3", "project2");
domHandler.createTodo("", "project2");
domHandler.createTodo(undefined, "project2");
domHandler.getTodo("title1")