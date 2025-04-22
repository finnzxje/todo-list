import handleAddProject from "./functions/addProject";
import handleAddTask from "./functions/addTask";
import createProject from "./project";
import createTodo from "./todo";
import { loadProjectsFromStorage, addProjectToStorage } from "./utils/storage";

const sidebar = () => {
  const sidebar = document.getElementById("sidebar");

  const items = document.createElement("ul");

  const item1 = document.createElement("li");
  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "Add task";
  item1.appendChild(addTaskButton);

  const item2 = document.createElement("li");
  const addProjectButton = document.createElement("button");
  addProjectButton.textContent = "Add new project";
  item2.appendChild(addProjectButton);

  items.appendChild(addTaskButton);
  items.appendChild(addProjectButton);

  sidebar.appendChild(items);

  const projects = loadProjectsFromStorage();

  addTaskButton.addEventListener("click", handleAddTask);
  addProjectButton.addEventListener("click", handleAddProject);
};

export default sidebar;
