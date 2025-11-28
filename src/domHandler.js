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

    (function initialiseDocumentEventListeners() {
        document.addEventListener("keydown", (ev) => switchUi(ev.key));
    })();
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
    function switchUi(pressedKey) {
        const pageElement = dynamicContentElement.firstChild;
        if (pressedKey === "Escape") {
            switch (pageElement.dataset.pageElement) {
                case "project-content":
                    initialiseProjectsUi();
                    break;
                case "todo":
                    const projectName = document.querySelector([
                        "[data-todo-project]",
                    ]);
                    console.log(projectName);
                    initialiseProjectsContentUi(projectName.value);
                    break;
            }
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
    todoPageElement.dataset.pageElement = "todo";

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
    const projectDeleter = document.createElement("button");
    const todoCreator = document.createElement("button");
    const projectPageHead = document.createElement("div");
    const notDoneTodos = document.createElement("div");
    const doneTodos = document.createElement("div");
    const pageSeparator = document.createElement("hr");

    projectName.dataset.projectName = project;
    todoCreator.dataset.todoCreator = "";
    projectDeleter.dataset.projectDeleter = "";
    projectPageHead.dataset.projectPageHead = "";
    notDoneTodos.dataset.isDone = false;
    doneTodos.dataset.isDone = true;
    pageSeparator.dataset.separateTodos = "";

    projectName.textContent = project;
    todoCreator.textContent = "CREATE OR FIND TODO";
    projectDeleter.textContent = "DELETE PROJECT";

    todoCreator.addEventListener("click", () => {
        const newTodoTitle = prompt(`Choose a title for your Todo`);
        if (newTodoTitle !== undefined && newTodoTitle !== "") {
            createTodo(newTodoTitle, project);
            domSections.initialiseTodoUi(newTodoTitle);
        }
    });
    projectDeleter.addEventListener("click", () => {
        const descision = prompt(
            `Do you really want to delete ${project}?\n\nEnter the projects name, if you do.`
        );
        if (descision === project) {
            deleteProject(project);
            domSections.initialiseProjectsUi();
        }
    });

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
    pageElement.append(projectPageHead, notDoneTodos, pageSeparator, doneTodos);
    projectPageHead.append(todoCreator, projectName, projectDeleter);
}

function displayTodoUi(todo) {
    const pageElement = domSections.todoPageElement;
    const todoCard = document.createElement("form");
    const title = document.createElement("input");
    const project = document.createElement("input");
    const description = document.createElement("textarea");
    const isDone = document.createElement("p");
    const buttonContainer = document.createElement("div");
    const saveTodoSwitch = document.createElement("button");
    const deleteTodoSwitch = document.createElement("button");
    let boolValueOfIsDone = todo.getIsDone();

    todoCard.dataset.todoCard = todo.getTitle();
    todoCard.dataset.todoCardProject = todo.getProject();
    title.dataset.todoTitle = todo.getTitle();
    project.dataset.todoProject = todo.getProject();
    description.dataset.todoDescription = todo.getDescription();
    isDone.dataset.todoIsDone = boolValueOfIsDone;
    saveTodoSwitch.dataset.saveTodo = "";
    buttonContainer.dataset.buttonContainer = "";
    deleteTodoSwitch.dataset.deleteTodo = "";

    title.value = todo.getTitle();
    project.value = todo.getProject();
    description.value = todo.getDescription();
    description.placeholder = "Add your Description here";
    isDone.textContent = boolValueOfIsDone ? "Done" : "Not Done";
    saveTodoSwitch.textContent = "Save";
    deleteTodoSwitch.textContent = "Delete";

    isDone.addEventListener("click", () => {
        boolValueOfIsDone = !boolValueOfIsDone;
        isDone.dataset.todoIsDone = boolValueOfIsDone;
        isDone.textContent = boolValueOfIsDone ? "Done" : "Not Done";
    });

    saveTodoSwitch.addEventListener("click", () => {
        updateTodoProperty(todo.getTitle(), "title", title.value);
        updateTodoProperty(todo.getTitle(), "project", project.value);
        updateTodoProperty(todo.getTitle(), "description", description.value);
        updateTodoProperty(todo.getTitle(), "isDone", boolValueOfIsDone);
    });
    deleteTodoSwitch.addEventListener("click", () => {
        const descision = prompt(
            `Do you really want to delete ${todo.getTitle()}?\n\nEnter "yes" if you do.`
        );
        if (descision === "yes") {
            deleteTodo(todo.getTitle());
            domSections.initialiseProjectsContentUi(todo.getProject());
        }
    });
    pageElement.append(todoCard, buttonContainer);
    todoCard.append(title, project, description, isDone);
    buttonContainer.append(saveTodoSwitch, deleteTodoSwitch);
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
