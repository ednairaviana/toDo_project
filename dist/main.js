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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU07QUFDbkQsOENBQThDLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsb0RBQWMsQ0FBQywrQ0FBUTtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxrRUFBa0Usb0RBQWM7QUFDaEYsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixvREFBYyxDQUFDLCtDQUFRO0FBQzdDLFVBQVUsK0NBQVE7QUFDbEIsUUFBUSwrQ0FBUSxhQUFhLCtDQUFRO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7VUMzSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05zRTtBQUM3QjtBQUNEO0FBQ0w7QUFDbkM7QUFDQSxxREFBVztBQUNYLG9EQUFXO0FBQ1gsc0RBQWE7QUFDYix1REFBYztBQUNkLHNEQUFXO0FBQ1gsZ0RBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvX2RvX3Byb2plY3QvLi9zcmMvaGVhZGVyLmpzIiwid2VicGFjazovL3RvX2RvX3Byb2plY3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fcHJvamVjdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvX2RvX3Byb2plY3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b19kb19wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b19kb19wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9fZG9fcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvX2RvX3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyUHJvamVjdExpc3QgfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5pbXBvcnQgeyByZW5kZXJUYXNrTGlzdCB9IGZyb20gXCIuL3Rhc2tzXCI7XHJcblxyXG5jb25zdCBuYXZOb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFpbi1uYXYgdWwgbGlcIilcclxuY29uc3QgbmF2RGFzaGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXNoYm9hcmRcIik7XHJcbmNvbnN0IG5hdlRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrc1wiKTtcclxuY29uc3QgbmF2UHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzXCIpO1xyXG5cclxuY29uc3QgZGFzaGJvYXJkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VjdGlvbi1kYXNoYm9hcmRcIilcclxuY29uc3QgdGFza1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlY3Rpb24tdGFza1wiKVxyXG5jb25zdCBwcm9qZWN0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VjdGlvbi1wcm9qZWN0c1wiKVxyXG5cclxuZnVuY3Rpb24gY2xlYW5DdXJyZW50TmF2KCkge1xyXG4gICAgbmF2Tm9kZUxpc3QuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudC1saVwiKTtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjsgXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudE5hdigpIHtcclxuICAgIG5hdk5vZGVMaXN0LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgICAgICBjbGVhbkN1cnJlbnROYXYoKTtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7IFxyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50LWxpXCIpO1xyXG5cclxuICAgICAgICAgICAgY2xlYXJTZWN0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVNlY3Rpb24oKSB7XHJcbiAgICBuYXZEYXNoYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgIGRhc2hib2FyZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIH0pO1xyXG4gICAgbmF2VGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgIHRhc2tTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9KTtcclxuICAgIG5hdlByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICBwcm9qZWN0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHJlbmRlclByb2plY3RMaXN0KCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJTZWN0aW9uKCkge1xyXG4gICAgZGFzaGJvYXJkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB0YXNrU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBwcm9qZWN0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRTZWN0aW9uKCkge1xyXG4gICAgY2xlYXJTZWN0aW9uKCk7XHJcbiAgICBkYXNoYm9hcmRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICBuYXZEYXNoYm9hcmQuY2xhc3NMaXN0LmFkZChcImN1cnJlbnQtbGlcIilcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7c2V0Q3VycmVudE5hdiwgZGlzcGxheVNlY3Rpb24sIGluaXRTZWN0aW9ufTsiLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBzdG9yYWdlUHJvamVjdCwgZGVsZXRlUHJvamVjdCB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgcmVuZGVyVGFza0xpc3QgfSBmcm9tIFwiLi90YXNrc1wiO1xyXG5cclxuY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbGlzdFwiKTtcclxuY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stbGlzdFwiKTtcclxuY29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtZGlzcGxheVwiKTtcclxuXHJcbmNvbnN0IGNyZWF0ZVByb2plY3RDYXJkID0gKHRpdGxlLCBwcm9qZWN0SWQpID0+IHtcclxuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHJcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW1cIiwgXCJfaG92ZXItcHJvamVjdFwiKTtcclxuICAgIGNhcmQuc2V0QXR0cmlidXRlKFwiZGF0YS1pZC1wcm9qZWN0XCIsIHByb2plY3RJZCk7XHJcbiAgICBcclxuICAgIGNhcmQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHByb2plY3RUaXRsZSk7XHJcbiAgICBwcm9qZWN0VGl0bGUuaW5uZXJUZXh0ID0gdGl0bGU7XHJcblxyXG4gICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCIsIFwiZGVsZXRlLWJ0blwiKTtcclxuICAgIGRlbGV0ZUJ0bi5pbm5lclRleHQgPSBcImRlbGV0ZVwiO1xyXG4gICAgY2FyZC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZGVsZXRlQnRuKTtcclxuXHJcbiAgICBwcm9qZWN0TGlzdC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGNhcmQpO1xyXG5cclxuICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgIGRpc3BsYXlUaXRsZVByb2plY3QocHJvamVjdFRpdGxlLmlubmVyVGV4dCk7XHJcbiAgICAgICAgZGlzcGxheVRhc2tEaXYoY2FyZC5kYXRhc2V0LmlkUHJvamVjdCk7XHJcbiAgICAgICAgcmVuZGVyVGFza0xpc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgY2FyZC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHByb2plY3REaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlUHJvamVjdChjYXJkLmRhdGFzZXQuaWRQcm9qZWN0KTtcclxuICAgICAgICByZW5kZXJQcm9qZWN0TGlzdCgpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0Q2FyZCgpIHtcclxuICAgIGNvbnN0IGJ0bkFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi1wcm9qZWN0XCIpO1xyXG4gICAgY29uc3QgZm9ybVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tcHJvamVjdFwiKTtcclxuXHJcbiAgICBidG5BZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICBjbGVhckJ0bkFkZFByb2plY3QoKTtcclxuICAgICAgICBjcmVhdGVGb3JtUHJvamVjdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRm9ybVByb2plY3QoKSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9qZWN0ID0gZm9ybVByb2plY3QucXVlcnlTZWxlY3RvcihcIiNpbnB1dC1wcm9qZWN0XCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbmZpcm1Qcm9qZWN0ID0gZm9ybVByb2plY3QucXVlcnlTZWxlY3RvcihcIiNjb25maXJtLXByb2plY3RcIik7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsUHJvamVjdCA9IGZvcm1Qcm9qZWN0LnF1ZXJ5U2VsZWN0b3IoXCIjY2FuY2VsLXByb2plY3RcIik7XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0LnBsYWNlaG9sZGVyID0gXCJQcm9qZWN0IHRpdGxlXCI7XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0LmZvY3VzKCk7XHJcblxyXG4gICAgICAgIGNvbmZpcm1Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICAgICAgaWYgKGlucHV0UHJvamVjdC52YWx1ZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFByb2plY3QuZm9jdXMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVByb2plY3QoaW5wdXRQcm9qZWN0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJlbmRlclByb2plY3RMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFByb2plY3QudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgc2V0QnRuQWRkUHJvamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhbmNlbFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgICAgICBzZXRCdG5BZGRQcm9qZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0QnRuQWRkUHJvamVjdCgpIHtcclxuICAgICAgICBidG5BZGRQcm9qZWN0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICBmb3JtUHJvamVjdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJCdG5BZGRQcm9qZWN0KCkge1xyXG4gICAgICAgIGJ0bkFkZFByb2plY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGZvcm1Qcm9qZWN0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdExpc3QoKSB7XHJcbiAgICB3aGlsZShwcm9qZWN0TGlzdC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgcHJvamVjdExpc3QucmVtb3ZlQ2hpbGQocHJvamVjdExpc3QuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBzdG9yYWdlUHJvamVjdC5mb3JFYWNoKGZ1bmN0aW9uKHByb2plY3QsIGluZGV4KSB7XHJcbiAgICAgICAgY3JlYXRlUHJvamVjdENhcmQocHJvamVjdC50aXRsZSwgaW5kZXgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlUaXRsZVByb2plY3QodGV4dCkge1xyXG4gICAgcHJvamVjdERpc3BsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIGNvbnN0IHRpdGxlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGUtcHJvamVjdFwiKTtcclxuICAgIHRpdGxlUHJvamVjdC5pbm5lclRleHQgPSB0ZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VGFza0RpdihpZCkge1xyXG4gICAgdGFza0xpc3Quc2V0QXR0cmlidXRlKFwiZGF0YS1kaXNwbGF5LWlkXCIsIGlkKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7cHJvamVjdENhcmQsIHRhc2tMaXN0LCByZW5kZXJQcm9qZWN0TGlzdH0iLCJsZXQgc3RvcmFnZVByb2plY3QgPSBbXTtcclxuXHJcbmNsYXNzIFByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdCA9IFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUb0RvIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBjaGVja2VkLCBwcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdCh0aXRsZSkge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlKTtcclxuICAgIHN0b3JhZ2VQcm9qZWN0LnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInN0b3JhZ2VQcm9qZWN0XCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VQcm9qZWN0KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvZG8odGl0bGUsIGNoZWNrZWQsIHByaW9yaXR5LCBpbmRleCkge1xyXG4gICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb0RvKHRpdGxlLCBjaGVja2VkLCBwcmlvcml0eSk7XHJcbiAgICBzdG9yYWdlUHJvamVjdFtpbmRleF0udG9kb0xpc3QucHVzaChuZXdUb2RvKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RvcmFnZVByb2plY3RcIiwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVByb2plY3QpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpbmRleCkge1xyXG4gICAgc3RvcmFnZVByb2plY3QgPSBzdG9yYWdlUHJvamVjdC5maWx0ZXIoZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50ICE9IHN0b3JhZ2VQcm9qZWN0W2luZGV4XTtcclxuICAgIH0pO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzdG9yYWdlUHJvamVjdFwiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlUHJvamVjdCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVUb2RvKHByb2plY3RJbmRleCwgdG9kb0luZGV4KSB7XHJcbiAgICBsZXQgcHJvamVjdEFycmF5ID0gc3RvcmFnZVByb2plY3RbcHJvamVjdEluZGV4XS50b2RvTGlzdDtcclxuICAgIHN0b3JhZ2VQcm9qZWN0W3Byb2plY3RJbmRleF0udG9kb0xpc3QgPSBwcm9qZWN0QXJyYXkuZmlsdGVyKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudCAhPSBwcm9qZWN0QXJyYXlbdG9kb0luZGV4XTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0U3RvcmFnZSgpIHtcclxuICAgIGxldCBhcnJheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzdG9yYWdlUHJvamVjdFwiKSk7XHJcblxyXG4gICAgYXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBzdG9yYWdlUHJvamVjdC5wdXNoKGVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RvcmFnZVByb2plY3RcIiwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVByb2plY3QpKTtcclxuLy8gc3RvcmFnZVByb2plY3QucHVzaChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3RvcmFnZVByb2plY3RcIikpKTtcclxuXHJcbmV4cG9ydCB7Y3JlYXRlUHJvamVjdCwgZGVsZXRlUHJvamVjdCwgc3RvcmFnZVByb2plY3QsIGNyZWF0ZVRvZG8sIGRlbGV0ZVRvZG8sIGluaXRTdG9yYWdlfSIsImltcG9ydCB7IHN0b3JhZ2VQcm9qZWN0LCBjcmVhdGVUb2RvIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyB0YXNrTGlzdCB9IGZyb20gXCIuL3Byb2plY3RzXCI7XHJcblxyXG5mdW5jdGlvbiB0YXNrQ2FyZCgpIHtcclxuICAgIGNvbnN0IGJ0bkFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi10YXNrXCIpO1xyXG4gICAgY29uc3QgZm9ybVRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tdGFza1wiKTtcclxuXHJcbiAgICBidG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICBjbGVhckJ0bkFkZFRhc2soKTtcclxuICAgICAgICBjcmVhdGVUYXNrRm9ybSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFza0Zvcm0oKSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC10YXNrXCIpO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdC10YXNrXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbmZpcm1UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtLXRhc2tcIik7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FuY2VsLXRhc2tcIik7XHJcbiAgICAgICAgaW5wdXRUYXNrLnBsYWNlaG9sZGVyID0gXCJOZXcgVGFza1wiO1xyXG4gICAgICAgIGlucHV0VGFzay5mb2N1cygpO1xyXG5cclxuICAgICAgICBjb25maXJtVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGlucHV0VGFzay52YWx1ZSA9PSBcIlwiIHx8IHNlbGVjdFRhc2sudmFsdWUgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRUYXNrLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2RvKGlucHV0VGFzay52YWx1ZSwgZmFsc2UsIHNlbGVjdFRhc2sudmFsdWUsIHRhc2tMaXN0LmRhdGFzZXQuZGlzcGxheUlkKTtcclxuICAgICAgICAgICAgICAgIGlucHV0VGFzay52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RUYXNrLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHJlbmRlclRhc2tMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBzZXRCdG5BZGRUYXNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2FuY2VsVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgICAgIHNldEJ0bkFkZFRhc2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRCdG5BZGRUYXNrKCkge1xyXG4gICAgICAgIGJ0bkFkZFRhc2suc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIGZvcm1UYXNrLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhckJ0bkFkZFRhc2soKSB7XHJcbiAgICAgICAgYnRuQWRkVGFzay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZm9ybVRhc2suc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUYXNrQ2FyZCh0ZXh0LCBjaGVja2VkLCBwcmlvcml0eSwgdGFza0lkKSB7XHJcbiAgICBsZXQgY2FyZENoZWNrZWQgPSBjaGVja2VkO1xyXG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHJcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW1cIik7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3hcIik7XHJcblxyXG4gICAgY2FyZC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGl0bGUpO1xyXG4gICAgY2FyZC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgY2hlY2tib3gpO1xyXG5cclxuICAgIHRpdGxlLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICBjYXJkLnNldEF0dHJpYnV0ZShcImRhdGEtaWQtdGFza1wiLCB0YXNrSWQpO1xyXG5cclxuICAgIHNldEZsYWdDb2xvcigpO1xyXG4gICAgc2V0Q2hlY2tDaGVja2JveCgpO1xyXG4gICAgdGFza0xpc3QuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBjYXJkKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRGbGFnQ29sb3IoKSB7XHJcbiAgICAgICAgaWYocHJpb3JpdHkgPT0gXCJoaWdoXCIpIHtcclxuICAgICAgICAgICAgc2V0Q29sb3IoXCJ2YXIoLS1oaWdoLXByaW9yLWNvbG9yKVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHByaW9yaXR5ID09IFwibWVkaXVtXCIpIHtcclxuICAgICAgICAgICAgc2V0Q29sb3IoXCJ2YXIoLS1tZWRpdW0tcHJpb3ItY29sb3IpXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldENvbG9yKFwidmFyKC0tbG93LXByaW9yLWNvbG9yKVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldENvbG9yKGNvbG9yKSB7XHJcbiAgICAgICAgICAgIGNhcmQuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke2NvbG9yfWA7XHJcbiAgICAgICAgICAgIGNhcmQuc3R5bGUuYm94U2hhZG93ID0gYC0xMHB4IDAgJHtjb2xvcn1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRDaGVja0NoZWNrYm94KCkge1xyXG4gICAgICAgIGNvbnN0IHRhc2tPYmplY3QgPSBzdG9yYWdlUHJvamVjdFt0YXNrTGlzdC5kYXRhc2V0LmRpc3BsYXlJZF0udG9kb0xpc3RbY2FyZC5kYXRhc2V0LmlkVGFza107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNhcmRDaGVja2VkID09IHRydWUpIHtcclxuICAgICAgICAgICAgY2hlY2tDaGVja2JveCgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdW5jaGVja0NoZWNrYm94KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkQ2hlY2tlZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tDaGVja2JveCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdW5jaGVja0NoZWNrYm94KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzdG9yYWdlUHJvamVjdFwiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlUHJvamVjdCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1bmNoZWNrQ2hlY2tib3goKSB7XHJcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRhc2tPYmplY3QuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FyZENoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tDaGVja2JveCgpIHtcclxuICAgICAgICAgICAgY2hlY2tib3guaW5uZXJUZXh0ID0gXCLinJRcIjtcclxuICAgICAgICAgICAgdGFza09iamVjdC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhcmRDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclRhc2tMaXN0KCkge1xyXG4gICAgY29uc3QgdGFza0FycmF5ID0gc3RvcmFnZVByb2plY3RbdGFza0xpc3QuZGF0YXNldC5kaXNwbGF5SWRdLnRvZG9MaXN0O1xyXG4gICAgd2hpbGUodGFza0xpc3QuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIHRhc2tMaXN0LnJlbW92ZUNoaWxkKHRhc2tMaXN0LmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgdGFza0FycmF5LmZvckVhY2goKGVsZW1lbnQsIGlkKSA9PiB7XHJcbiAgICAgICAgY3JlYXRlVGFza0NhcmQoZWxlbWVudC50aXRsZSwgZWxlbWVudC5jaGVja2VkLCBlbGVtZW50LnByaW9yaXR5LCBpZCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQge3Rhc2tDYXJkLCByZW5kZXJUYXNrTGlzdH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRpc3BsYXlTZWN0aW9uLCBpbml0U2VjdGlvbiwgc2V0Q3VycmVudE5hdiB9IGZyb20gXCIuL2hlYWRlclwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0Q2FyZCB9IGZyb20gXCIuL3Byb2plY3RzXCI7XHJcbmltcG9ydCB7IGluaXRTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyB0YXNrQ2FyZCB9IGZyb20gXCIuL3Rhc2tzXCI7XHJcblxyXG5pbml0U3RvcmFnZSgpO1xyXG5pbml0U2VjdGlvbigpO1xyXG5zZXRDdXJyZW50TmF2KCk7XHJcbmRpc3BsYXlTZWN0aW9uKCk7XHJcbnByb2plY3RDYXJkKCk7XHJcbnRhc2tDYXJkKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9