const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const tasksList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filterInput = document.getElementById('filter');

loadEvents();

function loadEvents() {
    taskForm.addEventListener('submit', addTask);
    document.body.addEventListener('click', deleteTask);
    clearBtn.addEventListener('click', clearTasks);
    filterInput.addEventListener('keyup', filterTasks);
    document.addEventListener('DOMContentLoaded', getData);
}

function getData() {
    let tasks;

    if(localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(task) {
            createTaskLi(task);
        })
    }
}

function createTaskLi(task) {
    // create list item
    const taskLi = document.createElement('li');
    taskLi.className = 'collection-item';
    taskLi.appendChild(document.createTextNode(task));

    const delBtn = document.createElement('a');
    delBtn.href = '#';
    delBtn.className = 'delete-item secondary-content';
    delBtn.innerHTML = '<i class="fa fa-remove"></i>';

    taskLi.appendChild(delBtn);

    tasksList.appendChild(taskLi);
}

function addTask(e) {
    e.preventDefault();

    // get input value (task)
    const task = taskInput.value;

    if(task === '') {
        alert('Enter a task!');
    } else {
        createTaskLi(task);
        saveToStorage(task);
    }

    taskInput.value = '';
}

function deleteTask(e) {    
    const parent = e.target.parentElement;

    if(parent.classList.contains('delete-item')) {
        removeFromStorage(parent.parentElement.textContent);
        parent.parentElement.remove();
    }
}

function clearTasks() {
    // tasksList.innerHTML = '';

    while(tasksList.firstChild) {
        tasksList.firstChild.remove();
    }
    
    clearAllTasksFromStorage();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(element) {
        const item = element.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) !== -1) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

function saveToStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromStorage(task) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(taskItem) {
        if(taskItem === task) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAllTasksFromStorage() {
    localStorage.removeItem('tasks');
}