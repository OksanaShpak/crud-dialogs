const openAddBtn = document.querySelector('.open-add');
const addNewTaskDialog = document.querySelector('.add-new-task');
const [addForm] = document.forms;
const taskList = document.querySelector('ul');

getTasks().then(showTasks);

openAddBtn.addEventListener('click', handleOpenAdd);
addForm.addEventListener('submit', handleSubmit);

function handleOpenAdd() {
  addNewTaskDialog.showModal();
}

async function handleSubmit(event) {
  const newTask = addForm.task.value;
  if (newTask) {
    const tasks = await addTask(newTask);
    addForm.task.value = '';
    showTasks(tasks);
  }
  event.preventDefault();
  addNewTaskDialog.classList.add('fade-out');
  addNewTaskDialog.addEventListener('animationend', () => {
    addNewTaskDialog.close();
    addNewTaskDialog.classList.remove('fade-out');
  }, { once: true });

};

function showTasks(tasks) {
  taskList.innerHTML = tasks.map(task => `<li data-id="${task.id}">${task.text}</li>`).join('');
}

function getTasks() {
  return fetch('/api/tasks')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching tasks:', error);
      return [];
    });
}

function addTask(text) {
  return fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error adding task:', error);
      return [];
    });
}