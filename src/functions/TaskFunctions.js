import { LoadLocalStorage, UpdateLocalStorage, GetListFromLocalStorage, SaveLocalStorage } from "./LocalStorageHelpers";
import { ToggleActiveList } from "./ListFunctions";
import { parseISO } from "date-fns";
import CreateTaskItem from "../components/CreateTaskItem";
import EmptyContainer from "./EmptyContainer";

//Toggle between complete & incomplete tasks
function ToggleTaskCompletion(tasks, task, e) {
    e.stopPropagation();
    task.toggleComplete();
    UpdateLocalStorage(task, 'completion');
    let sortedTasks = SortTasks(tasks);
    
    const activeList = document.querySelector('.list-item.active');

    if (activeList.textContent === 'All Tasks') {
        DisplayAllTasks();
        return;
    }
    const container = document.querySelector('.task-container');
    EmptyContainer(container);
    PopulateTasks(sortedTasks);
}

//Cycle through the three priorities for tasks
function ChangeTaskPriorityLevel(priorities, task, e) {
    e.stopPropagation();
    
    //Remove the current priority class styling
    this.classList.remove(`p${task.priority}`);
    
    //Change the priority
    task.changePriority();

    //Add the new priority class styling
    this.classList.add(`p${task.priority}`);
    this.textContent = priorities[task.priority];

    UpdateLocalStorage(task, 'priority');

    //Could update display here but it shuffles the tasks by priority
    //Which might be annoying if trying to click the same item more than once
    //and there are higher / lower priority tasks on the same day
}

function ChangeTaskDueDateFormat(due, datefnsDate, task, e) {
    due.textContent === `Due ${datefnsDate}`
        ? due.textContent = `Due on ${parseISO(task.dueDate).toDateString()}`
        : due.textContent = `Due ${datefnsDate}`;
}

//Deletes a list from local storage and updates the display
function DeleteTask(task, e) {
    e.stopImmediatePropagation();
    //Get the localstorage list
    let storedList = GetListFromLocalStorage();

    //The task we clicked the delete button on
    let taskToDelete = task;
    let active = undefined;

    //Remove the list from the array if it matches the index
    storedList.forEach(list => {
        list.tasks.forEach(task => {
            if (task.id === taskToDelete.id) {
                list.tasks.splice(list.tasks.indexOf(task), 1);
                return active = list;
            };
        });
    });
    
    SaveLocalStorage(storedList);

    const activeList = document.querySelector('.list-section .active');
    if (activeList.textContent === 'All Tasks') {
        DisplayAllTasks();
        return;
    }
    FilterTasks(active);
    return;
}

//Displaying 'All Tasks' on the DOM
function DisplayAllTasks() {
    const container = document.querySelector('.task-container');
    const tasks = LoadLocalStorage();    
    let allTasks = document.querySelector('.list-container').children[0];

    EmptyContainer(container);
    ToggleActiveList(allTasks);

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
        document.querySelector('.empty-list').classList.remove('hidden');
    } else {
        document.querySelector('.empty-list').classList.add('hidden');
    }
}

//Populates the section with all tasks that are passed in
function PopulateTasks(tasks) {
    const container = document.querySelector('.task-container');

    tasks.forEach(task => {
        container.append(CreateTaskItem(task, tasks));
    })
}

export { ChangeTaskDueDateFormat,
         ChangeTaskPriorityLevel,
         CheckForEmptyTaskList,
         DeleteTask,
         DisplayAllTasks,
         FilterTasks,
         PopulateTasks,
         SortTasks,
         ToggleTaskCompletion,
};