//Selectors
let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click', addToDo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('input', filterToDo)

//Functions
function addToDo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //ToDo DIV
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //LI
    let newToDo = document.createElement("li");
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);
    //add task to local disk
    saveLocalTodos(todoInput.value);
    //Check mark
    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    let trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appendtolist
    todoList.appendChild(todoDiv);

    //Clear ToDo input reset
    todoInput.value = '';
}

function deleteCheck(e) {
    let item = e.target;
    //delete todo
    if (item.classList[0] === 'trash-btn') {
        let todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove(); //Now it waits for the transition end
        });
    }

    //check mark
    if (item.classList[0] === 'complete-btn') {
        let todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterToDo(e) {
    let todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex'; //show all
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //ToDo DIV
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //LI
    let newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);

    //Check mark
    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    let trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appendtolist
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //get index of item, then splice the list. use stringify to remove it
    let todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
