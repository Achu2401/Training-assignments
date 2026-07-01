// ===============================
// main.js - Part 1
// ===============================

import {
    getTasks,
    saveTasks,
    generateId,
    formatDate
} from "./tasks.js";


// -------------------------------
// DOM Elements
// -------------------------------

const taskForm = document.getElementById("task-form");

const taskName = document.getElementById("task-name");

const priority = document.getElementById("priority");

const dueDate = document.getElementById("due-date");

const taskList = document.getElementById("task-list");

const counter = document.getElementById("counter");

const clearAllBtn = document.getElementById("clear-all");

const allBtn = document.getElementById("all-btn");

const pendingBtn = document.getElementById("pending-btn");

const doneBtn = document.getElementById("done-btn");

const sortSelect = document.getElementById("sort-select");

const summaryBody = document.getElementById("summary-body");

const prioritySummary = document.getElementById("priority-summary");


// -------------------------------
// App State
// -------------------------------

let tasks = getTasks();

let currentFilter = "all";


// -------------------------------
// Add Task
// -------------------------------

taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const newTask = {

        id: generateId(),

        title: taskName.value.trim(),

        description: "",

        priority: priority.value,

        dueDate: dueDate.value,

        status: "Pending"

    };

    tasks.push(newTask);

    saveTasks(tasks);

    taskForm.reset();

    renderTasks();

});


// -------------------------------
// Render Tasks
// -------------------------------

function renderTasks() {

    taskList.innerHTML = "";

    let displayTasks = [...tasks];

    // Filter

    if (currentFilter === "pending") {

        displayTasks = displayTasks.filter(
            task => task.status === "Pending"
        );

    }

    if (currentFilter === "done") {

        displayTasks = displayTasks.filter(
            task => task.status === "Completed"
        );

    }

    // Sort

    if (sortSelect.value === "priority") {

        const order = {

            High: 1,
            Medium: 2,
            Low: 3

        };

        displayTasks.sort(
            (a, b) =>
                order[a.priority] -
                order[b.priority]
        );

    }

    if (sortSelect.value === "dueDate") {

        displayTasks.sort(
            (a, b) =>
                new Date(a.dueDate) -
                new Date(b.dueDate)
        );

    }

    // Empty State

    if (displayTasks.length === 0) {

        taskList.innerHTML = `
            <li>No tasks available.</li>
        `;

        updateCounter();

        return;

    }

    // Create List

    displayTasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `

            <strong>${task.title}</strong>

            <br>

            Priority :
            ${task.priority}

            <br>

            Due :
            ${formatDate(task.dueDate)}

            <br>

            Status :
            ${task.status}

            <br><br>

            <button class="toggle-btn">
                ${task.status === "Completed"
                    ? "Undo"
                    : "Complete"}
            </button>

            <button class="delete-btn">
                Delete
            </button>

        `;

        li.querySelector(".toggle-btn")
            .addEventListener(
                "click",
                () => toggleTask(task.id)
            );

        li.querySelector(".delete-btn")
            .addEventListener(
                "click",
                () => deleteTask(task.id)
            );

        taskList.appendChild(li);

    });

    updateCounter();

    updateSummary();

}


// -------------------------------
// Counter
// -------------------------------

function updateCounter() {

    counter.textContent =
        `Showing ${tasks.length} of ${tasks.length} tasks`;

}


// -------------------------------
// Initialize
// -------------------------------

renderTasks();

// ===============================
// main.js - Part 2
// ===============================


// -------------------------------
// Toggle Task Status
// -------------------------------

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.status =
                task.status === "Pending"
                    ? "Completed"
                    : "Pending";

        }

        return task;

    });

    saveTasks(tasks);

    renderTasks();

}


// -------------------------------
// Delete Task
// -------------------------------

function deleteTask(id) {

    const confirmDelete = confirm(
        "Delete this task?"
    );

    if (!confirmDelete) return;

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks(tasks);

    renderTasks();

}


// -------------------------------
// Clear All Tasks
// -------------------------------

clearAllBtn.addEventListener("click", () => {

    const confirmClear = confirm(
        "Are you sure you want to clear all tasks?"
    );

    if (!confirmClear) return;

    tasks = [];

    saveTasks(tasks);

    renderTasks();

});


// -------------------------------
// Filter Buttons
// -------------------------------

allBtn.addEventListener("click", () => {

    currentFilter = "all";

    renderTasks();

});


pendingBtn.addEventListener("click", () => {

    currentFilter = "pending";

    renderTasks();

});


doneBtn.addEventListener("click", () => {

    currentFilter = "done";

    renderTasks();

});


// -------------------------------
// Sort Dropdown
// -------------------------------

sortSelect.addEventListener("change", () => {

    renderTasks();

});


// -------------------------------
// Save After Every Change
// -------------------------------

function updateTasks(updatedTasks) {

    tasks = updatedTasks;

    saveTasks(tasks);

    renderTasks();

}

// ===============================
// main.js - Part 3
// ===============================


// -------------------------------
// Update Summary Tables
// -------------------------------

function updateSummary() {

    // Clear existing rows

    summaryBody.innerHTML = "";

    prioritySummary.innerHTML = "";

    // Populate task summary table

    tasks.forEach(task => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.priority}</td>
            <td>${formatDate(task.dueDate)}</td>
            <td>${task.status}</td>
        `;

        summaryBody.appendChild(row);

    });


    // Count priorities

    const counts = {

        High: 0,
        Medium: 0,
        Low: 0

    };

    tasks.forEach(task => {

        counts[task.priority]++;

    });


    // Display priority summary

    Object.keys(counts).forEach(priority => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${priority}</td>
            <td>${counts[priority]}</td>
        `;

        prioritySummary.appendChild(row);

    });

}


// -------------------------------
// Initial Summary
// -------------------------------

updateSummary();


// ===============================
// End of main.js
// ===============================