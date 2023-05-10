import ManageElementVisibility from "./ManageElementVisibility";
import EmptyContainer from "./EmptyContainer";
import { TestForMultipleValidInputs, TestChangingInput } from './FormValidation';
import { GetListFromLocalStorage, SaveLocalStorage } from "./LocalStorageHelpers";
import format from "date-fns/format";

//Updates the select element with options for each list name
function UpdateOptionsList(select) {
    //Clear the options out so that there are no duplicates
    while (select.options.length > 0) {
        select.remove(0);
    }

    //For each list name, create an option item
    let listNames = Array.from(document.querySelector('.list-container').childNodes);
    listNames.forEach(list => {
        if (list.textContent === 'All Tasks') {
            return;
        }
        //The default list will be the currently active list, if any
        const option = new Option(list.textContent, list.textContent);
        if (list.classList.contains('active')) {
            option.selected = true;
        }
        select.add(option);
    });
}

function HandleSubmit(container, form, inputs, e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (!TestForMultipleValidInputs(inputs)) {
        return;
    }

    //Empty the list in preparation of displaying the updated list
    EmptyContainer(container);
    
    //Add the new task to localStorage and the display
    let index = form.querySelector('select.add-task.list').selectedIndex;
    let activeList = Add(inputs, index);
    //Toggle the form and button back to the original state
    //Display the list that a task was just added to
    ManageElementVisibility(container, 'submit', activeList);
    HandleBlur(inputs);
}

//Helps hide the keyboard on mobile
function HandleBlur(inputs) {
    inputs.forEach(input => {
        input.blur();
    })
    return;
}

function HandleCancel(container, inputs, e) {
    e.preventDefault();
    ManageElementVisibility(container, 'reset');
    HandleBlur(inputs);
}

function ResetFormInputs(inputs) {
    inputs.title.value = '';
    inputs.due.value = inputs.due.min;
    inputs.priority.selectedIndex = 1;
}

function AddNewTaskForm() {
    const container = document.querySelector('.task-container');
    const form = document.querySelector('.add-task.form');
    const title = document.querySelector('.add-task.title');
    const due = document.querySelector(".add-task.due");
    const priority = document.querySelector(".add-task.priority");
    const select = document.querySelector('.add-task.list');
    const submit = document.querySelector('.add-task.confirm');
    const cancel = document.querySelector('.add-task.cancel');

    const inputs = [
        title,
        due,
        priority,
        select,
    ];

    UpdateOptionsList(select);
    
    //Toggle the form and button when + is clicked
    ManageElementVisibility(container, 'show form');
    ResetFormInputs({ title, due, priority });

    title.addEventListener('input', TestChangingInput.bind(title, title));
    submit.addEventListener("click", HandleSubmit.bind(submit, container, form, inputs));
    cancel.addEventListener("click", HandleCancel.bind(cancel, container, inputs));
    
    title.focus();
}

function ReturnLists(filter, index) {
    let storedList = GetListFromLocalStorage();
    let active = undefined;

    //Remove the list from the array if it matches the index
    storedList.forEach(list => {
        if (list.title === filter && storedList.indexOf(list) === index) {
            active = list;
        }
    })
    return {active, storedList, index};
}

//Adds the new list to local storage and updates the display
function Add(inputs, index) {

    let list = String;
    let title = String;
    let priority = Number;
    let due;

    inputs.forEach(input => {
        if (input.name === 'task-list') {
            list = input.value;
        }
        if (input.name === 'task-title') {
            title = input.value;
        }
        if (input.name === 'task-due') {
            due = format(new Date(input.value), 'yyyy-MM-dd').split("-");
        }
        if (input.name === 'task-priority') {
            priority = input.value;
        }
    });

    let lists = ReturnLists(list, index);
    lists.active.create({
        title,
        dueDate: {
            year: due[0],
            month: due[1],
            day: due[2],
        },
        priority,        
    });

    lists.storedList.forEach(list => {
        if (list.id === lists.active.id) {
            list = lists.active;
        }
    });

    SaveLocalStorage(lists.storedList);
    return { list: lists.active, index: lists.index };
}

export default AddNewTaskForm;