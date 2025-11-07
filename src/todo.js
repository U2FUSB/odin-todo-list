import * as pubsub from "./pubsub.js";

const todos = [];
function createTodo(todo) {
    let { title, description, isDone, project } = todo;
    if (findTodoByTitle(title) === undefined) {
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
                pubsub.publish("projectCreated", project);
            },
        });
        pubsub.publish("projectCreated", project);
    }
}
function getTodo(title) {
    const todo = findTodoByTitle(title);
    pubsub.publish("todoDisplayed", todo);
}
function getTodosByProject(project) {
    todos
        .filter((todo) => todo.getProject() === project)
        .forEach((todo) => {
            pubsub.publish("todoDisplayed", todo);
        });
}
function updateTodo(todoUpdateObject) {
    const { title, propertyToUpdate, newValueForProperty } = todoUpdateObject;
    const todo = findTodoByTitle(title);
    const propertyUpdateSetter = `set${propertyToUpdate[0].toUpperCase()}${propertyToUpdate.slice(
        1
    )}`;
    if (todo !== undefined && todo.hasOwnProperty(propertyUpdateSetter)) {
        todo[propertyUpdateSetter](newValueForProperty);
    }
}
function deleteTodo(title) {
    const indexToDelete = todos.findIndex((todo) => todo.getTitle() === title);
    if (indexToDelete !== -1) {
        todos.splice(indexToDelete, 1);
    }
}
function updateProjectOfTodos(projectUpdateObject) {
    const { name, newName } = projectUpdateObject;
    todos
        .filter((todo) => todo.getProject() === name)
        .forEach((todo) => {
            todo.setProject(newName);
        });
}
// Utility
function findTodoByTitle(title) {
    return todos.find((todo) => {
        return todo.getTitle() === title;
    });
}
pubsub.subscribe("todoCreated", createTodo);
pubsub.subscribe("todoQueried", getTodo);
pubsub.subscribe("todoUpdated", updateTodo);
pubsub.subscribe("todoDeleted", deleteTodo);
pubsub.subscribe("todosByProjectQueried", getTodosByProject);
pubsub.subscribe("projectUpdated", updateProjectOfTodos);
