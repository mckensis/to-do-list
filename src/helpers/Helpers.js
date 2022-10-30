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

//Removes the add list / add task forms when called
function RemoveForms() {
    if (document.querySelector(".newListForm")) {
        const form = document.querySelector(".newListForm");
        const sidebar = document.querySelector(".listSection")
        //sidebar.removeChild(form);
        form.classList.add("hidden");
    }

    if (document.querySelector(".newTaskForm")) {
        const form = document.querySelector(".newTaskForm");
        const section = document.querySelector(".taskSection");
        //section.removeChild(form);
        form.classList.add("hidden");
    }

    return;
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
    console.log(array);

    return array;
}

function DisplayAllTasks() {

    RemoveActiveClass();
    AddActiveClass(this);
    ShowAllTasks();
}

function DefaultList() {

    const listItem = document.createElement("li");

    listItem.classList.add("listItem","active");
    listItem.textContent = "All Tasks";

    listItem.addEventListener("click", DisplayAllTasks.bind(listItem));

    return listItem;
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

function PopulateListSidebar() {

    const listContainer = document.querySelector('.listContainer');
    
    EmptySection(listContainer);

    listContainer.appendChild(CreateSidebarList());
    
    return listContainer;
}

function FindThis(f) {
    const listItems = document.querySelectorAll(".listItem");
    for (const item of listItems) {
        if (item.textContent === f) {
            return item;
        }
    }
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

    RemoveActiveClass();
    AddActiveClass(saveThis);
    FilterTaskSection(filter);
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
    
function CreateListItem(item) {

    const listItem = document.createElement("li");
        
    listItem.classList.add("listItem");
    listItem.textContent = item;

    listItem.addEventListener("click", FilterTasks);

    return listItem;
}

function ShowAllTasks() {

    const defaultList = new List("All Tasks");
    defaultList.items = LoadLocalStorage();

    const taskContainer = document.querySelector('.taskContainer');

    EmptySection(taskContainer);

    taskContainer.appendChild(CreateTaskList(defaultList.items));
}

function Toggle(taskListItem) {
    taskListItem.classList.toggle("visibleDetails");
    for (let i = 1; i < taskListItem.childNodes.length; i++) {
        taskListItem.childNodes[i].classList.toggle("hidden");
    }
}

function ChangePriority(e, priority, item) {
    e.stopImmediatePropagation();

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

    CloseOtherTasks(this, taskList);
    Toggle(this);
}

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

function CreateTaskList(list) {

    const container = document.querySelector(".taskContainer");
    const taskList = document.createElement("ul");
    taskList.classList.add("activeTaskList");

    EmptySection(container);

    for (const item of list) {
        const taskListItem = document.createElement("li");

        const taskName = document.createElement("p");
        const taskDue = document.createElement("p");
        const taskPriority = document.createElement("p");
        const taskDescription = document.createElement("p");

        taskName.textContent = item[0];
        taskDescription.textContent = `Details: ${item[1]}`;
        taskDue.textContent = `Due: ${item[2]}`;
        
        taskPriority.classList.add("taskPriority");
        taskPriority.classList.add(item[3]);
        taskListItem.classList.add("taskItem");
        taskName.classList.add("taskName");
        taskDescription.classList.add("taskDescription");
        taskDue.classList.add("taskDue");
        
        taskDescription.classList.add("hidden");
        taskDue.classList.add("hidden");
        taskPriority.classList.add("hidden");
        
        taskListItem.appendChild(taskName);
        taskListItem.appendChild(taskDescription);
        taskListItem.appendChild(taskDue);
        taskListItem.appendChild(taskPriority);
        
        taskList.appendChild(taskListItem);

        const priority = taskListItem.lastChild;

        priority.addEventListener("click", (e) => {
            ChangePriority(e, priority, item);
        })

        taskListItem.addEventListener("click", OpenTask.bind(taskListItem, taskList));
    }

    return taskList;
}

export { RemoveForms, RemoveActiveClass, AddActiveClass, EmptySection, Hide, Show, SetHeight,
         SetListInputAttributes, SetTaskTitleInputAttributes, SetTaskDescriptionInputAttributes, SetTaskDueInputAttributes,
         UpdateTaskListOptions, GetListNames, CreateSidebarList, PopulateListSidebar, FilterTasks, DisplayAllTasks, 
         DefaultList, ManageDefaultList, CreateListItem, GetActiveList, SetActiveList, FilterTaskSection, ShowAllTasks, CreateTaskList };

/* Old functions, may not use still
function AddActiveProperty(listItem, lists) {

    for (const list of lists) {
        if (list.title == listItem.textContent) {
            list.active = true;
            return list;
        }
    }
}


//Removes the active property from all lists
function RemoveActiveProperty(lists) {
    for (const list of lists) {
        list.active = false;
    }
}
*/