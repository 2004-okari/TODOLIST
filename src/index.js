import './style.css';
import { addTask, renderTasks } from './crud.js';

const createTask = document.querySelector('.icon-2');
createTask.addEventListener('click', addTask);

// Load and render tasks on initial page load
renderTasks();