import { TestForValidInput } from './FormValidation';
import { DisplayLists } from './ListFunctions';
import { GetListFromLocalStorage, SaveLocalStorage } from './LocalStorageHelpers';
import ManageElementVisibility from './ManageElementVisibility';
import EmptyContainer from './EmptyContainer';
import List from '../classes/List';

function HandleSubmit(container, input, e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (!TestForValidInput(input)) {
            return;
        }
        
        //Empty the list in preparation of displaying the updated list
        EmptyContainer(container);
        
        //Add the new list to localStorage and the display
        Add(input.value);
        
        //Toggle the form and button back to the original state
        ManageElementVisibility(container, 'reset');
}

function HandleCancel(container, e) {
    e.preventDefault();
    ManageElementVisibility(container, 'reset');
}

function AddNewListForm() {
    const container = document.querySelector('.list-container');
    const form = document.querySelector('.add-list.form');
    const input = document.querySelector('.add-list.input-field');
    const submit = document.querySelector('.add-list.confirm');
    const cancel = document.querySelector('.add-list.cancel');
    const button = document.querySelector('.add-new.list');

    //Hide and show various elements when the form is opened
    ManageElementVisibility(container);

    //Clear and focus the input
    input.value = '';
    input.focus();

    submit.addEventListener("click", HandleSubmit.bind(submit, container, input));
    cancel.addEventListener("click", HandleCancel.bind(cancel, container));
}

//Adds the new list to local storage and updates the display
function Add(value) {
    let storedList = GetListFromLocalStorage();
    let newList = new List(value);
    storedList.push(newList);
    SaveLocalStorage(storedList);
    DisplayLists(storedList);
}

export default AddNewListForm;