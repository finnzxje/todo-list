function createProject(name) {
    let todos = [];
    const addNewTodo = (todo) => {
        todos.push(todo);
    }
    const getTodos = () => {
        return todos;
    }

    return {
        name,
        addNewTodo,
        getTodos,
    }
}

export default createProject
