import createTodo from "./todo";
import createProject from "./project";
import sidebar from "./sidebar";
import "./style/style.css";
import "./style/form.css";

// Load from localStorage later -- Maybe implement Project Manager later to manage projects
const homeProject = createProject("Home");

sidebar();
