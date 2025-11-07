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
        });
    }
}
function getProject(name) {
    const project = findProjectByName(name);
    pubsub.publish("projectDisplayed", project);
}

// Utility
function findProjectByName(name) {
    return projects.find((project) => {
        return project.getName() === name;
    });
}

pubsub.subscribe("projectCreated", createProject);
pubsub.subscribe("projectQueried", getProject);
createProject("default");
