import CreateTaskList from './CreateTaskList';
import { ReturnActiveList } from './Helpers.js';

function PopulateTaskSection(lists) {

    //Get the active list and populate the task section with the active list's tasks
    const activeList = ReturnActiveList(lists);
    
    const taskContainer = document.querySelector('.taskContainer');

    taskContainer.appendChild(CreateTaskList(activeList));

    return taskContainer;
}

export default PopulateTaskSection;