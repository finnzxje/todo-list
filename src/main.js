import { loadProjectsFromStorage, updateTodoToStorage } from "./utils/storage";
import { format, formatRelative, isPast } from "date-fns";
import { addProjectToStorage, deleteProject } from "./utils/storage";

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

  const header = document.createElement("h2");
  header.classList.add("main-header");
  header.textContent = projects[projectName].name;

  div.appendChild(header);

  const todoList = projects[projectName].getTodos();
  for (const todoIndex in todoList) {
    const todo = todoList[todoIndex];

    if (todo.getComplete()) {
      console.log("HUH");
      continue;
    }
    const todoElement = document.createElement("div");
    const checkboxLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    const todoTitle = document.createElement("div");
    const meta = document.createElement("div"); // intend to display dueDate, priority, tag in the same row
    const dueDate = document.createElement("span");
    const tag = document.createElement("span");
    const priority = document.createElement("span");

    todoElement.classList.add("todo-group");

    checkboxLabel.for = "isComplete";

    checkbox.type = "checkbox";
    checkbox.id = "isComplete";
    checkbox.name = "isComplete";

    todoTitle.textContent = todo.title;

    todoElement.appendChild(checkbox);
    todoElement.appendChild(todoTitle);

    if (todo.description) {
      const todoDescription = document.createElement("div");
      todoDescription.textContent = todo.description;
      todoDescription.classList.add("todo-description");

      todoElement.appendChild(todoDescription);
    }

    dueDate.innerText = format(todo.dueDate, "LLL dd");
    if (todo.tag) {
      tag.innerText = `#${todo.tag}`;
    }
    priority.innerText = todo.priority;

    meta.appendChild(dueDate);
    meta.appendChild(tag);
    meta.appendChild(priority);

    if (isPast(todo.dueDate)) {
      console.log("LAZY ASS");
    }

    div.appendChild(todoElement);
    div.appendChild(meta);
    checkbox.addEventListener("change", () => {
      todo.complete = true;
      updateTodoToStorage(projectName, todoIndex, todo);
      showProjectTodos(projectName);
    });
  }

  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.textContent = "Delete this project";

  deleteProjectButton.addEventListener("click", () => {
    deleteProject(projectName);
  });

  main.appendChild(div);
  main.appendChild(deleteProjectButton);
};

export { showProjectTodos, clearMain };
