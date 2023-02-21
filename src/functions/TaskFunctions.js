import EmptyContainer from "./EmptyContainer";
import { LoadLocalStorage } from "./LocalStorageHelpers";
import { CreateTask } from "../components/CreateTask";
import { ToggleActive } from "./ListFunctions";
import { parseISO } from "date-fns";

//Displaying 'All Tasks' on the DOM
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
function FilterTasks(filter) {
    const container = document.querySelector('.task-container');
    EmptyContainer(container);
    const list = LoadLocalStorage();

    list.forEach(subList => {
        if (subList.id === filter.id) {
            const sortedTasks = SortTasks(subList.tasks);
            //Filter the tasks to the selected list
            PopulateTasks(sortedTasks);
            CheckForEmptyTaskList(container);
            return;
        }
    })
    return false;
}

//Sorts tasks by completion, then due date, then urgency
function SortTasks(tasks) {
    let temp = [...tasks];
    let complete = [];
    let incomplete = [];

    temp.forEach(task => {
        if (task.isComplete()) {
            complete.push(task);
        } else {
            incomplete.push(task);
        }
    });

    //Sort the complete tasks to have most recent at the top
    let sortedComplete = complete.sort((taskOne, taskTwo) => {
        return parseISO(taskTwo.dueDate) - parseISO(taskOne.dueDate) || taskTwo.priority - taskOne.priority;
    });

    //Sort the incomplete tasks to have nearest due date at the top
    let sortedIncomplete = incomplete.sort((taskOne, taskTwo) => {
        return taskOne.complete - taskTwo.complete || parseISO(taskOne.dueDate) - parseISO(taskTwo.dueDate) || taskTwo.priority - taskOne.priority;
    });

    let sortedTasks = [...sortedIncomplete, ...sortedComplete];
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

    tasks.forEach(task => {
        container.append(CreateTask(task, tasks));
    })
    
    //CheckForEmptyTaskList(container);
}

export { PopulateTasks, FilterTasks, DisplayAllTasks, SortTasks };