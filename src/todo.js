import * as pubsub from "./pubsub.js";

const todos = [];
function createTodo(todo) {
    let { title, description, isDone, project } = todo;
    todos.push({
        getTitle: () => {
            return title;
        },
        getDescription: () => {
            return description;
        },
        getIsDone: () => {
            return isDone;
        },
        getProject: () => {
            return project;
        },
        setTitle: (_title) => {
            title = _title;
        },
        setDescription: (_description) => {
            description = _description;
        },
        setIsDone: (_isDone) => {
            isDone = _isDone;
        },
        setProject: (_project) => {
            project = _project;
        },
    });
}
function getTodo(title) {
    const todo = todos.find((todo) => {
        return todo.getTitle() === title;
    });
    pubsub.publish("todoDisplayed", todo);
}

pubsub.subscribe("todoCreated", createTodo);
pubsub.subscribe("todoQueried", getTodo);