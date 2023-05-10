import TaskForm from './TaskForm';
import ListForm from './ListForm';
import AddNewListForm from '../functions/AddNewList';
import AddNewTaskForm from '../functions/AddNewTask';
import ManageElementVisibility from '../functions/ManageElementVisibility';
import { DisplayAllTasks } from '../functions/TaskFunctions';
import { signIn, signOutUser } from '../functions/firebaseFunctions';
import { getAuth, signOut } from 'firebase/auth';

// Creates the header section of the page
function Header() {
    const header = document.createElement('header');
    const title = document.createElement('h1');
    const signInButton = document.createElement('button');
    const signOutButton = document.createElement('button');
    
    signInButton.classList.add('sign-in');
    signOutButton.classList.add('sign-out');

    title.textContent = 'Do the thing!';
    signInButton.textContent = 'Sign In';
    signOutButton.textContent = 'Sign Out';

    header.append(title, signInButton, signOutButton);

    signInButton.addEventListener('click', () => signIn());
    signOutButton.addEventListener('click', () => signOutUser());

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

    section.classList.add("task-section");
    button.classList.add("add-new","task");
    list.classList.add('task-container');
    message.classList.add('empty-list');
    
    header.textContent = "tasks";
    button.textContent = "+";
    button.type = 'button';
    message.textContent = 'No Tasks Found!';

    section.append(header, button, form, list, message);

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