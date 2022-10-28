import { EmptySection } from "./Helpers";

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
    }

    return taskList;
}

export default CreateTaskList;