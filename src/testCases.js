import * as domHandler from "./domHandler.js";

domHandler.createTodo("title1", "project1");
domHandler.createTodo("title2", "default");
domHandler.createTodo("title3", "project1");

domHandler.deleteProject("project1");
domHandler.getProject("project1");
domHandler.getTodo("title3");
domHandler.getTodo("title2");
