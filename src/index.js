import './style.css';
import CreateDOM from './DOM/createDOM';
import { PopulateListSidebar, ShowAllTasks } from './helpers/Helpers';
import { CheckLocalStorage, LoadLocalStorage, SaveLocalStorage } from './helpers/LocalStorageHelpers';
import CreateDefaultTasks from './helpers/CreateDefaultTasks';
import AddNewList from './AddNewList.js';
import AddNewTask from './AddNewTask.js';
import List from './classes/List';

//import data from './data.json';
window.addEventListener("load", buildMainPage);

function GetList() {

    let defaultList = new List("All Tasks");

    if (!CheckLocalStorage()) {
        const items = CreateDefaultTasks();
        defaultList.items = items;
        SaveLocalStorage(defaultList.items);
    } else {
        defaultList.items = LoadLocalStorage();
    }

    return defaultList;
}

function buildMainPage() {
    //localStorage.clear();

    let defaultList = GetList();

    //Create and populate the DOM with the lists
    CreateDOM();
    
    PopulateListSidebar();
    ShowAllTasks();
    
    const addListButton = document.querySelector('.addListButton');
    const addTaskButton = document.querySelector(".addTaskButton");

    addListButton.addEventListener("click", AddNewList);
    addTaskButton.addEventListener("click", AddNewTask);
}