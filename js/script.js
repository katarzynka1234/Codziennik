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


// NOTES BOARD
(function () {


    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPoinxY,
        grabPointX,
        createNote,
        addNoteButtonEl;

    onDragStart = function (e) {
        var boundingClientRect;
        if (e.target.className.indexOf('bar') === -1) {
            return;
        }

        draggedEl = this;

        boundingClientRect = draggedEl.getBoundingClientRect();

        grabPoinxY = boundingClientRect.top - e.clientY;
        grabPointX = boundingClientRect.left - e.clientX;
    };

    onDrag = function (e) {
        if (!draggedEl) {
            return;
        }

        var posX = e.clientX + grabPointX;
        var posY = e.clientY + grabPoinxY;

        if (posX < 0) {
            posX = 0;
        }
        if (posY < 0) {
            posY = 0;
        }

        draggedEl.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    }

    onDragEnd = function () {
        draggedEl = null;
        grabPointX = null;
        grabPoinxY = null;
    };

    createNote = function () {
        var stickerEl = document.createElement('div'),
            barEl = document.createElement('div'),
            texareaEl = document.createElement('textarea'),
            deleteBtnElem = document.createElement('button'),
            onDelete;


        var transformCSSValue = `translateX(${Math.random() * 400}px) translateY(${Math.random() * 400}px)`;

        stickerEl.style.transform = transformCSSValue;
        stickerEl.classList.add('sticker');
        barEl.classList.add('bar');
        deleteBtnElem.classList.add('delete-note-btn');
        deleteBtnElem.textContent = "X";

        barEl.appendChild(deleteBtnElem);
        stickerEl.appendChild(barEl);
        stickerEl.appendChild(texareaEl);

        onDelete = function () {
            document.body.removeChild(stickerEl);
        }

        deleteBtnElem.addEventListener('click', onDelete, false);
        stickerEl.addEventListener('mousedown', onDragStart, false);


        document.body.appendChild(stickerEl);
    }



    addNoteButtonEl = document.querySelector('.add-note-button');
    addNoteButtonEl.addEventListener('click', createNote, false);
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);


})();