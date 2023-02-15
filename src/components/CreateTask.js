import { formatDistance, parseISO, toDate } from "date-fns";
import EmptyContainer from "../functions/EmptyContainer";
import { UpdateLocalStorage } from "../functions/LocalStorageHelpers";
import { DisplayAllTasks, PopulateTasks, SortTasks } from "../functions/TaskFunctions";

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
}

function ChangeDueDateFormat(due, datefnsDate, dueDate) {
    due.textContent === `Due ${datefnsDate}`
        ? due.textContent = `Due on ${dueDate.toDateString()}`
        : due.textContent = `Due ${datefnsDate}`;
}

//Create an li for each task
function CreateTask(task, tasks) {
    const item = document.createElement("li");
    const completed = document.createElement("input");
    const title = document.createElement("p");
    const due = document.createElement("p");
    const priority = document.createElement('button');
    //const priorities = ['low', 'default', 'high'];
    const priorities = ['chill', 'default', 'urgent'];
    
    console.log(priorities);

    const todayDate = new Date();
    const dueDate = new Date(task.due);
    const datefnsDate = formatDistance((dueDate), (todayDate), {addSuffix: true});

    item.classList.add('task-item');
    priority.classList.add('task-priority',`p${task.priority}`);
    
    completed.type = "checkbox";
    completed.checked = task.isComplete();
    title.textContent = task.title;
    due.textContent = `Due ${datefnsDate}`;
    priority.textContent = priorities[task.priority];

    item.append(completed, priority, title, due);

    if (task.isComplete()) {
        item.classList.add('completed');
    }

    priority.addEventListener('click',
        ChangePriority.bind(priority, priorities, task));
    
    completed.addEventListener("change",
        ToggleTaskCompletion.bind(completed, tasks, task, item, priority));
    
    item.addEventListener('click',
        ChangeDueDateFormat.bind(item, due, datefnsDate, dueDate));
    
    item.addEventListener('mouseover',
    ChangeDueDateFormat.bind(item, due, datefnsDate, dueDate));
    
    item.addEventListener('mouseleave', () => {
        due.textContent = `Due ${datefnsDate}`;
    });

    return item;
}

export { CreateTask };