import { ToggleActiveList } from "./ListFunctions";
import { CheckForEmptyTaskList, DisplayAllTasks, FilterTasks } from "./TaskFunctions";

//Hide the element
function Hide(element) {
    element.classList.add('hidden');
}

//Show the element
function Show(element) {
    element.classList.remove('hidden');
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
    const emptyTaskListMessage = document.querySelector('p.empty-list');

    //Expand / Collapse the list section when clicked
    if (type === 'expand / hide') {
        let button = this;
        if (!referrer.classList.contains('hidden')) {
            Hide(referrer);
            button.textContent = 'Expand';
            return;
        } else {
            Show(referrer);
            button.textContent = 'Hide';
            return;
        }
    }

    //Reset the displays when a form is cancelled
    if (type === 'reset') {
        if (referrer === listSection) {
            Hide(listForm);
            Show(listButton);
        }
        if (referrer === taskSection) {
            Hide(taskForm);
            Show(taskButton);
        }
        Show(taskSection);
        CheckForEmptyTaskList(taskSection);
        return;
    }

    //When the new task or list form is submitted 
    if (type === 'submit') {
        //Display the new list
        if (referrer === listSection) {
            let children = document.querySelector('.list-container').children;
            let listItem = children[children.length -1];
            let filter = list;

            Hide(listForm);
            Show(listButton);
            ToggleActiveList(listItem, filter);
            FilterTasks(filter);
            Show(referrer);
        }

        //Display the new task within it's parent list
        if (referrer === taskSection) {
            let listItem = document.querySelector('.list-container').children[list.index + 1];
            let filter = list.list;
            Hide(taskForm);
            Show(taskButton);
            ToggleActiveList(listItem, filter);
            FilterTasks(filter);
            Show(taskSection);
            Show(listSection);
        }
        let button = document.querySelector('button.expand');
        button.textContent = 'Hide';
        return;
    }

    //When toggling an active list
    if (type === 'toggle') {
        Hide(taskForm);
        Show(taskButton);
        Show(taskSection);
        Hide(listForm);
        Show(listButton);
        Show(listSection);
        return;
    }

    //When displaying the new list or new task form
    if (type === 'show form') {
        if (referrer === listSection) {
            Hide(listButton);
            Show(listForm);
            Show(taskSection);
            Show(taskButton);
            Hide(taskForm);
            CheckForEmptyTaskList(taskSection);
            return;
        }
        if (referrer === taskSection) {
            Show(listButton);
            Hide(listForm);
            Hide(taskSection);
            Hide(taskButton);
            Show(taskForm);
            Hide(emptyTaskListMessage);
            return;
        }
    }
}

export default ManageElementVisibility;