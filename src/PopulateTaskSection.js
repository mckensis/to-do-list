import CreateTaskList from './CreateTaskList';

function PopulateTaskSection(activeList) {

    const taskContainer = document.querySelector('.taskContainer');

    taskContainer.appendChild(CreateTaskList(activeList));

    return taskContainer;
}

export default PopulateTaskSection;