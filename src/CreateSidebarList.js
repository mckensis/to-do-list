import CreateTaskList from './CreateTaskList.js';
import { EmptySection, RemoveActiveClass, RemoveActiveProperty, AddActiveClass, AddActiveProperty } from './Helpers.js';

function CreateSidebarList(lists) {

    const sidebarList = document.createElement("ul");
    const listContainer = document.querySelector(".listContainer");
    sidebarList.classList.add("sidebarList");

    EmptySection(listContainer);

    for (const item of lists) {
        const listItem = document.createElement("li");
        
        listItem.classList.add("listItem");
        
        listItem.textContent = item.title;
        
        if (item.active) {
            listItem.classList.add("active");    
        }
        sidebarList.appendChild(listItem);

        listItem.addEventListener("click", (e) => {

            RemoveActiveClass(lists);
            RemoveActiveProperty(lists);
            AddActiveClass(listItem);
            
            const activeList = AddActiveProperty(e, lists);

            const taskContainer = document.querySelector(".taskContainer");

            taskContainer.appendChild(CreateTaskList(activeList));
        });
        
    }

    return sidebarList;
}

export default CreateSidebarList;