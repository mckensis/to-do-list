import { formatDistance, format, parseISO, toDate, formatISO, compareAsc } from "date-fns";
import EmptyContainer from "../functions/EmptyContainer";
import { SaveLocalStorage, UpdateLocalStorage } from "../functions/LocalStorageHelpers";
import { DisplayAllTasks, FilterTasks, PopulateTasks, SortTasks } from "../functions/TaskFunctions";
import { GetListFromLocalStorage } from "../functions/LocalStorageHelpers";

//Toggle between complete & incomplete tasks
function ToggleTaskCompletion(tasks, task, listItem, priority, e) {
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
function ChangePriority(priorities, task, e) {
    e.stopPropagation();

    this.classList.remove(`p${task.priority}`);

    task.changePriority();
    
    this.classList.add(`p${task.priority}`);
    this.textContent = priorities[task.priority];

    UpdateLocalStorage(task, 'priority');

    //Could update display here but it shuffles the tasks by priority
    //Which might be annoying if trying to click the same item more than once
    //and there are higher / lower priority tasks on the same day
}

function ChangeDueDateFormat(due, datefnsDate, task, e) {
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

function createTaskDeleteButton(listItem, task) {
    if (!listItem.querySelector('button.task-delete')) {
        //Create a delete button for the list
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('task-delete');
        return deleteBtn;
    }
    return false;
}

//Create an li for each task
function CreateTask(task, tasks) {
    const item = document.createElement("li");
    const completed = document.createElement("input");
    const title = document.createElement("p");
    const due = document.createElement("p");
    const priority = document.createElement('button');
    const deleteBtn = createTaskDeleteButton(item, task);

    const priorities = ['low', 'default', 'urgent'];
    const today = format(new Date(), 'yyyy-MM-dd');
    
    item.classList.add('task-item');
    priority.classList.add('task-priority',`p${task.priority}`);

    //Finds out if the task is overdue and not completed to style accordingly
    if (compareAsc(parseISO(today), parseISO(task.dueDate)) === 1 && !task.complete) {
        due.classList.add('overdue');
    }

    let datefnsDate = formatDistance
    (parseISO(task.dueDate), parseISO(today), {addSuffix: true});

    if (datefnsDate === 'less than a minute ago') {
        datefnsDate = 'today';
    }

    completed.type = "checkbox";
    completed.checked = task.isComplete();
    title.textContent = task.title;
    priority.textContent = priorities[task.priority];
    due.textContent = `Due ${datefnsDate}`;
    item.dataset.id = task.id;

    if (task.isComplete()) {
        item.classList.add('completed');
    } else {
        priority.addEventListener('click',
            ChangePriority.bind(priority, priorities, task));
    }
    
    completed.addEventListener("change",
        ToggleTaskCompletion.bind(completed, tasks, task, item, priority));
    
    item.addEventListener('click',
        ChangeDueDateFormat.bind(item, due, datefnsDate, task))
    
//        item.addEventListener('mouseover',
//    ChangeDueDateFormat.bind(item, due, datefnsDate, task));

    item.addEventListener('mouseleave', () => {
        due.textContent = `Due ${datefnsDate}`;
    });

    deleteBtn.addEventListener('click', DeleteTask.bind(deleteBtn, task));

    item.append(completed, priority, title, due, deleteBtn);

    return item;
}

export { CreateTask };