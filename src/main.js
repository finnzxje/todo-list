import { loadProjectsFromStorage, updateTodoToStorage } from "./utils/storage";
import { format, isPast, isToday } from "date-fns";
import { deleteProject } from "./utils/storage";

const clearMain = () => {
  document.getElementById("main").innerHTML = "";
};

const showProjectTodos = (projectName) => {
  if (!localStorage.getItem(projectName)) {
    return;
  }

  const projects = loadProjectsFromStorage();

  const main = document.getElementById("main");
  main.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("project-container");

  const header = document.createElement("h2");
  header.classList.add("main-header");
  header.textContent = projects[projectName].name;

  div.appendChild(header);

  const todoList = projects[projectName].getTodos();
  const incompleteTodos = [];
  const completedTodos = [];

  // Sort todos into complete and incomplete
  for (const todoIndex in todoList) {
    const todo = todoList[todoIndex];
    if (todo.getComplete()) {
      completedTodos.push({ todo, todoIndex });
    } else {
      incompleteTodos.push({ todo, todoIndex });
    }
  }

  incompleteTodos.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.todo.priority] !== priorityOrder[b.todo.priority]) {
      return priorityOrder[a.todo.priority] - priorityOrder[b.todo.priority];
    }
    return new Date(a.todo.dueDate) - new Date(b.todo.dueDate);
  });

  if (incompleteTodos.length > 0) {
    const pendingHeader = document.createElement("h3");
    pendingHeader.textContent = "Pending Tasks";
    pendingHeader.classList.add("section-header");
    div.appendChild(pendingHeader);

    incompleteTodos.forEach(({ todo, todoIndex }) => {
      const todoElement = createTodoElement(todo, todoIndex, projectName);
      div.appendChild(todoElement);
    });
  } else {
    const noTasks = document.createElement("p");
    noTasks.textContent = "No pending tasks in this project. Add a new task!";
    noTasks.classList.add("no-tasks-message");
    div.appendChild(noTasks);
  }

  // Render completed todos if there are any
  if (completedTodos.length > 0) {
    const completedHeader = document.createElement("h3");
    completedHeader.textContent = "Completed Tasks";
    completedHeader.classList.add("section-header", "completed-header");
    div.appendChild(completedHeader);

    const completedContainer = document.createElement("div");
    completedContainer.classList.add("completed-container");

    completedTodos.forEach(({ todo, todoIndex }) => {
      const todoElement = createTodoElement(todo, todoIndex, projectName, true);
      completedContainer.appendChild(todoElement);
    });

    div.appendChild(completedContainer);
  }

  const actionButtons = document.createElement("div");
  actionButtons.classList.add("action-buttons");

  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.textContent = "Delete Project";
  deleteProjectButton.classList.add("delete-project-btn");

  deleteProjectButton.addEventListener("click", () => {
    if (projectName === "Home") {
      alert("Cannot delete the Home project!");
      return;
    }
    if (
      confirm(`Are you sure you want to delete the "${projectName}" project?`)
    ) {
      deleteProject(projectName);
    }
  });

  // Only add delete button if it's not the Home project
  if (projectName !== "Home") {
    actionButtons.appendChild(deleteProjectButton);
  }

  div.appendChild(actionButtons);
  main.appendChild(div);
};

const createTodoElement = (todo, todoIndex, projectName, completed = false) => {
  const todoContainer = document.createElement("div");

  const todoElement = document.createElement("div");
  todoElement.classList.add("todo-group");

  // Add priority class
  todoElement.classList.add(`priority-${todo.priority.toLowerCase()}`);

  // Check if past due
  const isDueDate = new Date(todo.dueDate);
  if (isPast(isDueDate) && !isToday(isDueDate) && !completed) {
    todoElement.classList.add("past-due");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `todo-${todoIndex}`;
  checkbox.checked = completed;

  const todoContent = document.createElement("div");
  todoContent.classList.add("todo-content");

  const todoTitle = document.createElement("div");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = todo.title;

  todoContent.appendChild(todoTitle);

  if (todo.description) {
    const todoDescription = document.createElement("div");
    todoDescription.textContent = todo.description;
    todoDescription.classList.add("todo-description");
    todoContent.appendChild(todoDescription);
  }

  todoElement.appendChild(checkbox);
  todoElement.appendChild(todoContent);

  todoContainer.appendChild(todoElement);

  // Create meta information
  const meta = document.createElement("div");
  meta.classList.add("todo-meta");

  const dueDate = document.createElement("span");
  dueDate.classList.add("due-date");
  dueDate.textContent = format(new Date(todo.dueDate), "MMM dd");

  if (
    isPast(new Date(todo.dueDate)) &&
    !isToday(new Date(todo.dueDate)) &&
    !completed
  ) {
    dueDate.classList.add("overdue");
  }

  meta.appendChild(dueDate);

  if (todo.tag) {
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = `#${todo.tag}`;
    meta.appendChild(tag);
  }

  const priority = document.createElement("span");
  priority.classList.add(`priority-${todo.priority.toLowerCase()}`);
  priority.textContent = todo.priority;
  meta.appendChild(priority);

  todoContainer.appendChild(meta);

  // Add event listener for checkbox
  checkbox.addEventListener("change", () => {
    todo.complete = checkbox.checked;
    updateTodoToStorage(projectName, todoIndex, todo);
    showProjectTodos(projectName);
  });

  return todoContainer;
};

export { showProjectTodos, clearMain };
