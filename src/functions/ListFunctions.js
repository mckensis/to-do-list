import EmptyContainer from './EmptyContainer';
import { GetListFromLocalStorage, SaveLocalStorage } from './LocalStorageHelpers';
import ManageElementVisibility from './ManageElementVisibility';
import { FilterTasks, DisplayAllTasks } from './TaskFunctions';

function CreateDeleteButton(item, list) {
    if (!item.querySelector('button')) {
        //Create a delete button for the list
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('list-delete');
        item.append(deleteBtn);
        deleteBtn.addEventListener('click', DeleteList.bind(item, list));
    }
}

//Manage the active class on the list which was clicked on
//TO DO: TIDY UP THIS FUNCTION
//BREAK UP INTO SMALLER FUNCTIONS
function ToggleActive(item, list) {
    const container = Array.from(document.querySelector('.list-container').childNodes);

    container.forEach(listItem => {

        //For the list item which was clicked on
        if (listItem === item) {
            ManageElementVisibility('list item');
            item.classList.add('active');

            //Create a delete button if it's not the 'All Tasks' list
            if (item.textContent !== 'All Tasks') {
                CreateDeleteButton(item, list);
            }

        //Remove the active class and delete button for items which weren't clicked on 
        } else {
            listItem.classList.remove('active');
            if (listItem.querySelector('button')) {
                let button = listItem.querySelector('button');
                button.parentElement.removeChild(button);
            }
        }
    });
}

//Deletes a list from local storage and updates the display
function DeleteList(list) {
    //Get the localstorage list
    let storedList = GetListFromLocalStorage();

    //The list we clicked the delete button on
    let listToDelete = list;

    //Remove the list from the array if it matches the index
    //Check index - 1 since 'All Tasks' list is not included
    storedList.forEach(list => {
        if (list.id === listToDelete.id) {
            storedList.splice(storedList.indexOf(list), 1);
            return;
        }
    })

    //Update localstorage with the new list
    SaveLocalStorage(storedList);
    //Re-populate the display with the updated lists
    DisplayLists(storedList);
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
        ToggleActive(listItem, list);
        FilterTasks(list);
    });

    return listItem;
}

//Handle populating the list container with each list name
function DisplayLists(allLists) {
    const container = document.querySelector('.list-container');
    EmptyContainer(container);

    //Create an item for each list name
    allLists.forEach(list => {
        container.append(CreateListItem(list));
    });
}

export { DisplayLists, CreateListItem, ToggleActive };