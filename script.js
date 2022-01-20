//Model
const state = {
  todos: [],
};

//Controller
function updateState(todo) {
  const newTodo = {
    id: new Date().valueOf(),
    title: todo,
    checked: false,
  };
  state.todos.push(newTodo);
}

function handleDelete(id) {
  state.todos = state.todos.filter(function (todo) {
    return todo.id != id;
  });
  updateView();
}

function handleCheck(id) {
  state.todos.forEach(function (todo) {
    if (todo.id === id) todo.checked = 'true';
  });
  console.log(state.todos);
}

function createNewLi(newTodo) {
  const newLi = document.createElement('li');
  const newCheckbox = document.createElement('input');
  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('id', newTodo.id);
  newCheckbox.setAttribute('value', newTodo.title);
  console.log("newTodo.checked", newTodo.checked);
  newLi.appendChild(newCheckbox);
  newCheckbox.addEventListener('click', function () {
    handleCheck(newTodo.id);
    setTimeout(updateView, 100);
  });
  const newLabel = document.createElement('label');
  newLabel.setAttribute('for', newTodo.id);
  newLabel.innerText = newTodo.title;
  if (newTodo.checked === "true") {
    console.log("true");
    newLabel.setAttribute('style', 'text-decoration:line-through');
  }
  newLi.appendChild(newLabel);
  const newDeletButton = document.createElement('button');
  newDeletButton.innerText = 'Delete';
  newDeletButton.addEventListener('click', () => {
    handleDelete(newTodo.id);
  });
  newLi.appendChild(newDeletButton);
  return newLi;
}

function updateView() {
  const listContainer = document.querySelector('.list-container');
  listContainer.innerHTML = '';
  state.todos.forEach(function (todo) {
    const newLi = createNewLi(todo);
    listContainer.appendChild(newLi);
  });
}

function handleClear() {
  const listContainer = document.querySelector('.list_container');
  state.todos = [];
  updateView();
}

//View
const addButton = document.querySelector('.button');
addButton.addEventListener('click', function () {
  const todo = document.querySelector('.text-input').value;
  document.querySelector('.text-input').value = '';
  updateState(todo);
  updateView();
});

const clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click', function () {
  handleClear();
});
