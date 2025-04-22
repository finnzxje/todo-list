function createProject(name) {
  let todos = [];
  const addNewTodo = (todo) => {
    todos.push(todo);
  };
  const getTodos = () => {
    return todos;
  };

  const getTodoByName = (name) => {
    return todos[name];
  };

  return {
    name,
    addNewTodo,
    getTodos,
    getTodoByName,
  };
}

export default createProject;
