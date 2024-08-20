let todos = { default: [] };
function createTodo() {
  return this;
}

function createProject(projects) {
  let selection = document.querySelector("#project");
  selection.innerHTML = "";
  projects.forEach((project) => {
    let option = document.createElement("option");
    option.setAttribute("value", project);
    option.innerText = project;
    selection.appendChild(option);
  });
}

function deleteProject(element) {
  projects = projects.filter((project) => {
    project != element;
  });
}

function createProjectList(projects) {
  let projectList = document.querySelector("#projectList");
  projectList.innerHTML = "";
  projects.forEach((project) => {
    let option = document.createElement("li");
    option.innerText = project;
    let button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", deleteProject(project));
    option.appendChild(button);
    projectList.appendChild(option);
  });
}

function populateSelection() {
  projects = Object.keys(todos);
  createProject(projects);
  createProjectList(projects);
}

function createNewTodo(title, description, dueDate, priority) {
  return {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    isCompleted: false,
  };
}
function addTodo(event) {
  let form = event.target;
  console.log(todos[form.project.value]);
  let todo = createNewTodo(
    form.title.value,
    form.description.value,
    form.dueDate.value,
    form.priority.value
  );
  todos[form.project.value].push(todo);
  updateTodoUI();
  return false;
}

function changeCompleteStatus(project, idx) {
  todos[project][idx].isCompleted = !todos[project][idx].isCompleted;
  updateTodoUI();
}

function changeAllUpdateStatus(project) {
  todos[project].forEach((todo) => {
    todo.isCompleted = true;
  });
  updateTodoUI();
}

function deleteTodo(project, idx) {
  document.querySelector("#todo").innerHTML = {};
  let newTodos = [];
  if (todos[project].length == 1) {
    todos[project] = [];
  } else {
    for (let i = 0; i < todos[project].length; i++) {
      const element = todos[project][i];
      if (i != idx) {
        newTodos.push(element);
      }
    }
    todos[project] = newTodos;
  }
  updateTodoUI();
}

function expandTodo(headingText, todo, idx) {
  todoDiv = document.querySelector("#todo");
  todoDiv.innerHTML = "";
  let projectTitle = document.createElement("h1");
  projectTitle.setAttribute("class", `priority-${todo.priority}`);
  projectTitle.innerText = headingText;
  let heading = document.createElement("h2");
  heading.innerText = todo.title;
  let desc = document.createElement("p");
  desc.innerText = todo.description;
  let date = document.createElement("p");
  date.innerText = todo.dueDate;

  let deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", () => deleteTodo(headingText, idx));
  deleteButton.innerText = "Delete Todo";

  let completeButton = document.createElement("button");
  completeButton.addEventListener("click", () =>
    changeCompleteStatus(headingText, idx)
  );
  completeButton.innerText = "Complete Todo";

  todoDiv.appendChild(projectTitle);
  todoDiv.appendChild(heading);
  todoDiv.appendChild(desc);
  todoDiv.appendChild(date);
  todoDiv.appendChild(deleteButton);
  todoDiv.appendChild(completeButton);
}

function updateTodoUI() {
  const todo = document.querySelector("#todo");
  todo.innerHTML = "";
  const todoList = document.querySelector("#todoList");
  todoList.innerHTML = "";
  Object.keys(todos).forEach((i) => {
    let heading = document.createElement("h2");
    heading.innerText = i;
    let list = document.createElement("ol");
    todos[i].forEach((item, idx) => {
      let bullet = document.createElement("li");
      bullet.setAttribute("class", `priority-${item.priority}`);
      if (item.isCompleted) {
        let strike = document.createElement("s");
        strike.innerText = item.title;
        bullet.appendChild(strike);
      } else {
        bullet.innerText = item.title + " " + item.dueDate;
      }
      bullet.addEventListener("click", () => expandTodo(i, todos[i][idx], idx));
      list.appendChild(bullet);
    });
    heading.addEventListener("click", () => changeAllUpdateStatus(i));
    todoList.appendChild(heading);
    todoList.appendChild(list);
  });
}

function addProject(event) {
  todos[event.target.project.value] = [];
  populateSelection();
  return false;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  let loadDate = JSON.parse(localStorage.getItem("todos"));
  if (typeof loadDate != undefined) {
    todos = loadDate;
    updateTodoUI();
  }
}
