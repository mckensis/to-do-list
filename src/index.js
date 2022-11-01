import './style.css';
import CreateDOMLayout from './DOM/CreateDOMLayout';
import { PopulateListSidebar, ShowAllTasks } from './helpers/Helpers';
import { GetList } from './helpers/LocalStorageHelpers';
import AddNewList from './AddNewList.js';
import AddNewTask from './AddNewTask.js';

//import data from './data.json';
window.addEventListener("load", buildMainPage);


function buildMainPage() {
    //localStorage.clear();

    let defaultList = GetList();

    //Create and populate the DOM with the lists
    CreateDOMLayout();
    
    PopulateListSidebar();
    ShowAllTasks();

    const addListButton = document.querySelector('.addListButton');
    const addTaskButton = document.querySelector(".addTaskButton");

    addListButton.addEventListener("click", AddNewList);
    addTaskButton.addEventListener("click", AddNewTask);
}