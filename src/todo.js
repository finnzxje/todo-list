function createTodo(
  title,
  description,
  dueDate,
  priority = "Low",
  tag = null,
  complete = false,
) {
  const createdDate = new Date().toString();
  const markComplete = () => (complete = true);
  const getComplete = () => complete;
  return {
    title,
    description,
    dueDate,
    priority,
    tag,
    complete,
    markComplete,
    getComplete,
    createdDate,
  };
}

export default createTodo;
