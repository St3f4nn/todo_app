# todo_app

TODO application built with vanilla JavaScript using OOP principles. Users can add, complete, and delete tasks. The project demonstrates how to structure code with classes, methods, and DOM manipulation.

🚀 Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Dynamic rendering of task list
- Clean OOP-based architecture

🛠 Technologies Used

- HTML
- CSS
- JavaScript (OOP, ES6 Classes)

📖 Learning Goals

This project was created as a practice exercise to:

- Understand and apply Object-Oriented Programming concepts in JavaScript
- Learn how to connect classes and methods with the DOM
- Practice building a small but structured application

---

## ✅ User Stories

1. As a user, I want to create tasks so I can plan on what I'm gonna do
2. As a user, I want to mark/unmark completed tasks so I can keep track of what have I done
3. As a user, I want to delete tasks
4. As a user, I want to filter all/active/completed tasks so I can see the state of my workflow
5. As a user, I want to be able to toggle light and dark mode
6. As a user, I want to see all my tasks when I leave the app and come back later, so that I can keep using the app over time

---

## ⚙ Detailed Features

### 1. Create Tasks

- Display the todo on **Enter** (skip empty input).
- Show the **task-controls** element when entering first task.
- Update the number of "items left".
- Clear input field after adding a task.

### 2. Mark/Unmark Completed Tasks

- Toggle `"checked"` class on each list item click.
- Update "items left" text accordingly.

### 3. Delete Tasks

- If task is not completed, update "items left".
- Remove the task element.
- If there are no tasks left, hide **task-controls**.
- "Clear Completed" button removes all completed tasks.

### 4. Filter All/Active/Completed Tasks

- **All:** Show all tasks.
- **Active:** Hide completed tasks.
- **Completed:** Hide active tasks.
- Add `active` class to the selected filter button.

### 5. Toggle Light/Dark Mode

- On click of moon/sun icon, toggle the `dark` class on `<html>`.

### 6. Persistence with LocalStorage

- Store tasks and theme in `localStorage`.
- Sync data on every state change (add, toggle, delete, theme).
- On reload, read from `localStorage` and restore app state.
