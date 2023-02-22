import { formatDistance, format, parseISO, compareAsc } from "date-fns";
import { ChangeTaskDueDateFormat, ChangeTaskPriorityLevel, DeleteTask, ToggleTaskCompletion } from '../functions/TaskFunctions';

function CreateTaskItemDeleteButton(listItem) {
    if (!listItem.querySelector('button.task-delete')) {
        //Create a delete button for the list
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('task-delete');
        return deleteBtn;
    }
    return false;
}

//Create an li for each task
function CreateTaskItem(task, tasks) {
    const item = document.createElement("li");
    const completed = document.createElement("input");
    const title = document.createElement("p");
    const due = document.createElement("p");
    const priority = document.createElement('button');
    const deleteBtn = CreateTaskItemDeleteButton(item);

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

    //If the task is complete, then add the class styling
    if (task.isComplete()) {
        item.classList.add('completed');
    //If the task is not complete, allow the priority to be changed
    } else {
        priority.addEventListener('click',
            ChangeTaskPriorityLevel.bind(priority, priorities, task));
    }
    
    //Toggle the task completion
    completed.addEventListener("change",
        ToggleTaskCompletion.bind(completed, tasks, task));
    
    //Swap between date-fns date and actual task due date
    item.addEventListener('click',
        ChangeTaskDueDateFormat.bind(item, due, datefnsDate, task))
  
    //Disabled for now
    //item.addEventListener('mouseover', ChangeTaskDueDateFormat.bind(item, due, datefnsDate, task));

    //Due date will always return to date-fns date on mouseleave
    item.addEventListener('mouseleave', () => {
        due.textContent = `Due ${datefnsDate}`;
    });

    deleteBtn.addEventListener('click', DeleteTask.bind(deleteBtn, task));

    item.append(completed, priority, title, due, deleteBtn);

    return item;
}

export default CreateTaskItem;