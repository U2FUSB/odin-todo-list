import "./style.css";
import * as domHandler from "./domHandler.js";
const myTodo = domHandler.createTodo("myTodo", "myProject");
console.log(myTodo.getTitle());
myTodo.setTitle("theTitle")
console.log(myTodo.getTitle())