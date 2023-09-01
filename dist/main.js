/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displaySection: () => (/* binding */ displaySection),
/* harmony export */   initSection: () => (/* binding */ initSection),
/* harmony export */   setCurrentNav: () => (/* binding */ setCurrentNav)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



const navNodeList = document.querySelectorAll(".main-nav ul li")
const navDashboard = document.querySelector("#dashboard");
const navTasks = document.querySelector("#tasks");
const navProjects = document.querySelector("#projects");

const dashboardSection = document.querySelector("#section-dashboard")
const taskSection = document.querySelector("#section-task")
const projectSection = document.querySelector("#section-projects")

function cleanCurrentNav() {
    navNodeList.forEach(function(element) {
        element.classList.remove("current-li");
        element.style.pointerEvents = "auto"; 
    });
}

function setCurrentNav() {
    navNodeList.forEach(function(element) {
        element.addEventListener("click", ()=> {
            cleanCurrentNav();
            element.style.pointerEvents = "none"; 
            element.classList.add("current-li");

            clearSection();
        });
    });
}

function displaySection() {
    navDashboard.addEventListener("click", ()=> {
        dashboardSection.style.display = "block";
    });
    navTasks.addEventListener("click", ()=> {
        taskSection.style.display = "block";
    });
    navProjects.addEventListener("click", ()=> {
        projectSection.style.display = "block";
        (0,_projects__WEBPACK_IMPORTED_MODULE_0__.renderProjectList)();
    });
}

function clearSection() {
    dashboardSection.style.display = "none";
    taskSection.style.display = "none";
    projectSection.style.display = "none";
}

function initSection() {
    clearSection();
    dashboardSection.style.display = "block";
    navDashboard.classList.add("current-li")
}




/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projectCard: () => (/* binding */ projectCard),
/* harmony export */   renderProjectList: () => (/* binding */ renderProjectList),
/* harmony export */   taskList: () => (/* binding */ taskList)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



const projectList = document.querySelector("#project-list");
const taskList = document.querySelector("#task-list");
const projectDisplay = document.querySelector("#project-display");

const createProjectCard = (title, projectId) => {
    const card = document.createElement("div");
    const projectTitle = document.createElement("p");
    const deleteBtn = document.createElement("span");

    card.classList.add("grid-item", "_hover-project");
    card.setAttribute("data-id-project", projectId);
    
    card.insertAdjacentElement("beforeend", projectTitle);
    projectTitle.innerText = title;

    deleteBtn.classList.add("material-symbols-outlined", "delete-btn");
    deleteBtn.innerText = "delete";
    card.insertAdjacentElement("beforeend", deleteBtn);

    projectList.insertAdjacentElement("afterbegin", card);

    card.addEventListener("click", ()=> {
        displayTitleProject(projectTitle.innerText);
        displayTaskDiv(card.dataset.idProject);
        (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.renderTaskList)();
    });

    deleteBtn.addEventListener("click", ()=> {
        card.onclick = function() {
            projectDisplay.style.display = "none";
        }
        ;(0,_storage__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(card.dataset.idProject);
        renderProjectList();
    });
};

function projectCard() {
    const btnAddProject = document.querySelector("#btn-project");
    const formProject = document.querySelector("#form-project");

    btnAddProject.addEventListener("click", ()=> {
        clearBtnAddProject();
        createFormProject();
    });

    function createFormProject() {
        const inputProject = formProject.querySelector("#input-project");
        const confirmProject = formProject.querySelector("#confirm-project");
        const cancelProject = formProject.querySelector("#cancel-project");
        inputProject.placeholder = "Project title";
        inputProject.focus();

        confirmProject.addEventListener("click", ()=> {
            if (inputProject.value == "") {
                inputProject.focus();
            } else {
                (0,_storage__WEBPACK_IMPORTED_MODULE_0__.createProject)(inputProject.value);
                renderProjectList();
                inputProject.value = "";
                setBtnAddProject();
            }
        });

        cancelProject.addEventListener("click", ()=> {
            setBtnAddProject();
        });
    }

    function setBtnAddProject() {
        btnAddProject.style.display = "flex";
        formProject.style.display = "none";
    }

    function clearBtnAddProject() {
        btnAddProject.style.display = "none";
        formProject.style.display = "flex";
    }
}

function renderProjectList() {
    while(projectList.firstChild) {
        projectList.removeChild(projectList.firstChild);
    }
    _storage__WEBPACK_IMPORTED_MODULE_0__.storageProject.forEach(function(project, index) {
        createProjectCard(project.title, index);
    });
}

function displayTitleProject(text) {
    projectDisplay.style.display = "block";
    const titleProject = document.querySelector("#title-project");
    titleProject.innerText = text;
}

function displayTaskDiv(id) {
    taskList.setAttribute("data-display-id", id);
}




/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProject: () => (/* binding */ createProject),
/* harmony export */   createTodo: () => (/* binding */ createTodo),
/* harmony export */   deleteProject: () => (/* binding */ deleteProject),
/* harmony export */   deleteTodo: () => (/* binding */ deleteTodo),
/* harmony export */   initStorage: () => (/* binding */ initStorage),
/* harmony export */   storageProject: () => (/* binding */ storageProject)
/* harmony export */ });
let storageProject = [];

class Project {
    constructor(title) {
        this.title = title;
        this.todoList = [];
    }
}

class ToDo {
    constructor(title, checked, priority) {
        this.title = title;
        this.checked = checked;
        this.priority = priority;
    }
}

function createProject(title) {
    const newProject = new Project(title);
    storageProject.push(newProject);
    localStorage.setItem("storageProject", JSON.stringify(storageProject));
}

function createTodo(title, checked, priority, index) {
    const newTodo = new ToDo(title, checked, priority);
    storageProject[index].todoList.push(newTodo);
    localStorage.setItem("storageProject", JSON.stringify(storageProject));
}

function deleteProject(index) {
    storageProject = storageProject.filter(function(element) {
        return element != storageProject[index];
    });
    localStorage.setItem("storageProject", JSON.stringify(storageProject));
}

function deleteTodo(projectIndex, todoIndex) {
    let projectArray = storageProject[projectIndex].todoList;
    storageProject[projectIndex].todoList = projectArray.filter(function(element) {
        return element != projectArray[todoIndex];
    });
}

function initStorage() {
    let array = JSON.parse(localStorage.getItem("storageProject"));

    array.forEach(element => {
        storageProject.push(element);
    });
}

createProject("Project 1")

// localStorage.setItem("storageProject", JSON.stringify(storageProject));
// storageProject.push(JSON.parse(localStorage.getItem("storageProject")));



/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderTaskList: () => (/* binding */ renderTaskList),
/* harmony export */   taskCard: () => (/* binding */ taskCard)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");



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
                (0,_storage__WEBPACK_IMPORTED_MODULE_0__.createTodo)(inputTask.value, false, selectTask.value, _projects__WEBPACK_IMPORTED_MODULE_1__.taskList.dataset.displayId);
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
    _projects__WEBPACK_IMPORTED_MODULE_1__.taskList.insertAdjacentElement("afterbegin", card);

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
        const taskObject = _storage__WEBPACK_IMPORTED_MODULE_0__.storageProject[_projects__WEBPACK_IMPORTED_MODULE_1__.taskList.dataset.displayId].todoList[card.dataset.idTask];
        
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
            localStorage.setItem("storageProject", JSON.stringify(_storage__WEBPACK_IMPORTED_MODULE_0__.storageProject));
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
    const taskArray = _storage__WEBPACK_IMPORTED_MODULE_0__.storageProject[_projects__WEBPACK_IMPORTED_MODULE_1__.taskList.dataset.displayId].todoList;
    while(_projects__WEBPACK_IMPORTED_MODULE_1__.taskList.firstChild) {
        _projects__WEBPACK_IMPORTED_MODULE_1__.taskList.removeChild(_projects__WEBPACK_IMPORTED_MODULE_1__.taskList.firstChild);
    }
    taskArray.forEach((element, id) => {
        createTaskCard(element.title, element.checked, element.priority, id);
    });
    
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");





(0,_storage__WEBPACK_IMPORTED_MODULE_2__.initStorage)();
(0,_header__WEBPACK_IMPORTED_MODULE_0__.initSection)();
(0,_header__WEBPACK_IMPORTED_MODULE_0__.setCurrentNav)();
(0,_header__WEBPACK_IMPORTED_MODULE_0__.displaySection)();
(0,_projects__WEBPACK_IMPORTED_MODULE_1__.projectCard)();
(0,_tasks__WEBPACK_IMPORTED_MODULE_3__.taskCard)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0M7QUFDTjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsNERBQWlCO0FBQ3pCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RHlFO0FBQ2hDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBYztBQUN0QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0RBQWE7QUFDckI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsZ0JBQWdCLHVEQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvREFBYztBQUNsQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkR1RDtBQUNqQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxnQkFBZ0Isb0RBQVUsMkNBQTJDLCtDQUFRO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksK0NBQVE7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxNQUFNO0FBQ25ELDhDQUE4QyxNQUFNO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG9EQUFjLENBQUMsK0NBQVE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0Esa0VBQWtFLG9EQUFjO0FBQ2hGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0RBQWMsQ0FBQywrQ0FBUTtBQUM3QyxVQUFVLCtDQUFRO0FBQ2xCLFFBQVEsK0NBQVEsYUFBYSwrQ0FBUTtBQUNyQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7O1VDM0hBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOc0U7QUFDN0I7QUFDRDtBQUNMO0FBQ25DO0FBQ0EscURBQVc7QUFDWCxvREFBVztBQUNYLHNEQUFhO0FBQ2IsdURBQWM7QUFDZCxzREFBVztBQUNYLGdEQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b19kb19wcm9qZWN0Ly4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90b19kb19wcm9qZWN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvX2RvX3Byb2plY3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b19kb19wcm9qZWN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvX2RvX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9fZG9fcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9fZG9fcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvX2RvX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b19kb19wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlclByb2plY3RMaXN0IH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuaW1wb3J0IHsgcmVuZGVyVGFza0xpc3QgfSBmcm9tIFwiLi90YXNrc1wiO1xyXG5cclxuY29uc3QgbmF2Tm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1haW4tbmF2IHVsIGxpXCIpXHJcbmNvbnN0IG5hdkRhc2hib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGFzaGJvYXJkXCIpO1xyXG5jb25zdCBuYXZUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3NcIik7XHJcbmNvbnN0IG5hdlByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcclxuXHJcbmNvbnN0IGRhc2hib2FyZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlY3Rpb24tZGFzaGJvYXJkXCIpXHJcbmNvbnN0IHRhc2tTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWN0aW9uLXRhc2tcIilcclxuY29uc3QgcHJvamVjdFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlY3Rpb24tcHJvamVjdHNcIilcclxuXHJcbmZ1bmN0aW9uIGNsZWFuQ3VycmVudE5hdigpIHtcclxuICAgIG5hdk5vZGVMaXN0LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnQtbGlcIik7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7IFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEN1cnJlbnROYXYoKSB7XHJcbiAgICBuYXZOb2RlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICAgICAgY2xlYW5DdXJyZW50TmF2KCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiOyBcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudC1saVwiKTtcclxuXHJcbiAgICAgICAgICAgIGNsZWFyU2VjdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlTZWN0aW9uKCkge1xyXG4gICAgbmF2RGFzaGJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICBkYXNoYm9hcmRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9KTtcclxuICAgIG5hdlRhc2tzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICB0YXNrU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfSk7XHJcbiAgICBuYXZQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgcHJvamVjdFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICByZW5kZXJQcm9qZWN0TGlzdCgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyU2VjdGlvbigpIHtcclxuICAgIGRhc2hib2FyZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgdGFza1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgcHJvamVjdFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0U2VjdGlvbigpIHtcclxuICAgIGNsZWFyU2VjdGlvbigpO1xyXG4gICAgZGFzaGJvYXJkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgbmF2RGFzaGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50LWxpXCIpXHJcbn1cclxuXHJcblxyXG5leHBvcnQge3NldEN1cnJlbnROYXYsIGRpc3BsYXlTZWN0aW9uLCBpbml0U2VjdGlvbn07IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgc3RvcmFnZVByb2plY3QsIGRlbGV0ZVByb2plY3QgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IHJlbmRlclRhc2tMaXN0IH0gZnJvbSBcIi4vdGFza3NcIjtcclxuXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWxpc3RcIik7XHJcbmNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWxpc3RcIik7XHJcbmNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWRpc3BsYXlcIik7XHJcblxyXG5jb25zdCBjcmVhdGVQcm9qZWN0Q2FyZCA9ICh0aXRsZSwgcHJvamVjdElkKSA9PiB7XHJcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcblxyXG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIsIFwiX2hvdmVyLXByb2plY3RcIik7XHJcbiAgICBjYXJkLnNldEF0dHJpYnV0ZShcImRhdGEtaWQtcHJvamVjdFwiLCBwcm9qZWN0SWQpO1xyXG4gICAgXHJcbiAgICBjYXJkLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBwcm9qZWN0VGl0bGUpO1xyXG4gICAgcHJvamVjdFRpdGxlLmlubmVyVGV4dCA9IHRpdGxlO1xyXG5cclxuICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiLCBcImRlbGV0ZS1idG5cIik7XHJcbiAgICBkZWxldGVCdG4uaW5uZXJUZXh0ID0gXCJkZWxldGVcIjtcclxuICAgIGNhcmQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGRlbGV0ZUJ0bik7XHJcblxyXG4gICAgcHJvamVjdExpc3QuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBjYXJkKTtcclxuXHJcbiAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICBkaXNwbGF5VGl0bGVQcm9qZWN0KHByb2plY3RUaXRsZS5pbm5lclRleHQpO1xyXG4gICAgICAgIGRpc3BsYXlUYXNrRGl2KGNhcmQuZGF0YXNldC5pZFByb2plY3QpO1xyXG4gICAgICAgIHJlbmRlclRhc2tMaXN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgIGNhcmQub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZVByb2plY3QoY2FyZC5kYXRhc2V0LmlkUHJvamVjdCk7XHJcbiAgICAgICAgcmVuZGVyUHJvamVjdExpc3QoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gcHJvamVjdENhcmQoKSB7XHJcbiAgICBjb25zdCBidG5BZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tcHJvamVjdFwiKTtcclxuICAgIGNvbnN0IGZvcm1Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLXByb2plY3RcIik7XHJcblxyXG4gICAgYnRuQWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgY2xlYXJCdG5BZGRQcm9qZWN0KCk7XHJcbiAgICAgICAgY3JlYXRlRm9ybVByb2plY3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZvcm1Qcm9qZWN0KCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvamVjdCA9IGZvcm1Qcm9qZWN0LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtcHJvamVjdFwiKTtcclxuICAgICAgICBjb25zdCBjb25maXJtUHJvamVjdCA9IGZvcm1Qcm9qZWN0LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybS1wcm9qZWN0XCIpO1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbFByb2plY3QgPSBmb3JtUHJvamVjdC5xdWVyeVNlbGVjdG9yKFwiI2NhbmNlbC1wcm9qZWN0XCIpO1xyXG4gICAgICAgIGlucHV0UHJvamVjdC5wbGFjZWhvbGRlciA9IFwiUHJvamVjdCB0aXRsZVwiO1xyXG4gICAgICAgIGlucHV0UHJvamVjdC5mb2N1cygpO1xyXG5cclxuICAgICAgICBjb25maXJtUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dFByb2plY3QudmFsdWUgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRQcm9qZWN0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcm9qZWN0KGlucHV0UHJvamVjdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRQcm9qZWN0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHNldEJ0bkFkZFByb2plY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYW5jZWxQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICAgICAgc2V0QnRuQWRkUHJvamVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEJ0bkFkZFByb2plY3QoKSB7XHJcbiAgICAgICAgYnRuQWRkUHJvamVjdC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgZm9ybVByb2plY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyQnRuQWRkUHJvamVjdCgpIHtcclxuICAgICAgICBidG5BZGRQcm9qZWN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBmb3JtUHJvamVjdC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclByb2plY3RMaXN0KCkge1xyXG4gICAgd2hpbGUocHJvamVjdExpc3QuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIHByb2plY3RMaXN0LnJlbW92ZUNoaWxkKHByb2plY3RMaXN0LmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgc3RvcmFnZVByb2plY3QuZm9yRWFjaChmdW5jdGlvbihwcm9qZWN0LCBpbmRleCkge1xyXG4gICAgICAgIGNyZWF0ZVByb2plY3RDYXJkKHByb2plY3QudGl0bGUsIGluZGV4KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VGl0bGVQcm9qZWN0KHRleHQpIHtcclxuICAgIHByb2plY3REaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICBjb25zdCB0aXRsZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlLXByb2plY3RcIik7XHJcbiAgICB0aXRsZVByb2plY3QuaW5uZXJUZXh0ID0gdGV4dDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVRhc2tEaXYoaWQpIHtcclxuICAgIHRhc2tMaXN0LnNldEF0dHJpYnV0ZShcImRhdGEtZGlzcGxheS1pZFwiLCBpZCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge3Byb2plY3RDYXJkLCB0YXNrTGlzdCwgcmVuZGVyUHJvamVjdExpc3R9IiwibGV0IHN0b3JhZ2VQcm9qZWN0ID0gW107XHJcblxyXG5jbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMudG9kb0xpc3QgPSBbXTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVG9EbyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgY2hlY2tlZCwgcHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QodGl0bGUpIHtcclxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSk7XHJcbiAgICBzdG9yYWdlUHJvamVjdC5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzdG9yYWdlUHJvamVjdFwiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlUHJvamVjdCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb2RvKHRpdGxlLCBjaGVja2VkLCBwcmlvcml0eSwgaW5kZXgpIHtcclxuICAgIGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9Ebyh0aXRsZSwgY2hlY2tlZCwgcHJpb3JpdHkpO1xyXG4gICAgc3RvcmFnZVByb2plY3RbaW5kZXhdLnRvZG9MaXN0LnB1c2gobmV3VG9kbyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInN0b3JhZ2VQcm9qZWN0XCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VQcm9qZWN0KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaW5kZXgpIHtcclxuICAgIHN0b3JhZ2VQcm9qZWN0ID0gc3RvcmFnZVByb2plY3QuZmlsdGVyKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudCAhPSBzdG9yYWdlUHJvamVjdFtpbmRleF07XHJcbiAgICB9KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RvcmFnZVByb2plY3RcIiwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVByb2plY3QpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVG9kbyhwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkge1xyXG4gICAgbGV0IHByb2plY3RBcnJheSA9IHN0b3JhZ2VQcm9qZWN0W3Byb2plY3RJbmRleF0udG9kb0xpc3Q7XHJcbiAgICBzdG9yYWdlUHJvamVjdFtwcm9qZWN0SW5kZXhdLnRvZG9MaXN0ID0gcHJvamVjdEFycmF5LmZpbHRlcihmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQgIT0gcHJvamVjdEFycmF5W3RvZG9JbmRleF07XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFN0b3JhZ2UoKSB7XHJcbiAgICBsZXQgYXJyYXkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3RvcmFnZVByb2plY3RcIikpO1xyXG5cclxuICAgIGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgc3RvcmFnZVByb2plY3QucHVzaChlbGVtZW50KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jcmVhdGVQcm9qZWN0KFwiUHJvamVjdCAxXCIpXHJcblxyXG4vLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInN0b3JhZ2VQcm9qZWN0XCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VQcm9qZWN0KSk7XHJcbi8vIHN0b3JhZ2VQcm9qZWN0LnB1c2goSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0b3JhZ2VQcm9qZWN0XCIpKSk7XHJcblxyXG5leHBvcnQge2NyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIHN0b3JhZ2VQcm9qZWN0LCBjcmVhdGVUb2RvLCBkZWxldGVUb2RvLCBpbml0U3RvcmFnZX0iLCJpbXBvcnQgeyBzdG9yYWdlUHJvamVjdCwgY3JlYXRlVG9kbyB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgdGFza0xpc3QgfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5cclxuZnVuY3Rpb24gdGFza0NhcmQoKSB7XHJcbiAgICBjb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tdGFza1wiKTtcclxuICAgIGNvbnN0IGZvcm1UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLXRhc2tcIik7XHJcblxyXG4gICAgYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgY2xlYXJCdG5BZGRUYXNrKCk7XHJcbiAgICAgICAgY3JlYXRlVGFza0Zvcm0oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tGb3JtKCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0VGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtdGFza1wiKTtcclxuICAgICAgICBjb25zdCBzZWxlY3RUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWxlY3QtdGFza1wiKTtcclxuICAgICAgICBjb25zdCBjb25maXJtVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybS10YXNrXCIpO1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbmNlbC10YXNrXCIpO1xyXG4gICAgICAgIGlucHV0VGFzay5wbGFjZWhvbGRlciA9IFwiTmV3IFRhc2tcIjtcclxuICAgICAgICBpbnB1dFRhc2suZm9jdXMoKTtcclxuXHJcbiAgICAgICAgY29uZmlybVRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgICAgICBpZihpbnB1dFRhc2sudmFsdWUgPT0gXCJcIiB8fCBzZWxlY3RUYXNrLnZhbHVlID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0VGFzay5mb2N1cygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlVG9kbyhpbnB1dFRhc2sudmFsdWUsIGZhbHNlLCBzZWxlY3RUYXNrLnZhbHVlLCB0YXNrTGlzdC5kYXRhc2V0LmRpc3BsYXlJZCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFRhc2sudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0VGFzay52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJUYXNrTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgc2V0QnRuQWRkVGFzaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhbmNlbFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgICAgICBzZXRCdG5BZGRUYXNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0QnRuQWRkVGFzaygpIHtcclxuICAgICAgICBidG5BZGRUYXNrLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICBmb3JtVGFzay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJCdG5BZGRUYXNrKCkge1xyXG4gICAgICAgIGJ0bkFkZFRhc2suc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGZvcm1UYXNrLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFza0NhcmQodGV4dCwgY2hlY2tlZCwgcHJpb3JpdHksIHRhc2tJZCkge1xyXG4gICAgbGV0IGNhcmRDaGVja2VkID0gY2hlY2tlZDtcclxuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcblxyXG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xyXG5cclxuICAgIGNhcmQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRpdGxlKTtcclxuICAgIGNhcmQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGNoZWNrYm94KTtcclxuXHJcbiAgICB0aXRsZS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgY2FyZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkLXRhc2tcIiwgdGFza0lkKTtcclxuXHJcbiAgICBzZXRGbGFnQ29sb3IoKTtcclxuICAgIHNldENoZWNrQ2hlY2tib3goKTtcclxuICAgIHRhc2tMaXN0Lmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgY2FyZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0RmxhZ0NvbG9yKCkge1xyXG4gICAgICAgIGlmKHByaW9yaXR5ID09IFwiaGlnaFwiKSB7XHJcbiAgICAgICAgICAgIHNldENvbG9yKFwidmFyKC0taGlnaC1wcmlvci1jb2xvcilcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwcmlvcml0eSA9PSBcIm1lZGl1bVwiKSB7XHJcbiAgICAgICAgICAgIHNldENvbG9yKFwidmFyKC0tbWVkaXVtLXByaW9yLWNvbG9yKVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRDb2xvcihcInZhcigtLWxvdy1wcmlvci1jb2xvcilcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRDb2xvcihjb2xvcikge1xyXG4gICAgICAgICAgICBjYXJkLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtjb2xvcn1gO1xyXG4gICAgICAgICAgICBjYXJkLnN0eWxlLmJveFNoYWRvdyA9IGAtMTBweCAwICR7Y29sb3J9YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0Q2hlY2tDaGVja2JveCgpIHtcclxuICAgICAgICBjb25zdCB0YXNrT2JqZWN0ID0gc3RvcmFnZVByb2plY3RbdGFza0xpc3QuZGF0YXNldC5kaXNwbGF5SWRdLnRvZG9MaXN0W2NhcmQuZGF0YXNldC5pZFRhc2tdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjYXJkQ2hlY2tlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNoZWNrQ2hlY2tib3goKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVuY2hlY2tDaGVja2JveCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FyZENoZWNrZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrQ2hlY2tib3goKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVuY2hlY2tDaGVja2JveCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RvcmFnZVByb2plY3RcIiwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVByb2plY3QpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdW5jaGVja0NoZWNrYm94KCkge1xyXG4gICAgICAgICAgICBjaGVja2JveC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0YXNrT2JqZWN0LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhcmRDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQ2hlY2tib3goKSB7XHJcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IFwi4pyUXCI7XHJcbiAgICAgICAgICAgIHRhc2tPYmplY3QuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBjYXJkQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJUYXNrTGlzdCgpIHtcclxuICAgIGNvbnN0IHRhc2tBcnJheSA9IHN0b3JhZ2VQcm9qZWN0W3Rhc2tMaXN0LmRhdGFzZXQuZGlzcGxheUlkXS50b2RvTGlzdDtcclxuICAgIHdoaWxlKHRhc2tMaXN0LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICB0YXNrTGlzdC5yZW1vdmVDaGlsZCh0YXNrTGlzdC5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIHRhc2tBcnJheS5mb3JFYWNoKChlbGVtZW50LCBpZCkgPT4ge1xyXG4gICAgICAgIGNyZWF0ZVRhc2tDYXJkKGVsZW1lbnQudGl0bGUsIGVsZW1lbnQuY2hlY2tlZCwgZWxlbWVudC5wcmlvcml0eSwgaWQpO1xyXG4gICAgfSk7XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IHt0YXNrQ2FyZCwgcmVuZGVyVGFza0xpc3R9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkaXNwbGF5U2VjdGlvbiwgaW5pdFNlY3Rpb24sIHNldEN1cnJlbnROYXYgfSBmcm9tIFwiLi9oZWFkZXJcIjtcclxuaW1wb3J0IHsgcHJvamVjdENhcmQgfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5pbXBvcnQgeyBpbml0U3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgdGFza0NhcmQgfSBmcm9tIFwiLi90YXNrc1wiO1xyXG5cclxuaW5pdFN0b3JhZ2UoKTtcclxuaW5pdFNlY3Rpb24oKTtcclxuc2V0Q3VycmVudE5hdigpO1xyXG5kaXNwbGF5U2VjdGlvbigpO1xyXG5wcm9qZWN0Q2FyZCgpO1xyXG50YXNrQ2FyZCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==