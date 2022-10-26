//Returns the current active list
//When clicked on
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

function Hide(element) {
    element.classList.add("hidden");
}

function Show(element) {
    element.classList.remove("hidden");
}

//Clears the tasks from the bottom right container in preparation to display the correct tasks
function EmptySection(container) {

    //console.log("container is: ", container);

    while (container.childNodes.length > 0) {
        //console.log("removing... ", container.lastChild);
        container.removeChild(container.lastChild);
    }
    return container;
}

function ReturnActiveList(lists) {
    for (const list of lists) {
        if (list.active) {
            return list;
        }
    }
    return console.error("no active list...");
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
function RemoveActiveClass(lists) {
    const sidebarListItem = document.querySelectorAll('.listItem');

    for (const item of sidebarListItem) {
        if (lists.title !== item.textContent) {
            item.classList.remove("active");
        }
    }
}

function RemoveActiveProperty(lists) {
    for (const item of lists) {
        item.active = false;
    }
}

function AddActiveClass(item) {
    item.classList.add("active");
}

function AddActiveProperty(e, lists) {

    for (const list of lists) {
        if (list.title == e.target.textContent) {
            list.active = true;
            return list;
        }
    }
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
    input.value = '';
    input.maxLength = "15";
    input.pattern = "[a-zA-Z0-9_]";
}

export { SetActiveList, ReturnActiveList, RemoveForms, RemoveActiveClass, RemoveActiveProperty,
         AddActiveClass, AddActiveProperty, EmptySection, Hide, Show, SetHeight, SetListInputAttributes, SetTaskTitleInputAttributes };