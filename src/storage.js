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

export {createProject, deleteProject, storageProject, createTodo, deleteTodo, initStorage}