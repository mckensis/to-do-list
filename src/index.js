import './style.css';
import CreateDOM from './createDOM.js';
import { ReturnActiveList } from './Helpers.js';
import CreateSidebarList from './CreateSidebarList.js';
import CreateTaskList from './CreateTaskList';
import createDefaultLists from './createDefaultLists.js';

//import { format, formatDistance, formatRelative, subDays } from 'date-fns';
//import data from './data.json';

window.addEventListener("load", buildMainPage);

function buildMainPage() {
    
    //The 'lists' variable is an array which holds all lists containing tasks
    const lists = createDefaultLists();

    //Create and populate the DOM with the lists
    CreateDOM();
    PopulateListSidebar(lists);
    
    //Get the active list and populate the task section with the active list's tasks
    const activeList = ReturnActiveList(lists);
    PopulateTaskSection(activeList);
    
    //Testing
    console.log("index.js lists: ");
    console.table(lists); 
    console.log("index.js activeList is: " + activeList.title);
}

function PopulateListSidebar(lists) {
    const listContainer = document.querySelector('.listContainer');

    listContainer.appendChild(CreateSidebarList(lists));
    
    return listContainer;
}

function PopulateTaskSection(list) {
    
    const taskContainer = document.querySelector('.taskContainer');

    taskContainer.appendChild(CreateTaskList(list));

    return taskContainer;
}

//add click event for clicking on a list title
//click event takes list that was clicked on (target), sets the dom element to have the class active, and displays that list's tasks in the right section