import { LoadLocalStorage, SaveLocalStorage } from './helpers/LocalStorageHelpers.js';
import { CheckForBlankInput, TestForValidInput } from './helpers/Validate.js';
import { Hide, Show, SetHeight, SetTaskTitleInputAttributes, SetTaskDescriptionInputAttributes, SetTaskDueInputAttributes, UpdateDefaultList, 
         UpdateTaskListOptions, PopulateListSidebar, FilterTasks } from './helpers/Helpers.js';

function AddNewTask() {

    const button = document.querySelector(".addTaskButton");
    const form = document.querySelector(".addTaskForm");
    const title = document.querySelector(".addTaskInput.title");
    const description = document.querySelector(".addTaskInput.description");
    const due = document.querySelector(".addTaskInput.due");
    const priority = document.querySelector(".addTaskInput.priority");
    const inputList = document.querySelector(".addTaskInput.list");

    const submit = document.querySelector(".addTaskConfirm");
    const cancel = document.querySelector(".addTaskCancel");

    const taskSection = document.querySelector(".taskSection");
    const taskContainer = document.querySelector(".taskContainer");

    const taskHeight = taskSection.offsetHeight;
    const height = taskContainer.offsetHeight;

    SetTaskTitleInputAttributes(title);
    UpdateTaskListOptions(inputList);

    Hide(button);
    Show(form);

    SetHeight(taskSection, taskHeight);
    SetHeight(taskContainer, "250");

    form.addEventListener("submit", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();

        const formData = new FormData(form);
        const data = [...formData.entries()];

        Add(data);
        //UpdateDefault(lists);

        Hide(form);
        Show(button);
        SetHeight(taskContainer, height);
    })

    submit.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        SetHeight(taskContainer, height);
        return;
    })

    cancel.addEventListener("click", (e) => {
        e.preventDefault();
        Hide(form);
        Show(button);
        SetHeight(taskContainer, height);
    });

    title.value = '';
    description.value = '';
    due.value = '';
    priority.option = "Default";

    title.focus();
}

function Add(data) {

    const title = data[0][1];
    const due = data[1][1];
    const priority = data[2][1];
    const list = data[3][1];
    const description = data[4][1];

    const newTask = [];

    newTask.push(title, description, due, priority, list);
    console.log(newTask);

    const items = LoadLocalStorage();
    
    items.unshift(newTask);
    
    SaveLocalStorage(items);
    PopulateListSidebar();
    FilterTasks(list);
}

export default AddNewTask;