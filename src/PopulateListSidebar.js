import CreateSidebarList from './CreateSidebarList.js';

function PopulateListSidebar(lists) {
    const listContainer = document.querySelector('.listContainer');

    //console.log("PopulateListSidebar, lists is: ", lists);
    listContainer.appendChild(CreateSidebarList(lists));
    
    return listContainer;
}

export default PopulateListSidebar;