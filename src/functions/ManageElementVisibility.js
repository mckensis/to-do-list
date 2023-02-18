import { DisplayAllTasks } from "./TaskFunctions";

//Toggling an element between hidden and shown
function Hide(element) {
    element.style.display = 'none';
}
function Show(element) {
    element.style.display = 'grid';
}

//Manages the different elements for each section when the + button is clicked
//Can be passed in a type such as 'reset' and 'expand / hide'
function ManageElementVisibility(referrer, type) {
    //List section elements
    const listSection = document.querySelector('.list-container');
    const listButton = document.querySelector('button.add-new.list');
    const listForm = document.querySelector('.add-list.form');

    //Tasks section elements
    const taskSection = document.querySelector('.task-container');
    const taskButton = document.querySelector('button.add-new.task');
    const taskForm = document.querySelector('.add-task.form');

    //Reset the view back to default
    //If the form is submitted or cancelled successfully
    if (type === 'reset') {
        if (referrer === listSection) {
            Hide(listForm);
            Show(listButton);
            return;
        }
        if (referrer === taskSection) {
            Hide(taskForm);
            Show(taskButton);
            DisplayAllTasks();
            Show(taskSection);
            return;
        }
    }

    //TO-DO:
    if (type === 'submit') {
        //Display the new list
        //Or display the list you just added a task to
    }

    //Expands / collapses the list section
    if (type === 'expand / hide') {
        let button = this;
        if (referrer.style.display !== 'none') {
            referrer.style.display = 'none';
            button.textContent = 'Expand';
            return;
        } else {
            button.textContent = 'Hide';
            referrer.style.display = 'unset';
            return;
        }
    }

    //Reset the task section and hide some list elements
    if (referrer === listSection) {
        Hide(listButton);
        Show(listForm);
        Show(taskSection);
        Show(taskButton);
        Hide(taskForm);
        return;
    }
    
    //Reset the list section and hide some task elements
    if (referrer === taskSection) {
        Show(listButton);
        Hide(listForm);
        Hide(taskSection);
        Hide(taskButton);
        Show(taskForm);
        return;
    }
}

export default ManageElementVisibility;