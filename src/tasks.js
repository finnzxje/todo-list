import calendar from "./img/calendar.png";

const calendarImg = new Image();
calendarImg.src = calendar;

const handleAddTask = () => {
  if (document.getElementById("todo-form-modal")) {
    return;
  }
  const newTaskLayout = document.createElement("div");
  newTaskLayout.id = "todo-form-modal";

  const form = document.createElement("form");

  form.innerHTML = `
    <label for="title"></label>
    <input type="text" name="title" placeholder="Do something">

    <label for="description"></label> 
    <textarea name="description" placeholder="description"></textarea>

    <label for="dueDate">Date</label>
    <input type="date" name="dueDate">

    <label for="priority">Priority</label>
    <select name="priority">
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>

    <label for="tag">Tag</label>
    <input type="text" name"tag">
   `;
  newTaskLayout.appendChild(form);
  document.body.appendChild(newTaskLayout);
};

export default handleAddTask;
