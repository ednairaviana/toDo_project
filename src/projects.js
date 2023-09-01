import { createProject, storageProject, deleteProject } from "./storage";
import { renderTaskList } from "./tasks";

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
        renderTaskList();
    });

    deleteBtn.addEventListener("click", ()=> {
        card.onclick = function() {
            projectDisplay.style.display = "none";
        }
        deleteProject(card.dataset.idProject);
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
                createProject(inputProject.value);
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
    storageProject.forEach(function(project, index) {
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


export {projectCard, taskList, renderProjectList}