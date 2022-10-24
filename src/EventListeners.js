import { ToggleActiveList, AddListForm } from './createDOM.js';
import { SetActiveList } from './Helpers.js';

function SidebarEventListener(lists) {
    //const addTaskButton = document.querySelector('.addTaskButton');
    const sidebarList = document.querySelectorAll('.listItem');

    for (const item of sidebarList) {
        item.addEventListener("click", (e) => {
            //console.log("clicked list: " + item.textContent);
            const list = SetActiveList(e, lists);
            ToggleActiveList(list);
    })};
}

function NewListEventListener(lists) {

    const addListButton = document.querySelector('.addListButton');

    addListButton.addEventListener("click", () => {
        //console.log("clicked addListButton");
        AddListForm(lists);
    });
}

export { SidebarEventListener, NewListEventListener };