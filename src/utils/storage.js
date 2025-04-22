import createProject from "../project";
import createTodo from "../todo";

function loadProjectsFromStorage() {
  if (!localStorage.getItem("projects")) {
    const homeProject = createProject("Home");
    const projectNames = [homeProject.name];
    localStorage.setItem("projects", JSON.stringify(projectNames));
    return homeProject;
  }

  const projectNames = JSON.parse(localStorage.getItem("projects"));
  const projects = [];
  projectNames.forEach((projectName) => {
    let project = createProject(projectName);
    project = loadTodosFromProject(project);
    projects[projectName] = project;
  });

  return projects;
}

function loadTodosFromProject(project) {
  if (!localStorage.getItem(project.name)) {
    return project;
  }

  const todos = JSON.parse(localStorage.getItem(project.name));

  todos.forEach((todoList) => {
    const todo = createTodo(
      todoList.title,
      todoList.description,
      todoList.dueDate,
      todoList.priority,
      todoList.tag,
      todoList.complete,
    );
    project.addNewTodo(todo);
  });

  return project;
}

function addProjectToStorage(project) {
  if (!project) {
    console.log("This shouldn't be happening");
  }

  const projectNames = new Set(JSON.parse(localStorage.getItem("projects")));

  if (projectNames.has(project.name)) {
    localStorage.setItem(project.name, JSON.stringify(project.getTodos()));
    return;
  }
  projectNames.add(project.name);

  localStorage.setItem("projects", JSON.stringify(Array.from(projectNames)));

  localStorage.setItem(project.name, JSON.stringify(project.getTodos()));
}

export { loadProjectsFromStorage, addProjectToStorage };
