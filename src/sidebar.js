import handleAddProject from "./functions/addProject";
import handleAddTask from "./functions/addTask";
import createProject from "./project";
import createTodo from "./todo";
import { loadProjectsFromStorage, addProjectToStorage } from "./utils/storage";
import { showProjectTodos } from "./main";

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

  items.appendChild(item1);
  items.appendChild(item2);

  sidebar.appendChild(items);

  loadProjectsFromStorage();
  loadProjectsToSidebar();
  addTaskButton.addEventListener("click", handleAddTask);
  addProjectButton.addEventListener("click", handleAddProject);
};

const loadProjectsToSidebar = () => {
  const sidebar = document.getElementById("sidebar");

  const existingProjectSection = document.getElementById("project-section");
  if (existingProjectSection) {
    sidebar.removeChild(existingProjectSection);
  }
  const projectSection = document.createElement("div");
  projectSection.id = "project-section";

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = "Projects";
  projectSection.appendChild(projectTitle);

  let projects = loadProjectsFromStorage();

  const projectItems = document.createElement("ul");

  for (const projectName in projects) {
    const projectItem = document.createElement("li");
    const projectElement = document.createElement("button");

    projectElement.textContent = projectName;
    projectElement.value = projectName;

    projectItems.appendChild(projectItem);
    projectItem.appendChild(projectElement);

    projectElement.addEventListener("click", (e) =>
      showProjectTodos(e.target.value),
    );
  }
  projectSection.appendChild(projectItems);
  sidebar.appendChild(projectSection);
};

export { loadProjectsToSidebar, sidebar };
