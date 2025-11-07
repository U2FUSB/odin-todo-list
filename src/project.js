import * as pubsub from "./pubsub.js";

const projects = [];

function createProject(name) {
    if (findProjectByName(name) === undefined) {
        projects.push({
            getName: () => {
                return name;
            },
            getTodos: function () {
                pubsub.publish("todosByProjectQueried", name);
            },
            setName: function (_name) {
                name = _name;
            },
        });
    }
}
function getProject(name) {
    const project = findProjectByName(name);
    pubsub.publish("projectDisplayed", project);
}
function updateProject(projectUpdateObject) {
    const { name, newName } = projectUpdateObject;
    const project = findProjectByName(name);
    if (project !== undefined) {
        project.setName(newName);
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
pubsub.subscribe("projectUpdated", updateProject);
createProject("default");
