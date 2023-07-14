const remover = () => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks = tasks.filter((task) => !task.completed);

  // Update index list
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  return tasks;
};

export default remover;