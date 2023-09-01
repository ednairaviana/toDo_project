import { displaySection, initSection, setCurrentNav } from "./header";
import { projectCard } from "./projects";
import { initStorage } from "./storage";
import { taskCard } from "./tasks";

initStorage();
initSection();
setCurrentNav();
displaySection();
projectCard();
taskCard();