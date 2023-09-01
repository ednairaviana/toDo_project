import { displaySection, initSection, setCurrentNav } from "./header";
import { projectCard } from "./projects";
import { taskCard } from "./tasks";

initSection();
setCurrentNav();
displaySection();
projectCard();
taskCard();