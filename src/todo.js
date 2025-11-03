export function createTodo(title, description, isDone, project) {
    return {
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
        },
    };
}
