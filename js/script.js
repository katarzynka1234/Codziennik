// Set a day of week
const time = new Date();
const day = time.getDay();
let actualDay;
const actualDaySpan = document.querySelector('span.actual-day');

switch (day) {
    case 0:
        actualDay = "niedziela";
        break;
    case 1:
        actualDay = "poniedziałek";
        break;
    case 2:
        actualDay = "wtorek";
        break;
    case 3:
        actualDay = "środa";
        break;
    case 4:
        actualDay = "czwartek";
        break;
    case 5:
        actualDay = "piątek";
        break;
    case 6:
        actualDay = "sobota";
        break;
}
actualDaySpan.textContent = actualDay;

// Set a time
const clock = () => {
    const time = new Date();
    const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();

    const actualTimeSpan = document.querySelector('span.actual-time');
    actualTimeSpan.textContent = `${hours}:${minutes}:${seconds}`
}
setInterval(clock, 1000);


//  LIST OF TASK

//Element of HTML
const form = document.querySelector('form');
const inputForNewTask = document.querySelector('input.new-task');
const btnNewTask = document.querySelector('button.add-task');
const listTasks = document.querySelector('ul.list-tasks');
const numberTasks = document.querySelector('span.tasks-number');

//Main list of task
const toDoList = []; //list of actual task
numberTasks.textContent = "Wpisz zadania do wykonania."

// Reload of list of actual task
const getActualList = () => {
    listTasks.textContent = "";
    toDoList.forEach((toDoTask, key) => {
        toDoTask.dataset.key = key;
        listTasks.appendChild(toDoTask);
    })
    if (toDoList.length === 0) return numberTasks.textContent = "Brak zadań -  masz wolne! :)"
    numberTasks.textContent = toDoList.length;
}

const removeTask = (e) => {
    const index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1);
    getActualList();
}



//Add task to main list of task
const addTask = (e) => {
    e.preventDefault();
    const task = inputForNewTask.value;
    if (task === "") return;
    const newTask = document.createElement('li');
    newTask.className = "task";
    newTask.innerHTML = task + '<button class="delete">x</button>';
    toDoList.push(newTask);
    inputForNewTask.value = "";
    newTask.querySelector('button.delete').addEventListener('click', removeTask);
    getActualList();

}

form.addEventListener('submit', addTask);