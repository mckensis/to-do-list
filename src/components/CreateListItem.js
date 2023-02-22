import { DeleteList, ToggleActiveList } from "../functions/ListFunctions";
import { DisplayAllTasks, FilterTasks } from "../functions/TaskFunctions";

function CreateListDeleteButton(item, list) {
    if (!item.querySelector('button')) {
        //Create a delete button for the list
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('list-delete');
        item.append(deleteBtn);
        deleteBtn.addEventListener('click', DeleteList.bind(item, list));
    }
}

//Create an li on the DOM for each list name
function CreateListItem(list) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.textContent = list.title;
    listItem.dataset.id = list.id;

    listItem.addEventListener("click", (e) => {
        //If we came here from the delete button then display the default list
        if (e.target === listItem.querySelector('button')) {
            DisplayAllTasks();
            return;
        }
        //Filter the displayed tasks
        //Toggle the active class
        ToggleActiveList(listItem, list);
        FilterTasks(list);
    });

    return listItem;
}

export { CreateListDeleteButton, CreateListItem };