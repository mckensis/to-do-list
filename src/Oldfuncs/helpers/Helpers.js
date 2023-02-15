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

export { UpdateTaskListOptions };