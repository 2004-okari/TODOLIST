/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
const taskInput = document.querySelector('.list-item');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks in the DOM
function renderTasks() {
  const listStorage = document.querySelector('.list-storage');
  listStorage.innerHTML = '';

  tasks.forEach((task, index) => {
    const toDoList = document.createElement('div');
    toDoList.classList.add('item');
    toDoList.dataset.index = index;
    toDoList.innerHTML = `
      <div class="label">
        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
        <input type="text" name="name" value="${task.description}" readonly class="text-center">
      </div>
      <i class="fa-solid fa-trash-can icon-3 btn-${index}" data-index="${index}"></i>`;

    listStorage.appendChild(toDoList);
  });

  // Attach event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.icon-3');
  removeButtons.forEach((removeButton, index) => {
    removeButton.addEventListener('click', () => removeTask(index));
  });

  // Attach event listeners to text inputs for editing
  const textCenterInputs = document.querySelectorAll('.text-center');
  textCenterInputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const index = event.target.closest('.item').dataset.index;
      tasks[index].description = event.target.value;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    input.addEventListener('click', () => {
      if (input.hasAttribute('readonly')) {
        input.removeAttribute('readonly');
      } else {
        input.setAttribute('readonly', 'true');
      }
    });
  });

  // Checkbox input
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

// Remove task function
function removeTask(index) {
  tasks.splice(index, 1);

  // Update index list
  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index -= 1;
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks(); // Update the DOM

  return tasks;
}

const remover = () => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  tasks.length = 0;
  Array.prototype.push.apply(tasks, incompleteTasks);

  // Update index list
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  return tasks;
};

// Remove all tasks
const removeAllButton = document.querySelector('.clear-all');
removeAllButton.addEventListener('click', () => {
  remover();
  renderTasks(); // Update the DOM
});

// Use info from input to add to list
const addTask = () => {
  if (taskInput.value) {
    const newIndex = tasks.length + 1;
    tasks.push({
      description: taskInput.value,
      completed: false,
      index: newIndex,
    });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';

  renderTasks(); // Update the DOM

  return tasks;
};

export { addTask, removeTask, renderTasks };