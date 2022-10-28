import './style.css';
import CreateDOM from './createDOM.js';
import createDefaultLists from './createDefaultLists.js';
import AddNewList from './AddNewList.js';
import AddNewTask from './AddNewTask.js';
import PopulateListSidebar from './PopulateListSidebar.js';
import PopulateTaskSection from './PopulateTaskSection.js';
import { ReturnActiveList, SetupDefaultList } from './Helpers';

//import { format, formatDistance, formatRelative, subDays } from 'date-fns';
//import data from './data.json';
window.addEventListener("load", buildMainPage);

function buildMainPage() {
    //The 'lists' variable is an array which holds all lists containing tasks
    let lists = createDefaultLists();

    SetupDefaultList(lists);

    //Create and populate the DOM with the lists
    CreateDOM();
    PopulateListSidebar(lists);
    
    let activeList = ReturnActiveList(lists);

    PopulateTaskSection(activeList);

    //console.table(lists); 
    
    //moved here from sidebar.js to test with passing lists
    const button = document.querySelector('.addListButton');
    button.addEventListener("click", () => {
        AddNewList(lists);
    });

    const addTaskButton = document.querySelector(".addTaskButton");
    addTaskButton.addEventListener("click", () => {
        AddNewTask(lists);
    })
}

//add click event for clicking on a list title
//click event takes list that was clicked on (target), sets the dom element to have the class active, and displays that list's tasks in the right section