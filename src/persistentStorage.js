import * as pubsub from "./pubsub.js";

function saveObject(savingArray) {
    const [key, properties] = savingArray;
    localStorage.setItem(key, JSON.stringify(properties));
}

pubsub.subscribe("todoSaved", saveObject);