import { storageProject, createTodo } from "./storage";
import { taskList } from "./projects";

function taskCard() {
    const btnAddTask = document.querySelector("#btn-task");
    const formTask = document.querySelector("#form-task");

    btnAddTask.addEventListener("click", ()=> {
        clearBtnAddTask();
        createTaskForm();
    });

    function createTaskForm() {
        const inputTask = document.querySelector("#input-task");
        const selectTask = document.querySelector("#select-task");
        const confirmTask = document.querySelector("#confirm-task");
        const cancelTask = document.querySelector("#cancel-task");
        inputTask.placeholder = "New Task";
        inputTask.focus();

        confirmTask.addEventListener("click", ()=> {
            if(inputTask.value == "" || selectTask.value == "") {
                inputTask.focus();
            } else {
                createTodo(inputTask.value, false, selectTask.value, taskList.dataset.displayId);
                inputTask.value = "";
                selectTask.value = "";
                renderTaskList();
                setBtnAddTask();
            }
        });

        cancelTask.addEventListener("click", ()=> {
            setBtnAddTask();
        });
    }

    function setBtnAddTask() {
        btnAddTask.style.display = "flex";
        formTask.style.display = "none";
    }

    function clearBtnAddTask() {
        btnAddTask.style.display = "none";
        formTask.style.display = "flex";
    }
}

function createTaskCard(text, checked, priority, taskId) {
    let cardChecked = checked;
    const card = document.createElement("div");
    const title = document.createElement("p");
    const checkbox = document.createElement("span");

    card.classList.add("grid-item");
    checkbox.classList.add("checkbox");

    card.insertAdjacentElement("beforeend", title);
    card.insertAdjacentElement("beforeend", checkbox);

    title.innerText = text;
    card.setAttribute("data-id-task", taskId);

    setFlagColor();
    setCheckCheckbox();
    taskList.insertAdjacentElement("afterbegin", card);

    function setFlagColor() {
        if(priority == "high") {
            setColor("var(--high-prior-color)");
        } else if (priority == "medium") {
            setColor("var(--medium-prior-color)");
        } else {
            setColor("var(--low-prior-color)");
        }

        function setColor(color) {
            card.style.border = `2px solid ${color}`;
            card.style.boxShadow = `-10px 0 ${color}`;
        }
    }

    function setCheckCheckbox() {
        const taskObject = storageProject[taskList.dataset.displayId].todoList[card.dataset.idTask];
        
        if (cardChecked == true) {
            checkCheckbox()
        } else {
            uncheckCheckbox();
        }

        checkbox.addEventListener("click", ()=> {
            if (cardChecked == false) {
                checkCheckbox();
            } else {
                uncheckCheckbox();
            }
            localStorage.setItem("storageProject", JSON.stringify(storageProject));
        });

        function uncheckCheckbox() {
            checkbox.innerText = "";
            taskObject.checked = false;
            return cardChecked = false;
        }
        function checkCheckbox() {
            checkbox.innerText = "✔";
            taskObject.checked = true;
            return cardChecked = true;
        }
    }
}

function renderTaskList() {
    const taskArray = storageProject[taskList.dataset.displayId].todoList;
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    taskArray.forEach((element, id) => {
        createTaskCard(element.title, element.checked, element.priority, id);
    });
    
}

export {taskCard, renderTaskList}