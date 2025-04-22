import createTodo from "../todo";
import { addProjectToStorage, loadProjectsFromStorage } from "../utils/storage";

const handleAddTask = () => {
  if (document.getElementById("todo-form-modal")) {
    return;
  }

  // Create overlay for background dimming
  const overlay = document.createElement("div");
  overlay.id = "todo-form-overlay";

  // Create the modal container
  const newTaskLayout = document.createElement("div");
  newTaskLayout.id = "todo-form-modal";

  const form = document.createElement("form");
  form.id = "todo-form";
  form.innerHTML = `
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" name="title" placeholder="Do something" required>
    </div>
    
    <div class="form-group">
      <label for="description">Description</label> 
      <textarea name="description" placeholder="Description of your task"></textarea>
    </div>
    
    <div class="form-group">
      <label for="dueDate">Date</label>
      <div class="date-input-container">
        <input type="date" name="dueDate" required>
      </div>
    </div>
    
    <div class="form-group">
      <label for="priority">Priority</label>
      <select name="priority">
        <option value="high">High</option>
        <option value="medium" selected>Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="tag">Tag</label>
      <input type="text" name="tag" placeholder="work, personal, etc.">
    </div>

   <div class="form-group">
      <label for="project">Project</label>
      <select name="project" id ="project">
      </select>
    </div>

    
    <div class="form-actions">
      <button type="button" id="cancel-button" class="cancel-btn">Cancel</button>
      <button type="submit" class="submit-btn">Create Task</button>
    </div>
  `;

  // Append form to modal
  newTaskLayout.appendChild(form);

  // Append modal to overlay
  overlay.appendChild(newTaskLayout);

  // Append overlay to body
  document.body.appendChild(overlay);

  const projectSelection = document.getElementById("project");

  const projects = loadProjectsFromStorage();

  for (var index in projects) {
    const option = document.createElement("option");
    option.innerText = projects[index].name;
    option.value = projects[index].name;
    projectSelection.appendChild(option);
  }

  // Close modal when clicking cancel button
  form.querySelector("#cancel-button").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  // Close modal when clicking outside
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newTodo = createTodo(
      formData.get("title"),
      formData.get("description"),
      formData.get("dueDate"),
      formData.get("priority"),
      formData.get("tag"),
    );

    projects[formData.get("project")].addNewTodo(newTodo);
    addProjectToStorage(projects[formData.get("project")]);
    console.log(projects[formData.get("project")].getTodos());

    document.body.removeChild(overlay);
  });
};

export default handleAddTask;
