// Fake API: Simulate the database
let fakeDatabase = [];

// Fake Fetch Functions
function getTodos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeDatabase);
        }, 500); // Simulates a delay
    });
}

function addTodo(task) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newTask = { id: Date.now(), text: task, completed: false };
            fakeDatabase.push(newTask);
            resolve(newTask);
        }, 500);
    });
}

function deleteTodo(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            fakeDatabase = fakeDatabase.filter(todo => todo.id !== id);
            resolve(id);
        }, 500);
    });
}

function toggleTodo(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const task = fakeDatabase.find(todo => todo.id === id);
            if (task) {
                task.completed = !task.completed;
                resolve(task);
            }
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const todos = await getTodos();
    displayTodos(todos);
});

function displayTodos(todos) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear old tasks
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
                ${todo.text}
            </span>
            <button onclick="toggleTask(${todo.id})">Toggle</button>
            <button onclick="removeTask(${todo.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}


document.getElementById('addTaskBtn').addEventListener('click', async () => {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (!task) return;
    const newTask = await addTodo(task);
    const todos = await getTodos();
    displayTodos(todos);
    taskInput.value = '';
});

async function removeTask(id) {
    await deleteTodo(id);
    const todos = await getTodos();
    displayTodos(todos);
}

async function toggleTask(id) {
    await toggleTodo(id);
    const todos = await getTodos();
    displayTodos(todos);
}
