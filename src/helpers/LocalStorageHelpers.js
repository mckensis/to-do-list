import List from "../classes/List";
import CreateDefaultTasks from './CreateDefaultTasks';

function SaveLocalStorage(items) {

    localStorage.setItem("items", JSON.stringify(items));
}

function LoadLocalStorage() {

    let items = JSON.parse(localStorage.getItem("items"));
    
    return items;
}

function CheckLocalStorage() {

    if (localStorage.getItem("items")) {
        return true;
    }

    return false;
}

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

export { SaveLocalStorage, LoadLocalStorage, CheckLocalStorage, GetList };