// taskUtils.js
import { renderTasks } from './crud.js';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Checkbox input
export function attachCheckboxEventListeners() {
  const checkBoxes = document.querySelectorAll('.checkbox');
  checkBoxes.forEach((box, index) => {
    box.addEventListener('change', () => {
      if (box.checked) {
        tasks[index].completed = true;
      } else {
        tasks[index].completed = false;
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
}

// Remove all tasks
export function attachRemoveAllEventListener() {
  const removeAllButton = document.querySelector('.clear-all');
  removeAllButton.addEventListener('click', () => {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    tasks.length = 0;
    Array.prototype.push.apply(tasks, incompleteTasks);

    // Update index list
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].index = i + 1;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(); // Update the DOM

    return tasks;
  });
}
