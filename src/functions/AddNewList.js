import { TestChangingInput, TestForValidInput } from './FormValidation';
import ManageElementVisibility from './ManageElementVisibility';
import EmptyContainer from './EmptyContainer';
import { AddListToFirestore } from '../index';

function HandleSubmit(container, form, owner) {  
    const input = form['list-name'];
    if (!TestForValidInput(input)) return;

    // Empty the list in preparation of displaying the updated list
    EmptyContainer(container);

    // Add the new list to Firestore
    let list = AddListToFirestore(input.value, owner);
    
    form.reset();

    // Toggle the form and button back to the original state
    ManageElementVisibility(container, 'submit', list);
}

function HandleCancel(container, input) {
    ManageElementVisibility(container, 'reset');
    input.blur();
}

function AddNewListForm() {
    const container = document.querySelector('.list-container');
    const input = document.querySelector('.add-list input');

    //Hide and show various elements when the form is opened
    ManageElementVisibility(container, 'show form');

    //Clear and focus the input
    input.value = '';
    input.focus();

    input.addEventListener('input', TestChangingInput.bind(input, input));
}

export {
    AddNewListForm,
    HandleSubmit,
    HandleCancel,
};