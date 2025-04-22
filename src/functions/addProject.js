import createProject from "../project";
import { addProjectToStorage } from "../utils/storage";

const handleAddProject = () => {
  const overlay = document.createElement("div");
  overlay.id = "todo-form-overlay";

  // Create the modal container
  const newTaskLayout = document.createElement("div");
  newTaskLayout.id = "todo-form-modal";

  const form = document.createElement("form");
  form.id = "todo-form";
  form.innerHTML = `
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" name="name" placeholder="Home" required>
    </div>
    <div class="form-actions">
      <button type="button" id="cancel-button" class="cancel-btn">Cancel</button>
      <button type="submit" class="submit-btn">Create Project</button>
    </div>
  `;

  // Append form to modal
  newTaskLayout.appendChild(form);

  // Append modal to overlay
  overlay.appendChild(newTaskLayout);

  // Append overlay to body
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const project = createProject(formData.get("name"));
    addProjectToStorage(project);
    document.body.removeChild(overlay);
  });

  form.querySelector("#cancel-button").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
};

export default handleAddProject;
