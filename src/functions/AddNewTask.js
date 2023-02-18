import ManageElementVisibility from "./ManageElementVisibility";
import EmptyContainer from "./EmptyContainer";
import TestForValidInput from './FormValidation';

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
        const option = new Option(list.textContent, list.textContent);
        select.add(option);
    });
}

function HandleSubmit(container, form, inputs, e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    inputs.forEach(element => {
        if (!TestForValidInput(element)) {
            console.log("failed");
            return;
        }
    })


    //Empty the list in preparation of displaying the updated list
    EmptyContainer(container);
    
    //Add the new list to localStorage and the display
    //Add(input.value);
    
    //Toggle the form and button back to the original state
    ManageElementVisibility(container, 'reset');
}

function HandleCancel(container, e) {
    e.preventDefault();
    ManageElementVisibility(container, 'reset');
}


function ResetFormInputs(inputs) {
    inputs.title.value = '';
    inputs.due.value = '';
    inputs.priority.selectedIndex = 1;
    inputs.title.focus();
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
    ManageElementVisibility(container);
    
    submit.addEventListener("click", HandleSubmit.bind(submit, container, form, inputs));
    cancel.addEventListener("click", HandleCancel.bind(cancel, container));
    
    ResetFormInputs({ title, due, priority });
}

//Adds the new list to local storage and updates the display
function Add(value) {
    let storedList = GetListFromLocalStorage();
    let newList = new List(value);
    storedList.push(newList);
    SaveLocalStorage(storedList);
    DisplayLists(storedList);
}

export default AddNewTaskForm;

/*
    form.addEventListener("submit", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();

        const formData = new FormData(form);
        const data = [...formData.entries()];

        Add(data);
        //UpdateDefault(lists);

        Hide(form);
        Show(button);
        SetHeight(taskContainer, height);
    })

    form.addEventListener("submit", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();

        const formData = new FormData(form);
        const data = [...formData.entries()];

        Add(data);
        //UpdateDefault(lists);

        Hide(form);
        Show(button);
        SetHeight(taskContainer, height);
    })
*/