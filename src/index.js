import "./style.css";
import * as todo from "./todo.js";
import * as project from "./project.js";
import * as persistentStorage from "./persistentStorage.js";
import * as testCases from "./testCases.js"; //Needs to be the last import, as all other must have their subscriptions finished, beforehand 
import * as domHandler from "./domHandler.js";