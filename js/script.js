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
     6.2 Sync to localStorage on every state change (add, toggle, delete, filter, theme)
     6.3 On page load, read saved data from localStorage and display

*/

class App {
  constructor() {
    this.toggleThemeBtn = document.querySelector(".toggle-theme");

    this._initEvents();
  }

  _initEvents() {
    this.toggleThemeBtn.addEventListener("click", this.toggleTheme.bind(this));
  }

  toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }
}

const app = new App();
