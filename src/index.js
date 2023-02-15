import './style.css';
import CreateWebpage from './components/Webpage';
import { DisplayLists } from './functions/ListFunctions';
import { DisplayAllTasks } from './functions/TaskFunctions';
import CreateDefaultList from './functions/CreateDefaultList';
import { GetListFromLocalStorage, SaveLocalStorage } from './functions/LocalStorageHelpers';

// import data from './data.json';
window.addEventListener('load', buildMainPage);

function buildMainPage() {
    // Create the DOM Layout (title, lists & tasks sections);
    CreateWebpage();

    localStorage.clear();
    //Get the tasks from local storage
    let list = GetListFromLocalStorage();

    //If they don't exist, then create the default lists & tasks
    if (!list) {
        list = CreateDefaultList();
        //Save the list that was just created 
        SaveLocalStorage(list);
    }

    //Display lists and all tasks
    DisplayLists(list);
    DisplayAllTasks();
}