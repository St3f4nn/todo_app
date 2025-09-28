"use strict";

// USER STORIES
/*

1. As a user, I want to create tasks so I can plan on what I'm gonna do
2. As a user, I want to mark/unmark completed tasks so I can keep track of what have I done
3. As a user, I want to delete tasks
4. As a user, I want to filter all/active/completed tasks so I can see the state of my workflow
5. As a user, I want to be able to toggle light and dark mode
6. As a user, I want to see all my tasks when I leave the app and come back later, so that I can keep using the app over time

*/

// FEATURES
/*

1. CREATE TASKS
     1.1 Display the todo on "enter" event (check if there's value to avoid blank list items)
     1.2 Display task-controls element when entering first task
     1.3 Update the number from "items left" text
     1.4 After adding a task, clear the input field

2. MARK/UNMARK COMPLETED TASKS
     2.1 Toggle "checked" class on click on each list item
     2.2 Update the number from "items left" text

3. DELETE TASKS
     3.1 If list item has NOT "checked" class, update the number from "items left" text
     3.2 Remove list item - if there is no list items, remove task-controls element
     3.3 On "Clear Completed" button remove all list items with "checked" class and  if there is no list items, remove task-controls element

4. FILTER ALL/ACTIVE/COMPLETED TASKS
     4.1 On click of the each filter button (All, Active and Completed) display appropriate tasks
          4.1.1 On All, display all list items
          4.1.2 On Active, hide all list items with "checked" class
          4.1.3 On Completed, hide all list items without "checked" class
     4.2 On click of the each filter button (All, Active and Completed) add active button class

5. TOGGLE LIGHT AND DARK MODE
     5.1 On click moon/sun icon toggle the "dark" class on the html tag

6. SEE THE STATE OF THE APPLICATION ON RELOAD
     6.1 Store app data in the browser using localStorage API
     6.2 Sync to localStorage on every state change (add, toggle, delete, theme)
     6.3 On page load, read saved data from localStorage and display

*/

class Task {
  constructor(description, onToggleCompleted, onRemove, onSave) {
    this.description = description;
    this.completed = false;
    this.onToggleCompleted = onToggleCompleted;
    this.onRemove = onRemove;
    this.onSave = onSave;

    this.el = document.createElement("li");
    this.el.className = "task";
    this.el.innerHTML = `
      <button class="checkbox">
        <img src="./assets/images/icon-check.svg" alt="Check icon" class="check-icon" />
      </button>
      <p class="task-description">${description}</p>
      <button class="task-delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
        </svg>
      </button>
    `;

    this._initEvents();
  }

  // Events
  _initEvents() {
    this.el.addEventListener("click", e => {
      if (!e.target.closest(".task-delete-btn")) {
        this._toggleCompleted();
      } else {
        this._remove();
      }
    });
  }

  // Toggle completed task
  _toggleCompleted() {
    this.completed = !this.completed;

    this.el.classList.toggle("checked", this.completed);

    if (this.onToggleCompleted) this.onToggleCompleted(this.completed);

    if (this.onSave) this.onSave();
  }

  // Remove task
  _remove() {
    if (this.onRemove) this.onRemove(this);

    this.el.remove();
  }
}

class App {
  constructor() {
    this.toggleThemeBtn = document.querySelector(".toggle-theme");

    this.createTaskInputField = document.querySelector("#create-todo");

    this.tasks = [];
    this.taskList = document.querySelector(".task-list");

    this.taskControls = document.querySelector(".task-controls");

    this.taskAmount = 0;
    this.taskAmountEl = document.querySelector(".task-amount");

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(t => this._addTask(t.description, t.completed));

    this._initEvents();

    if (localStorage.getItem("theme") === "dark")
      document.documentElement.classList.add("dark");
  }

  // Events
  _initEvents() {
    this.toggleThemeBtn.addEventListener("click", this._toggleTheme.bind(this));

    this.createTaskInputField.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        const value = this.createTaskInputField.value;

        if (!value) {
          alert("INVALID VALUE!");

          return;
        }

        this._addTask(value);
      }
    });

    this.taskControls.addEventListener("click", e => {
      if (e.target.closest(".task-filter-btn")) {
        const clickedBtn = e.target.closest(".task-filter-btn");

        document
          .querySelectorAll(".task-filter-btn")
          .forEach(btn => btn.classList.remove("active"));

        clickedBtn.classList.add("active");

        document
          .querySelectorAll(".task")
          .forEach(t => t.classList.add("hidden"));

        // Display ALL tasks
        clickedBtn.dataset.filter === "all" &&
          document
            .querySelectorAll(".task")
            .forEach(t => t.classList.remove("hidden"));

        // Display ACTIVE tasks
        clickedBtn.dataset.filter === "active" &&
          document
            .querySelectorAll(".task:not(.checked)")
            .forEach(t => t.classList.remove("hidden"));

        // Display COMPLETED tasks
        clickedBtn.dataset.filter === "completed" &&
          document
            .querySelectorAll(".task.checked")
            .forEach(t => t.classList.remove("hidden"));
      }

      if (e.target.closest(".clear-completed-tasks")) {
        // Clear completed tasks
        document.querySelectorAll(".task.checked").forEach(t => t.remove());

        this.tasks = this.tasks.filter(t => !t.completed);

        if (this.tasks.length < 1) this.taskControls.classList.add("hidden");

        this._saveTasks();
      }
    });
  }

  // Toggle dark mode
  _toggleTheme() {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  // Create new task
  _addTask(description, completed = false) {
    const task = new Task(
      description,
      completedNow => {
        this.taskAmount += completedNow ? -1 : 1;

        this.taskAmountEl.textContent = this.taskAmount;
      },
      taskToRemove => {
        this.tasks = this.tasks.filter(t => t !== taskToRemove);

        if (!taskToRemove.completed) {
          this.taskAmount--;
          this.taskAmountEl.textContent = this.taskAmount;
        }

        if (this.tasks.length < 1) this.taskControls.classList.add("hidden");

        this._saveTasks();
      },
      () => this._saveTasks()
    );

    task.completed = completed;

    if (completed) task.el.classList.add("checked");

    this.tasks.push(task);

    // Render task
    this.taskList.appendChild(task.el);

    if (!arguments[1]) this._saveTasks();

    // Clear input field
    this.createTaskInputField.value = "";

    // Render "task-controls" element
    this.taskControls.classList.remove("hidden");

    // Update "... items left" element
    if (!completed) {
      this.taskAmount++;
      this.taskAmountEl.textContent = this.taskAmount;
    }
  }

  _saveTasks() {
    const plainTasks = this.tasks.map(t => ({
      description: t.description,
      completed: t.completed,
    }));

    localStorage.setItem("tasks", JSON.stringify(plainTasks));
  }
}

const app = new App();
