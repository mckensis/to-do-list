import './style.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import createDefaultList from './createDefaultList.js';
import createDOMHeader from './createDOMHeader.js';
import createDOMSidebar from './createDOMSidebar.js';
import createDOMActiveListSection from './createDOMActiveListSection.js';

//import data from './data.json';

window.addEventListener("load", buildMainPage());


function buildMainPage() {
    
    const page = document.querySelector('.mainPage');
    
    //const listArray = createDefaultLists();
    
    page.appendChild(createDOMHeader());
    page.appendChild(createDOMSidebar());
    page.appendChild(createDOMActiveListSection());
    
}









/*
function displayActiveList() {

    const list = document.createElement('ul');

    for (const listItem of active.items) {
        const item = document.createElement('li');
        item.textContent = listItem;
        list.appendChild(item);
    }

    list.classList.add('activeListDisplay');

    return list;
}
*/