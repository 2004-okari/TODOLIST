import './style.css';

const tasks = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'buy the house',
    completed: false,
    index: 2,
  },
];

let i = 0;

const listStorage = document.querySelector('.list-storage');
tasks.forEach((task) => {
  const toDoList = document.createElement('div');
  toDoList.classList.add('item', `item-${i}`);
  toDoList.innerHTML = `
  <div class="label">
    <input type="checkbox" class="checkbox">
    <input type="text" name="name" value="${task.description}" readonly class="text-center">
   </div>
   <i class="fa-solid fa-trash-can icon-3"></i>`;

  listStorage.appendChild(toDoList);
  i += 1;
});