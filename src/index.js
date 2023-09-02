import { displaySection, initSection, setCurrentNav } from "./header";
import { projectCard } from "./projects";
import { taskCard } from "./tasks";
import { initStorage } from "./storage";

initStorage();
initSection();
setCurrentNav();
displaySection();
projectCard();
taskCard();