function createTodo(title, description, dueDate, priority, tag) {

    const createdDate = new Date().toString();
    let complete = false;
    const markComplete = () => complete = true;
    const getComplete = () => complete;
    return {
        title,
        description,
        dueDate,
        priority,
        tag,
        markComplete,
        getComplete,
        createdDate
    }
}


export default createTodo
