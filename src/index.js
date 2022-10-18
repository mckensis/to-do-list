import './style.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
//import data from './data.json';

const listArray = [];

window.addEventListener("load", buildMainPage());

function buildHeader(page) {
    const header = document.createElement('h1');
    header.textContent = "To - Do List";
    page.appendChild(header);
    return page;
}

function defaultLists() {
    //This will need moved from the DOM section later
    //Here for testing purposes
    const defaultList = {};
    defaultList.title = "Default";
    defaultList.items = [];

    defaultList.items.push("Go to shops");
    defaultList.items.push("Take out the cat for a wee snacc");
    defaultList.items.push("Desto with the besto");

    defaultList.active = true;

    const workList = {};
    workList.title = "Work";
    workList.items = [];
    workList.active = false;

    listArray.push(defaultList);
    listArray.push(workList);

    return listArray;

}

function buildSidebar(page, listArray) {
    const sidebar = document.createElement('aside');

    defaultLists();

    const list = document.createElement("ul");
    const header = document.createElement('h2');

    //Create an item on the DOM for each list
    for (const listItem of listArray) {
        const item = document.createElement('li');
        item.textContent = listItem.title;
        
        if (listItem.active === true) {
            item.classList.add("active");
        }

        list.appendChild(item);
    }

    header.textContent = "Lists";

    sidebar.appendChild(header);
    sidebar.appendChild(list);

    page.appendChild(sidebar);
    return { listArray };
}

function buildDisplay(page) {
    const display = document.createElement('section');
    page.appendChild(display);

    for (const item of listArray) {
        
        if (item.active === true) {
            display.appendChild(displayActiveList(item));
            return;
        }
    }

    return page;
}

function displayActiveList(active) {

    const list = document.createElement('ul');

    for (const listItem of active.items) {
        const item = document.createElement('li');
        item.textContent = listItem;
        list.appendChild(item);
    }

    list.classList.add('activeListDisplay');

    return list;
}

function buildMainPage() {

    const page = document.querySelector('.mainPage');
    
    buildHeader(page);
    buildSidebar(page, listArray);
    buildDisplay(page);

}