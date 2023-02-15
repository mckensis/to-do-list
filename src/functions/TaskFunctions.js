import EmptyContainer from "./EmptyContainer";
import { LoadLocalStorage } from "./LocalStorageHelpers";
import { CreateTask } from "../components/CreateTask";
import { ToggleActive } from "./ListFunctions";

//New function for displaying 'All Tasks'
function DisplayAllTasks() {
    const container = document.querySelector('.task-container');
    const tasks = LoadLocalStorage();    
    let allTasks = document.querySelector('.list-container').children[0];

    EmptyContainer(container);
    ToggleActive(allTasks);

    //Spread out the tasks from all lists into one array for sorting
    let sortedTasks = [];
    tasks.forEach(subList => {
        sortedTasks.push(...subList.tasks);
    });

    sortedTasks = SortTasks(sortedTasks);
    PopulateTasks(sortedTasks);
    CheckForEmptyTaskList(container);
}

//Filter the task list depending on which list title was clicked
function FilterTasks(list) {
    const container = document.querySelector('.task-container');
    EmptyContainer(container);
    let sortedTasks = SortTasks(list.tasks);
    //Filter the tasks to the selected list
    PopulateTasks(sortedTasks);
}

function SortTasks(tasks) {
    let temp = [...tasks];
    let sortedTasks = temp.sort((taskOne, taskTwo) => {
        return taskOne.complete - taskTwo.complete || new Date(taskTwo.due) - new Date(taskOne.due) || taskTwo.priority - taskOne.priority;
    });
    return sortedTasks;
}

//Shows the 'No Tasks' message if the list is empty
function CheckForEmptyTaskList(container) {
    if (container.children.length === 0) {
        document.querySelector('.empty-list').style.display = 'unset';
    } else {
        document.querySelector('.empty-list').style.display = 'none';
    }
}

//Populates the section with all tasks that are passed in
function PopulateTasks(tasks) {
    const container = document.querySelector('.task-container');

    //TO-DO:
    //Sort the tasks by due date in here before displaying them
    tasks.forEach(task => {
        container.append(CreateTask(task, tasks));
    })
    
    CheckForEmptyTaskList(container);
}

export { PopulateTasks, FilterTasks, DisplayAllTasks, SortTasks };