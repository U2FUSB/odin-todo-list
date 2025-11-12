export { subscribe, publish };

const events = {};
function subscribe(evName, fn) {
    events[evName] = events[evName] || [];
    events[evName].push(fn);
}
function publish(evName, data) {
    events[evName].forEach((fn) => {
        fn(data);
    });
}
