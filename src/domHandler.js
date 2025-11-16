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
        dynamicContentElement.innerHTML = null;
    }
    function initialiseProjectsUi() {
        clearUi();
        dynamicContentElement.appendChild(domSections.projectsPageElement);
        getAllProjects();
    }
    function initialiseProjectsContentUi(project) {
        clearUi();
        dynamicContentElement.appendChild(projectContentPageElement);
        getProject(project.getName());
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
            domSections.initialiseProjectsContentUi(project)
        );
    });
}
function displayTodosInProjectUI(project) {
    const pageElement = domSections.projectContentPageElement;
    const notDoneTodos = document.createElement("div");
    const doneTodos = document.createElement("div");
    const pageSeparator = document.createElement("hr");

    pageElement.append(...[notDoneTodos, pageSeparator, doneTodos]);
}
function displayTodoUi() {}

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
pubsub.subscribe("todoDisplayed", displayTodoConsole);
pubsub.subscribe("allProjectsDisplayed", displayProjectUi);
pubsub.subscribe("projectDisplayed", displayTodosInProjectUI);

domSections.initialiseProjectsUi();
// domSections.initialiseProjectsContentUi("project3");
