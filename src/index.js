import './style.css';

const taskInput = document.querySelector('.list-item');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

  return tasks;
};

const createTask = document.querySelector('.icon-2');
createTask.addEventListener('click', addTask);

// Displaying book
let i = 0;

const listStorage = document.querySelector('.list-storage');

// eslint-disable-next-line array-callback-return
tasks.map((task, index) => {
  const toDoList = document.createElement('div');
  toDoList.classList.add('item', `item-${i}`);
  toDoList.innerHTML = `
    <div class="label">
      <input type="checkbox" class="checkbox">
      <input type="text" name="name" value="${task.description}" readonly class="text-center">
    </div>
    <i class="fa-solid fa-trash-can icon-3 btn-${i}" data-index="${index}"></i>`;

  listStorage.appendChild(toDoList);
  i += 1;
}).join('');

// Update index list
const decreaseIndexValue = (startIndex, tasks) => {
  for (let i = startIndex; i < tasks.length; i += 1) {
    tasks[i].index -= 1;
  }
};

// Remove task function
function removeTask(index) {
  tasks.splice(index, 1);
  decreaseIndexValue(index, tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}

// Attach event listener to remove buttons
const removeButtons = document.querySelectorAll('.icon-3');
removeButtons.forEach((removeButton) => {
  const { index } = removeButton.dataset;
  removeButton.addEventListener('click', () => removeTask(index));
});

// Editing task
const textCenterInputs = document.querySelectorAll('.text-center');

textCenterInputs.forEach((input) => {
  input.addEventListener('click', () => {
    if (input.hasAttribute('readonly')) {
      input.removeAttribute('readonly');
    } else {
      input.setAttribute('readonly', 'true');
    }
  });
});
