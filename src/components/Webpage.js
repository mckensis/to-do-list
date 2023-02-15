import TaskForm from './TaskForm';
import ListForm from './ListForm';
import AddNewListForm from '../functions/AddNewList';
import AddNewTaskForm from '../functions/AddNewTask';
import ManageElementVisibility from '../functions/ManageElementVisibility';
import { FilterTasks } from '../functions/TaskFunctions';
import { DisplayAllTasks } from '../functions/TaskFunctions';

// Creates the header section of the page
function Header() {
    const header = document.createElement('header');
    const title = document.createElement('h1');

    title.textContent = 'Do the thing!';

    header.append(title);

    return header;
}

//Creates the sidebar section of the page,
//Where all current lists will be displayed and can be interacted with.
//There is also a button that can create a new list
function ListSection() {
    const aside = document.createElement('aside');
    const header = document.createElement('h2');
    const button = document.createElement('button');
    const list = document.createElement('ul');
    const allTasks = document.createElement('li');
    const expand = document.createElement('button');
    const form = ListForm();
    
    aside.classList.add("list-section");
    button.classList.add("add-new","list");
    list.classList.add("list-container");
    expand.classList.add('expand');
    allTasks.classList.add('list-item','active');
    
    header.textContent = "lists";
    button.textContent = "+";
    expand.textContent = 'Hide';
    allTasks.textContent = 'All Tasks';

    expand.addEventListener('mouseover', () => {
        aside.style.borderBottomColor = 'var(--palette-color-secondary-hover-dark)';});
    
    expand.addEventListener('mouseleave', () => {
        aside.style.borderBottomColor = 'var(--palette-color-secondary)';});
    
    expand.addEventListener('click', ManageElementVisibility.bind(expand, list, 'expand / hide'));
    button.addEventListener('click', AddNewListForm);
    allTasks.addEventListener('click', DisplayAllTasks.bind(list, allTasks));
    list.append(allTasks);
    aside.append(header, button, form, list, expand);

    return aside;
}

//Task sorting dropdown menu
function TaskSort() {
    const label = document.createElement('label');
    const sort = document.createElement('select');
    const priority = new Option('Priority', 'priority');
    const due = new Option('Due Date', 'due');

    label.textContent = 'Sort tasks by:';
    label.classList.add('sort-tasks');

    sort.append(priority, due);
    label.append(sort);

    sort.addEventListener('change', () => {
        console.log("sort needs set up");
        //TO DO:
        //SET UP SORTING OF TASKS
    })
    
    return label;
}

//Creates the bottom right section of the page,
//Where the active list will be displayed and can be interacted with.
//There is also a button that can create a new task.
function TaskSection() {
    const section = document.createElement('section');
    const header = document.createElement('h2');
    const button = document.createElement('button');
    const list = document.createElement('ul');
    const message = document.createElement('p');
    const form = TaskForm();
    const sort = TaskSort();

    section.classList.add("task-section");
    button.classList.add("add-new","task");
    list.classList.add('task-container');
    message.classList.add('empty-list');
    
    header.textContent = "tasks";
    button.textContent = "+";
    button.type = 'button';
    message.textContent = 'No Tasks Found!';

    section.append(header, button, form, sort, list, message);

    button.addEventListener('click', AddNewTaskForm);

    return section;
}

// Will be imported and called from index.js
// Creates templates for all necessary DOM elements
function CreateWebpage() {
    const header = Header();
    const lists = ListSection();
    const tasks = TaskSection();
    
    document.body.append(header, lists, tasks);
}

export default CreateWebpage;