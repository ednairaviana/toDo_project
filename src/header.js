import { renderProjectList } from "./projects";

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
        renderProjectList();
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


export {setCurrentNav, displaySection, initSection};