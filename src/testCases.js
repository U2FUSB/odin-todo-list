import * as domHandler from "./domHandler.js";

domHandler.createProject("project1");

domHandler.createTodo("title1", "project1");
domHandler.createTodo("title2", "default");
domHandler.createTodo("title3", "project1");

domHandler.getProject("project1");
domHandler.updateProject("project1", "project11");
domHandler.getProject("project11");
