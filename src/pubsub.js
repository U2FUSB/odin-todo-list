export { subscribe, unsubscribe, publish };

const events = {};
function subscribe(evName, fn) {
    console.log(`PUBSUB: Someone subscribed to ${evName}`);
    events[evName] = events[evName] || [];
    events[evName].push(fn);
}
function unsubscribe(evName, fn) {
    console.log(`PUBSUB: Someone unsubscribed from ${evName}`);
    events[evName] = events[evName].filter((currentFn) => currentFn != fn);
}
function publish(evName, data) {
    console.log(`PUBSUB: Broadcasting event ${evName} with ${data}`);
    events[evName].forEach((fn) => {
        fn(data);
    });
}
