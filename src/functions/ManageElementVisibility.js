import { ToggleActiveList } from "./ListFunctions";
import { DisplayAllTasks, FilterTasks } from "./TaskFunctions";

//Hide the element
function Hide(element) {
    element.style.display = 'none';
}

//Show the element
function Show(element) {
    element.style.display = 'grid';
}

//Manages the different elements for each section when the + button is clicked
//Can be passed in a type such as 'reset' and 'expand / hide'
function ManageElementVisibility(referrer, type, list) {
    //List section elements
    const listSection = document.querySelector('.list-container');
    const listButton = document.querySelector('button.add-new.list');
    const listForm = document.querySelector('.add-list.form');

    //Tasks section elements
    const taskSection = document.querySelector('.task-container');
    const taskButton = document.querySelector('button.add-new.task');
    const taskForm = document.querySelector('.add-task.form');

    //When the new task or list form is cancelled
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

    //When the new task or list form is submitted 
    if (type === 'submit') {
        //Display the new task within it's parent list
        if (referrer === taskSection) {
            let listItem = document.querySelector('.list-container').children[list.index + 1];
            let filter = list.list;
            Hide(taskForm);
            Show(taskButton);
            ToggleActiveList(listItem, filter);
            FilterTasks(filter);
            Show(taskSection);
            return;
        }
        //Display the new list
        if (referrer === listSection) {
            let children = document.querySelector('.list-container').children;
            let listItem = children[children.length -1];
            let filter = list;
            Hide(listForm);
            Show(listButton);
            ToggleActiveList(listItem, filter);
            FilterTasks(filter);
            let button = document.querySelector('button.expand');
            if (button.textContent === 'Expand' && button.style.display !== 'none') {
                button.click();
            }
            return;
        }
    }

    if (type === 'toggle') {
        Hide(taskForm);
        Show(taskButton);
        Show(taskSection);
        Hide(listForm);
        Show(listButton);
        Show(listSection);
    }

    //When the expand / hide button on the list section is clicked
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