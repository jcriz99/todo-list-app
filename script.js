document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks from localStorage on load
    tasks.forEach(task => {
        addTaskToUI(task.text, task.completed);
    });

    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            taskInput.focus();
        }
    });

    taskInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    });

    // Add a new task
    function addTask(text) {
        tasks.push({ text, completed: false });
        updateLocalStorage();
        addTaskToUI(text, false);
    }

    // Create and append a task item to the UI
    function addTaskToUI(text, completed) {
        const li = document.createElement('li');
        if (completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '×';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Mark task as completed on click
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
            const index = [...taskList.children].indexOf(li);
            tasks[index].completed = !tasks[index].completed;
            updateLocalStorage();
        });

        // Delete task
        deleteBtn.addEventListener('click', () => {
            const index = [...taskList.children].indexOf(li);
            tasks.splice(index, 1);
            updateLocalStorage();
            li.remove();
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
