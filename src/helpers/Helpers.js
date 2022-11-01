import { formatDistance, parseISO, toDate } from "date-fns";
import List from "../classes/List";
import { LoadLocalStorage } from "./LocalStorageHelpers";

//Add the hidden class to the passed in element
function Hide(element) {
    element.classList.add("hidden");
}

//Remove the hidden class from the passed in element
function Show(element) {
    element.classList.remove("hidden");
}

//Clears the tasks from the bottom right container in preparation to display the correct tasks
function EmptySection(container) {

    while (container.childNodes.length > 0) {
        container.removeChild(container.lastChild);
    }
    return container;
}

//Removes the active class from the sidebar list items
function RemoveActiveClass() {
    const sidebarListItem = document.querySelectorAll('.listItem');

    for (const item of sidebarListItem) {
        item.classList.remove("active");
    }
}

//Adds the active class to the listItem li which is passed in
function AddActiveClass(listItem) {
    listItem.classList.add("active");
}

function SetHeight(section, height) {
    section.setAttribute("style",`height:${height}px`);
}

function SetListInputAttributes(input) {
    input.value = '';
    input.maxLength = "15";
    input.pattern = "[a-zA-Z0-9_]";
}

function SetTaskTitleInputAttributes(input) {

    input.maxLength = "20";
}

function SetTaskDescriptionInputAttributes(input) {

    input.maxLength = "40";
    input.pattern = "[a-zA-Z0-9 ]";
}

function SetTaskDueInputAttributes(input) {
    console.log("not set up yet")
}

function UpdateTaskListOptions(inputList) {

    const array = GetListNames();

    for (const item of array) {

        const option = document.createElement("option");
        option.classList.add("listOption");
        option.textContent = item;
        option.value = item;
        inputList.appendChild(option);
    }

    return inputList;
}

function GetListNames() {
    
    if (!localStorage.getItem("array")) {

        let array = [];
        
        const list = LoadLocalStorage();
        
        for (const item of list) {
            const parentList = item[4];
            if (array.indexOf(parentList) === -1) {
                array.push(parentList);
            }
        }
        
        localStorage.setItem("array", JSON.stringify(array));
        
        return array;
    }

    let array = JSON.parse(localStorage.getItem("array"));

    return array;
}

function ResetFormsAndButtons() {
    const forms = document.querySelectorAll("form");
    const listBtn = document.querySelector(".addListButton");
    const taskBtn = document.querySelector(".addTaskButton");

    for (const form of forms) {
        Hide(form);
    }

    Show(listBtn);
    Show(taskBtn);
}

function PopulateListSidebar() {

    const listContainer = document.querySelector('.listContainer');
    
    EmptySection(listContainer);

    listContainer.appendChild(CreateSidebarList());
    
    return listContainer;
}

function CreateSidebarList() {

    const names = GetListNames();

    const sidebarList = document.createElement("ul");

    sidebarList.classList.add("sidebarList");
    sidebarList.appendChild(DefaultList());

    for (const item of names) {
        sidebarList.appendChild(CreateListItem(item));
    }

    return sidebarList;
}

function CreateListItem(item) {

    const listItem = document.createElement("li");
        
    listItem.classList.add("listItem");
    listItem.textContent = item;

    listItem.addEventListener("click", FilterTasks);

    return listItem;
}

function DisplayAllTasks() {

    ResetFormsAndButtons();
    RemoveActiveClass();
    AddActiveClass(this);
    ShowAllTasks();
}

//Creates the default List, loads the items and appends them to the container
function ShowAllTasks() {

    const defaultList = new List("All Tasks");
    defaultList.items = LoadLocalStorage();

    const taskContainer = document.querySelector('.taskContainer');

    EmptySection(taskContainer);

    taskContainer.appendChild(CreateTaskList(defaultList.items));
}

function CreateTaskList(list) {

    const container = document.querySelector(".taskContainer");
    const taskList = document.createElement("ul");
    taskList.classList.add("activeTaskList");

    EmptySection(container);

    for (const item of list) {
        const taskListItem = document.createElement("li");
        const button = document.createElement("input");

        button.type = "checkbox";
        button.checked = false;

        const itemDate = new Date(item[2]);
        const today = new Date();

        const u = toDate(itemDate);

        const dueDate = formatDistance((u), (today), {addSuffix: true});

        const taskName = document.createElement("p");
        const taskDue = document.createElement("p");
        const taskPriority = document.createElement("p");
        const taskDescription = document.createElement("p");

        taskName.textContent = item[0];
        taskDescription.textContent = `${item[1]}`;
        taskDue.textContent = `Due ${dueDate}`;
        
        taskPriority.classList.add("taskPriority");
        taskPriority.classList.add(item[3]);
        taskListItem.classList.add("taskItem");
        taskName.classList.add("taskName");
        taskDescription.classList.add("taskDescription");
        taskDue.classList.add("taskDue");
        button.classList.add("completeTask");
        
        taskDescription.classList.add("hidden");
        taskDue.classList.add("hidden");
        taskPriority.classList.add("hidden");
        button.classList.add("hidden");
        
        taskListItem.appendChild(taskName);
        taskListItem.appendChild(taskDescription);
        taskListItem.appendChild(taskDue);
        taskListItem.appendChild(taskPriority);
        taskListItem.appendChild(button);
        
        taskList.appendChild(taskListItem);

        const priority = taskListItem.lastChild.previousSibling;

        priority.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            ChangePriority(priority, item);
        })
        
        taskListItem.addEventListener("click", OpenTask.bind(taskListItem, taskList));
        
        button.addEventListener("change", CompleteTask.bind(taskListItem, button));
    }

    return taskList;
}

function CompleteTask(button) {
    const item = this;
    
    if (button.checked) {
        this.classList.add("taskComplete");
        button.classList.add("taskComplete");
    } else {
        this.classList.remove("taskComplete");
    }

    const parent = this.parentElement;

    parent.removeChild(this);
    parent.appendChild(this);
    CloseAllTasks(parent);

    //Save localstorage?
}

function CloseAllTasks(parent) {

    //Iterate over each task and make sure only one is open at a time
    for (let taskCounter = 0; taskCounter < parent.childNodes.length; taskCounter++) {
        const item = parent.childNodes[taskCounter];
        //Hide the details of all tasks except the one that was clicked
            item.classList.remove("visibleDetails");
            for (let detailCounter = 1; detailCounter < item.childNodes.length; detailCounter++) {
                item.childNodes[detailCounter].classList.add("hidden");
            }
        }
}

function DefaultList() {

    const listItem = document.createElement("li");

    listItem.classList.add("listItem","active");
    listItem.textContent = "All Tasks";

    listItem.addEventListener("click", DisplayAllTasks.bind(listItem));

    return listItem;
}

function FilterTasks(list) {

    let saveThis;
    let filter;

    if (this == undefined) {
        saveThis = FindThis(list);
        filter = saveThis.textContent;
    } else {
        saveThis = this;
        filter = this.textContent;
    }

    ResetFormsAndButtons();
    RemoveActiveClass();
    AddActiveClass(saveThis);
    FilterTaskSection(filter);
}

function FindThis(f) {
    const listItems = document.querySelectorAll(".listItem");
    for (const item of listItems) {
        if (item.textContent === f) {
            return item;
        }
    }
}

function FilterTaskSection(filter) {

    const defaultList = new List("All Tasks");
    defaultList.items = LoadLocalStorage();

    const filteredList = defaultList.items.filter(item => item[4] === filter);

    const taskContainer = document.querySelector('.taskContainer');

    EmptySection(taskContainer);

    taskContainer.appendChild(CreateTaskList(filteredList));
}

//Sets the list which was clicked on to be the active one
function SetActiveList(e, lists) {

    for (const list of lists) {
        list.active = false;

        if (list.title == e.target.textContent) {
            e.target.classList.add("active");
            list.active = true;
            return list;
        }
    }
}

//Returns the current active list
function GetActiveList(lists) {

    for (const list of lists) {
        if (list.active) {
            return list;
        }
    }
    return console.error("no active list...");
}

//Empty the default list and repopulate it with items from the other lists
function ManageDefaultList(lists) {
    for (const list of lists) {
        if (list.title == "All Tasks") {
            EmptyDefaultList(list);
            PopulateDefaultList(list, lists);
        }
    }
}


//Toggles the task from title / full view when clicked on
function Toggle(taskListItem) {
    taskListItem.classList.toggle("visibleDetails");
    for (let i = 1; i < taskListItem.childNodes.length; i++) {
        taskListItem.childNodes[i].classList.toggle("hidden");
    }
}

//Changes the task priority when the coloured circle is clicked
function ChangePriority(priority, item) {

    
    switch (priority.classList[1]) {
        case "high":
            priority.classList.remove("high");
            priority.classList.add("low");
            item.priority = "low";
            return;
        case "medium":
            priority.classList.remove("medium");
            priority.classList.add("high");
            item.priority = "high";
            return;
        case "low":
            priority.classList.remove("low");
            priority.classList.add("medium");
            item.priority = "medium";
            return;
    }
}

function OpenTask(taskList) {

    const taskContainer = document.querySelector(".taskContainer");

    ResetFormsAndButtons();
    SetHeight(taskContainer, "435");
    CloseOtherTasks(this, taskList);
    Toggle(this);
}

//Closes any task that might be open in preparation for opening "this" which was clicked on
function CloseOtherTasks(taskListItem, taskList) {

    //Iterate over each task and make sure only one is open at a time
    for (let taskCounter = 0; taskCounter < taskList.childNodes.length; taskCounter++) {
        const item = taskList.childNodes[taskCounter];
        //Hide the details of all tasks except the one that was clicked
        if (item !== taskListItem) {
            item.classList.remove("visibleDetails");
            for (let detailCounter = 1; detailCounter < item.childNodes.length; detailCounter++) {
                item.childNodes[detailCounter].classList.add("hidden");
            }
        }
    }
}

export { RemoveActiveClass, AddActiveClass, EmptySection, Hide, Show, SetHeight,
         SetListInputAttributes, SetTaskTitleInputAttributes, SetTaskDescriptionInputAttributes, SetTaskDueInputAttributes,
         UpdateTaskListOptions, GetListNames, CreateSidebarList, PopulateListSidebar, FilterTasks, DisplayAllTasks, 
         DefaultList, ManageDefaultList, CreateListItem, GetActiveList, SetActiveList, FilterTaskSection, ShowAllTasks, CreateTaskList };