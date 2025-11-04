import * as domHandler from "./domHandler.js";

domHandler.createTodo("title1", "project1");
domHandler.createTodo("title2", "project1");
domHandler.createTodo("title3", "project2");
domHandler.getTodo("title1");
domHandler.getTodo("title3");
domHandler.updateTodo("title1", "project", "project7");
domHandler.getTodo("title1");
