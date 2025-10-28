// Select DOM elements
const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

// Load todos from localStorage
let allTodos = getTodos();
updateTodoList();

// Handle form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// Add a new todo
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  allTodos.push({ text, completed: false });
  updateTodoList();
  saveTodos();
  todoInput.value = "";
}

// Render the todo list
function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, index) => {
    todoListUL.append(createTodoItem(todo, index));
  });
}

// Create a single todo item
function createTodoItem(todo, index) {
  const todoId = "todo-" + index;
  const li = document.createElement("li");
  li.className = "todo";

  li.innerHTML = `
    <input type="checkbox" id="${todoId}" />
    <label class="custom-checkbox" for="${todoId}">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </label>
    <label for="${todoId}" class="todo-text">${todo.text}</label>
    <button class="delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
      </svg>
    </button>
  `;

  // Delete todo
  li.querySelector(".delete-button").addEventListener("click", () => deleteTodoItem(index));

  // Toggle completed state
  const checkbox = li.querySelector("input");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    allTodos[index].completed = checkbox.checked;
    saveTodos();
  });

  return li;
}

// Delete todo by index
function deleteTodoItem(index) {
  allTodos = allTodos.filter((_, i) => i !== index);
  saveTodos();
  updateTodoList();
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

// Load todos from localStorage
function getTodos() {
  return JSON.parse(localStorage.getItem("todos") || "[]");
}
