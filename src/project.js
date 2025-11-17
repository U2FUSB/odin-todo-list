import * as pubsub from "./pubsub.js";

const projects = [];

function createProject(name) {
    if (!findProjectByName(name)) {
        const project = {
            getName: () => {
                return name;
            },
            getTodos: () => {
                pubsub.publish("todosByProjectQueried", name);
            },
            setName: (_name) => {
                name = _name;
            },
        };
        projects.push(project);
    }
}
function getProject(name) {
    const project = findProjectByName(name);
    pubsub.publish("projectDisplayed", project);
}
function getAllProjects() {
    pubsub.publish("allProjectsDisplayed", [...projects]);
}
function getTodosOfProject(name) {
    const project = findProjectByName(name);
    project.getTodos();
}
function updateProject(projectUpdateObject) {
    const { name, newName } = projectUpdateObject;
    const project = findProjectByName(name);
    if (project) {
        project.setName(newName);
    }
}
function deleteProject(name) {
    const indexToDelete = projects.findIndex(
        (project) => project.getName() === name
    );
    if (indexToDelete !== -1) {
        projects.splice(indexToDelete, 1);
        pubsub.publish("todosByProjectDeleted", name);
    }
}

// Utility
function findProjectByName(name) {
    return projects.find((project) => {
        return project.getName() === name;
    });
}

pubsub.subscribe("projectCreated", createProject);
pubsub.subscribe("projectQueried", getProject);
pubsub.subscribe("allProjectsQueried", getAllProjects);
pubsub.subscribe("todosOfProjectQueried", getTodosOfProject);
pubsub.subscribe("projectUpdated", updateProject);
pubsub.subscribe("projectDeleted", deleteProject);

createProject("default");
