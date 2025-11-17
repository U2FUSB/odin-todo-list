import * as pubsub from "./pubsub.js";
export {
    createProject,
    createTodo,
    deleteProject,
    deleteTodo,
    getAllProjects,
    getProject,
    getTodo,
    updateProject,
    updateTodoProperty,
};
const domSections = (function () {
    const dynamicContentElement = document.querySelector(".dynamic-content");
    const projectsPageElement = document.createElement("section");
    const projectContentPageElement = document.createElement("section");
    const todoPageElement = document.createElement("section");

    function clearUi() {
        while (dynamicContentElement.hasChildNodes()) {
            clearChildNode(dynamicContentElement.firstChild);
        }
        function clearChildNode(childNode) {
            while (childNode.hasChildNodes()) {
                clearChildNode(childNode.firstChild);
            }
            childNode.parentNode.removeChild(childNode);
        }
    }
    function initialiseProjectsUi() {
        clearUi();
        dynamicContentElement.appendChild(domSections.projectsPageElement);
        getAllProjects();
    }
    function initialiseProjectsContentUi(project) {
        clearUi();
        dynamicContentElement.appendChild(projectContentPageElement);
        getTodosOfProject(project);
    }
    function initialiseTodoUi(todo) {
        clearUi();
        dynamicContentElement.appendChild(todoPageElement);
        getTodo(todo);
    }

    dynamicContentElement.dataset.pageRoot = "root";
    projectsPageElement.dataset.pageElement = "projects";
    projectContentPageElement.dataset.pageElement = "project-content";

    return {
        dynamicContentElement,
        projectsPageElement,
        projectContentPageElement,
        todoPageElement,
        clearUi,
        initialiseProjectsUi,
        initialiseProjectsContentUi,
        initialiseTodoUi,
    };
})();

function displayProjectUi(projects) {
    const pageElement = domSections.projectsPageElement;
    projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.dataset.projectCard = project.getName();
        projectElement.textContent = project.getName();
        pageElement.appendChild(projectElement);
        projectElement.addEventListener("click", () =>
            domSections.initialiseProjectsContentUi(project.getName())
        );
    });
}

function displayTodosInProjectUi(todosOfProjectObject) {
    const { project, todosByProject } = todosOfProjectObject;
    const pageElement = domSections.projectContentPageElement;
    const projectName = document.createElement("h1");
    const notDoneTodos = document.createElement("div");
    const doneTodos = document.createElement("div");
    const pageSeparator = document.createElement("hr");

    projectName.dataset.projectName = project;
    notDoneTodos.dataset.isDone = false;
    doneTodos.dataset.isDone = true;
    pageSeparator.dataset.separateTodos = "";

    projectName.textContent = project;

    todosByProject.forEach((todo) => {
        const todoElement = document.createElement("div");
        todoElement.dataset.todo = todo.getTitle();
        todoElement.textContent = todo.getTitle();
        if (todo.getIsDone() === false) {
            notDoneTodos.appendChild(todoElement);
        } else if (todo.getIsDone() === true) {
            doneTodos.appendChild(todoElement);
        }
        todoElement.addEventListener("click", () =>
            domSections.initialiseTodoUi(todo.getTitle())
        );
    });
    pageElement.append(
        ...[projectName, notDoneTodos, pageSeparator, doneTodos]
    );
}

function displayTodoUi(todo) {
    const pageElement = domSections.todoPageElement;
    const todoCard = document.createElement("div");
    const title = document.createElement("h2");
    const project = document.createElement("p");
    const description = document.createElement("p");
    const isDone = document.createElement("p");

    todoCard.dataset.todoCard = todo.getTitle();
    title.dataset.todoTitle = todo.getTitle();
    project.dataset.todoProject = todo.getProject();
    description.dataset.todoDescription = todo.getDescription();
    isDone.dataset.todoIsDone = todo.getIsDone();

    title.textContent=todo.getTitle();
    project.textContent=todo.getProject();
    description.textContent=todo.getDescription();
    isDone.textContent=todo.getIsDone();

    pageElement.appendChild(todoCard);
    todoCard.append(...[title, project, description, isDone]);
}

function displayTodoConsole(todo) {
    if (todo === undefined) {
        console.log("This todo does not exist");
    } else {
        console.log(`Title: ${todo.getTitle()}`);
        console.log(`Description: ${todo.getDescription()}`);
        console.log(`Assigned to: ${todo.getProject()}`);
        console.log(`Is Done: ${todo.getIsDone()}`);
    }
    console.log("------");
}

function displayProjectConsole(project) {
    console.log("||||||||||||||");
    if (project === undefined) {
        console.log("This project does not exist");
    } else {
        console.log(`Name: ${project.getName()}`);
        console.log(`Contained Todos:`);
        project.getTodos();
    }
    console.log("||||||||||||||");
}
function createTodo(title, project) {
    const todo = {
        title,
        description: "",
        isDone: false,
        project,
    };
    publishIfArrayNotEmptyOrUndefined("todoCreated", todo, [title, project]);
}
function getTodo(title) {
    publishIfArrayNotEmptyOrUndefined("todoQueried", title, [title]);
}
function updateTodoProperty(title, propertyToUpdate, newValueForProperty) {
    const todoUpdateObject = { title, propertyToUpdate, newValueForProperty };
    if (
        !(
            (propertyToUpdate === "title" &&
                typeof newValueForProperty !== "string") ||
            (propertyToUpdate === "description" &&
                typeof newValueForProperty !== "string") ||
            (propertyToUpdate === "isDone" &&
                typeof newValueForProperty !== "boolean") ||
            (propertyToUpdate === "project" &&
                typeof newValueForProperty !== "string")
        )
    ) {
        publishIfArrayNotEmptyOrUndefined("todoUpdated", todoUpdateObject, [
            title,
            propertyToUpdate,
        ]);
    }
}
function deleteTodo(title) {
    publishIfArrayNotEmptyOrUndefined("todoDeleted", title, [title]);
}
function createProject(name) {
    publishIfArrayNotEmptyOrUndefined("projectCreated", name, [name]);
}
function getProject(name) {
    publishIfArrayNotEmptyOrUndefined("projectQueried", name, [name]);
}
function getTodosOfProject(name) {
    publishIfArrayNotEmptyOrUndefined("todosOfProjectQueried", name, [name]);
}
function getAllProjects() {
    pubsub.publish("allProjectsQueried");
}
function updateProject(name, newName) {
    const projectUpdateObject = { name, newName };
    if (typeof newName === "string") {
        publishIfArrayNotEmptyOrUndefined(
            "projectUpdated",
            projectUpdateObject,
            [name, newName]
        );
    }
}
function deleteProject(name) {
    publishIfArrayNotEmptyOrUndefined("projectDeleted", name, [name]);
}
// Utility
function publishIfArrayNotEmptyOrUndefined(eventName, data, arrayToCheck) {
    const elementsAreNotUndefinedOrEmpty = arrayToCheck.every(
        (elementToCheck) => {
            return elementToCheck !== undefined && elementToCheck !== "";
        }
    );
    if (elementsAreNotUndefinedOrEmpty) {
        pubsub.publish(eventName, data);
    }
}
pubsub.subscribe("todoDisplayed", displayTodoUi);
pubsub.subscribe("allProjectsDisplayed", displayProjectUi);
pubsub.subscribe("todosOfProjectDisplayed", displayTodosInProjectUi);

domSections.initialiseProjectsUi();
domSections.initialiseProjectsContentUi("project1");
domSections.initialiseTodoUi("myTodo1");