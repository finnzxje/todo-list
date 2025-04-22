import handleAddTask from "./functions/tasks";
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

  const testTodo = createTodo("test", "test", "2025-05-01", "High", "CAS");

  const test = createProject("test");
  test.addNewTodo(testTodo);
  const testTodo2 = createTodo("mamami", "hehe", "2025-05-01", "Low");
  test.addNewTodo(testTodo2);

  addProjectToStorage(test);

  // console.log(test);
  // console.log(projects);

  addTaskButton.addEventListener("click", handleAddTask);
};

export default sidebar;
