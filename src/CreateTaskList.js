import { EmptySection } from "./Helpers";

/*
function ShowUrgency(taskListItem, taskPriority) {
    console.log(taskPriority.classList[0]);
    const icon = document.createElement("p");
    icon.classList.add("icon");
    icon.classList.add(taskPriority.classList[0]);

    taskListItem.appendChild(icon);

    taskListItem.addEventListener("mouseleave", () => {
        taskListItem.removeChild(icon);
    })
}*/

function Toggle(taskListItem) {
    taskListItem.classList.toggle("visibleDetails");
    for (let i = 1; i < taskListItem.childNodes.length; i++) {
        taskListItem.childNodes[i].classList.toggle("hidden");
    }
}

function ChangePriority(e, priority, item) {
    e.stopImmediatePropagation();

    console.log("current priority: ", priority);
    console.log(item);

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

    console.log(taskListItem);
    
    console.log(taskList.childNodes);
    //Iterate over each task and make sure only one is open at a time
    for (let taskCounter = 0; taskCounter < taskList.childNodes.length; taskCounter++) {
        const item = taskList.childNodes[taskCounter];
        //Hide the details of all tasks except the one that was clicked
        if (item !== taskListItem) {
            console.log("hehe")
            item.classList.remove("visibleDetails");
            for (let detailCounter = 1; detailCounter < item.childNodes.length; detailCounter++) {
                item.childNodes[detailCounter].classList.add("hidden");
            }
        }
    }
    
    /*
    //This works:
    //NodeList.prototype.forEach = Array.prototype.forEach;
    children.forEach(function(item) {
        if (item !== target) {
            item.classList.remove("visibleDetails")
            for (let i = 1; i < item.childNodes.length; i++) {
                item.childNodes[i].classList.add("hidden");
            }
        }
    });
    */
}

function CreateTaskList(list) {

    const container = document.querySelector(".taskContainer");
    const taskList = document.createElement("ul");
    taskList.classList.add("activeTaskList");

    //console.log("CreateTaskList - active list is: ", list);

    EmptySection(container);

    for (const item of list.items) {
        const taskListItem = document.createElement("li");

        const taskName = document.createElement("p");
        const taskDue = document.createElement("p");
        const taskPriority = document.createElement("p");
        const taskDescription = document.createElement("p");

        taskName.textContent = item.title;
        taskDue.textContent = `Due: ${item.dueDate}`;
        taskDescription.textContent = `Details: ${item.description}`;
        
        taskPriority.classList.add("taskPriority");
        taskPriority.classList.add(item.priority);
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

        /*
        taskListItem.addEventListener("mouseover", () => {
            ShowUrgency(taskListItem, taskPriority);
        });
        */
        
        /* add back in when done testing:
        taskListItem.addEventListener("click", (e) => {
            //console.log("clicked: ", item.title);
            OpenTask(e, taskListItem, taskList);
        });*/
    }

    return taskList;
}

export default CreateTaskList;