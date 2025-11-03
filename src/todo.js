import * as pubsub from "./pubsub.js";

const todos = [];
function createTodo(todo) {
    const { title, description, isDone, project } = todo;
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

pubsub.subscribe("todoCreated", createTodo);
pubsub.publish("todoCreated", {
    title: "title",
    description: "description",
    isDone: false,
    project: "project",
});
console.log(todos[0].getProject());
