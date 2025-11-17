import * as pubsub from "./pubsub.js";

const todos = [];

function createTodo(todoProperties) {
    let { title, description, isDone, project } = todoProperties;
    if (!findTodoByTitle(title)) {
        const todo = {
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
        };
        todos.push(todo);
        pubsub.publish("projectCreated", todo.getProject());
        pubsub.publish("todoAddedPersistently", [
            todo.getTitle(),
            getTodoProperties(todo),
        ]);
    }
}
function getTodo(title) {
    const todo = findTodoByTitle(title);
    pubsub.publish("todoDisplayed", todo);
}
function getTodosByProject(project) {
    const todosByProject = todos.filter(
        (todo) => todo.getProject() === project
    );
    pubsub.publish("todosOfProjectDisplayed", { project, todosByProject });
}
function updateTodo(todoUpdateObject) {
    const { title, propertyToUpdate, newValueForProperty } = todoUpdateObject;
    const todo = findTodoByTitle(title);
    const propertyUpdateSetter = `set${propertyToUpdate[0].toUpperCase()}${propertyToUpdate.slice(
        1
    )}`;
    if (todo && todo.hasOwnProperty(propertyUpdateSetter)) {
        todo[propertyUpdateSetter](newValueForProperty);
        pubsub.publish("todoAddedPersistently", [
            todo.getTitle(),
            getTodoProperties(todo),
        ]);
    }
}
function updateProjectOfTodos(projectUpdateObject) {
    const { name, newName } = projectUpdateObject;
    todos
        .filter((todo) => todo.getProject() === name)
        .forEach((todo) => {
            todo.setProject(newName);
            pubsub.publish("todoAddedPersistently", [
                todo.getTitle(),
                getTodoProperties(todo),
            ]);
        });
}
function deleteTodo(title) {
    const indexToDelete = todos.findIndex((todo) => todo.getTitle() === title);
    if (indexToDelete !== -1) {
        todos.splice(indexToDelete, 1);
        pubsub.publish("todoRemovedPersistently", title);
    }
}
function deleteTodosByProject(project) {
    todos
        .filter((todo) => todo.getProject() === project)
        .forEach((todo) => {
            todos.splice(
                todos.findIndex(
                    (_todo) => _todo.getTitle() === todo.getTitle()
                ),
                1
            );
            pubsub.publish("todoRemovedPersistently", todo.getTitle());
        });
}
// Utility
function findTodoByTitle(title) {
    return todos.find((todo) => {
        return todo.getTitle() === title;
    });
}
function getTodoProperties(todo) {
    return {
        title: todo.getTitle(),
        description: todo.getDescription(),
        isDone: todo.getIsDone(),
        project: todo.getProject(),
    };
}

pubsub.subscribe("todoCreated", createTodo);
pubsub.subscribe("todoQueried", getTodo);
pubsub.subscribe("todoUpdated", updateTodo);
pubsub.subscribe("todoDeleted", deleteTodo);
pubsub.subscribe("todosByProjectQueried", getTodosByProject);
pubsub.subscribe("todosByProjectDeleted", deleteTodosByProject);
pubsub.subscribe("projectUpdated", updateProjectOfTodos);
