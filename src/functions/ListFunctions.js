import { CreateListDeleteButton, CreateListItem } from '../components/CreateListItem';
import { GetListFromLocalStorage, SaveLocalStorage } from './LocalStorageHelpers';
import ManageElementVisibility from './ManageElementVisibility';
import EmptyContainer from './EmptyContainer';

//Manage the active class on the list which was clicked on
//TO DO: TIDY UP THIS FUNCTION
//BREAK UP INTO SMALLER FUNCTIONS
function ToggleActiveList(item, list) {
    const container = Array.from(document.querySelector('.list-container').childNodes);

    container.forEach(listItem => {

        //For the list item which was clicked on
        if (listItem === item) {
            ManageElementVisibility(container.parentElement, 'toggle');
            item.classList.add('active');

            //Create a delete button if it's not the 'All Tasks' list
            if (item.textContent !== 'All Tasks') {
                CreateListDeleteButton(item, list);
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

//Handle populating the list container with each list name
function DisplayLists(allLists) {
    const container = document.querySelector('.list-container');
    EmptyContainer(container);

    //Create an item for each list name
    allLists.forEach(list => {
        container.append(CreateListItem(list));
    });
}

export { DisplayLists, ToggleActiveList, DeleteList };