import { TestChangingInput, TestForValidInput } from './FormValidation';
import { DisplayLists } from './ListFunctions';
import { GetListFromLocalStorage, SaveLocalStorage } from './LocalStorageHelpers';
import ManageElementVisibility from './ManageElementVisibility';
import EmptyContainer from './EmptyContainer';
import List from '../classes/List';
import { saveList } from './firebaseFunctions';

function HandleSubmit(container, input, e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (!TestForValidInput(input)) {
            return;
        }

        //Empty the list in preparation of displaying the updated list
        EmptyContainer(container);
        
        //Add the new list to localStorage and the display
        let list = Add(input.value);
        saveList(list);
        //Toggle the form and button back to the original state
        ManageElementVisibility(container, 'submit', list);
        input.blur();
}

function HandleCancel(container, input, e) {
    e.preventDefault();
    ManageElementVisibility(container, 'reset');
    input.blur();
}

function AddNewListForm() {
    const container = document.querySelector('.list-container');
    const form = document.querySelector('.add-list.form');
    const input = document.querySelector('.add-list.input-field');
    const submit = document.querySelector('.add-list.confirm');
    const cancel = document.querySelector('.add-list.cancel');
    const button = document.querySelector('.add-new.list');

    //Hide and show various elements when the form is opened
    ManageElementVisibility(container, 'show form');

    //Clear and focus the input
    input.value = '';
    input.focus();

    input.addEventListener('input', TestChangingInput.bind(input, input));
    submit.addEventListener("click", HandleSubmit.bind(submit, container, input));
    cancel.addEventListener("click", HandleCancel.bind(cancel, container, input));
}

//Adds the new list to local storage and updates the display
function Add(value) {
    let storedList = GetListFromLocalStorage();
    let newList = new List(value);
    let updatedList = [...storedList, newList];
    SaveLocalStorage(updatedList);
    DisplayLists(updatedList);
    return newList;
}

export default AddNewListForm;